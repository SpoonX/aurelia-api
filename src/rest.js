import {json} from 'aurelia-fetch-client';
import qs from 'querystring';
import extend from 'extend';

export class Rest {

  /**
   * Inject the httpClient to use for requests.
   *
   * @param {HttpClient} httpClient
   */
  constructor(httpClient) {
    this.client = httpClient;
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
  request(method, path, body, options) {
    let requestOptions = extend(true, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }, options || {});

    if (typeof options !== 'undefined') {
      extend(true, requestOptions, options);
    }
	
	// Force method to be upper-case for pre-flight Accept-Methods matching
	requestOptions.method = requestOptions.toUpperCase();

    // Force method to be upper-case for pre-flight Accept-Methods matching
    requestOptions.method = requestOptions.toUpperCase();

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
  find(resource, criteria, options) {
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
  post(resource, body, options) {
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
  update(resource, criteria, body, options) {
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
  destroy(resource, criteria, options) {
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
  create(resource, body, options) {
    return this.post(...arguments);
  }
}
