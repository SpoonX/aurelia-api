import {HttpClient} from 'aurelia-fetch-client';
import {Config, Rest} from '../src/aurelia-api';
import {FetchClientAdapter} from '../src/client-adapters/fetch-client-adapter';
import {HttpClientAdapter} from '../src/client-adapters/http-client-adapter';
import {settings} from './resources/settings';

describe('Config', function() {
  it('Should use the DefaultClientAdapter.', function() {
    let config = new Config;

    expect(config.DefaultClientAdapter).toBe(FetchClientAdapter);
  });

  describe('.registerEndpoint()', function() {
    it('Should properly register an endpoint when providing a config callback.', function() {
      let config   = new Config;
      let returned = config.registerEndpoint('github', function(configure) {
        configure.withBaseUrl(settings.baseUrls.github);
      });

      expect(config.endpoints.github instanceof Rest).toBe(true);
      expect(config.endpoints.github.clientAdapter.defaults).toEqual(extend(true, {}, settings.defaults));
      expect(config.endpoints.github.client.baseUrl).toEqual(settings.baseUrls.github);
      expect(returned).toBe(config);
    });

    it('Should properly register an endpoint when providing an endpoint string.', function() {
      let config   = new Config;
      let returned = config.registerEndpoint('api', settings.baseUrls.api);

      expect(config.endpoints.api.clientAdapter.defaults).toEqual(settings.defaults);
      expect(config.endpoints.api.client.baseUrl).toEqual(settings.baseUrls.api);
      expect(returned).toBe(config);
    });

    it('Should properly register an endpoint with no arguments.', function() {
      let config   = new Config;
      let returned = config.registerEndpoint('boring');

      expect(config.endpoints.boring.clientAdapter.defaults).toEqual(settings.defaults);
      expect(config.endpoints.boring.client.baseUrl).toEqual('');
      expect(returned).toBe(config);
    });

    it('Should properly register an endpoint when providing an endpoint string and defaults.', function() {
      let config   = new Config;
      let returned = config.registerEndpoint('api', settings.baseUrls.api, settings.userOptions);

      expect(config.endpoints.api.clientAdapter.defaults).toEqual(extend(true, {}, settings.defaults, settings.userOptions));
      expect(config.endpoints.api.client.baseUrl).toEqual(settings.baseUrls.api);
      expect(returned).toBe(config);
    });

    it('Should properly register an endpoint when providing the http client adapter.', function() {
      let config   = new Config;
      let returned = config.registerEndpoint('api', settings.baseUrls.api, {}, HttpClientAdapter);

      let message = {};
      config.endpoints.api.client.requestTransformers[0](null, null, message);

      expect(message.baseUrl).toEqual(settings.baseUrls.api);
      expect(returned).toBe(config);
    });

    it('Should fail to register an endpoint when providing a non-compliant client adapter.', function() {
      let config   = new Config;

      let wrongClass = () => config.registerEndpoint('api', settings.baseUrls.api, {}, Object);
      expect(wrongClass).toThrow();
    });
  });

  describe('.getEndpoint()', function() {
    it('Should return the registered endpoint, or null.', function() {
      let config = new Config;

      config.registerEndpoint('api', settings.baseUrls.api);

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

      config.registerEndpoint('api', settings.baseUrls.api);

      expect(config.endpointExists('api')).toBe(true);
      expect(config.endpointExists('cake')).toBe(false);
      expect(config.endpointExists()).toBe(false);
    });
  });

  describe('.setDefaultEndpoint()', function() {
    it('Should set the default endpoint.', function() {
      let config = new Config;

      config.registerEndpoint('api', settings.baseUrls.api);
      expect(config.getEndpoint()).toBe(null);
      config.setDefaultEndpoint('api');
      expect(config.getEndpoint() instanceof Rest).toBe(true);
    });
  });

  describe('.setDefaultClientAdapter()', function() {
    it('Should set the DefaultClientAdapter.', function() {
      let config = new Config;

      config.setDefaultClientAdapter(HttpClientAdapter);
      expect(config.DefaultClientAdapter).toBe(HttpClientAdapter);
    });
  });
});
