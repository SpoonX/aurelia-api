var app        = require('express')();
var bodyParser = require('body-parser');
var cors       = require('cors');
var server;

var multer  = require('multer')
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/uploads', upload.single(), function(req, res) {
  res.send({
    path: req.path,
    query: req.query,
    body: req.body,
    method: req.method,
    contentType: req.header('content-type'),
    Authorization: req.header('Authorization')
    });
});

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
