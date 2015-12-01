# aurelia-api

[![ZenHub](https://raw.githubusercontent.com/ZenHubIO/support/master/zenhub-badge.png)](https://zenhub.io)
[![Join the chat at https://gitter.im/aurelia/discuss](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/aurelia/discuss?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This library is an unofficial plugin for the [Aurelia](http://www.aurelia.io/) platform and contains a simple client which extends the functionalities supplied by [aurelia-fetch-client](https://github.com/aurelia/fetch-client).
This library plays nice with the [Sails.js framework](http://sailsjs.org).

> To keep up to date on [Aurelia](http://www.aurelia.io/), please visit and subscribe to [the official blog](http://blog.durandal.io/). If you have questions, we invite you to [join us on Gitter](https://gitter.im/aurelia/discuss). If you would like to have deeper insight into our development process, please install the [ZenHub](https://zenhub.io) Chrome Extension and visit any of our repository's boards. You can get an overview of all Aurelia work by visiting [the framework board](https://github.com/aurelia/framework#boards).

## Polyfills

* None

## Dependencies

* [aurelia-fetch-client](https://github.com/aurelia/fetch-client)
* [aurelia-framework](https://github.com/aurelia/framework)
* [nodelibs-querystring](https://github.com/jspm/nodelibs-querystring)

## Used By

This library is used directly by applications only.

## Platform Support

This library can be used in the **browser** only.

## Installation
Installing this module is fairly simple.

Run `jspm install github:spoonx/aurelia-api` from your project root.

## Usage

### Configuring the client

Make sure your project uses a `main.js` file to initialize aurelia. In your configure function, add the following:

```javascript
let yourEndpoint = 'http://localhost:1337/';

aurelia.use
  /* Your other plugins and init code */
  .plugin('spoonx/aurelia-api', builder => {
    builder.useStandardConfiguration().withBaseUrl(yourEndpoint);
  });
```

### Rest client
To use the Rest client, simply import it and get cracking!

Here's an example:

```javascript
import {Rest} from 'spoonx/aurelia-api';

@inject(Rest)
export class MyViewModel {
  constructor (restClient) {
    restClient.find('product', {
        category: 5,
        name    : {contains: 'mouse'}
      })
      .then(console.log)
      .catch(console.error);
  }
}
```

## API

You can find more documentation, including the available methods, in the `doc/` directory.
