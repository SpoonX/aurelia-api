import {StorageClientAdapter} from '../../src/client-adapters/storage-client-adapter';
import {StorageClient} from '../../src/client-adapters/storage-client';
import {buildQueryString} from 'aurelia-path';
import {settings} from '../resources/settings';

let adapter = new StorageClientAdapter;
let key = 'AureliaStorageClient-' + settings.baseUrls.api + 'posts';

describe('StorageClientAdapter', function() {
  beforeEach(function() {
    StorageClient.clear(window.localStorage);
    adapter.client.storage.setItem(key, JSON.stringify(settings.data));
  });

  describe('.client', function() {
    it('Should be client with configure(config => config.withBaseUrl(base))', function() {
      expect(adapter.client instanceof StorageClient).toBe(true);

      adapter.client.configure(config => config.withBaseUrl(settings.baseUrls.api));
    });
  });

  describe('.find()', function() {
    it('Should find results with StorageClientAdapter.', function(done) {
      Promise.all([
        adapter.request('GET', 'posts')
          .then(y => {
            expect(JSON.stringify(y)).toBe(JSON.stringify(settings.data));
          }),
        adapter.request('GET', 'posts/0')
          .then(y => {
            expect(y.id).toBe(0);
          }),
        adapter.request('GET', 'posts?' + buildQueryString(settings.criteria))
          .then(y => {
            expect(y.user).toBe(settings.criteria.user);
            expect(y.comment).toBe(settings.criteria.comment);
          }),
        adapter.request('GET', 'posts?' + buildQueryString({user: 'john'}))
          .then(y => {
            expect(y[0].user).toBe('john');
            expect(y.length).toBe(2);
          })
      ]).then(done);
    });
  });

  describe('.update()', function() {
    it('Should update with body (as json), criteria.', function(done) {
      adapter.request('PUT', 'posts?' + buildQueryString(settings.criteria), settings.body)
        .then(y => {
          expect(y.length).toBe(1);
          expect(y[0].user).toBe(undefined);
          expect(y[0].comment).toBe(undefined);
          expect(y[0].message).toBe('some');

          let res = JSON.parse(adapter.client.storage.getItem(key));
          expect(res.length).toBe(3);
          expect(res[0].id).toBe(0);
          expect(res[0].message).toBe('some');
          expect(res[0].user).toBe(undefined);
          expect(res[0].comment).toBe(undefined);
          expect(res[1].message).toBeUndefined();
          expect(res[2].message).toBeUndefined();
          done();
        });
    });
  });

  describe('.patch()', function() {
    it('Should patch with body (as json), criteria.', function(done) {
      adapter.request('PATCH', 'posts?' + buildQueryString(settings.criteria), settings.body)
        .then(y => {
          expect(y.length).toBe(1);
          expect(y[0].user).toBe('john');
          expect(y[0].comment).toBe('last');
          expect(y[0].message).toBe('some');

          let res = JSON.parse(adapter.client.storage.getItem(key));
          expect(res.length).toBe(3);
          expect(res[0].id).toBe(0);
          expect(res[0].message).toBe('some');
          expect(res[0].user).toBe('john');
          expect(res[0].comment).toBe('last');
          expect(res[1].message).toBeUndefined();
          expect(res[2].message).toBeUndefined();
          done();
        });
    });
  });

  describe('.destroy()', function() {
    it('Should destroy with id.', function(done) {
      adapter.request('DELETE', 'posts/0')
        .then(y => {
          expect(y[0].id).toBe(0);
          expect(y[0].user).toBe('john');
          expect(y[0].comment).toBe('last');

          let res = JSON.parse(adapter.client.storage.getItem(key));
          expect(res.length).toBe(2);
          expect(res[0].id).toBe(1);
          expect(res[0].comment).toBe('first');
          expect(res[1].user).toBe('jane');
          done();
        });
    });
  });

  describe('.create()', function() {
    it('Should create body (as json).', function(done) {
      adapter.request('POST', 'posts', {user: 'jim'})
        .then(y => {
          expect(y.id).toBe(3);
          expect(y.user).toBe('jim');

          let res = JSON.parse(adapter.client.storage.getItem(key));
          expect(res.length).toBe(4);
          expect(res[3].id).toBe(3);
          expect(res[3].user).toBe('jim');
          done();
        });
    });
  });
});
