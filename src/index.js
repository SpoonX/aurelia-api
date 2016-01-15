import {Config} from './config';
export {Config} from './config';
export {Endpoint} from './endpoint';

export function configure(aurelia, configCallback) {
  let config = aurelia.container.get(Config);

  configCallback(config);
}
