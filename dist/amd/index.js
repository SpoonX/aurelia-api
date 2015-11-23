define(['exports', './rest'], function (exports, _rest) {
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

  function configure(aurelia, configCallback) {
    aurelia.container.get(_rest.Rest).configure(configCallback);
  }
});