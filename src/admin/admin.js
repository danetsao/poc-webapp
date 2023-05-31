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
        $scope.title = "Admin Page";
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