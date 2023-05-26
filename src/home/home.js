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
            $scope.features = [
                {
                    "title": "Feature 1",
                    "description": "I will write these later",
                },
                {
                    "title": "Feature 2",
                    "description": "I will write these later",
                },
                {
                    "title": "Feature 3",
                    "description": "I will write these later",
                },
            ]
        }
    ]);