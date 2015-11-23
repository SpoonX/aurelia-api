System.register(['aurelia-fetch-client', 'aurelia-framework', 'querystring'], function (_export) {
  'use strict';

  var HttpClient, json, inject, qs, Rest;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  return {
    setters: [function (_aureliaFetchClient) {
      HttpClient = _aureliaFetchClient.HttpClient;
      json = _aureliaFetchClient.json;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_querystring) {
      qs = _querystring['default'];
    }],
    execute: function () {
      Rest = (function (_HttpClient) {
        _inherits(Rest, _HttpClient);

        function Rest() {
          _classCallCheck(this, Rest);

          _get(Object.getPrototypeOf(Rest.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(Rest, [{
          key: 'request',
          value: function request(method, path, body, headers) {
            var requestOptions = {
              method: method,
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            };

            if (typeof headers !== 'undefined') {
              requestOptions.headers = headers;
            }

            if (typeof body === 'object') {
              requestOptions.body = json(body);
            }

            return this.fetch(path, requestOptions).then(function (response) {
              return response.json();
            });
          }
        }, {
          key: 'find',
          value: function find(resource, criteria) {
            var requestPath = resource;

            if (criteria) {
              requestPath += typeof criteria !== 'object' ? '/' + criteria : '?' + qs.stringify(criteria);
            }

            return this.request('get', requestPath);
          }
        }, {
          key: 'post',
          value: function post(resource, body) {
            return this.request('post', resource, body);
          }
        }, {
          key: 'update',
          value: function update(resource, criteria, body) {
            var requestPath = resource;

            if (criteria) {
              requestPath += '/' + criteria;
            }

            return this.request('put', requestPath, body);
          }
        }, {
          key: 'destroy',
          value: function destroy(resource, criteria) {
            var requestPath = resource;

            if (criteria) {
              requestPath += '/' + criteria;
            }

            return this.request('delete', requestPath);
          }
        }, {
          key: 'create',
          value: function create(resource, body) {
            return this.post.apply(this, arguments);
          }
        }]);

        return Rest;
      })(HttpClient);

      _export('Rest', Rest);
    }
  };
});