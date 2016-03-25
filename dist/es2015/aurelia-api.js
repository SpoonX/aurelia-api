import { Config } from './config';
import { Rest } from './rest';
import { Endpoint } from './endpoint';

function configure(aurelia, configCallback) {
  let config = aurelia.container.get(Config);

  configCallback(config);
}

export { configure, Config, Rest, Endpoint };