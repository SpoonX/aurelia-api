# aurelia-api

[![Build Status](https://travis-ci.org/SpoonX/aurelia-api.svg?branch=master)](https://travis-ci.org/SpoonX/aurelia-api)
[![Known Vulnerabilities](https://snyk.io/test/npm/name/badge.svg)](https://snyk.io/test/npm/aurelia-api)
[![Join the chat at https://gitter.im/aurelia/discuss](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/SpoonX/Dev?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This library is a plugin for the [Aurelia](http://www.aurelia.io/) platform and contains support for multiple endpoints, extending the functionalities supplied by [aurelia-fetch-client](https://github.com/aurelia/fetch-client).
This library plays nice with the [Sails.js framework](http://sailsjs.org).

> To keep up to date on [Aurelia](http://www.aurelia.io/), please visit and subscribe to [the official blog](http://blog.durandal.io/). If you have questions, we invite you to [join us on Gitter](https://gitter.im/aurelia/discuss). If you would like to have deeper insight into our development process, please install the [ZenHub](https://zenhub.io) Chrome Extension and visit any of our repository's boards. You can get an overview of all Aurelia work by visiting [the framework board](https://github.com/aurelia/framework#boards).

## Installation
Installing this module is fairly simple.

Run `jspm install github:spoonx/aurelia-api` from your project root.

## Usage

### Configuring the client

This module allows you to register and configure multiple clients.
You can then pass these clients to other libs when needed.

Make sure your project uses a `main.js` file to initialize aurelia.
In your configure function, you might do something like this:

```javascript
aurelia.use
  /* Your other plugins and init code */
  .plugin('spoonx/aurelia-api', config => {
  
    // Current host
    config.registerEndpoint('api');

    // Different host
    config.registerEndpoint('api', 'https://myapi.org/');

    // With defaults
    config.registerEndpoint('api', 'https://myapi.org/', {headers: {x:'foo'}});

    // Own configuration
    // @see http://aurelia.io/docs.html#/aurelia/fetch-client/latest/doc/api/class/HttpClientConfiguration
    config.registerEndpoint('api', configure => {
      configure.withBaseUrl('https://myapi.org/');
    });
  });
```

### Rest client
To use the Rest client, use the Endpoint resolver to inject it.

Here's an example:

```javascript
import {inject} from 'aurelia-framework';
import {Endpoint} from 'spoonx/aurelia-api';

@inject(Endpoint.of('api'), Endpoint.of('auth'))
export class MyClass {
  constructor(apiEndpoint, authEndpoint) {
    this.apiEndpoint  = apiEndpoint;
    this.authEndpoint = authEndpoint;
  }
  
  attached() {
    this.apiEndpoint.find('product', {
      category: 5,
      name    : {contains: 'mouse'}
    })
    .then(console.log)
    .catch(console.error);
  }
}
```

Alternatively, you could also request your endpoint at the config. Example:

```javascript
import {inject} from 'aurelia-framework';
import {Config} from 'spoonx/aurelia-api';

@inject(Config)
export class MyClass {
  constructor(config) {
    this.apiEndpoint = config.getEndpoint('api');
  }
}
```

## API

You can find more documentation, including a **getting-started guide**, in the [doc/](doc/) directory.
