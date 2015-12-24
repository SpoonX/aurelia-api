define(['exports', 'aurelia-fetch-client', 'aurelia-framework', 'querystring', 'extend'], function (exports, _aureliaFetchClient, _aureliaFramework, _querystring, _extend) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var _qs = _interopRequireDefault(_querystring);

  var _extend2 = _interopRequireDefault(_extend);

  var Rest = (function () {
    function Rest(httpClient) {
      _classCallCheck(this, _Rest);

      this.client = httpClient;
    }

    _createClass(Rest, [{
      key: 'request',
      value: function request(method, path, body, options) {
        var requestOptions = (0, _extend2['default'])(true, {
          method: method,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }, options || {});

        if (typeof options !== 'undefined') {
          (0, _extend2['default'])(true, requestOptions, options);
        }

        if (typeof body === 'object') {
          requestOptions.body = (0, _aureliaFetchClient.json)(body);
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
          requestPath += typeof criteria !== 'object' ? '/' + criteria : '?' + _qs['default'].stringify(criteria);
        }

        return this.request('get', requestPath, null, options);
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

        return this.request('delete', requestPath, null, options);
      }
    }, {
      key: 'create',
      value: function create(resource, body, options) {
        return this.post.apply(this, arguments);
      }
    }]);

    var _Rest = Rest;
    Rest = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient)(Rest) || Rest;
    return Rest;
  })();

  exports.Rest = Rest;
});