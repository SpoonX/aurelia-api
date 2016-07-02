# Installation

## Aureli-Cli

Run `npm i aurelia-api` from your project root and add `aurelia-api` to the `build/bundles/dependencies` section of `aurelia-project/aurelia.json`.

## Jspm

Run `jspm i aurelia-api`

If the installation results in having forks, try resolving them by running:

```sh
jspm inspect --forks
jspm resolve --only registry:package-name@version
```

E.g.

```sh
jspm inspect --forks
>     Installed Forks
>         npm:aurelia-dependency-injection 1.0.0-beta.1.2.3 1.0.0-beta.2.1.0

jspm resolve --only npm:aurelia-dependency-injection@1.0.0-beta.2.1.0
```

## Webpack

Run `npm i aurelia-api` from your project root.

## Typescript

Add to your `typings.json`

```js
"aurelia-api": "github:spoonx/aurelia-api",
```

and run `typings i`

or run

```sh
typings i github:spoonx/aurelia-api
```

Aurelia-api uses [extend](https://www.npmjs.com/package/extend). To get typings for extend run:

```sh
typings i dt~extend --global
```
