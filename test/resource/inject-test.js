import {inject} from 'aurelia-dependency-injection';
import {Endpoint} from '../../src/aurelia-api';

@inject(Endpoint.of('api'), Endpoint.of('github'))
export class InjectTest {
  constructor(apiEndpoint, githubEndpoint) {
    this.apiEndpoint    = apiEndpoint;
    this.githubEndpoint = githubEndpoint;
  }
}
