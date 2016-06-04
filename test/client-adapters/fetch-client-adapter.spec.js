import {FetchClientAdapter} from '../../src/client-adapters/fetch-client-adapter';
import {HttpClient} from 'aurelia-fetch-client';
import {buildQueryString} from 'aurelia-path';
import {settings} from '../resources/settings';

let adapter = new FetchClientAdapter;

describe('FetchClientAdapter', function() {
  describe('.client', function() {
    it('Should be client with configure(config => config.withBaseUrl(base))', function() {
      expect(adapter.client instanceof HttpClient).toBe(true);

      adapter.client.configure(config => config.withBaseUrl(settings.baseUrls.api));
      expect(adapter.client.baseUrl).toBe(settings.baseUrls.api);
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
    it('Should destroy with id and options .', function(done) {
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

  describe('.post()', function() {
    it('Should post body (as FormData).', function(done) {
      adapter.defaults = null;

      let data = new FormData();
      data.append('user', 'Jane Doe');

      adapter.request('POST', 'uploads', data)
        .then(y => {
          expect(y.method).toBe('POST');
          expect(y.path).toBe('/uploads');
          expect(y.contentType).toMatch('multipart/form-data');
          expect(JSON.stringify(y.body)).toMatch('Jane Doe');
          done();
        });
    });
  });
});
