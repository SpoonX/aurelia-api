import {Config, Rest} from '../src/aurelia-api';
import {Container} from 'aurelia-dependency-injection';
import {FetchClientAdapter} from '../src/fetch-client-adapter';
import {HttpClient} from 'aurelia-fetch-client';
import {settings} from './resources/settings';

let container = new Container();
let config    = container.get(Config);

config.registerEndpoint('api', settings.baseUrls.api);
config.registerEndpoint('github', settings.baseUrls.github);
let apiEndpoint = config.getEndpoint('api');
let githubEndpoint = config.getEndpoint('github');

describe('FetchClientAdapter', function() {
  describe('.find()', function() {
    it('Should find results for multiple endpoints', function(done) {
      expect(apiEndpoint instanceof Rest).toBe(true);
      expect(githubEndpoint instanceof Rest).toBe(true);
      expect(apiEndpoint.clientAdapter instanceof FetchClientAdapter).toBe(true);
      expect(apiEndpoint.clientAdapter.client instanceof HttpClient).toBe(true);
      expect(githubEndpoint.clientAdapter instanceof FetchClientAdapter).toBe(true);
      expect(githubEndpoint.clientAdapter.client instanceof HttpClient).toBe(true);

      Promise.all([
        githubEndpoint.find('repos/spoonx/aurelia-orm/contributors')
          .then(x => {
            expect(x[0].login).toBe('RWOverdijk');
          }),
        apiEndpoint.find('posts')
          .then(y => {
            expect(y.method).toBe('GET');
          }),
        apiEndpoint.find('posts')
          .then(y => {
            expect(y.path).toBe('/posts');
          }),
        apiEndpoint.find('posts', 'id')
          .then(y => {
            expect(y.path).toBe('/posts/id');
            expect(JSON.stringify(y.query)).toBe('{}');
          }),
        apiEndpoint.find('posts', settings.criteria)
          .then(y => {
            expect(y.path).toBe('/posts');
            expect(y.query.user).toBe(settings.criteria.user);
            expect(y.query.comment).toBe(settings.criteria.comment);
          }),
        apiEndpoint.find('posts', undefined, settings.options)
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
      apiEndpoint.update('posts', settings.criteria, settings.body, settings.options)
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
      apiEndpoint.patch('post', settings.criteria, settings.body, settings.options)
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
    it ('Should destroy with id and options .', function(done) {
      apiEndpoint.destroy('posts', 'id', settings.options)
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
      apiEndpoint.create('posts', settings.body, settings.options)
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
