import {HttpClient} from 'aurelia-fetch-client';
import {Config} from '../src/config';
import {Rest} from '../src/rest';

describe('Config', function() {
  describe('.registerEndpoint()', function() {
    it('Should properly register an endpoint when providing a config callback transferring client defaults.', function() {
      let config   = new Config;
      let returned = config.registerEndpoint('github', function(configure) {
        configure.withBaseUrl(baseUrls.github);
        configure.withDefaults(userOptions);
      });
      expect(config.endpoints.github.defaults).toEqual(userOptions);
      expect(config.endpoints.github.client.defaults).toEqual(userOptions);
      expect(config.endpoints.github.client.baseUrl).toEqual(baseUrls.github);
      expect(returned).toBe(config);
    });

    it('Should properly register an endpoint when providing an endpoint string.', function() {
      let config   = new Config;
      let returned = config.registerEndpoint('api', baseUrls.api);

      expect(config.endpoints.api.defaults).toEqual(defaultOptions);
      expect(config.endpoints.api.client.baseUrl).toEqual(baseUrls.api);
      expect(returned).toBe(config);
    });

    it('Should properly register an endpoint with no arguments.', function() {
      let config   = new Config;
      let returned = config.registerEndpoint('boring');

      expect(config.endpoints.boring.defaults).toEqual(defaultOptions);
      expect(config.endpoints.boring.client.baseUrl).toEqual('');
      expect(returned).toBe(config);
    });

    it('Should properly register an endpoint when providing an endpoint string and defaults.', function() {
      let config   = new Config;
      let returned = config.registerEndpoint('api', baseUrls.api, userOptions);

      expect(config.endpoints.api.defaults).toEqual(userOptions);
      expect(config.endpoints.api.client.baseUrl).toEqual(baseUrls.api);
      expect(returned).toBe(config);
    });

    it('Should properly register an endpoint with standard defaults when config functions are applied.', function() {
      let config   = new Config;
      let returned = config.registerEndpoint('api', function(configure) {
        configure.withBaseUrl(baseUrls.api);
      });

      expect(config.endpoints.api.defaults).toEqual(defaultOptions);
      expect(config.endpoints.api.client.baseUrl).toEqual(baseUrls.api);
      expect(returned).toBe(config);
    });

    it('Should properly register an endpoint with null defaults when defaults specified as "null".', function() {
      let config   = new Config;
      let returned = config.registerEndpoint('api', function(configure) {
        configure.withBaseUrl(baseUrls.api);
        configure.withDefaults(null);
      });

      expect(config.endpoints.api.defaults).toEqual(null);
      expect(config.endpoints.api.client.baseUrl).toEqual(baseUrls.api);
      expect(returned).toBe(config);
    });
  });

  describe('.getEndpoint()', function() {
    it('Should return the registered endpoint, or null.', function() {
      let config = new Config;

      config.registerEndpoint('api', baseUrls.api);

      let endpoint            = config.getEndpoint('api');
      let nullEndpoint        = config.getEndpoint('no');
      let defaultNullEndpoint = config.getEndpoint();

      expect(endpoint instanceof Rest).toBe(true);
      expect(endpoint.client instanceof HttpClient).toBe(true);
      expect(nullEndpoint instanceof Rest).toBe(false);
      expect(nullEndpoint).toBe(null);
      expect(defaultNullEndpoint instanceof Rest).toBe(false);
      expect(defaultNullEndpoint).toBe(null);

      config.setDefaultEndpoint('api');

      let defaultEndpoint = config.getEndpoint();

      expect(defaultEndpoint instanceof Rest).toBe(true);
      expect(defaultEndpoint.client instanceof HttpClient).toBe(true);
    });
  });

  describe('.endpointExists()', function() {
    it('Should return if given name is a registered endpoint.', function() {
      let config = new Config;

      config.registerEndpoint('api', baseUrls.api);

      expect(config.endpointExists('api')).toBe(true);
      expect(config.endpointExists('cake')).toBe(false);
      expect(config.endpointExists()).toBe(false);
    });
  });

  describe('.setDefaultEndpoint()', function() {
    it('Should set the default endpoint.', function() {
      let config = new Config;

      config.registerEndpoint('api', baseUrls.api);
      expect(config.getEndpoint()).toBe(null);
      config.setDefaultEndpoint('api');
      expect(config.getEndpoint() instanceof Rest).toBe(true);
    });
  });

  describe('.setDefaultBaseUrl()', function() {
    it('Should set the default baseUrl.', function() {
      let config = new Config;

      config.registerEndpoint('api', baseUrls.github);
      expect(config.endpoints.api.client.baseUrl).toEqual(baseUrls.github);
      config.setDefaultBaseUrl(baseUrls.api);
      config.registerEndpoint('api');
      expect(config.endpoints.api.client.baseUrl).toEqual(baseUrls.api);
    });
  });

  describe('.configure()', function() {
    it('Should properly configure with an object.', function() {
      let config   = new Config;
      let returned = config.configure(configObject);

      expect(returned).toBe(config);

      expect(config.endpoints.github.defaults).toEqual(defaultOptions);
      expect(config.endpoints.github.client.baseUrl).toEqual(baseUrls.github);

      expect(config.endpoints.boring.defaults).toEqual(defaultOptions);
      expect(config.endpoints.boring.client.baseUrl).toEqual('');

      expect(config.endpoints.api.defaults).toEqual(userOptions);
      expect(config.endpoints.api.client.baseUrl).toEqual(baseUrls.api);

      expect(config.defaultEndpoint.defaults).toEqual(defaultOptions);
      expect(config.defaultEndpoint.client.baseUrl).toEqual(baseUrls.github);
    });
  });
});

let baseUrls = {
  github: 'https://api.github.com',
  api   : 'http://jsonplaceholder.typicode.com'
};

let defaultOptions = {
  'headers': {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }};

let userOptions = {
  'headers': {
    'x-scope': 'Tests'
  }};

let configObject = {
  endpoints: [
    {name: 'boring'},
    {name: 'github', endpoint: baseUrls.github, default: true},
    {name: 'api',    endpoint: baseUrls.api, config: userOptions}
  ]
};
