angular.module("app")

    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/book-card', {
            templateUrl: 'book-card/book-card.tpl.html',
            controller: 'BookCardController',
        });
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    }])

    // Add directive to render a book card
    .directive("card", function () {
    console.log("book-card directive");
    return {
        restrict: "EA",
        templateUrl: "book-card/book-card.tpl.html",
    };
    })

    // Add controller for the book card
    .controller("BookCardController", [
    "$scope",
    function ($scope) {
        $scope.title = "Book Card Controller";
        $scope.directive_message = "Here we are in book-card controller";
        $scope.directive_message_tpl = "Here we are in book-card.tpl.html";
    },
    ]);
