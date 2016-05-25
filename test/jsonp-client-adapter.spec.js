import {JSONPClientAdapter} from '../src/jsonp-client-adapter';
import {HttpClient} from 'aurelia-http-client';
import {buildQueryString} from 'aurelia-path';
import {settings} from './resources/settings';

let adapter = new JSONPClientAdapter();

describe('JSONPClientAdapter', function() {
  describe('.client', function() {
    it('Should be client with configure(config => config.withBaseUrl(base))', function() {
      expect(adapter.client instanceof HttpClient).toBe(true);

      adapter.client.configure(config => config.withBaseUrl(settings.baseUrls.jsonp));
    });
  });

  describe('.find()', function() {
    it('Should find results.', function(done) {
      Promise.all([
        adapter.request('', 'posts')
          .then(y => {
            expect(y.path).toBe('/jsonp/posts');
          }),
        adapter.request('', 'posts/id')
          .then(y => {
            expect(y.path).toBe('/jsonp/posts/id');
          }),
        adapter.request('', 'posts?' + buildQueryString(settings.criteria))
          .then(y => {
            expect(y.path).toBe('/jsonp/posts');
            expect(y.query.user).toBe(settings.criteria.user);
            expect(y.query.comment).toBe(settings.criteria.comment);
          })
      ]).then(done);
    });
  });
});
