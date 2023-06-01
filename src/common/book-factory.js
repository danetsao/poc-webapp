var app = angular.module('app');

app.factory('bookFactory', ['$http', function($http) {
    var baseUrl = 'http://localhost/sites/wordpress/?rest_route=/poc-plugin/v1/custom-posts';
  
    // Define the factory object
    var factory = {};
  
    // Function to get a list of books
    factory.getBooks = function() {
      return $http.get(baseUrl)
        .then(function(response) {
          return response.data;
        })
        .catch(function(error) {
          console.log('Error fetching books:', error);
          return [];
        });
    };
  
    // Function to get a single book by ID
    factory.getBookById = function(bookId) {
      var url = baseUrl + '/' + bookId;
      return $http.get(url)
        .then(function(response) {
          return response.data;
        })
        .catch(function(error) {
          console.log('Error fetching book:', error);
          return null;
        });
    };
  
  
    // Return the factory object
    return factory;
  }]);
  