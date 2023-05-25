// Director for the book directory

angular.module('app')

    // Add directive to render a book card
    .directive('card', function() {
        console.log('book-card directive');
        return {
        restrict: 'EA',
        templateUrl: 'book-card/book-card.tpl.html'
        };
    })

    // Add controller for the book card
    .controller('BookCardController', ['$scope', function($scope) {
        $scope.title = 'Book Card';
        $scope.directive_message = "Here we are in book-card controller";
    }]);
