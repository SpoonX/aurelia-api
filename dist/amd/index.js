define(['exports', './config', './rest', './endpoint'], function (exports, _config, _rest, _endpoint) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.configure = configure;
  Object.defineProperty(exports, 'Rest', {
    enumerable: true,
    get: function get() {
      return _rest.Rest;
    }
  });
  Object.defineProperty(exports, 'Config', {
    enumerable: true,
    get: function get() {
      return _config.Config;
    }
  });
  Object.defineProperty(exports, 'Endpoint', {
    enumerable: true,
    get: function get() {
      return _endpoint.Endpoint;
    }
  });

  function configure(aurelia, configCallback) {
    var config = aurelia.container.get(_config.Config);

    configCallback(config);
  }
});