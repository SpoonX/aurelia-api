import {inject} from 'aurelia-dependency-injection';
import {Endpoint} from '../../src/endpoint';

@inject(Endpoint.of('api'), Endpoint.of('api-slash'), Endpoint.of('jsonplaceholder'), Endpoint.of('form'))
export class InjectTest {
  constructor(apiEndpoint, apiSlashEndpoint, jsonplaceholderEndpoint, formEndpoint) {
    this.apiEndpoint    = apiEndpoint;
    this.apiSlashEndpoint    = apiSlashEndpoint;
    this.jsonplaceholderEndpoint = jsonplaceholderEndpoint;
    this.formEndpoint = formEndpoint;
  }
}
