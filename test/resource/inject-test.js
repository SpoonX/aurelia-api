import {inject} from 'aurelia-dependency-injection';
import {Endpoint} from '../../src/index';

@inject(Endpoint.of('api'), Endpoint.of('github'))
export class InjectTest {
  constructor(apiEndpoint, githubEndpoint) {
    this.apiEndpoint    = apiEndpoint;
    this.githubEndpoint = githubEndpoint;
  }
}
