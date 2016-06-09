'use strict';

System.register(['qs', 'extend', 'aurelia-fetch-client', 'aurelia-dependency-injection'], function (_export, _context) {
  var qs, extend, HttpClient, resolver, _dec, _class3, _typeof, Rest, Config, Endpoint;

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
        function Rest(httpClient, endpoint) {
          _classCallCheck(this, Rest);

          this.defaults = {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          };

          this.client = httpClient;
          this.endpoint = endpoint;
        }

        Rest.prototype.request = function request(method, path, body) {
          var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

          var requestOptions = extend(true, { headers: {} }, this.defaults, options, { method: method, body: body });

          var contentType = requestOptions.headers['Content-Type'] || requestOptions.headers['content-type'];

          if ((typeof body === 'undefined' ? 'undefined' : _typeof(body)) === 'object' && contentType) {
            requestOptions.body = contentType.toLowerCase() === 'application/json' ? JSON.stringify(body) : qs.stringify(body);
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

          return this.request('GET', requestPath, undefined, options);
        };

        Rest.prototype.post = function post(resource, body, options) {
          return this.request('POST', resource, body, options);
        };

        Rest.prototype.update = function update(resource, criteria, body, options) {
          var requestPath = resource;

          if (criteria) {
            requestPath += (typeof criteria === 'undefined' ? 'undefined' : _typeof(criteria)) !== 'object' ? '/' + criteria : '?' + qs.stringify(criteria);
          }

          return this.request('PUT', requestPath, body, options);
        };

        Rest.prototype.patch = function patch(resource, criteria, body, options) {
          var requestPath = resource;

          if (criteria) {
            requestPath += (typeof criteria === 'undefined' ? 'undefined' : _typeof(criteria)) !== 'object' ? '/' + criteria : '?' + qs.stringify(criteria);
          }

          return this.request('PATCH', requestPath, body, options);
        };

        Rest.prototype.destroy = function destroy(resource, criteria, options) {
          var requestPath = resource;

          if (criteria) {
            requestPath += (typeof criteria === 'undefined' ? 'undefined' : _typeof(criteria)) !== 'object' ? '/' + criteria : '?' + qs.stringify(criteria);
          }

          return this.request('DELETE', requestPath, undefined, options);
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
          this.endpoints[name] = new Rest(newClient, name);

          if (defaults !== undefined) this.endpoints[name].defaults = defaults;

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
      }()));

      _export('Config', Config);

      _export('Endpoint', _export('Endpoint', Endpoint = (_dec = resolver(), _dec(_class3 = function () {
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
      }()) || _class3)));

      _export('Endpoint', Endpoint);

      _export('configure', configure);

      _export('Config', Config);

      _export('Rest', Rest);

      _export('Endpoint', Endpoint);
    }
  };
});