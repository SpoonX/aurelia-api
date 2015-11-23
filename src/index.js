import {Rest} from './rest';
export {Rest} from './rest';

export function configure (aurelia, configCallback) {
  aurelia.container.get(Rest).configure(configCallback);
}
