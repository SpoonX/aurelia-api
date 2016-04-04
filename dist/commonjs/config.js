'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Config = undefined;

var _aureliaFetchClient = require('aurelia-fetch-client');

var _rest = require('./rest');

var _extend = require('extend');

var _extend2 = _interopRequireDefault(_extend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Config = exports.Config = function () {
  function Config() {
    _classCallCheck(this, Config);

    this.endpoints = {};
    this.defaultEndpoint = null;
  }

  Config.prototype.registerEndpoint = function registerEndpoint(name, configureMethod) {
    var defaults = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var newClient = new _aureliaFetchClient.HttpClient();
    this.endpoints[name] = new _rest.Rest(newClient, name);

    (0, _extend2.default)(true, this.endpoints[name].defaults, defaults);

    if (typeof configureMethod === 'function') {
      newClient.configure(configureMethod);

      return this;
    }

    if (typeof configureMethod !== 'string') {
      return this;
    }

    newClient.configure(function (configure) {
      configure.withBaseUrl(configureMethod);
    });

    return this;
  };

  Config.prototype.getEndpoint = function getEndpoint(name) {
    if (!name) {
      return this.defaultEndpoint || null;
    }

    return this.endpoints[name] || null;
  };

  Config.prototype.endpointExists = function endpointExists(name) {
    return !!this.endpoints[name];
  };

  Config.prototype.setDefaultEndpoint = function setDefaultEndpoint(name) {
    this.defaultEndpoint = this.getEndpoint(name);

    return this;
  };

  return Config;
}();