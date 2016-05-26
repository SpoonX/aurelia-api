import {inject} from 'aurelia-dependency-injection';
import {Endpoint} from '../../src/aurelia-api';

@inject(Endpoint.of('api'), Endpoint.of('github'), Endpoint.of('form'), Endpoint.of('test'))
export class InjectTest {
  constructor(apiEndpoint, githubEndpoint, formEndpoint, testEndpoint) {
    this.apiEndpoint    = apiEndpoint;
    this.githubEndpoint = githubEndpoint;
    this.formEndpoint   = formEndpoint;
    this.testEndpoint   = testEndpoint;
  }
}
