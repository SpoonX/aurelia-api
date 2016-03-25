'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Endpoint = undefined;

var _dec, _class;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _config = require('./config');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Endpoint = exports.Endpoint = (_dec = (0, _aureliaDependencyInjection.resolver)(), _dec(_class = function () {
  function Endpoint(key) {
    _classCallCheck(this, Endpoint);

    this._key = key;
  }

  Endpoint.prototype.get = function get(container) {
    return container.get(_config.Config).getEndpoint(this._key);
  };

  Endpoint.of = function of(key) {
    return new Endpoint(key);
  };

  return Endpoint;
}()) || _class);