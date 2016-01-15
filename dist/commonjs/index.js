'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.configure = configure;

var _config = require('./config');

var _rest = require('./rest');

Object.defineProperty(exports, 'Rest', {
  enumerable: true,
  get: function get() {
    return _rest.Rest;
  }
});
Object.defineProperty(exports, 'Config', {
  enumerable: true,
  get: function get() {
    return _config.Config;
  }
});

var _endpoint = require('./endpoint');

Object.defineProperty(exports, 'Endpoint', {
  enumerable: true,
  get: function get() {
    return _endpoint.Endpoint;
  }
});

function configure(aurelia, configCallback) {
  var config = aurelia.container.get(_config.Config);

  configCallback(config);
}