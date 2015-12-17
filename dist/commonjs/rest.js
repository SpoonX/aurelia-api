'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _aureliaFetchClient = require('aurelia-fetch-client');

var _aureliaFramework = require('aurelia-framework');

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var Rest = (function () {
  function Rest(httpClient) {
    _classCallCheck(this, _Rest);

    this.client = httpClient;
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
        requestOptions.body = (0, _aureliaFetchClient.json)(body);
      }

      return this.client.fetch(path, requestOptions).then(function (response) {
        return response.json();
      });
    }
  }, {
    key: 'find',
    value: function find(resource, criteria) {
      var requestPath = resource;

      if (criteria) {
        requestPath += typeof criteria !== 'object' ? '/' + criteria : '?' + _querystring2['default'].stringify(criteria);
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

  var _Rest = Rest;
  Rest = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient)(Rest) || Rest;
  return Rest;
})();

exports.Rest = Rest;