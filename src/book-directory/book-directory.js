// Book directory controller

angular.module('app')

    .directive('book', function() {
        console.log('book-directory directive');
        return {
        restrict: 'EA',
        templateUrl: 'book-directory/book-directory.tpl.html'
        };
    })

    .controller('BookDirController', ['$scope', function($scope) {
        $scope.title = 'Book Directory';
        $scope.directive_message = "Here we are in book-directory directive";
    }]);
