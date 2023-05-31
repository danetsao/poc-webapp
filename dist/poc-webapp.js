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
        $scope.auth = true;
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
};// Initialize the app module with ngRoute
angular.module('app', ['ngRoute']);;// Call the app module
angular
  .module("app")

  // Config routes
  .config([
    "$routeProvider",
    function ($routeProvider) {
      $routeProvider.when("/book-card", {
        templateUrl: "book-card/book-card.tpl.html",
        controller: "BookDirController",
      });
      $routeProvider.when("/book-card/:post_id", {
        controller: "BookDirController",
        template: function (params) {
          var res = render_book_card(params.post_id);
          return res;
        },
      });
      $routeProvider.otherwise({
        redirectTo: "/",
      });
    },
  ])

  // Add directive to render a book-card
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
    "$http",
    function ($scope, $http) {
      $scope.title = "Book Card Controller";
      $scope.directive_message = "Here we are in book-card controller";
      $scope.directive_message_tpl =
        "Through this route, you can see individual book cards";
    },
  ]);

/* Function to render a book card for a single book

There may be a better/more efficient way to get a single book from the list of books, 
ie wp rest to get indivudal post, or lookup with dictionary by id, 
but looping through each post and only rendering the one with post_id we are looking for works.

*/
function render_book_card(post_id) {
  var res = `
  <div class="blog-post">
    <div ng-repeat="post in list_of_posts">
      <div ng-if="post['ID']===${post_id}">
        <div class="individual-page">
          <a href="#!/book-dir">
            <button class="back-button">Back</button>
          </a>
          <p class="post-title">{{post['post_title']}}</p>
          <p class="post-date">{{post['post_date']}}</p>
          <p class="post-content">{{post['post_content']}}</p>
          <a href="{{post['post_url']}}">
            <button class="wp-button">See original WordPress Post</button>
          </a>
        </div>
      </div>
    </div>
  `;
  return res;
}
;// Define constant for the URL of the WP API
var URL = "http://localhost/sites/wordpress/?rest_route=/poc-plugin/v1/custom-posts";

// Get the module
angular
  .module("app")

  // Add config to set up routes, not necessary to use a sepearate function
  .config(config_routes)

  // Add directive to render list of all books
  .directive("book", function () {
    return {
      restrict: "EA",
      templateUrl: "book-directory/book-directory.tpl.html",
    };
  })

  // Add controller for the book directory
  .controller("BookDirController", [
    "$scope",
    "$http",
    function ($scope, $http) {
      $scope.title = "Book Directory Controller";
      $scope.directive_message = "Here we are in book-directory controller";

      // Define list of books in json format
      $scope.list_of_posts = [];
      $scope.books_found = false;

      // Get list of books from the WP API
      $http
        .get(URL)
        .then(function (response) {
          $scope.books_found = true;
          $scope.list_of_posts = format_data(response.data);
          $scope.num_posts = $scope.list_of_posts.length;
        })
        .catch(function (error) {
          console.error("Error getting books", error);
        });
      
    },
  ]);

// Define functions used in the book-directory

// Define function to set up routes
function config_routes($routeProvider){
  $routeProvider.when('/book-dir', {
    templateUrl: 'book-directory/book-directory.tpl.html',
    controller: 'BookDirController',
    controllerAs: 'vm'
  });
  $routeProvider.otherwise({
    redirectTo: '/'
  });
}

// Format the list of posts from the WP API
function format_data(list_of_posts) {
  for (var i = 0; i < list_of_posts.length; i++) {
    // Format content, ie remove <span> tags
    var content = list_of_posts[i].post_content;
    list_of_posts[i].post_content = content
      .replace("<span>", "")
      .replace("</span>", "");
    list_of_posts[i].post_content_preview = list_of_posts[i].post_content.substring(0, 100) + "...";

    // Format data
    var date = list_of_posts[i].post_date;
    list_of_posts[i].post_date = date.substring(0, 10);

    // Format url to link to post
    var post_name = list_of_posts[i].post_name;
    list_of_posts[i].post_url =
      "http://localhost/sites/wordpress/?book_collection_post=$" + post_name;
  }
  return list_of_posts;
}

/*
Example of one book json object from list
   {
        "ID": 80,
        "post_author": "1",
        "post_date": "2023-05-18 19:56:11",
        "post_date_gmt": "2023-05-18 19:56:11",
        "post_content": "<span>\"Life of Pi\" by Yann Martel is a breathtaking masterpiece that combines adventure, survival, and spirituality in an unforgettable tale. The novel tells the story of Pi, a young Indian boy who survives a shipwreck and finds himself stranded in the Pacific Ocean aboard a lifeboat with a Bengal tiger for company. In this incredible journey, Pi not only struggles with finding food and water but grapples with the universal themes of faith, suffering, and humanity. Martel's lyrical writing style and vivid descriptions make this book a page-turner, leaving you pondering its mesmeric message long after you turn the last page. It's a must-read for anyone seeking a thought-provoking and introspective narrative.</span>",
        "post_title": "Life of Pi",
        "post_excerpt": "",
        "post_status": "publish",
        "comment_status": "closed",
        "ping_status": "closed",
        "post_password": "",
        "post_name": "life-of-pi",
        "to_ping": "",
        "pinged": "",
        "post_modified": "2023-05-18 19:56:11",
        "post_modified_gmt": "2023-05-18 19:56:11",
        "post_content_filtered": "",
        "post_parent": 0,
        "guid": "http://localhost/sites/wordpress/?post_type=book_collection_post&#038;p=80",
        "menu_order": 0,
        "post_type": "book_collection_post",
        "post_mime_type": "",
        "comment_count": "0",
        "filter": "raw"
    }
*/;// Call the module that was defined in app.js
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