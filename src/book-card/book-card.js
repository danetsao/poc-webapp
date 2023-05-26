angular.module("app")

    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/book-card', {
            templateUrl: 'book-card/book-card.tpl.html',
            controller: 'BookCardController',
        });
        $routeProvider.when('/book-card/:post_id', {
            template: function(params) {
                return '<div><h1>Book Card for post: ' + params.post_id + '</h1></div>';
            }
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
