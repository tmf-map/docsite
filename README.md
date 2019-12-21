# Docsite

[![Netlify Status][netlify-image]][netlify-url] [![Dependencies][dependencies-image]][dependencies-url]

A learning website where you can explore full stack technology.

## Table of Contents

- [Installation](#installation)
- [Local Development](#local-development)
  - [Get Started](#get-started)
  - [Format Document](#format-document)
  - [Commit and PR Title](#commit-and-pr-title)
- [Deployment](#deployment)
- [Thanks](#thanks)

## Installation

Before getting started, please make sure you have the right development environment:

- Node.js version >= 11.10.1 (you can use [nvm](https://github.com/nvm-sh/nvm) to manage node.js)
- Install [yarn](https://yarnpkg.com/en/docs/install#mac-stable) (dependency management for node.js modules)

Then run the below command to install dependencies:

```sh
yarn # or yarn install
```

## Local Development

### Get Started

```sh
yarn start
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

### Format Document

All files (`.md`/`.js`) will be formatted automatically when commit changes. Please make sure you have installed all dependencies (`yarn`) otherwise the files won't be formatted automatically.

### Commit and PR Title

You can commit as following pattern which is not required:

```text
type(scope): description
```

But make sure the PR title follow above pattern and common types can be:

- add
- update
- fix
- build
- revert

For real world examples, please see [commit logs](https://github.com/ThinkBucket/docsite/commits/master).

## Deployment

The website can be deployed automatically when master branch has been updated.

## Thanks

- [Docusaurus 2](https://github.com/facebook/docusaurus): a modern static website generator.
- [Netlify](https://www.netlify.com/): all-in-one platform for automating modern web projects.

[netlify-image]: https://api.netlify.com/api/v1/badges/adf81997-fa00-404e-a542-24a510d41d82/deploy-status
[dependencies-image]: https://badgen.net/david/dep/ThinkBucket/docsite
[netlify-url]: (https://app.netlify.com/sites/thinkbucket/deploys)
[dependencies-url]: https://david-dm.org/ThinkBucket/docsite
