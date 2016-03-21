'use strict';

System.register(['qs', 'extend', 'aurelia-fetch-client', 'aurelia-dependency-injection'], function (_export, _context) {
  var qs, extend, json, HttpClient, resolver, _dec, _class2, _typeof, Rest, Config, Endpoint;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function configure(aurelia, configCallback) {
    var config = aurelia.container.get(Config);

    configCallback(config);
  }

  return {
    setters: [function (_qs) {
      qs = _qs.default;
    }, function (_extend) {
      extend = _extend.default;
    }, function (_aureliaFetchClient) {
      json = _aureliaFetchClient.json;
      HttpClient = _aureliaFetchClient.HttpClient;
    }, function (_aureliaDependencyInjection) {
      resolver = _aureliaDependencyInjection.resolver;
    }],
    execute: function () {
      _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
      };

      _export('Rest', _export('Rest', Rest = function () {
        function Rest(httpClient) {
          _classCallCheck(this, Rest);

          this.client = httpClient;
        }

        Rest.prototype.request = function request(method, path, body, options) {
          var requestOptions = extend(true, {
            method: method,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }, options || {});

          if (typeof options !== 'undefined') {
            extend(true, requestOptions, options);
          }

          if ((typeof body === 'undefined' ? 'undefined' : _typeof(body)) === 'object') {
            requestOptions.body = json(body);
          }

          return this.client.fetch(path, requestOptions).then(function (response) {
            if (response.status >= 200 && response.status < 400) {
              return response.json().catch(function (error) {
                return null;
              });
            }

            throw response;
          });
        };

        Rest.prototype.find = function find(resource, criteria, options) {
          var requestPath = resource;

          if (criteria) {
            requestPath += (typeof criteria === 'undefined' ? 'undefined' : _typeof(criteria)) !== 'object' ? '/' + criteria : '?' + qs.stringify(criteria);
          }

          return this.request('get', requestPath, undefined, options);
        };

        Rest.prototype.post = function post(resource, body, options) {
          return this.request('post', resource, body, options);
        };

        Rest.prototype.update = function update(resource, criteria, body, options) {
          var requestPath = resource;

          if (criteria) {
            requestPath += (typeof criteria === 'undefined' ? 'undefined' : _typeof(criteria)) !== 'object' ? '/' + criteria : '?' + qs.stringify(criteria);
          }

          return this.request('put', requestPath, body, options);
        };

        Rest.prototype.destroy = function destroy(resource, criteria, options) {
          var requestPath = resource;

          if (criteria) {
            requestPath += (typeof criteria === 'undefined' ? 'undefined' : _typeof(criteria)) !== 'object' ? '/' + criteria : '?' + qs.stringify(criteria);
          }

          return this.request('delete', requestPath, undefined, options);
        };

        Rest.prototype.create = function create(resource, body, options) {
          return this.post.apply(this, arguments);
        };

        return Rest;
      }()));

      _export('Rest', Rest);

      _export('Config', _export('Config', Config = function () {
        function Config() {
          _classCallCheck(this, Config);

          this.endpoints = {};
          this.defaultEndpoint = null;
        }

        Config.prototype.registerEndpoint = function registerEndpoint(name, configureMethod, defaults) {
          var newClient = new HttpClient();
          this.endpoints[name] = new Rest(newClient);

          if (typeof configureMethod === 'function') {
            newClient.configure(configureMethod);

            return this;
          }

          if (typeof configureMethod !== 'string') {
            return this;
          }

          newClient.configure(function (configure) {
            configure.withBaseUrl(configureMethod);

            if ((typeof defaults === 'undefined' ? 'undefined' : _typeof(defaults)) === 'object') {
              configure.withDefaults(defaults);
            }
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
      }()));

      _export('Config', Config);

      _export('Endpoint', _export('Endpoint', Endpoint = (_dec = resolver(), _dec(_class2 = function () {
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
      }()) || _class2)));

      _export('Endpoint', Endpoint);

      _export('configure', configure);

      _export('Config', Config);

      _export('Rest', Rest);

      _export('Endpoint', Endpoint);
    }
  };
});