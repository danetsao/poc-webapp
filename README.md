# poc-webapp

A basic angular app in style/structure of [UA Libraries](https://github.com/ualibweb).

See [onesearch_ui](https://github.com/ualibweb/oneSearch_ui), [staffdir_ui](https://github.com/ualibweb/staffdir_ui), [etc](https://github.com/ualibweb).


## Features
In this app we are using andular 1.8.2 to build a custom web page that using different featuees of angular+wordpress api.

- Custom rest api
    - With our [poc-plugin](https://github.com/danetsao/poc-plugin) we have created a custom post type called poc.
    - We register a custom rest api that allows us to get all the poc posts and get a single poc post by id.
- Routes
    - /#!/
        - Home page and default for any route not registered
    - /#!/book-dir
        - Displays a book directory which is a list of all the books
        - Contains links to each individual book card and the original wordpress post
    - /#!/book-card/
        - A simple page that just shows how to access the individual book card
    - /#!/book-card/:id
        - Displays the book card indiviudally by id


- Gruntfile.js
    - We configured the taskrunner grunt to run a local server and watch for changes in our files.
    - We also configured grunt to run jshint on our javascript files and in the future possibly run more tests and uglify and minify our files for distribution.


## Images

### Homepage - /#!/

![home](https://github.com/danetsao/poc-webapp/blob/main/images/poc-webapp-home.jpg)

### Book Directory - /#!/book-dir

![book-dir1](https://github.com/danetsao/poc-webapp/blob/main/images/poc-webapp-dir1.jpg)
![book-dir2](https://github.com/danetsao/poc-webapp/blob/main/images/poc-webapp-dir2.jpg)
![book-dir-no-books](https://github.com/danetsao/poc-webapp/blob/main/images/poc-webapp-no-books.jpg)

### Book Card - /#!/book-card/:post_id

![book-card1](https://github.com/danetsao/poc-webapp/blob/main/images/poc-webapp-card1.jpg)
![book-card2](https://github.com/danetsao/poc-webapp/blob/main/images/poc-webapp-card2.jpg)


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
grunt
```

