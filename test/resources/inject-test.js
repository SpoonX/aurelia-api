import {inject} from 'aurelia-dependency-injection';
import {Endpoint} from '../../src/endpoint';

@inject(Endpoint.of('api'),
  Endpoint.of('jsonplaceholder'),
  Endpoint.of('form'),
  Endpoint.of('urlencoded'),
  Endpoint.of('fetchConfig'),
  Endpoint.of('xml')
)
export class InjectTest {
  constructor(apiEndpoint,
    jsonplaceholderEndpoint,
    formEndpoint,
    urlencodedEndpoint,
    fetchConfigEndpoint,
    xmlEndpoint
  ) {
    this.apiEndpoint    = apiEndpoint;
    this.jsonplaceholderEndpoint = jsonplaceholderEndpoint;
    this.formEndpoint = formEndpoint;
    this.urlencodedEndpoint = urlencodedEndpoint;
    this.fetchConfigEndpoint = fetchConfigEndpoint;
    this.xmlEndpoint = xmlEndpoint;
   }
}
