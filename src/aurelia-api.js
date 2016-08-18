import {Aurelia} from 'aurelia-framework';
import {Config} from './config';

export function configure(aurelia: Aurelia, configCallback: Function): void {
  let config = aurelia.container.get(Config);

  configCallback(config);
}
