# aurelia-api

[![Build Status](https://travis-ci.org/SpoonX/aurelia-api.svg?branch=master)](https://travis-ci.org/SpoonX/aurelia-api)
[![Known Vulnerabilities](https://snyk.io/test/npm/name/badge.svg)](https://snyk.io/test/npm/aurelia-api)
[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg?maxAge=2592000?style=plastic)](https://gitter.im/SpoonX/Dev)

> This library is a plugin for the [Aurelia](http://www.aurelia.io/) platform and contains support for multiple endpoints, extending the functionalities supplied by [aurelia-fetch-client](https://github.com/aurelia/fetch-client).
> This library plays nice with the [Sails.js framework](http://sailsjs.org).

Talking to your api shouldn't be difficult. You shouldn't have to repeat yourself. You shouldn't need nuclear power plants to make it easier. You should just be able to say "give me that thing!" and be done with it. If only we could do something about that...

You guessed it! We have something for that. Aurelia-api comes with a set of cool features that makes talking to APIs easy and fun.

Aurelia-api is a module wrapped around aurelia-fetch-client that allows you to:

* Perform the usual CRUD
* Supply criteria for your api
* Manage more than one endpoint
* Add defaults
* Add interceptors
* And more

## Important note

We've simplified installation and usage! This plugin should now be installed using `jspm i aurelia-api` or (for webpack) `npm i aurelia-api --save`. Make sure you update all references to `spoonx/aurelia-api` and remove the `spoonx/` prefix (don't forget your config.js, package.json, imports and bundles).

## Documentation

You can find usage examples and the documentation at [aurelia-api-doc](http://aurelia-api.spoonx.org/).

The [changelog](doc/changelog.md) provides you with information about important changes.

## Installation

Run `jspm i aurelia-api`, or (for webpack) `npm i aurelia-api` from your project root.

## Usage

### Configuring

Register the plugin and some endpoints.

```js
aurelia.use
  /* Your other plugins and init code */
  .plugin('aurelia-api', config => {

    // Register hosts
    config.registerEndpoint('api');
    config.registerEndpoint('other-api');
  })
```

### Get and use an endpoint

You can get endpoints with the `.getEndpoint()` method on the `Config` instance from aurelia-api.

```js
import {inject} from 'aurelia-framework';
import {Config} from 'aurelia-api';

@inject(Config)
export class MyClass {
  constructor(config) {
    this.apiEndpoint = config.getEndpoint('api');

    this.apiEndpoint.find('users')
    .then(users => {
        // use your recieved users.json
    })
    .catch(console.error);
  }
}
```

## Quick Rest api overview

````js
endpoint
  .client                                     // the httpClient instance
  .endpoint                                   // name of the endpoint
  .find(resource, criteria, options)          // GET
  .post(resource, body, options) {            // POST
  .update(resource, criteria, body, options)  // PUT
  .patch(resource, criteria, body, options)   // PATCH
  .destroy(resource, criteria, options)       // DELETE
  .create(resource, body, options)            // POST
  .request(method, path, body, options)       // method
```
