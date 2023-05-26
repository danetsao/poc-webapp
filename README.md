# poc-webapp

A basic angular app in style/structure of [UA Libraries](https://github.com/ualibweb).

See [onesearch_ui](https://github.com/ualibweb/oneSearch_ui), [staffdir_ui](https://github.com/ualibweb/staffdir_ui), [etc](https://github.com/ualibweb).


## Features
In this app we are using andular 1.3.0 to build a custom web page that using different featuees of angular+wordpress api.

- Custom rest api
    - With our [poc-plugin](https://github.com/danetsao/poc-plugin) we have created a custom post type called poc.
    - We register a custom rest api that allows us to get all the poc posts and get a single poc post by id.
- Directives

- Controllers

- Gruntfile.js
    - We configured the taskrunner grunt to run a local server and watch for changes in our files.
    - We also configured grunt to run jshint on our javascript files and in the future possibly run more tests and uglify and minify our files for distribution.

## Installation
Will not work locally unless you have wordpress running locally with the [poc-plugin](https://github.com/danetsao/poc-plugin) installed that supports this custom post type.
```
git clone https://github.com/danetsao/pos-webapp.git
```
Install dependencies
```
npm install
```
```
bower install
```
Then run grunt dev to start the server
```
grunt dev
```

