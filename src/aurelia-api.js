import {Config} from './config';

export function configure(aurelia, configCallback) {
  let config = aurelia.container.get(Config);

  configCallback(config);

  config.configured = true;
}
