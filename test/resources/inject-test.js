import {inject} from 'aurelia-dependency-injection';
import {Endpoint} from '../../src/aurelia-api';

@inject(Endpoint.of('api'), Endpoint.of('jsonplaceholder'), Endpoint.of('form'))
export class InjectTest {
  constructor(apiEndpoint, jsonplaceholderEndpoint, formEndpoint) {
    this.apiEndpoint    = apiEndpoint;
    this.jsonplaceholderEndpoint = jsonplaceholderEndpoint;
    this.formEndpoint = formEndpoint;
  }
}
