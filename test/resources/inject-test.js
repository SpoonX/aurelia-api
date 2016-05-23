import {inject} from 'aurelia-dependency-injection';
import {Endpoint} from '../../src/aurelia-api';

@inject(Endpoint.of('api'),
  Endpoint.of('github'),
  Endpoint.of('api-http'),
  Endpoint.of('api-jsonp'),
  Endpoint.of('api-storage'))
export class InjectTest {
  constructor(apiEndpoint, githubEndpoint, apiHttpEndpoint, apiJSONPEndpoint, apiStorageEndpoint) {
    this.apiEndpoint    = apiEndpoint;
    this.githubEndpoint = githubEndpoint;
    this.apiHttpEndpoint = apiHttpEndpoint;
    this.apiJSONPEndpoint = apiJSONPEndpoint;
    this.apiStorageEndpoint = apiStorageEndpoint;
  }
}
