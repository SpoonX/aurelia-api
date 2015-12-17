import {HttpClient, json} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import qs from 'querystring';

@inject(HttpClient)
export class Rest {

  /**
   * Inject the httpClient to use for requests.
   * @param {HttpClient} httpClient
   */
  constructor (httpClient) {
    this.client = httpClient;
  }

  /**
   * Make a request to the server.
   *
   * @param {string} method
   * @param {string} path
   * @param {{}}     [body]
   * @param {{}}     [headers]
   *
   * @return {Promise}
   */
  request (method, path, body, headers) {
    let requestOptions = {
      method : method,
      headers: {
        'Accept'      : 'application/json',
        'Content-Type': 'application/json'
      }
    };

    if (typeof headers !== 'undefined') {
      requestOptions.headers = headers;
    }

    if (typeof body === 'object') {
      requestOptions.body = json(body);
    }

    return this.client.fetch(path, requestOptions).then(response => response.json());
  }

  /**
   * Find a resource.
   *
   * @param {string}           resource Resource to find in
   * @param {{}|string|Number} criteria Object for where clause, string / number for id.
   *
   * @return {Promise}
   */
  find (resource, criteria) {
    let requestPath = resource;

    if (criteria) {
      requestPath += typeof criteria !== 'object' ? `/${criteria}` : '?' + qs.stringify(criteria);
    }

    return this.request('get', requestPath);
  }

  /**
   * Create a new instance for resource.
   *
   * @param {string} resource
   * @param {{}}     body
   *
   * @return {Promise}
   */
  post (resource, body) {
    return this.request('post', resource, body);
  }

  /**
   * Update a resource.
   *
   * @param {string}        resource  Resource to update
   * @param {string|Number} criteria  String / number of the id to update.
   * @param {object}        body      New data for provided criteria.
   *
   * @return {Promise}
   */
  update (resource, criteria, body) {
    let requestPath = resource;

    if (criteria) {
      requestPath += `/${criteria}`;
    }

    return this.request('put', requestPath, body);
  }

  /**
   * Delete a resource.
   *
   * @param {string}        resource  The resource to delete in
   * @param {string|Number} criteria  String / number of the id to delete.
   *
   * @return {Promise}
   */
  destroy (resource, criteria) {
    let requestPath = resource;

    if (criteria) {
      requestPath += `/${criteria}`;
    }

    return this.request('delete', requestPath);
  }

  /**
   * Create a new instance for resource.
   *
   * @param {string} resource
   * @param {{}}     body
   *
   * @return {Promise}
   */
  create (resource, body) {
    return this.post(...arguments);
  }
}
