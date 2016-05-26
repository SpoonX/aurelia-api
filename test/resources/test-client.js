export class TestClient {
  baseUrl = '';

  builder = {
    withBaseUrl: baseUrl => {
      this.baseUrl = baseUrl;
      return baseUrl;
    }
  };

  configure(_configure) {
    if (typeof _configure === 'function') {
      _configure(this.builder);
    } else if (typeof _configure === 'string') {
      this.baseUrl = _configure;
    }
  }

  send(method, path, body, options) {
    return Promise.resolve({method, path, body, options});
  }
}


export class ClientNoBuilder {
  baseUrl = '';

  configure(_configure) {
    if (typeof _configure === 'function') {
      _configure();
    }
  }
}
