// all default gulp tasks are located in the ./node_modules/spoonx-tools/build-plugin/tasks directory
// gulp default configuration is in files in ./node_modules/spoonx-tools/build-plugin directory
require('require-dir')('node_modules/spoonx-tools/build-plugin/tasks');

// 'gulp help' lists the available default tasks
// you can add additional tasks here
// the testing express server can be imported and routes added
var app = require('./node_modules/spoonx-tools/build-plugin/tasks/server').app;

// file upload test
var multer  = require('multer')
var storage = multer.memoryStorage()
var upload  = multer({storage: storage})
var bodyParser = require('body-parser');

app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

var xmlResponse= `
    <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <verzeichnis>
        <titel>Wikipedia Städteverzeichnis</titel>
    </verzeichnis>
  `;

app.get('/xml', function(req, res) {
  res.type('application/xml');
  res.send(xmlResponse);
});

app.post('/uploads', upload.single(), function(req, res) {
  res.send({
    path         : req.path,
    query        : req.query,
    body         : req.body,
    method       : req.method,
    contentType  : req.header('content-type'),
    Authorization: req.header('Authorization')
  });
});

// default: all routes, all methods
app.all('*', function(req, res) {
  res.send({
    path         : req.path,
    query        : req.query,
    body         : req.body,
    method       : req.method,
    contentType  : req.header('content-type'),
    Authorization: req.header('Authorization'),
    originalUrl  : req.originalUrl
  });
});
