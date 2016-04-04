import { json } from 'aurelia-fetch-client';
import qs from 'qs';
import extend from 'extend';

export let Rest = class Rest {
  constructor(httpClient, endpoint) {
    this.defaults = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

    this.client = httpClient;
    this.endpoint = endpoint;
  }

  request(method, path, body, options = {}) {
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

  find(resource, criteria, options) {
    let requestPath = resource;

    if (criteria) {
      requestPath += typeof criteria !== 'object' ? `/${ criteria }` : '?' + qs.stringify(criteria);
    }

    return this.request('get', requestPath, undefined, options);
  }

  post(resource, body, options) {
    return this.request('post', resource, body, options);
  }

  update(resource, criteria, body, options) {
    let requestPath = resource;

    if (criteria) {
      requestPath += typeof criteria !== 'object' ? `/${ criteria }` : '?' + qs.stringify(criteria);
    }

    return this.request('put', requestPath, body, options);
  }

  destroy(resource, criteria, options) {
    let requestPath = resource;

    if (criteria) {
      requestPath += typeof criteria !== 'object' ? `/${ criteria }` : '?' + qs.stringify(criteria);
    }

    return this.request('delete', requestPath, undefined, options);
  }

  create(resource, body, options) {
    return this.post(...arguments);
  }
};