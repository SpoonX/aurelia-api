import {Config} from '../src/config';
import {Rest} from '../src/rest';
import {Container} from 'aurelia-dependency-injection';
import {InjectTest} from './resources/inject-test';
import {buildQueryString} from 'aurelia-path';

let container = new Container();
let config    = container.get(Config);
let baseUrls  = {
  jsonplaceholder: 'http://jsonplaceholder.typicode.com/',
  api            : 'http://127.0.0.1:1927/'
};
let options = {
  headers: {
    'Content-Type' : 'application/x-www-form-urlencoded',
    'Authorization': 'Bearer aToken'
  }
};
let jsonOptions = {
  headers: {
    'Content-Type': 'application/vnd.api+json',
    'Accept': 'application/vnd.api+json'
  }
};

config.registerEndpoint('api', baseUrls.api);
config.registerEndpoint('jsonplaceholder', baseUrls.jsonplaceholder);
config.registerEndpoint('form', baseUrls.api, null);
config.registerEndpoint('urlencoded', baseUrls.api, options);
config.registerEndpoint('fetchConfig', fetchConfig => {
  fetchConfig
    .withBaseUrl(baseUrls.api)
    .withDefaults(jsonOptions);
  });

let criteria = {user: 'john', comment: 'last'};
let criteriaWithArray = {sort: ['first', 'last']};
let body = {message: 'some'};

