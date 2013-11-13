module.exports = function(app, auth) {
    var CallbackController = require('./controllers/callback');

    app.get('/', auth, function(req, res) {
        res.redirect('/callbacks');
    });
    app.get('/callbacks', auth, CallbackController.list);
    app.get('/callbacks/:id', auth, CallbackController.view);
    app.post('/callback', CallbackController.add);
};