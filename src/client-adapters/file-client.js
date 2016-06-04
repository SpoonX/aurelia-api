import {parseQueryString, join} from 'aurelia-path';
import {DefaultLoader} from 'aurelia-loader-default';
import {findSelected} from './util';

export class FileClient {
  /**
  *  base path
  *  @type {String}
  */
  baseUrl = '';

  /**
  *  The builder with builder.withBaseUrl() for the use in configure
  *  @type {Object}
  */
  builder = {
    withBaseUrl: baseUrl => {
      this.baseUrl = baseUrl;
      return baseUrl;
    },
    withLoader: loader => this.loader = loader
  };

  /**
  * Creates an instance of FileClient.
  *
  * @param {function} File loader with loader.loadText(path). default: (aurelia-)DefaultLoader
  */
  constructor(loader = new DefaultLoader()) {
    this.loader = loader;
  }

  /**
  * Configure this client with default settings to be used by all requests.
  *
  * @param config A configuration object, or a function that takes a config
  * object and configures it.
  * @returns The chainable instance of this FileClient.
  * @chainable
  */
  configure(_configure) {
    if (typeof _configure === 'function') {
      _configure(this.builder);
    } else if (typeof _configure === 'string') {
      this.baseUrl = _configure;
    }

    return this;
  }

  /**
  * Fetches a resource. Default configuration parameters
  * will be applied.
  *
  * @param path A string containing the URL of the resource.
  * @returns A Promise<Object|Error> with the response
  */
  loadJson(path) {
    let [, pathKey, , id, , query] = /^([^\/^\?]+)(\/)?([^\/^\?]+)?(\?)?(.+)?/.exec(path);

    let queryParameters = parseQueryString(query);
    if (id) queryParameters.id = id;

    return this.loader.loadText(join(this.baseUrl, pathKey) + '.json').then(text => {
      let resource = JSON.parse(text);
      return findSelected(resource, queryParameters) || [];
    });
  }
}
