// Call the module that was defined in app.js
angular.module("app")

    // Add config to set up routes
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
    // Add controller for the home page
    .controller("HomeController", [
        "$scope",
        function ($scope) {
            // All of this is for the homepage and is unnecessary, but I left it in for example usage of angular features
            $scope.title = "Welcome to the Home Page";
            $scope.directive_message = "Here we are in home controller";
            $scope.directive_message_tpl = "Here we are in home.tpl.html";
            $scope.dropdown = false;


            $scope.toggleDropdown = function () {
                $scope.dropdown = !$scope.dropdown;
            };

            // Add list of features, could have been done just plain html
            $scope.features = [
                {
                    "title": "Book Directory",
                    "title_link": "#!/book-dir",
                    "description": [
                        "Book posts are pulled from WP API.",
                        "Routing through /#!/book-dir.",
                        "Contains links to both the book-card page on this app, and the original wordpress post."
                    ],
                },
                {
                    "title": "Individual Book Pages",
                    "title_link": "#!/book-card",
                    "description": [
                        "Displays individual book cards by id.",
                        "Routing through /#!/book-card/:post_id.",
                        "Duplicate of book display in the book-dir, but demonstrates routes."
                    ],
                },

            ];
        }
    ]);