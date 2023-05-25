// Get the module
angular.module('app')
    
    // Add directive to render list of all books
    .directive('book', function() {
        console.log('book-directory directive');
        return {
        restrict: 'EA',
        templateUrl: 'book-directory/book-directory.tpl.html'
        };
    })

    // Add controller for the book directory
    .controller('BookDirController', ['$scope', function($scope) {
        $scope.title = 'Book Directory';
        $scope.directive_message = "Here we are in book-directory directive";
        
        // Define statis list of books in json format
        $scope.books_json = [
            {
              "title": "The Catcher in the Rye",
              "author": "J.D. Salinger",
              "isbn": "0316769177"
            },
            {
              "title": "To Kill a Mockingbird",
              "author": "Harper Lee",
              "isbn": "0446310786"
            },
            {
              "title": "1984",
              "author": "George Orwell",
              "isbn": "0451524934"
            },
            {
              "title": "The Great Gatsby",
              "author": "F. Scott Fitzgerald",
              "isbn": "0743273567"
            },
            {
              "title": "One Hundred Years of Solitude",
              "author": "Gabriel Garcia Marquez",
              "isbn": "0060883286"
            }
          ];
    }]);