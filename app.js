
/**
 * Module dependencies.
 */

var express = require('express');
var orm = require('orm');
var modts = require('orm-timestamps');
var fs = require('fs');
var https = require('https'); // XXX: Only support SSL
var path = require('path');
var app = express();
var config = require('./conf/' + app.get('env') + '.js');

var options = {
  key: fs.readFileSync(config.ssl_key),
  cert: fs.readFileSync(config.ssl_cert)
};
var connection_string = "mysql://" + config.db_user + ":" + config.db_password + "@" + config.db_server + "/callbacker?pool=true&debug=" + config.db_debug;

app.enable('trust proxy');
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.compress());
app.use(express.favicon());
app.use(function(req, res, next) {
    req.setEncoding('utf8');
    req.rawBody = '';
    req.on('data', function(chunk) {
        req.rawBody += chunk;
    });
    req.on('end', function() {
        next();
    });
});
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(orm.express(connection_string, {
    define: function(db, models, next) {
        db.use(modts, {
            createdProperty: 'created_at',
            modifiedProperty: 'modified_at',
            dbtype: { type: 'date', time: true },
            now: function() { return new Date(); },
            persist: true
        });
        db.load("./models/callback.js", function(err) {
            if (err) {
               throw err;
            }
            var Callback = db.models.callback;
            Callback.sync();
        });
        next();
    }
}));
app.use(app.router);

if ('development' == app.get('env')) {
  app.use(express.logger('dev'));
  app.use(express.errorHandler());
}

module.exports.app = https.createServer(options, app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

var auth = express.basicAuth(config.http_username, config.http_password);
var routes = require('./routes')(app, auth);