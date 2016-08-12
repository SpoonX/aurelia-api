import {buildQueryString} from 'aurelia-path';
import extend from 'extend';

/**
 * Rest class. A simple rest client to fetch resources
 */
export class Rest {

  /**
   * Fetch options for all requests
   * See also https://developer.mozilla.org/en-US/docs/Web/API/Request/Request
   * Accepts additional option parseError, which will be removed before fetching
   *
   * @param {{}} defaults The defaults object
   */
  defaults = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    parseError: false
  }

  /**
   * Inject the httpClient to use for requests.
   *
   * @param {HttpClient} httpClient The httpClient to use
   * @param {string}     [endpoint] The endpoint name
   */
  constructor(httpClient, endpoint) {
    this.client   = httpClient;
    this.endpoint = endpoint;
  }

  /**
   * Make a request to the server.
   *
   * @param {string} method     The fetch method
   * @param {string} path       Path to the resource
   * @param {{}}     [body]     The body to send if applicable
   * @param {{}}     [options]  Fetch options overwrites
   *
   * @return {Promise<Object>|Promise<any>} Server response as Object on success. Server response or parsed server response (parseError===true) is thrown on error
   */
  request(method, path, body, options = {}) {
    let requestOptions = extend(true, {headers: {}}, this.defaults, options, {method, body});

    // extract parseError option
    let parseError = requestOptions.parseError;

    delete requestOptions.parseError;

    let contentType = requestOptions.headers['Content-Type'] || requestOptions.headers['content-type'];

    if (typeof body === 'object' && body !== null && contentType) {
      requestOptions.body = contentType.toLowerCase() === 'application/json'
                          ? JSON.stringify(body)
                          : buildQueryString(body);
    }

    return this.client.fetch(path, requestOptions).then(response => {
      if (response.status >= 200 && response.status < 400) {
        return response.json().catch(error => null);
      }

      if (parseError) {
        return response.json().then(Promise.reject);
      }

      throw response;
    });
  }

  /**
   * Find a resource.
   *
   * @param {string}           resource  Resource to find in
   * @param {{}|string|Number} criteria  Object for where clause, string / number for id.
   * @param {{}}               [options] Extra fetch options.
   *
   * @return {Promise<Object>|Promise<any>} Server response as Object on success. Server response or parsed server response (parseError===true) is thrown on error
   */
  find(resource, criteria, options) {
    return this.request('GET', getRequestPath(resource, criteria), undefined, options);
  }

  /**
   * Create a new instance for resource.
   *
   * @param {string} resource  Resource to create
   * @param {{}}     body      The data to post (as Object)
   * @param {{}}     [options] Extra fetch options.
   *
   * @return {Promise<Object>|Promise<any>} Server response as Object on success. Server response or parsed server response (parseError===true) is thrown on error
   */
  post(resource, body, options) {
    return this.request('POST', resource, body, options);
  }

  /**
   * Update a resource.
   *
   * @param {string}           resource  Resource to update
   * @param {{}|string|Number} criteria  Object for where clause, string / number for id.
   * @param {{}}               body      New data for provided criteria.
   * @param {{}}               [options] Extra fetch options.
   *
   * @return {Promise<Object>|Promise<any>} Server response as Object on success. Server response or parsed server response (parseError===true) is thrown on error
   */
  update(resource, criteria, body, options) {
    return this.request('PUT', getRequestPath(resource, criteria), body, options);
  }

  /**
   * Patch a resource.
   *
   * @param {string}           resource  Resource to patch
   * @param {{}|string|Number} criteria  Object for where clause, string / number for id.
   * @param {{}}               body      Data to patch for provided criteria.
   * @param {{}}               [options] Extra fetch options.
   *
   * @return {Promise<Object>|Promise<any>} Server response as Object on success. Server response or parsed server response (parseError===true) is thrown on error
   */
  patch(resource, criteria, body, options) {
    return this.request('PATCH', getRequestPath(resource, criteria), body, options);
  }

  /**
   * Delete a resource.
   *
   * @param {string}           resource  The resource to delete
   * @param {{}|string|Number} criteria  Object for where clause, string / number for id.
   * @param {{}}               [options] Extra fetch options.
   *
   * @return {Promise<Object>|Promise<any>} Server response as Object on success. Server response or parsed server response (parseError===true) is thrown on error
   */
  destroy(resource, criteria, options) {
    return this.request('DELETE', getRequestPath(resource, criteria), undefined, options);
  }

  /**
   * Create a new instance for resource.
   *
   * @param {string} resource  The resource to create
   * @param {{}}     body      The data to post (as Object)
   * @param {{}}     [options] Extra fetch options.
   *
   * @return {Promise<Object>|Promise<any>} Server response as Object on success. Server response or parsed server response (parseError===true) is thrown on error
   */
  create(resource, body, options) {
    return this.post(...arguments);
  }
}

function getRequestPath(resource, criteria) {
  if (typeof criteria === 'object' && criteria !== null) {
    resource += `?${buildQueryString(criteria)}`;
  } else if (criteria) {
    let hasSlash = resource.slice(-1) === '/';
    resource += `${hasSlash ? '' : '/'}${criteria}${hasSlash ? '/' : ''}`;
  }

  return resource;
}