describe('Rest', function() {
  describe('.find()', function() {
    it('Should find results for multiple endpoints.', function(done) {
      let injectTest = container.get(InjectTest);

      injectTest.apiEndpoint.useTraditionalUriTemplates = false;

      let responseOutput = {
        response: null
      };

      expect(injectTest.apiEndpoint instanceof Rest).toBe(true);
      expect(injectTest.jsonplaceholderEndpoint instanceof Rest).toBe(true);

      Promise.all([
        injectTest.jsonplaceholderEndpoint.find('posts/1')
          .then(x => {
            expect(x.userId).toBe(1);
          }),
        injectTest.apiEndpoint.find('posts')
          .then(y => {
            expect(y.method).toBe('GET');
            expect(y.path).toBe('/posts');
          }),
        injectTest.apiEndpoint.find('posts/')
          .then(y => {
            expect(y.method).toBe('GET');
            expect(y.path).toBe('/posts/');
          }),
        injectTest.apiEndpoint.find('posts', 'id')
          .then(y => {
            expect(y.path).toBe('/posts/id');
            expect(JSON.stringify(y.query)).toBe('{}');
          }),
        injectTest.apiEndpoint.find('posts', 1)
          .then(y => {
            expect(y.path).toBe('/posts/1');
            expect(JSON.stringify(y.query)).toBe('{}');
          }),
        injectTest.apiEndpoint.find('posts/', 'id')
          .then(y => {
            expect(y.path).toBe('/posts/id/');
            expect(JSON.stringify(y.query)).toBe('{}');
          }),
        injectTest.apiEndpoint.find('posts', 'id', options)
          .then(y => {
            expect(y.path).toBe('/posts/id');
            expect(JSON.stringify(y.query)).toBe('{}');
            expect(y.contentType).toBe(options.headers['Content-Type']);
            expect(y.Authorization).toBe(options.headers['Authorization']);
          }),
        injectTest.apiEndpoint.find('posts', criteria)
          .then(y => {
            expect(y.path).toBe('/posts');
            expect(y.query.user).toBe(criteria.user);
            expect(y.query.comment).toBe(criteria.comment);
          }),
        injectTest.apiEndpoint.find('posts/', criteria)
          .then(y => {
            expect(y.path).toBe('/posts/');
            expect(y.query.user).toBe(criteria.user);
            expect(y.query.comment).toBe(criteria.comment);
          }),
        injectTest.apiEndpoint.find('posts', undefined, options)
          .then(y => {
            expect(y.path).toBe('/posts');
            expect(y.contentType).toBe(options.headers['Content-Type']);
            expect(y.Authorization).toBe(options.headers['Authorization']);
          }),
        injectTest.apiEndpoint.find('posts', criteriaWithArray)
          .then(y => {
            expect(y.path).toBe('/posts');
            expect(y.query.sort[0]).toBe(criteriaWithArray.sort[0]);
            expect(y.query.sort[1]).toBe(criteriaWithArray.sort[1]);
            expect(y.originalUrl).toBe(encodeURI(`/posts?sort[]=${criteriaWithArray.sort[0]}&sort[]=${criteriaWithArray.sort[1]}`));
          }),
        injectTest.apiEndpoint.find('posts', undefined, null, responseOutput)
          .then(y => {
            expect(responseOutput.response instanceof Response).toBe(true);
          })
      ]).then(x => {
        done();
      });
    });
    it('Should find with RFC6570 queries.', function(done) {
      let injectTest = container.get(InjectTest);

      injectTest.apiEndpoint.useTraditionalUriTemplates = true;

      Promise.all([
        injectTest.apiEndpoint.find('posts', criteriaWithArray)
          .then(y => {
            expect(y.path).toBe('/posts');
            expect(y.query.sort[0]).toBe(criteriaWithArray.sort[0]);
            expect(y.query.sort[1]).toBe(criteriaWithArray.sort[1]);
            expect(y.originalUrl).toBe(`/posts?sort=${criteriaWithArray.sort[0]}&sort=${criteriaWithArray.sort[1]}`)
          })
      ]).then(x => done());
    });
  });

  describe('.findOne()', function() {
    it('Should find with id, criteria and options.', function(done) {
      let injectTest = container.get(InjectTest);
      let responseOutput = {
        response: null
      };

      injectTest.apiEndpoint.useTraditionalUriTemplates = false;

      Promise.all([
        injectTest.apiEndpoint.findOne('posts', 'id', criteria, options)
          .then(y => {
            expect(y.method).toBe('GET');
            expect(y.path).toBe('/posts/id');
            expect(y.query.user).toBe(criteria.user);
            expect(y.query.comment).toBe(criteria.comment);
            expect(y.contentType).toMatch(options.headers['Content-Type']);
            expect(y.Authorization).toBe(options.headers['Authorization']);
          }),
        injectTest.apiEndpoint.findOne('posts/', 'id', criteria, options)
          .then(y => {
            expect(y.method).toBe('GET');
            expect(y.path).toBe('/posts/id/');
            expect(y.query.user).toBe(criteria.user);
            expect(y.query.comment).toBe(criteria.comment);
            expect(y.contentType).toMatch(options.headers['Content-Type']);
            expect(y.Authorization).toBe(options.headers['Authorization']);
          }),
        injectTest.apiEndpoint.findOne('posts/', 'id', criteriaWithArray)
          .then(y => {
            expect(y.method).toBe('GET');
            expect(y.path).toBe('/posts/id/');
            expect(y.query.sort[0]).toBe(criteriaWithArray.sort[0]);
            expect(y.query.sort[1]).toBe(criteriaWithArray.sort[1]);
            expect(y.originalUrl).toBe(encodeURI(`/posts/id/?sort[]=${criteriaWithArray.sort[0]}&sort[]=${criteriaWithArray.sort[1]}`));
          }),
        injectTest.apiEndpoint.findOne('posts/', 'id', criteriaWithArray, null, responseOutput)
          .then(y => {
            expect(responseOutput.response instanceof Response).toBe(true);
        })
      ]).then(x => {
        done();
      });
    });
    it('Should findOne with RFC6570 queries.', function(done) {
      let injectTest = container.get(InjectTest);

      injectTest.apiEndpoint.useTraditionalUriTemplates = true;

      Promise.all([
        injectTest.apiEndpoint.findOne('posts/', 'id', criteriaWithArray)
          .then(y => {
            expect(y.method).toBe('GET');
            expect(y.path).toBe('/posts/id/');
            expect(y.query.sort[0]).toBe(criteriaWithArray.sort[0]);
            expect(y.query.sort[1]).toBe(criteriaWithArray.sort[1]);
            expect(y.originalUrl).toBe(`/posts/id/?sort=${criteriaWithArray.sort[0]}&sort=${criteriaWithArray.sort[1]}`);
          })
      ]).then(x => done());
    });
  });

  describe('.find()', function() {
    it('Should find with id and criteria using date objects.', function(done) {
      let injectTest = container.get(InjectTest);
      let dateCriteria = { date: new Date() };

      injectTest.apiEndpoint.findOne('posts', 'id', dateCriteria)
        .then(y => {
          expect(y.method).toBe('GET');
          expect(y.path).toBe('/posts/id');
          expect(y.query.date).toBe(dateCriteria.date.toString());
          expect(y.originalUrl).toBe('/posts/id?date='+encodeURIComponent(dateCriteria.date).toString())
        }).then(done);
    });

    it('Should find with criteria using id and date objects.', function(done) {
      let injectTest = container.get(InjectTest);
      let dateCriteria = { id: 'id', date: new Date() };

      injectTest.apiEndpoint.findOne('posts', dateCriteria)
        .then(y => {
          expect(y.method).toBe('GET');
          expect(y.path).toBe('/posts');
          expect(y.query.id).toBe('id');
          expect(y.query.date).toBe(dateCriteria.date.toString());
          expect(y.originalUrl).toBe('/posts?date='+encodeURIComponent(dateCriteria.date).toString()+'&id=id')
        }).then(done);
    });

    it('Should find with criteria using number objects.', function(done) {
      let injectTest = container.get(InjectTest);
      let numCriteria = { num: Number(-1.01) };

      injectTest.apiEndpoint.findOne('posts/', 'id', numCriteria)
        .then(y => {
          expect(y.method).toBe('GET');
          expect(y.path).toBe('/posts/id/');
          expect(y.query.num).toBe(numCriteria.num.toString());
        }).then(done);
    });
  });

  describe('.find()', function() {
    it('Should find with criteria using date objects.', function(done) {
      let injectTest = container.get(InjectTest);
      let dateCriteria = { date: new Date() };

      injectTest.apiEndpoint.findOne('posts', 'id', dateCriteria)
        .then(y => {
          expect(y.method).toBe('GET');
          expect(y.path).toBe('/posts/id');
          expect(y.query.date).toBe(dateCriteria.date.toString());
        }).then(done);
    });

    it('Should find with criteria using number objects.', function(done) {
      let injectTest = container.get(InjectTest);
      let numCriteria = { num: Number(-1.01) };

      injectTest.apiEndpoint.findOne('posts/', 'id', numCriteria)
        .then(y => {
          expect(y.method).toBe('GET');
          expect(y.path).toBe('/posts/id/');
          expect(y.query.num).toBe(numCriteria.num.toString());
        }).then(done);
    });
  });

  describe('.update()', function() {
    it('Should update with body (as json).', function(done) {
      let injectTest = container.get(InjectTest);

      Promise.all([
        injectTest.apiEndpoint.update('posts', null, body)
          .then(y => {
            expect(y.method).toBe('PUT');
            expect(y.path).toBe('/posts');
            expect(y.contentType).toMatch('application/json');
          }),
        injectTest.apiEndpoint.update('posts/', null, body)
          .then(y => {
            expect(y.method).toBe('PUT');
            expect(y.path).toBe('/posts/');
          })
      ]).then(x => {
        done();
      });
    });

    it('Should update with body (as json), criteria and options.', function(done) {
      let injectTest = container.get(InjectTest);

      let responseOutput = {
        response: null
      };

      injectTest.apiEndpoint.useTraditionalUriTemplates = false;

      Promise.all([
        injectTest.apiEndpoint.update('posts', criteria, body, options)
          .then(y => {
            expect(y.method).toBe('PUT');
            expect(y.path).toBe('/posts');
            expect(y.query.user).toBe(criteria.user);
            expect(y.query.comment).toBe(criteria.comment);
            expect(y.contentType).toMatch(options.headers['Content-Type']);
            expect(y.Authorization).toBe(options.headers['Authorization']);
          }),
        injectTest.apiEndpoint.update('posts/', criteria, body, options)
          .then(y => {
            expect(y.path).toBe('/posts/');
            expect(y.query.user).toBe(criteria.user);
            expect(y.query.comment).toBe(criteria.comment);
          }),
        injectTest.apiEndpoint.update('posts/', criteriaWithArray, body, options)
          .then(y => {
            expect(y.path).toBe('/posts/');
            expect(y.query.sort[0]).toBe(criteriaWithArray.sort[0]);
            expect(y.query.sort[1]).toBe(criteriaWithArray.sort[1]);
            expect(y.originalUrl).toBe(encodeURI(`/posts/?sort[]=${criteriaWithArray.sort[0]}&sort[]=${criteriaWithArray.sort[1]}`));
          }),
        injectTest.apiEndpoint.update('posts/', criteriaWithArray, body, options, responseOutput)
          .then(y => {
            expect(responseOutput.response instanceof Response).toBe(true);
          })
      ]).then(x => {
        done();
      });
    });

    it('Should update with RFC6570 queries.', function(done) {
      let injectTest = container.get(InjectTest);

      injectTest.apiEndpoint.useTraditionalUriTemplates = true;

      Promise.all([
        injectTest.apiEndpoint.update('posts/', criteriaWithArray, body, options)
          .then(y => {
            expect(y.path).toBe('/posts/');
            expect(y.query.sort[0]).toBe(criteriaWithArray.sort[0]);
            expect(y.query.sort[1]).toBe(criteriaWithArray.sort[1]);
            expect(y.originalUrl).toBe(`/posts/?sort=${criteriaWithArray.sort[0]}&sort=${criteriaWithArray.sort[1]}`);
          })
      ]).then(x => done());
    });
  });

  describe('.updateOne()', function() {
    it('Should update with body (as json), criteria and options.', function(done) {
      let injectTest = container.get(InjectTest);

      let responseOutput = {
        response: null
      };

      injectTest.apiEndpoint.useTraditionalUriTemplates = false;

      Promise.all([
        injectTest.apiEndpoint.updateOne('posts', 'id', criteria, body, options)
          .then(y => {
            expect(y.method).toBe('PUT');
            expect(y.path).toBe('/posts/id');
            expect(y.query.user).toBe(criteria.user);
            expect(y.query.comment).toBe(criteria.comment);
            expect(y.contentType).toMatch(options.headers['Content-Type']);
            expect(y.Authorization).toBe(options.headers['Authorization']);
          }),
        injectTest.apiEndpoint.updateOne('posts/', 'id', criteria, body, options)
          .then(y => {
            expect(y.method).toBe('PUT');
            expect(y.path).toBe('/posts/id/');
            expect(y.query.user).toBe(criteria.user);
            expect(y.query.comment).toBe(criteria.comment);
            expect(y.contentType).toMatch(options.headers['Content-Type']);
            expect(y.Authorization).toBe(options.headers['Authorization']);
          }),
        injectTest.apiEndpoint.updateOne('posts/', 'id', criteria, body, options, responseOutput)
          .then(y => {
          expect(responseOutput.response instanceof Response).toBe(true);
          }),
        injectTest.apiEndpoint.updateOne('posts/', 'id', criteriaWithArray, body)
          .then(y => {
            expect(y.method).toBe('PUT');
            expect(y.path).toBe('/posts/id/');
            expect(y.query.sort[0]).toBe(criteriaWithArray.sort[0]);
            expect(y.query.sort[1]).toBe(criteriaWithArray.sort[1]);
            expect(y.originalUrl).toBe(encodeURI(`/posts/id/?sort[]=${criteriaWithArray.sort[0]}&sort[]=${criteriaWithArray.sort[1]}`));
          })
      ]).then(x => {
        done();
      });
    });

    it('Should updateOne with RFC6570 queries.', function(done) {
      let injectTest = container.get(InjectTest);

      injectTest.apiEndpoint.useTraditionalUriTemplates = true;

      Promise.all([
        injectTest.apiEndpoint.updateOne('posts/', 'id', criteriaWithArray, body)
          .then(y => {
            expect(y.method).toBe('PUT');
            expect(y.path).toBe('/posts/id/');
            expect(y.query.sort[0]).toBe(criteriaWithArray.sort[0]);
            expect(y.query.sort[1]).toBe(criteriaWithArray.sort[1]);
            expect(y.originalUrl).toBe(`/posts/id/?sort=${criteriaWithArray.sort[0]}&sort=${criteriaWithArray.sort[1]}`);
          })
      ]).then(x => done());
    });
  });

  describe('.patch()', function() {
    it('Should patch with body (as json).', function(done) {
      let injectTest = container.get(InjectTest);

      injectTest.apiEndpoint.useTraditionalUriTemplates = false;

      Promise.all([
        injectTest.apiEndpoint.patch('post', null, body)
          .then(y => {
            expect(y.method).toBe('PATCH');
            expect(y.path).toBe('/post');
            expect(y.contentType).toMatch('application/json');
          }),
        injectTest.apiEndpoint.patch('post/', null, body)
          .then(y => {
            expect(y.path).toBe('/post/');
          }),
        injectTest.apiEndpoint.patch('post/', criteriaWithArray, body)
          .then(y => {
            expect(y.path).toBe('/post/');
            expect(y.query.sort[0]).toBe(criteriaWithArray.sort[0]);
            expect(y.query.sort[1]).toBe(criteriaWithArray.sort[1]);
            expect(y.originalUrl).toBe(encodeURI(`/post/?sort[]=${criteriaWithArray.sort[0]}&sort[]=${criteriaWithArray.sort[1]}`));
          })
      ]).then(x => {
        done();
      });
    });

    it('Should patch with body (as json), criteria and options.', function(done) {
      let injectTest = container.get(InjectTest);

      let responseOutput = {
        response: null
      };

      injectTest.apiEndpoint.useTraditionalUriTemplates = false;

      Promise.all([
        injectTest.apiEndpoint.patch('post', criteria, body, options)
          .then(y => {
            expect(y.method).toBe('PATCH');
            expect(y.path).toBe('/post');
            expect(y.query.user).toBe(criteria.user);
            expect(y.query.comment).toBe(criteria.comment);
            expect(y.contentType).toMatch(options.headers['Content-Type']);
            expect(y.Authorization).toBe(options.headers['Authorization']);
          }),
        injectTest.apiEndpoint.patch('post/', criteria, body, options)
          .then(y => {
            expect(y.method).toBe('PATCH');
            expect(y.path).toBe('/post/');
            expect(y.query.user).toBe(criteria.user);
            expect(y.query.comment).toBe(criteria.comment);
            expect(y.contentType).toMatch(options.headers['Content-Type']);
            expect(y.Authorization).toBe(options.headers['Authorization']);
          }),
        injectTest.apiEndpoint.patch('post/', criteria, body, options, responseOutput)
          .then(y => {
            expect(responseOutput.response instanceof Response).toBe(true);
          }),
        injectTest.apiEndpoint.patch('post/', criteriaWithArray, body)
          .then(y => {
            expect(y.method).toBe('PATCH');
            expect(y.path).toBe('/post/');
            expect(y.query.sort[0]).toBe(criteriaWithArray.sort[0]);
            expect(y.query.sort[1]).toBe(criteriaWithArray.sort[1]);
            expect(y.originalUrl).toBe(encodeURI(`/post/?sort[]=${criteriaWithArray.sort[0]}&sort[]=${criteriaWithArray.sort[1]}`));
          })
      ]).then(x => {
        done();
      });
    });

    it('Should patch with RFC6570 queries.', function(done) {
      let injectTest = container.get(InjectTest);

      injectTest.apiEndpoint.useTraditionalUriTemplates = true;

      Promise.all([
        injectTest.apiEndpoint.patch('post/', criteriaWithArray, body)
          .then(y => {
            expect(y.method).toBe('PATCH');
            expect(y.path).toBe('/post/');
            expect(y.query.sort[0]).toBe(criteriaWithArray.sort[0]);
            expect(y.query.sort[1]).toBe(criteriaWithArray.sort[1]);
            expect(y.originalUrl).toBe(`/post/?sort=${criteriaWithArray.sort[0]}&sort=${criteriaWithArray.sort[1]}`);
          })
      ]).then(x => done());
    });
  });

  describe('.patchOne()', function() {
    it('Should patch with body (as json), id, criteria and options.', function(done) {
      let injectTest = container.get(InjectTest);
      let responseOutput = {
        response: null
      };

      injectTest.apiEndpoint.useTraditionalUriTemplates = false;

      Promise.all([
        injectTest.apiEndpoint.patchOne('post', 'id', criteria, body, options)
          .then(y => {
            expect(y.method).toBe('PATCH');
            expect(y.path).toBe('/post/id');
            expect(y.query.user).toBe(criteria.user);
            expect(y.query.comment).toBe(criteria.comment);
            expect(y.contentType).toMatch(options.headers['Content-Type']);
            expect(y.Authorization).toBe(options.headers['Authorization']);
          }),
        injectTest.apiEndpoint.patchOne('post/', 'id', criteria, body, options)
          .then(y => {
            expect(y.method).toBe('PATCH');
            expect(y.path).toBe('/post/id/');
            expect(y.query.user).toBe(criteria.user);
            expect(y.query.comment).toBe(criteria.comment);
            expect(y.contentType).toMatch(options.headers['Content-Type']);
            expect(y.Authorization).toBe(options.headers['Authorization']);
          }),
        injectTest.apiEndpoint.patchOne('post/', 'id', criteria, body, options, responseOutput)
          .then(y => {
            expect(responseOutput.response instanceof Response).toBe(true);
          }),
        injectTest.apiEndpoint.patchOne('post/', 'id', criteriaWithArray, body)
          .then(y => {
            expect(y.method).toBe('PATCH');
            expect(y.path).toBe('/post/id/');
            expect(y.query.sort[0]).toBe(criteriaWithArray.sort[0]);
            expect(y.query.sort[1]).toBe(criteriaWithArray.sort[1]);
            expect(y.originalUrl).toBe(encodeURI(`/post/id/?sort[]=${criteriaWithArray.sort[0]}&sort[]=${criteriaWithArray.sort[1]}`));
          })
      ]).then(x => {
        done();
      });
    });

    it('Should patchOne with RFC6570 queries.', function(done) {
      let injectTest = container.get(InjectTest);

      injectTest.apiEndpoint.useTraditionalUriTemplates = true;

      Promise.all([
        injectTest.apiEndpoint.patchOne('post/', 'id', criteriaWithArray, body)
          .then(y => {
            expect(y.method).toBe('PATCH');
            expect(y.path).toBe('/post/id/');
            expect(y.query.sort[0]).toBe(criteriaWithArray.sort[0]);
            expect(y.query.sort[1]).toBe(criteriaWithArray.sort[1]);
            expect(y.originalUrl).toBe(`/post/id/?sort=${criteriaWithArray.sort[0]}&sort=${criteriaWithArray.sort[1]}`);
          })
      ]).then(x => done());
    });
  });

  describe('.destroy()', function() {
    it('Should destroy with criteria and options.', function(done) {
      let injectTest = container.get(InjectTest);
      let responseOutput = {
        response: null
      };

      injectTest.apiEndpoint.useTraditionalUriTemplates = false;

      Promise.all([
        injectTest.apiEndpoint.destroy('posts', criteria, options)
          .then(y => {
            expect(y.method).toBe('DELETE');
            expect(y.path).toBe('/posts');
            expect(y.query.user).toBe(criteria.user);
            expect(y.query.comment).toBe(criteria.comment);
            expect(y.Authorization).toBe(options.headers['Authorization']);
          }),
        injectTest.apiEndpoint.destroy('posts/', criteria, options)
          .then(y => {
            expect(y.method).toBe('DELETE');
            expect(y.path).toBe('/posts/');
            expect(y.query.user).toBe(criteria.user);
            expect(y.query.comment).toBe(criteria.comment);
            expect(y.Authorization).toBe(options.headers['Authorization']);
          }),
        injectTest.apiEndpoint.destroy('posts/', criteria, options, responseOutput)
          .then(y => {
            expect(responseOutput.response instanceof Response).toBe(true);
          }),
        injectTest.apiEndpoint.destroy('posts/', criteriaWithArray)
          .then(y => {
            expect(y.method).toBe('DELETE');
            expect(y.path).toBe('/posts/');
            expect(y.query.sort[0]).toBe(criteriaWithArray.sort[0]);
            expect(y.query.sort[1]).toBe(criteriaWithArray.sort[1]);
            expect(y.originalUrl).toBe(encodeURI(`/posts/?sort[]=${criteriaWithArray.sort[0]}&sort[]=${criteriaWithArray.sort[1]}`));
          })
      ]).then(x => {
        done();
      });
    });

    it('Should destroy with RFC6570 queries.', function(done) {
      let injectTest = container.get(InjectTest);

      injectTest.apiEndpoint.useTraditionalUriTemplates = true;

      Promise.all([
        injectTest.apiEndpoint.destroy('posts/', criteriaWithArray)
          .then(y => {
            expect(y.method).toBe('DELETE');
            expect(y.path).toBe('/posts/');
            expect(y.query.sort[0]).toBe(criteriaWithArray.sort[0]);
            expect(y.query.sort[1]).toBe(criteriaWithArray.sort[1]);
            expect(y.originalUrl).toBe(`/posts/?sort=${criteriaWithArray.sort[0]}&sort=${criteriaWithArray.sort[1]}`);
          })
      ]).then(x => done());
    });
  });

  describe('.destroyOne()', function() {
    it('Should destroy with id, criteria and options.', function(done) {
      let injectTest = container.get(InjectTest);
      let responseOutput = {
        response: null
      };

      injectTest.apiEndpoint.useTraditionalUriTemplates = false;

      Promise.all([
        injectTest.apiEndpoint.destroyOne('posts', 'id', criteria, options)
          .then(y => {
            expect(y.method).toBe('DELETE');
            expect(y.path).toBe('/posts/id');
            expect(y.query.user).toBe(criteria.user);
            expect(y.query.comment).toBe(criteria.comment);
            expect(y.Authorization).toBe(options.headers['Authorization']);
          }),
        injectTest.apiEndpoint.destroyOne('posts/', 'id', criteria, options)
          .then(y => {
            expect(y.method).toBe('DELETE');
            expect(y.path).toBe('/posts/id/');
            expect(y.query.user).toBe(criteria.user);
            expect(y.query.comment).toBe(criteria.comment);
            expect(y.Authorization).toBe(options.headers['Authorization']);
          }),
        injectTest.apiEndpoint.destroyOne('posts/', 'id', criteria, options, responseOutput)
          .then(y => {
            expect(responseOutput.response instanceof Response).toBe(true);
          }),
        injectTest.apiEndpoint.destroyOne('posts/', 'id', criteriaWithArray)
          .then(y => {
            expect(y.method).toBe('DELETE');
            expect(y.path).toBe('/posts/id/');
            expect(y.query.sort[0]).toBe(criteriaWithArray.sort[0]);
            expect(y.query.sort[1]).toBe(criteriaWithArray.sort[1]);
            expect(y.originalUrl).toBe(encodeURI(`/posts/id/?sort[]=${criteriaWithArray.sort[0]}&sort[]=${criteriaWithArray.sort[1]}`));
          })
      ]).then(x => {
        done();
      });
    });

    it('Should destroyOne with RFC6570 queries.', function(done) {
      let injectTest = container.get(InjectTest);

      injectTest.apiEndpoint.useTraditionalUriTemplates = true;

      Promise.all([
        injectTest.apiEndpoint.destroyOne('posts/', 'id', criteriaWithArray)
          .then(y => {
            expect(y.method).toBe('DELETE');
            expect(y.path).toBe('/posts/id/');
            expect(y.query.sort[0]).toBe(criteriaWithArray.sort[0]);
            expect(y.query.sort[1]).toBe(criteriaWithArray.sort[1]);
            expect(y.originalUrl).toBe(`/posts/id/?sort=${criteriaWithArray.sort[0]}&sort=${criteriaWithArray.sort[1]}`);
          })
      ]).then(x => done());
    });
  });

  describe('.create()', function() {
    it('Should create body (as json).', function(done) {
      let injectTest = container.get(InjectTest);
      let responseOutput = {
        response: null
      };

      Promise.all([
        injectTest.apiEndpoint.create('posts', body)
          .then(y => {
            expect(y.method).toBe('POST');
            expect(y.path).toBe('/posts');
            expect(y.contentType).toMatch('application/json');
          }),
        injectTest.apiEndpoint.create('posts/', body)
          .then(y => {
            expect(y.path).toBe('/posts/');
          })
      ]).then(x => {
        done();
      });
    });

    it('Should create body (as json) and options.', function(done) {
      let injectTest = container.get(InjectTest);
      let responseOutput = {
        response: null
      };

      Promise.all([
        injectTest.apiEndpoint.create('posts', body, options)
          .then(y => {
            expect(y.method).toBe('POST');
            expect(y.path).toBe('/posts');
            expect(y.contentType).toMatch(options.headers['Content-Type']);
            expect(y.Authorization).toBe(options.headers['Authorization']);
          }),
        injectTest.apiEndpoint.create('posts/', body, options)
          .then(y => {
            expect(y.method).toBe('POST');
            expect(y.path).toBe('/posts/');
            expect(y.contentType).toMatch(options.headers['Content-Type']);
            expect(y.Authorization).toBe(options.headers['Authorization']);
          }),
        injectTest.apiEndpoint.create('posts/', body, options, responseOutput)
          .then(y => {
            expect(responseOutput.response instanceof Response).toBe(true);
          })
      ]).then(x => {
        done();
      });
    });
  });

  describe('.post()', function() {
    it('Should post body (as urlencoded) with custom header (x-www-form-urlencoded).', function(done) {
      let injectTest = container.get(InjectTest);
      let responseOutput = {
        response: null
      };

      Promise.all([
        injectTest.apiEndpoint.post('posts', body, options)
          .then(y => {
            expect(JSON.stringify(y.body)).toBe(JSON.stringify(body));
            expect(y.method).toBe('POST');
            expect(y.path).toBe('/posts');
            expect(y.contentType).toMatch(options.headers['Content-Type']);
            expect(y.Authorization).toBe(options.headers['Authorization']);
          }),
        injectTest.apiEndpoint.post('posts/', body, options)
          .then(y => {
            expect(JSON.stringify(y.body)).toBe(JSON.stringify(body));
            expect(y.path).toBe('/posts/');
          })
      ]).then(x => {
        done();
      });
    });

    it('Should post object body (as urlencoded) with registered default header (x-www-form-urlencoded).', function(done) {
      let injectTest = container.get(InjectTest);
      let responseOutput = {
        response: null
      };

      Promise.all([
        injectTest.urlencodedEndpoint.post('posts', body)
          .then(y => {
            expect(y.method).toBe('POST');
            expect(y.path).toBe('/posts');
            expect(y.contentType).toMatch(options.headers['Content-Type']);
            expect(y.Authorization).toBe(options.headers['Authorization']);
            expect(y.body.message).toBe('some');
          }),
        injectTest.urlencodedEndpoint.post('posts/', body)
          .then(y => {
            expect(y.path).toBe('/posts/');
            expect(y.body.message).toBe('some');
          })
      ]).then(x => {
        done();
      });
    });

    it('Should post string body as string with registered default header (x-www-form-urlencoded).', function(done) {
      let injectTest = container.get(InjectTest);
      let responseOutput = {
        response: null
      };

      Promise.all([
        injectTest.urlencodedEndpoint.post('posts', buildQueryString(body))
          .then(y => {
            expect(y.method).toBe('POST');
            expect(y.path).toBe('/posts');
            expect(y.contentType).toMatch(options.headers['Content-Type']);
            expect(y.Authorization).toBe(options.headers['Authorization']);
            expect(y.body.message).toBe('some');
          }),
        injectTest.urlencodedEndpoint.post('posts/', buildQueryString(body))
          .then(y => {
            expect(y.path).toBe('/posts/');
            expect(y.body.message).toBe('some');
          })
      ]).then(x => {
        done();
      });
    });

    it('Should post object body (as json) with fetchConfig configuration.', function(done) {
      let injectTest = container.get(InjectTest);
      let responseOutput = {
        response: null
      };

      Promise.all([
        injectTest.fetchConfigEndpoint.post('posts', body)
          .then(y => {
            expect(y.method).toBe('POST');
            expect(y.path).toBe('/posts');
            expect(y.contentType).toBe(jsonOptions.headers['Content-Type']);
            expect(y.body.message).toBe('some');
          }),
        injectTest.fetchConfigEndpoint.post('posts/', body)
          .then(y => {
            expect(y.path).toBe('/posts/');
            expect(y.body.message).toBe('some');
          })
      ]).then(x => {
        done();
      });
    });

    it('Should post string body as string with fetchConfig configuration.', function(done) {
      let injectTest = container.get(InjectTest);
      let responseOutput = {
        response: null
      };

      Promise.all([
        injectTest.fetchConfigEndpoint.post('posts', JSON.stringify(body))
          .then(y => {
            expect(y.method).toBe('POST');
            expect(y.path).toBe('/posts');
            expect(y.contentType).toBe(jsonOptions.headers['Content-Type']);
            expect(y.body.message).toBe('some');
          }),
        injectTest.fetchConfigEndpoint.post('posts/', JSON.stringify(body))
          .then(y => {
            expect(y.path).toBe('/posts/');
            expect(y.body.message).toBe('some');
          })
      ]).then(x => {
        done();
      });
    });

    it('Should post body (as FormData) and options.', function(done) {
      let injectTest = container.get(InjectTest);
      let responseOutput = {
        response: null
      };

      let data = new FormData();

      data.append('message', 'some');

      Promise.all([
        injectTest.formEndpoint.post('uploads', data, {headers: {'Authorization': 'Bearer aToken'}})
          .then(y => {
            expect(y.method).toBe('POST');
            expect(y.path).toBe('/uploads');
            expect(y.contentType).toMatch('multipart/form-data');
            expect(y.Authorization).toBe('Bearer aToken');
            expect(y.body.message).toBe('some');
          }),
        injectTest.formEndpoint.post('uploads/', data, {headers: {'Authorization': 'Bearer aToken'}})
          .then(y => {
            expect(y.path).toBe('/uploads/');
            expect(y.contentType).toMatch('multipart/form-data');
            expect(y.body.message).toBe('some');
          })
      ]).then(x => {
        done();
      });
    });
  });
});
