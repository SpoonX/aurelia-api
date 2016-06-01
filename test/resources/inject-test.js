import {inject} from 'aurelia-dependency-injection';
import {Endpoint} from '../../src/aurelia-api';

@inject(
    Endpoint.of('api'),
    Endpoint.of('github'),
    Endpoint.of('form'),
    Endpoint.of('new', 'http://127.0.0.1:1927/', { headers: {'Authorization': 'Bearer aToken'}})
  )
export class InjectTest {
  constructor(apiEndpoint, githubEndpoint, formEndpoint, newEndpoint) {
    this.apiEndpoint    = apiEndpoint;
    this.githubEndpoint = githubEndpoint;
    this.formEndpoint   = formEndpoint;
    this.newEndpoint    = newEndpoint;
  }
}
