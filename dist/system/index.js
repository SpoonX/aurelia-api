System.register(['aurelia-fetch-client', './rest'], function (_export) {
  'use strict';

  var HttpClient;

  _export('configure', configure);

  function configure(aurelia, configCallback) {
    aurelia.container.get(HttpClient).configure(configCallback);
  }

  return {
    setters: [function (_aureliaFetchClient) {
      HttpClient = _aureliaFetchClient.HttpClient;
    }, function (_rest) {
      _export('Rest', _rest.Rest);
    }],
    execute: function () {}
  };
});