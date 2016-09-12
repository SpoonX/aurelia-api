import {Aurelia} from 'aurelia-framework';
import {Config} from './config';

export function configure(aurelia: Aurelia, configOrConfigure: Function): void {
  let config = aurelia.container.get(Config);

  if (typeof configOrConfigure === 'function') {
    return configOrConfigure(config);
  }

  config.configure(configOrConfigure);
}
