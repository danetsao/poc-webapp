// Get the module
angular
  .module("app")

  // Add config to set up routes, not necessary to use a sepearate function
  .config(config_routes)

  // Add controller for the book directory
  .controller("AdminController", [
    "$scope",
    "$http",
    function ($scope, $http) {
        $scope.auth = false;
        $scope.title = "Admin Page";

        $scope.login = function() {
            console.log('Trying to login with password: ' + $scope.password);
            var password = $scope.password;
            if (password === '123') {
                alert('Successfully logged in.');
                $scope.auth = true;
            }
            else {
                alert('Wrong Password. Try again.');
            }
          }

        $scope.logout = function() {
            $scope.auth = false;
        }

        


    },
  ]);

// Define function to set up routes
function config_routes($routeProvider){
  $routeProvider.when('/admin', {
    templateUrl: 'admin/admin.tpl.html',
    controller: 'AdminController',
    controllerAs: 'vm'
  });
  $routeProvider.otherwise({
    redirectTo: '/'
  });
}