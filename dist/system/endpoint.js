System.register(['aurelia-dependency-injection', './config'], function (_export) {
  'use strict';

  var resolver, Config, Endpoint;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaDependencyInjection) {
      resolver = _aureliaDependencyInjection.resolver;
    }, function (_config) {
      Config = _config.Config;
    }],
    execute: function () {
      Endpoint = (function () {
        function Endpoint(key) {
          _classCallCheck(this, _Endpoint);

          this._key = key;
        }

        _createClass(Endpoint, [{
          key: 'get',
          value: function get(container) {
            return container.get(Config).getEndpoint(this._key);
          }
        }], [{
          key: 'of',
          value: function of(key) {
            return new Endpoint(key);
          }
        }]);

        var _Endpoint = Endpoint;
        Endpoint = resolver()(Endpoint) || Endpoint;
        return Endpoint;
      })();

      _export('Endpoint', Endpoint);
    }
  };
});