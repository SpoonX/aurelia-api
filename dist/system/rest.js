System.register(['aurelia-fetch-client', 'aurelia-framework', 'querystring', 'extend'], function (_export) {
  'use strict';

  var HttpClient, json, inject, qs, extend, Rest;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaFetchClient) {
      HttpClient = _aureliaFetchClient.HttpClient;
      json = _aureliaFetchClient.json;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_querystring) {
      qs = _querystring['default'];
    }, function (_extend) {
      extend = _extend['default'];
    }],
    execute: function () {
      Rest = (function () {
        function Rest(httpClient) {
          _classCallCheck(this, _Rest);

          this.client = httpClient;
        }

        _createClass(Rest, [{
          key: 'request',
          value: function request(method, path, body, options) {
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

            if (typeof body === 'object') {
              requestOptions.body = json(body);
            }

            return this.client.fetch(path, requestOptions).then(function (response) {
              if (response.status >= 200 && response.status < 400) {
                return response.json()['catch'](function (error) {
                  return null;
                });
              }

              throw response;
            });
          }
        }, {
          key: 'find',
          value: function find(resource, criteria, options) {
            var requestPath = resource;

            if (criteria) {
              requestPath += typeof criteria !== 'object' ? '/' + criteria : '?' + qs.stringify(criteria);
            }

            return this.request('get', requestPath, undefined, options);
          }
        }, {
          key: 'post',
          value: function post(resource, body, options) {
            return this.request('post', resource, body, options);
          }
        }, {
          key: 'update',
          value: function update(resource, criteria, body, options) {
            var requestPath = resource;

            if (criteria) {
              requestPath += '/' + criteria;
            }

            return this.request('put', requestPath, body, options);
          }
        }, {
          key: 'destroy',
          value: function destroy(resource, criteria, options) {
            var requestPath = resource;

            if (criteria) {
              requestPath += '/' + criteria;
            }

            return this.request('delete', requestPath, undefined, options);
          }
        }, {
          key: 'create',
          value: function create(resource, body, options) {
            return this.post.apply(this, arguments);
          }
        }]);

        var _Rest = Rest;
        Rest = inject(HttpClient)(Rest) || Rest;
        return Rest;
      })();

      _export('Rest', Rest);
    }
  };
});