'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Endpoint = exports.Rest = exports.Config = exports.configure = undefined;

var _config = require('./config');

var _rest = require('./rest');

var _endpoint = require('./endpoint');

function configure(aurelia, configCallback) {
  var config = aurelia.container.get(_config.Config);

  configCallback(config);
}

exports.configure = configure;
exports.Config = _config.Config;
exports.Rest = _rest.Rest;
exports.Endpoint = _endpoint.Endpoint;