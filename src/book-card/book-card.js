// Director for the book directory

angular.module('app')

    .directive('card', function() {
        console.log('book-card directive');
        return {
        restrict: 'EA',
        templateUrl: 'book-card/book-card.tpl.html'
        };
    })

    .controller('BookCardController', ['$scope', function($scope) {
        $scope.title = 'Book Card';
        $scope.directive_message = "Here we are in book-directory";
    }]);
