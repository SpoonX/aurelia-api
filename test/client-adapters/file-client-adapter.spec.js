import {FileClientAdapter} from '../../src/client-adapters/file-client-adapter';
import {FileClient} from '../../src/client-adapters/file-client';
import {buildQueryString} from 'aurelia-path';
import {settings} from '../resources/settings';

let adapter = new FileClientAdapter();

describe('FileClientAdapter', function() {
  describe('.client', function() {
    it('Should be client with configure(config => config.withBaseUrl(base))', function() {
      expect(adapter.client instanceof FileClient).toBe(true);

      adapter.client.configure(config => config.withBaseUrl(settings.baseUrls.file));
    });
  });

  describe('.find()', function() {
    it('Should find results.', function(done) {
      Promise.all([
        adapter.request('', 'posts')
          .then(y => {
            expect(JSON.stringify(y)).toBe(JSON.stringify(settings.data));
          }),
        adapter.request('', 'posts/0')
          .then(y => {
            expect(JSON.stringify(y[0])).toBe(JSON.stringify(settings.data[0]));
          }),
        adapter.request('', 'posts?' + buildQueryString(settings.criteria))
          .then(y => {
            expect(JSON.stringify(y[0])).toBe(JSON.stringify(settings.data[0]));
          })
      ]).then(done);
    });
  });
});
