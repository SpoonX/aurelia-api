import {Config, Rest} from '../src/aurelia-api';
import {Container} from 'aurelia-dependency-injection';
import {InjectTest} from './resources/inject-test';
import {FetchClientAdapter} from '../src/client-adapters/fetch-client-adapter';
import {TestClientAdapter} from './resources/test-client-adapters';
import {settings} from './resources/settings';

let container = new Container();
let config    = container.get(Config);

config.registerEndpoint('api', settings.baseUrls.api);
config.registerEndpoint('github', settings.baseUrls.github);
config.registerEndpoint('form', settings.baseUrls.form, null);
config.registerEndpoint('test', settings.baseUrls.github, null, TestClientAdapter);

describe('Rest', function() {
  FetchClientAdapter.request = function(method, path, body, requestOptions) {
    return {method, path, body, requestOptions};
  };

  describe('.find()', function() {
    it('Should find results for multiple endpoints (with default ClientAdapter).', function(done) {
      let injectTest = container.get(InjectTest);

      expect(injectTest.apiEndpoint instanceof Rest).toBe(true);
      expect(injectTest.githubEndpoint instanceof Rest).toBe(true);
      expect(injectTest.testEndpoint instanceof Rest).toBe(true);

      expect(injectTest.apiEndpoint.clientAdapter instanceof FetchClientAdapter).toBe(true);
      expect(injectTest.githubEndpoint.clientAdapter instanceof FetchClientAdapter).toBe(true);
      expect(injectTest.testEndpoint.clientAdapter instanceof TestClientAdapter).toBe(true);

      Promise.all([
        injectTest.githubEndpoint.find('repos/spoonx/aurelia-orm/contributors')
          .then(x => {
            expect(x[0].login).toBe('RWOverdijk');
          }),
        injectTest.apiEndpoint.find('posts')
          .then(y => {
            expect(y.method).toBe('GET');
          }),
        injectTest.apiEndpoint.find('posts')
          .then(y => {
            expect(y.path).toBe('/posts');
          }),
        injectTest.apiEndpoint.find('posts', 'id')
          .then(y => {
            expect(y.path).toBe('/posts/id');
            expect(JSON.stringify(y.query)).toBe('{}');
          }),
        injectTest.apiEndpoint.find('posts', settings.criteria)
          .then(y => {
            expect(y.path).toBe('/posts');
            expect(y.query.user).toBe(settings.criteria.user);
            expect(y.query.comment).toBe(settings.criteria.comment);
          }),
        injectTest.apiEndpoint.find('posts', undefined, settings.options)
          .then(y => {
            expect(y.path).toBe('/posts');
            expect(y.contentType).toBe(settings.options.headers['Content-Type']);
            expect(y.Authorization).toBe(settings.options.headers['Authorization']);
          })
      ]).then(done);
    });
  });

  describe('.update()', function() {
    it('Should update with body (as json).', function(done) {
      let injectTest = container.get(InjectTest);

      injectTest.apiEndpoint.update('posts', null, body)
        .then(y => {
          expect(y.method).toBe('PUT');
          expect(y.path).toBe('/posts');
          expect(y.contentType).toMatch('application/json');
          done();
        });
    });

    it('Should update with body (as json), criteria and options.', function(done) {
      let injectTest = container.get(InjectTest);

      injectTest.apiEndpoint.update('posts', settings.criteria, settings.body, settings.options)
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
    it('Should patch with body (as json).', function(done) {
      let injectTest = container.get(InjectTest);

      injectTest.apiEndpoint.patch('post', null, body)
        .then(y => {
          expect(y.method).toBe('PATCH');
          expect(y.path).toBe('/post');
          expect(y.contentType).toMatch('application/json');
          done();
        });
    });

    it('Should patch with body (as json), criteria and options.', function(done) {
      let injectTest = container.get(InjectTest);

      injectTest.apiEndpoint.patch('post', settings.criteria, settings.body, settings.options)
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
    it('Should destroy with id and settings.options .', function(done) {
      let injectTest = container.get(InjectTest);

      injectTest.apiEndpoint.destroy('posts', 'id', settings.options)
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
    it('Should create body (as json).', function(done) {
      let injectTest = container.get(InjectTest);

      injectTest.apiEndpoint.create('posts', body)
        .then(y => {
          expect(y.method).toBe('POST');
          expect(y.path).toBe('/posts');
          expect(y.contentType).toMatch('application/json');
          done();
        });
    });

    it('Should create body (as json) and options.', function(done) {
      let injectTest = container.get(InjectTest);

      injectTest.apiEndpoint.create('posts', settings.body, settings.options)
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
    it('Should post body (as urlencoded).', function(done) {
      let injectTest = container.get(InjectTest);

      injectTest.apiEndpoint.post('posts', body, options)
        .then(y => {
          expect(JSON.stringify(y.body)).toBe(JSON.stringify(y.body));
          expect(y.method).toBe('POST');
          expect(y.path).toBe('/posts');
          expect(y.contentType).toMatch(options.headers['Content-Type']);
          done();
        });
    });

    it('Should post body (as FormData) and options.', function(done) {
      let injectTest = container.get(InjectTest);

      let data = new FormData();
      data.append('message', 'some');

      injectTest.formEndpoint.post('uploads', data, {headers: {'Authorization': 'Bearer aToken'}})
        .then(y => {
          expect(y.method).toBe('POST');
          expect(y.path).toBe('/uploads');
          expect(y.contentType).toMatch('multipart/form-data');
          expect(y.Authorization).toBe('Bearer aToken');
          expect(y.body.message).toBe('some');
          done();
        });
    });
  });
});
