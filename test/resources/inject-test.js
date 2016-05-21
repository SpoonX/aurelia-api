import {inject} from 'aurelia-dependency-injection';
import {Endpoint} from '../../src/aurelia-api';

@inject(Endpoint.of('api'), Endpoint.of('github'), Endpoint.of('api-http'))
export class InjectTest {
  constructor(apiEndpoint, githubEndpoint, apiHttpEndpoint) {
    this.apiEndpoint    = apiEndpoint;
    this.githubEndpoint = githubEndpoint;
    this.apiHttpEndpoint = apiHttpEndpoint;
  }
}
