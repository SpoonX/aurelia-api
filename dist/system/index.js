System.register(['./rest'], function (_export) {
  'use strict';

  var Rest;

  _export('configure', configure);

  function configure(aurelia, configCallback) {
    aurelia.container.get(Rest).configure(configCallback);
  }

  return {
    setters: [function (_rest) {
      Rest = _rest.Rest;

      _export('Rest', _rest.Rest);
    }],
    execute: function () {}
  };
});