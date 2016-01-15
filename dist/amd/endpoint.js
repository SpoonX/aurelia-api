define(['exports', 'aurelia-dependency-injection', './config'], function (exports, _aureliaDependencyInjection, _config) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var Endpoint = (function () {
    function Endpoint(key) {
      _classCallCheck(this, _Endpoint);

      this._key = key;
    }

    _createClass(Endpoint, [{
      key: 'get',
      value: function get(container) {
        return container.get(_config.Config).getEndpoint(this._key);
      }
    }], [{
      key: 'of',
      value: function of(key) {
        return new Endpoint(key);
      }
    }]);

    var _Endpoint = Endpoint;
    Endpoint = (0, _aureliaDependencyInjection.resolver)()(Endpoint) || Endpoint;
    return Endpoint;
  })();

  exports.Endpoint = Endpoint;
});