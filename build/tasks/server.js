var app        = require('express')();
var bodyParser = require('body-parser');
var cors       = require('cors');
var server;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.all('*', function(req, res) {
  res.send({
    path: req.path,
    query: req.query,
    body: req.body,
    method: req.method,
    contentType: req.header('content-type'),
    Authorization: req.header('Authorization')
  });
});

module.exports = {
  start: function(done) {
    server = app.listen(1927, done);
  },
  stop: function(cb) {
    server.close(cb);
  }
};
