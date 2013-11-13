module.exports = function(db, cb) {
  db.define("callback", {
    url: String,
    ipAddress: String,
    payload: Object
  }, {timestamp: true});

  return cb();
};