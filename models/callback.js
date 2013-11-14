module.exports = function(db, cb) {
  db.define("callback", {
    url: String,
    ipAddress: String,
    payload: {type: "text", big: true},
  }, {timestamp: true});

  return cb();
};