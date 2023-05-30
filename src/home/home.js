angular.module("app")

    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/', {
            templateUrl: 'home/home.tpl.html',
            controller: 'HomeController',
        });
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    }
    ])
    .controller("HomeController", [
        "$scope",
        function ($scope) {
            $scope.title = "Welcome to the Home Page";
            $scope.directive_message = "Here we are in home controller";
            $scope.directive_message_tpl = "Here we are in home.tpl.html";
            // Add list of features, could have been done just plain html
            $scope.features = [
                {
                    "title": "Book Directory",
                    "description": "List of books, routing through !#/book-dir. Pulled from WP API.",
                },
                {
                    "title": "Individual Book Pages",
                    "description": "Routing through !#/book-card/:post_id. Displays individual book cards",
                },

            ]
        }
    ]);