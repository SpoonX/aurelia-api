import {HttpClientAdapter} from '../src/http-client-adapter';
import {HttpClient} from 'aurelia-http-client';
import {buildQueryString} from 'aurelia-path';
import {settings} from './resources/settings';

let adapter = new HttpClientAdapter();

describe('HttpClientAdapter', function() {
  describe('.client', function() {
    it('Should be client with configure(config => config.withBaseUrl(base))', function() {
      expect(adapter.client instanceof HttpClient).toBe(true);

      adapter.client.configure(config => config.withBaseUrl(settings.baseUrls.api));
    });
  });

  describe('.find()', function() {
    it('Should find results for multiple endpoints', function(done) {
      Promise.all([
        adapter.request('GET', 'posts')
          .then(y => {
            expect(y.method).toBe('GET');
          }),
        adapter.request('GET', 'posts')
          .then(y => {
            expect(y.path).toBe('/posts');
          }),
        adapter.request('GET', 'posts/id')
          .then(y => {
            expect(y.path).toBe('/posts/id');
            expect(JSON.stringify(y.query)).toBe('{}');
          }),
        adapter.request('GET', 'posts?' + buildQueryString(settings.criteria))
          .then(y => {
            expect(y.path).toBe('/posts');
            expect(y.query.user).toBe(settings.criteria.user);
            expect(y.query.comment).toBe(settings.criteria.comment);
          }),
        adapter.request('GET', 'posts', undefined, settings.options)
          .then(y => {
            expect(y.path).toBe('/posts');
            expect(y.contentType).toBe(settings.options.headers['Content-Type']);
            expect(y.Authorization).toBe(settings.options.headers['Authorization']);
          })
      ]).then(done);
    });
  });

  describe('.update()', function() {
    it('Should update with body (as json), criteria and options.', function(done) {
      adapter.request('PUT', 'posts?' + buildQueryString(settings.criteria), settings.body, settings.options)
        .then(y => {
          expect(y.method).toBe('PUT');
          expect(y.path).toBe('/posts');
          expect(y.query.user).toBe(settings.criteria.user);
          expect(y.query.comment).toBe(settings.criteria.comment);
          expect(y.contentType).toMatch('application/json');
          expect(y.Authorization).toBe(settings.options.headers['Authorization']);
          done();
        });
    });
  });

  describe('.patch()', function() {
    it('Should patch with body (as json), criteria and options.', function(done) {
      adapter.request('PATCH', 'post?' + buildQueryString(settings.criteria), settings.body, settings.options)
        .then(y => {
          expect(y.method).toBe('PATCH');
          expect(y.path).toBe('/post');
          expect(y.query.user).toBe(settings.criteria.user);
          expect(y.query.comment).toBe(settings.criteria.comment);
          expect(y.contentType).toMatch('application/json');
          expect(y.Authorization).toBe(settings.options.headers['Authorization']);
          done();
        });
    });
  });

  describe('.destroy()', function() {
    it('Should destroy with id and options.', function(done) {
      adapter.request('DELETE', 'posts/id', undefined, settings.options)
        .then(y => {
          expect(y.method).toBe('DELETE');
          expect(y.path).toBe('/posts/id');
          expect(JSON.stringify(y.query)).toBe('{}');
          expect(y.Authorization).toBe(settings.options.headers['Authorization']);
          done();
        });
    });
  });

  describe('.create()', function() {
    it('Should create body (as json) and options.', function(done) {
      adapter.request('POST', 'posts', settings.body, settings.options)
        .then(y => {
          expect(y.method).toBe('POST');
          expect(y.path).toBe('/posts');
          expect(y.contentType).toMatch('application/json');
          expect(y.Authorization).toBe(settings.options.headers['Authorization']);
          done();
        });
    });
  });
});
