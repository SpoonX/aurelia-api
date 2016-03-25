'use strict';

System.register(['aurelia-fetch-client', './rest', 'extend'], function (_export, _context) {
  var HttpClient, Rest, extend, Config;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFetchClient) {
      HttpClient = _aureliaFetchClient.HttpClient;
    }, function (_rest) {
      Rest = _rest.Rest;
    }, function (_extend) {
      extend = _extend.default;
    }],
    execute: function () {
      _export('Config', Config = function () {
        function Config() {
          _classCallCheck(this, Config);

          this.endpoints = {};
          this.defaultEndpoint = null;
        }

        Config.prototype.registerEndpoint = function registerEndpoint(name, configureMethod) {
          var defaults = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

          var newClient = new HttpClient();
          this.endpoints[name] = new Rest(newClient);

          extend(true, this.endpoints[name].defaults, defaults);

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
      }());

      _export('Config', Config);
    }
  };
});