import {configure} from '../src/index';
import {Config} from '../src/index';
import {Container} from 'aurelia-dependency-injection';

describe('index', function() {
  describe('configure()', function() {
    it('Should call callback with a config function', function(done) {
      configure(aurelia(), function(config) {
        expect(config).toBe(Config);

        done();
      });
    });

    it('Should call callback with a config instance', function(done) {
      configure(aurelia(new Container()), function(config) {
        expect(config instanceof Config).toBe(true);

        done();
      });
    });
  });
});

function aurelia(container) {
  return {
    container: container || {
      get: function returnVal(val) {
        return val;
      }
    }
  }
}
