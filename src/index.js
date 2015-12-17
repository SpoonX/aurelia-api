import {HttpClient} from 'aurelia-fetch-client';
export {Rest} from './rest';

export function configure (aurelia, configCallback) {
  aurelia.container.get(HttpClient).configure(configCallback);
}
