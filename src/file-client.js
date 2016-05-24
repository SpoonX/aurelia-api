import {parseQueryString, join} from 'aurelia-path';
import {DefaultLoader} from 'aurelia-loader-default';
import {findSelected} from './util';

export class FileClient {
  baseUrl = '';

  constructor(loader = new DefaultLoader()) {
    this.loader = loader;
  }

  builder = {
    withBaseUrl: baseUrl => {
      this.baseUrl = baseUrl;
      return baseUrl;
    },
    withLoader: loader => this.loader = loader
  };

  configure(_configure) {
    if (typeof _configure === 'function') {
      _configure(this.builder);
    } else if (typeof _configure === 'string') {
      this.baseUrl = _configure;
    }
  }

  loadJson(path) {
    let [, pathKey, , id, , query] = /^([^\/^\?]+)(\/)?([^\/^\?]+)?(\?)?(.+)?/.exec(path);

    let queryParameters = parseQueryString(query);
    if (id) queryParameters.id = id;

    return this.loader.loadText(join(this.baseUrl, pathKey) + '.json').then(text => {
      let resource = JSON.parse(text);
      return findSelected(resource, queryParameters);
    });
  }
}
