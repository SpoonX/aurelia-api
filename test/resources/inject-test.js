import {inject} from 'aurelia-dependency-injection';
import {Endpoint} from '../../src/endpoint';

@inject(
  Endpoint.of('api'),
  Endpoint.of('jsonplaceholder'),
  Endpoint.of('form'),
  Endpoint.of('urlencoded'),
  Endpoint.of('fetchConfig')
)
export class InjectTest {
  constructor(
    apiEndpoint,
    jsonplaceholderEndpoint,
    formEndpoint,
    urlencodedEndpoint,
    fetchConfigEndpoint
  ) {
    this.apiEndpoint             = apiEndpoint;
    this.jsonplaceholderEndpoint = jsonplaceholderEndpoint;
    this.formEndpoint            = formEndpoint;
    this.urlencodedEndpoint      = urlencodedEndpoint;
    this.fetchConfigEndpoint     = fetchConfigEndpoint;
   }
}
