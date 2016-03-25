'use strict';

System.register(['aurelia-fetch-client', 'qs', 'extend'], function (_export, _context) {
  var json, qs, extend, _typeof, Rest;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFetchClient) {
      json = _aureliaFetchClient.json;
    }, function (_qs) {
      qs = _qs.default;
    }, function (_extend) {
      extend = _extend.default;
    }],
    execute: function () {
      _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
      };

      _export('Rest', Rest = function () {
        function Rest(httpClient) {
          _classCallCheck(this, Rest);

          this.defaults = {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          };

          this.client = httpClient;
        }

        Rest.prototype.request = function request(method, path, body) {
          var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

          var requestOptions = extend(true, {}, this.defaults, options);

          requestOptions.method = method;

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
      }());

      _export('Rest', Rest);
    }
  };
});