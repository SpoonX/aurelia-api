'use strict';

System.register(['extend', 'aurelia-path', 'aurelia-fetch-client', 'aurelia-dependency-injection'], function (_export, _context) {
  "use strict";

  var extend, buildQueryString, join, HttpClient, Container, resolver, _dec, _class3, _typeof, Rest, Config, Endpoint;

  

  function getRequestPath(resource, traditional, idOrCriteria, criteria) {
    var hasSlash = resource.slice(-1) === '/';

    if (typeof idOrCriteria === 'string' || typeof idOrCriteria === 'number') {
      resource = '' + join(resource, String(idOrCriteria)) + (hasSlash ? '/' : '');
    } else {
      criteria = idOrCriteria;
    }

    if ((typeof criteria === 'undefined' ? 'undefined' : _typeof(criteria)) === 'object' && criteria !== null) {
      resource += '?' + buildQueryString(criteria, traditional);
    } else if (criteria) {
      resource += '' + (hasSlash ? '' : '/') + criteria + (hasSlash ? '/' : '');
    }

    return resource;
  }

  function configure(frameworkConfig, configOrConfigure) {
    var config = frameworkConfig.container.get(Config);

    if (typeof configOrConfigure === 'function') {
      configOrConfigure(config);

      return;
    }

    config.configure(configOrConfigure);
  }

  _export('configure', configure);

  return {
    setters: [function (_extend) {
      extend = _extend.default;
    }, function (_aureliaPath) {
      buildQueryString = _aureliaPath.buildQueryString;
      join = _aureliaPath.join;
    }, function (_aureliaFetchClient) {
      HttpClient = _aureliaFetchClient.HttpClient;
    }, function (_aureliaDependencyInjection) {
      Container = _aureliaDependencyInjection.Container;
      resolver = _aureliaDependencyInjection.resolver;
    }],
    execute: function () {
      _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };

      _export('Rest', Rest = function () {
        function Rest(httpClient, endpoint, useTraditionalUriTemplates) {
          

          this.defaults = {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          };

          this.client = httpClient;
          this.endpoint = endpoint;
          this.useTraditionalUriTemplates = !!useTraditionalUriTemplates;
        }

        Rest.prototype.request = function request(method, path, body, options, responseOutput) {
          var requestOptions = extend(true, { headers: {} }, this.defaults, options || {}, { method: method, body: body });
          var contentType = requestOptions.headers['Content-Type'] || requestOptions.headers['content-type'];

          if ((typeof body === 'undefined' ? 'undefined' : _typeof(body)) === 'object' && body !== null && contentType) {
            requestOptions.body = /^application\/(.+\+)?json/.test(contentType.toLowerCase()) ? JSON.stringify(body) : buildQueryString(body);
          }

          return this.client.fetch(path, requestOptions).then(function (response) {
            if (response.status >= 200 && response.status < 400) {
              if (responseOutput) {
                responseOutput.response = response;
              }

              return response.json().catch(function () {
                return null;
              });
            }

            throw response;
          });
        };

        Rest.prototype.find = function find(resource, idOrCriteria, options, responseOutput) {
          return this.request('GET', getRequestPath(resource, this.useTraditionalUriTemplates, idOrCriteria), undefined, options, responseOutput);
        };

        Rest.prototype.findOne = function findOne(resource, id, criteria, options, responseOutput) {
          return this.request('GET', getRequestPath(resource, this.useTraditionalUriTemplates, id, criteria), undefined, options, responseOutput);
        };

        Rest.prototype.post = function post(resource, body, options, responseOutput) {
          return this.request('POST', resource, body, options, responseOutput);
        };

        Rest.prototype.update = function update(resource, idOrCriteria, body, options, responseOutput) {
          return this.request('PUT', getRequestPath(resource, this.useTraditionalUriTemplates, idOrCriteria), body, options, responseOutput);
        };

        Rest.prototype.updateOne = function updateOne(resource, id, criteria, body, options, responseOutput) {
          return this.request('PUT', getRequestPath(resource, this.useTraditionalUriTemplates, id, criteria), body, options, responseOutput);
        };

        Rest.prototype.patch = function patch(resource, idOrCriteria, body, options, responseOutput) {
          return this.request('PATCH', getRequestPath(resource, this.useTraditionalUriTemplates, idOrCriteria), body, options, responseOutput);
        };

        Rest.prototype.patchOne = function patchOne(resource, id, criteria, body, options, responseOutput) {
          return this.request('PATCH', getRequestPath(resource, this.useTraditionalUriTemplates, id, criteria), body, options, responseOutput);
        };

        Rest.prototype.destroy = function destroy(resource, idOrCriteria, options, responseOutput) {
          return this.request('DELETE', getRequestPath(resource, this.useTraditionalUriTemplates, idOrCriteria), undefined, options, responseOutput);
        };

        Rest.prototype.destroyOne = function destroyOne(resource, id, criteria, options, responseOutput) {
          return this.request('DELETE', getRequestPath(resource, this.useTraditionalUriTemplates, id, criteria), undefined, options, responseOutput);
        };

        Rest.prototype.create = function create(resource, body, options, responseOutput) {
          return this.post(resource, body, options, responseOutput);
        };

        return Rest;
      }());

      _export('Rest', Rest);

      _export('Config', Config = function () {
        function Config() {
          

          this.endpoints = {};
        }

        Config.prototype.registerEndpoint = function registerEndpoint(name, configureMethod, defaults, restOptions) {
          var _this = this;

          var newClient = new HttpClient();
          var useTraditionalUriTemplates = void 0;

          if (restOptions !== undefined) {
            useTraditionalUriTemplates = restOptions.useTraditionalUriTemplates;
          }
          this.endpoints[name] = new Rest(newClient, name, useTraditionalUriTemplates);

          if (defaults !== undefined) {
            this.endpoints[name].defaults = defaults;
          }

          if (typeof configureMethod === 'function') {
            newClient.configure(configureMethod);

            if (_typeof(newClient.defaults) === 'object' && newClient.defaults !== null) {
              this.endpoints[name].defaults = newClient.defaults;
            }

            return this;
          }

          if (typeof configureMethod !== 'string' && !this.defaultBaseUrl) {
            return this;
          }

          if (this.defaultBaseUrl && typeof configureMethod !== 'string' && typeof configureMethod !== 'function') {
            newClient.configure(function (configure) {
              configure.withBaseUrl(_this.defaultBaseUrl);
            });

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

        Config.prototype.setDefaultBaseUrl = function setDefaultBaseUrl(baseUrl) {
          this.defaultBaseUrl = baseUrl;

          return this;
        };

        Config.prototype.configure = function configure(config) {
          var _this2 = this;

          if (config.defaultBaseUrl) {
            this.defaultBaseUrl = config.defaultBaseUrl;
          }

          config.endpoints.forEach(function (endpoint) {
            _this2.registerEndpoint(endpoint.name, endpoint.endpoint, endpoint.config);

            if (endpoint.default) {
              _this2.setDefaultEndpoint(endpoint.name);
            }
          });

          if (config.defaultEndpoint) {
            this.setDefaultEndpoint(config.defaultEndpoint);
          }

          return this;
        };

        return Config;
      }());

      _export('Config', Config);

      _export('Endpoint', Endpoint = (_dec = resolver(), _dec(_class3 = function () {
        function Endpoint(key) {
          

          this._key = key;
        }

        Endpoint.prototype.get = function get(container) {
          return container.get(Config).getEndpoint(this._key);
        };

        Endpoint.of = function of(key) {
          return new Endpoint(key);
        };

        return Endpoint;
      }()) || _class3));

      _export('Endpoint', Endpoint);
    }
  };
});