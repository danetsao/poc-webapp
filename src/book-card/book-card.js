// Director for the book directory

angular.module('poc-webapp')

    .controller('BookDirController', ['$scope', function($scope) {
        $scope.title = 'Book Directory';
    }]);
