import {Config} from './config';
import {Rest} from './rest';
import {Endpoint} from './endpoint';

function configure(aurelia: Object, configCallback:(config:Config) => void): void {
  let config = aurelia.container.get(Config);

  configCallback(config);
}

export {
  configure,
  Config,
  Rest,
  Endpoint
};
