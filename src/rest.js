import {json} from 'aurelia-fetch-client';
import qs from 'qs';
import extend from 'extend';

export class Rest {

  defaults : Object = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  /**
   * Inject the httpClient to use for requests.
   *
   * @param {HttpClient} httpClient
   * @param {string}     [endpoint]
   */
  constructor(httpClient: HttpClient, endpoint?: string) {
    this.client   = httpClient;
    this.endpoint = endpoint;
  }

  /**
   * Make a request to the server.
   *
   * @param {string} method
   * @param {string} path
   * @param {{}}     [body]
   * @param {{}}     [options]
   *
   * @return {Promise}
   */
  request(method: string, path: string, body?: any, options?: Object = {}): Promise<any> {
    let requestOptions = extend(true, {}, this.defaults, options);

    requestOptions.method = method;

    if (typeof body === 'object') {
      requestOptions.body = json(body);
    }

    return this.client.fetch(path, requestOptions).then(response => {
      if (response.status >= 200 && response.status < 400) {
        return response.json().catch(error => null);
      }

      throw response;
    });
  }

  /**
   * Find a resource.
   *
   * @param {string}           resource Resource to find in
   * @param {{}|string|Number} criteria Object for where clause, string / number for id.
   * @param {{}}               [options] Extra fetch options.
   *
   * @return {Promise}
   */
  find(resource: string, criteria: Object|string|number, options?: Object): Promise<any> {
    let requestPath = resource;

    if (criteria) {
      requestPath += typeof criteria !== 'object' ? `/${criteria}` : '?' + qs.stringify(criteria);
    }

    return this.request('get', requestPath, undefined, options);
  }

  /**
   * Create a new instance for resource.
   *
   * @param {string} resource
   * @param {{}}     body
   * @param {{}}     [options]
   *
   * @return {Promise}
   */
  post(resource: string, body: any, options?: Object): Promise<any> {
    return this.request('post', resource, body, options);
  }

  /**
   * Update a resource.
   *
   * @param {string}        resource  Resource to update
   * @param {string|Number} criteria  String / number of the id to update.
   * @param {object}        body      New data for provided criteria.
   * @param {{}}            [options]
   *
   * @return {Promise}
   */
  update(resource: string, criteria: string|number, body: any, options?: Object): Promise<any> {
    let requestPath = resource;

    if (criteria) {
      requestPath += typeof criteria !== 'object' ? `/${criteria}` : '?' + qs.stringify(criteria);
    }

    return this.request('put', requestPath, body, options);
  }

  /**
   * Delete a resource.
   *
   * @param {string}        resource  The resource to delete in
   * @param {string|Number} criteria  String / number of the id to delete.
   * @param {{}}            [options]
   *
   * @return {Promise}
   */
  destroy(resource: string, criteria: string|number, options?: Object): Promise<any> {
    let requestPath = resource;

    if (criteria) {
      requestPath += typeof criteria !== 'object' ? `/${criteria}` : '?' + qs.stringify(criteria);
    }

    return this.request('delete', requestPath, undefined, options);
  }

  /**
   * Create a new instance for resource.
   *
   * @param {string} resource
   * @param {{}}     body
   * @param {{}}     [options]
   *
   * @return {Promise}
   */
  create(resource: string, body: any, options?: Object): Promise<any> {
    return this.post(...arguments);
  }
}
