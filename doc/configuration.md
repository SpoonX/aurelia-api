# Configuration

Aurelia-api has been built around the concept of multiple endpoints. This means that you can have more than one API to talk to. This is useful when working with micro-services, or external APIs (such as weather APIs).

Following defaults are applied to an endpoint if not specified otherwise:

```js
defaults = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}
```

Ways to register your endpoints in `main.js`:

## Configuration with a function
```js
aurelia.use
  /* Your other plugins and init code */
  .plugin('aurelia-api', config => {

    // 1: Current host
    config.registerEndpoint('api');

    // 2: Specific host
    config.registerEndpoint('api', 'https://myapi.org/');

    // 3: With different endpoint defaults
    config.registerEndpoint('weather', 'https://weatherapi.io/', {headers: {x: 'foo'}});
    // or
    config.registerEndpoint('weather', configure => {
      configure
        .withBaseUrl('https://weatherapi.io/')
        .withDefaults({headers: {x: 'foo'}});
      }));

    // 4: Without endpoint defaults. Use this for FormData
    config.registerEndpoint('weather', 'https://weatherapi.io/', null);

    // 5: Own configuration
    config.registerEndpoint('twitter', configure => {
      configure.withBaseUrl('https://api.twitter.io/');
    });

    // 6: Set default
    config.setDefaultEndpoint('api');

    // 7: Chain
    config
      .registerEndpoint('auth', 'https://auth.myapi.org/')
      .setDefaultEndpoint('auth');
  });
  
  // 8: Set Default BaseUrl
    config.setDefaultBaseUrl('https://myapi.org/');
```


## Configuration with an object

```js
aurelia.use
  /* Your other plugins and init code */
  .plugin('aurelia-api', {
    endpoints: [
      // 1: Current host
      {name: 'api'},
      // 2: Specific host
      {name: 'api', endpoint: 'https://myapi.org/'},
      // 3: With different endpoint defaults
      {name: 'weather', endpoint: 'https://weatherapi.io/', config: {headers: {x: 'foo'}}},
      // 4: Without endpoint defaults
      {name: 'weather', endpoint: 'https://weatherapi.io/', config: null};
    ],
    // 6: Set default endppoint. alternatively, add default: true above
    defaultEndpoint: 'api',
    // 8: Set Default BaseUrl
    defaultBaseUrl: 'https://myapi.org/'
  })
```

Here's a more detailed explanation for every method of registering used:

## 1: Default host name

When registering an endpoint with aurelia-api, you have the option to supply the URL for the endpoint. If you decide not to, it will default to the URL where the application is currently running.

## 2: Specific host

Most of the time, your API resides somewhere that's _not_ the current URL. Or, you're adding multiple endpoints, which all reside at a different URL. This method of registering a new endpoint allows you to specify _where_ it is.

## 3: With different defaults

This method allows you to specify different defaults to use for your endpoint, in this case headers. Every request made via this endpoint will now include the configured header `x` with value `"foo"`.

## 4: With no defaults

This method allows you to remove the defaults to use for your endpoint. This is needed for "multipart/form-data" requests as the content type will be set automatically if the transmitted body is of the type FormData.

## 5: Own configuration

As mentioned in the introduction, aurelia-api uses aurelia-fetch-client. If you wish to bypass the aurelia-api layer of configuration, simply supply a callback. The callback will receive the original configure instance.

[You can read more about that in the aurelia docs](http://aurelia.io/docs.html#/aurelia/fetch-client/latest/doc/api/class/HttpClientConfiguration).

## 6: Set default endpoint

This method allows you to set the default endpoint to use. This means, that when _getting_ an endpoint from aurelia-api, without supplying a name, we'll get this endpoint.

## 7: Chain

All methods return `this`, allowing you to chain the calls.

## 8: Set default base URL

All endpoints registered after this call will use this default base URL, rather than the current host URL. 
