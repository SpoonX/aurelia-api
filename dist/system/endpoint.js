'use strict';

System.register(['aurelia-dependency-injection', './config'], function (_export, _context) {
  var resolver, Config, _dec, _class, Endpoint;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaDependencyInjection) {
      resolver = _aureliaDependencyInjection.resolver;
    }, function (_config) {
      Config = _config.Config;
    }],
    execute: function () {
      _export('Endpoint', Endpoint = (_dec = resolver(), _dec(_class = function () {
        function Endpoint(key) {
          _classCallCheck(this, Endpoint);

          this._key = key;
        }

        Endpoint.prototype.get = function get(container) {
          return container.get(Config).getEndpoint(this._key);
        };

        Endpoint.of = function of(key) {
          return new Endpoint(key);
        };

        return Endpoint;
      }()) || _class));

      _export('Endpoint', Endpoint);
    }
  };
});