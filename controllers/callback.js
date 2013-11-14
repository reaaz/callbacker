exports.list = function(req, res) {
    // List all the callbacks in the database
    req.db.models.callback.find({}, ["created_at", "Z"], function(err, callbacks) {
        if (err) {
            console.log(callbacks);
            throw err;
        }
        res.render('list_callbacks', {callbacks: callbacks, title: 'Callbacks'});
    });
};

exports.add = function(req, res) {
    var payload = req.rawBody;
    req.db.models.callback.create([
        {
            url: req.originalUrl,
            ipAddress: req.ip,
            payload: payload
        },
    ],
    function(err, callback) {
        if (err) {
            console.log(callback);
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.write('{"status": "error"}');
            res.end();
            throw err;
        }
        res.writeHead(201, {'Content-Type': 'application/json'});
        res.write('{"status": "success"}');
        res.end();
    });
};

exports.view = function(req, res) {
    var id = req.params.id;
    req.db.models.callback.find({id: id}, function(err, callbacks) {
        if (err) {
            console.log(callbacks);
            throw err;
        }
        res.render('view_callback', {callback: callbacks[0], title: 'Callback #' + id});
    });
};