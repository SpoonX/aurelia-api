define(['exports', 'aurelia-fetch-client', './rest'], function (exports, _aureliaFetchClient, _rest) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var Config = (function () {
    function Config() {
      _classCallCheck(this, Config);

      this.endpoints = {};
      this.defaultEndpoint = null;
    }

    _createClass(Config, [{
      key: 'registerEndpoint',
      value: function registerEndpoint(name, configureMethod, defaults) {
        var newClient = new _aureliaFetchClient.HttpClient();
        this.endpoints[name] = new _rest.Rest(newClient);

        if (typeof configureMethod === 'function') {
          newClient.configure(configureMethod);

          return this;
        }

        if (typeof configureMethod !== 'string') {
          return this;
        }

        newClient.configure(function (configure) {
          configure.withBaseUrl(configureMethod);

          if (typeof defaults === 'object') {
            configure.withDefaults(defaults);
          }
        });

        return this;
      }
    }, {
      key: 'getEndpoint',
      value: function getEndpoint(name) {
        if (!name) {
          return this.defaultEndpoint || null;
        }

        return this.endpoints[name] || null;
      }
    }, {
      key: 'endpointExists',
      value: function endpointExists(name) {
        return !!this.endpoints[name];
      }
    }, {
      key: 'setDefaultEndpoint',
      value: function setDefaultEndpoint(name) {
        this.defaultEndpoint = this.getEndpoint(name);

        return this;
      }
    }]);

    return Config;
  })();

  exports.Config = Config;
});