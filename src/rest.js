import {buildQueryString} from 'aurelia-path';
import extend from 'extend';

export class Rest {

  defaults = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  /**
   * Inject the clientAdapter to use for requests.
   *
   * @param {ClientAdapter} clientAdapter
   * @param {string}        [endpoint]
   */
  constructor(clientAdapter, endpoint) {
    this.clientAdapter   = clientAdapter;
    this.client          = clientAdapter.client;
    this.endpoint        = endpoint;
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
  request(method, path, body, options = {}) {
    let requestOptions = extend(true, {}, this.defaults, options);

    return this.clientAdapter.request(method, path, body, requestOptions);
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
    return this.request('GET', getRequestPath(resource, criteria), undefined, options);
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
    return this.request('POST', resource, body, options);
  }

  /**
   * Update a resource.
   *
   * @param {string}           resource  Resource to update
   * @param {{}|string|Number} criteria  Object for where clause, string / number for id.
   * @param {object}           body      New data for provided criteria.
   * @param {{}}               [options]
   *
   * @return {Promise}
   */
  update(resource, criteria, body, options) {
    return this.request('PUT', getRequestPath(resource, criteria), body, options);
  }

  /**
   * Patch a resource.
   *
   * @param {string}           resource  Resource to patch
   * @param {{}|string|Number} criteria  Object for where clause, string / number for id.
   * @param {object}           body      Data to patch for provided criteria.
   * @param {{}}               [options]
   *
   * @return {Promise}
   */
  patch(resource, criteria, body, options) {
    return this.request('PATCH', getRequestPath(resource, criteria), body, options);
  }

  /**
   * Delete a resource.
   *
   * @param {string}           resource  The resource to delete in
   * @param {{}|string|Number} criteria  Object for where clause, string / number for id.
   * @param {{}}               [options]
   *
   * @return {Promise}
   */
  destroy(resource, criteria, options) {
    return this.request('DELETE', getRequestPath(resource, criteria), undefined, options);
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

function getRequestPath(resource, criteria) {
  return (criteria !== undefined && criteria !== null
    ? resource + (typeof criteria !== 'object' ? `/${criteria}` : '?' + buildQueryString(criteria))
    : resource);
}
