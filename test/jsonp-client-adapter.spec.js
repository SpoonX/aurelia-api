import {Config, Rest} from '../src/aurelia-api';
import {Container} from 'aurelia-dependency-injection';
import {JSONPClientAdapter} from '../src/jsonp-client-adapter';
import {HttpClient} from 'aurelia-http-client';
import {settings} from './resources/settings';

let container = new Container();
let config    = container.get(Config);

config.registerEndpoint('api-jsonp', settings.baseUrls.api + 'jsonp/', {}, JSONPClientAdapter);
let endpoint = config.getEndpoint('api-jsonp');

describe('JSONPClientAdapter', function() {
  describe('.find()', function() {
    it('Should find results.', function(done) {
      expect(endpoint instanceof Rest).toBe(true);
      expect(endpoint.clientAdapter instanceof JSONPClientAdapter).toBe(true);
      expect(endpoint.clientAdapter.client instanceof HttpClient).toBe(true);

      Promise.all([
        endpoint.find('posts')
          .then(y => {
            expect(y.method).toBe('GET');
          }),
        endpoint.find('posts')
          .then(y => {
            expect(y.path).toBe('/jsonp/posts');
          }),
        endpoint.find('posts', 'id')
          .then(y => {
            expect(y.path).toBe('/jsonp/posts/id');
          }),
        endpoint.find('posts', settings.criteria)
          .then(y => {
            expect(y.path).toBe('/jsonp/posts');
            expect(y.query.user).toBe(settings.criteria.user);
            expect(y.query.comment).toBe(settings.criteria.comment);
          })
      ]).then(done);
    });
  });
});
