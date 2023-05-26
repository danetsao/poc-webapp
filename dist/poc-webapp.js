// Initialize the app
angular.module('app', ['ngRoute']);;angular
  .module("app")

  .config([
    "$routeProvider",
    function ($routeProvider) {
      $routeProvider.when("/book-card", {
        templateUrl: "book-card/book-card.tpl.html",
        controller: "BookCardController",
      });
      $routeProvider.when("/book-card/:post_id", {
        template: async function (params) {
          let data = await render_book_card(params.post_id);
          return data;
        },
      });
      $routeProvider.otherwise({
        redirectTo: "/",
      });
    },
  ])

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
    "$http",
    function ($scope, $http) {
      $scope.title = "Book Card Controller";
      $scope.directive_message = "Here we are in book-card controller";
      $scope.directive_message_tpl =
        "Through this route, you can see individual book cards";
    },
  ]);

function get_post_data(post_id) {
  // Get the post data from the WP API
  let post_data = {};
  let u =
    "http://localhost/sites/wordpress/?rest_route=/poc-plugin/v1/custom-post/post_id";
  $http
    .get(u)
    .then(function (response) {
      post_data = response.data;
    })
    .catch(function (error) {
      console.error("Error getting post", error);
    });
  return post_data;
}

// Render a book card
function render_book_card(post_id) {
  console.log(`1. render_book_card(${post_id})`);
  return "<h1>This should be data on post: " + post_id + ".</h1>";
  // Get the post data from the WP API
  let post = get_post_data(post_id);

  let res =
    `
  <div class="book-card">
    <p class="book-card-title"></p>
    <p class="date">` +
    post["post_date"] +
    `</p>
    <p class="content-text">` +
    post["post_content"] +
    `</p>
    <a href="#!/book-card/` +
    post["post_url"] +
    `">
      <button>Read More</button>
    </a>
    <a href="` +
    post[post_url] +
    `"">
      <button>See original WordPress Post</button>
    </a>
  </div>

  <div class="title-container">
    <p class="title">` +
    post["post_title"] +
    `</p>
  </div>
  `;
  return res;
}
;// Get the module
const URL =
  "http://localhost/sites/wordpress/?rest_route=/poc-plugin/v1/custom-posts";

function config($routeProvider){
  $routeProvider.when('/book-dir', {
    templateUrl: 'book-directory/book-directory.tpl.html',
    controller: 'BookDirController',
    controllerAs: 'vm'
  });
  $routeProvider.otherwise({
    redirectTo: '/'
  });
};

angular
  .module("app")

  .config(config)

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

      // Define statis list of books in json format
      $scope.list_of_posts = [];

      // Get list of books from the WP API
      $http
        .get(URL)
        .then(function (response) {
          $scope.list_of_posts = format_data(response.data);
          $scope.num_posts = $scope.list_of_posts.length;
        })
        .catch(function (error) {
          console.error("Error getting books", error);
        });
      
    },
  ]);

// Format the list of posts from the WP API
function format_data(list_of_posts) {
  for (let i = 0; i < list_of_posts.length; i++) {
    // Format content, ie remove <span> tags
    let content = list_of_posts[i]["post_content"];
    list_of_posts[i]["post_content"] = content
      .replace("<span>", "")
      .replace("</span>", "");

    // Format data
    let date = list_of_posts[i]["post_date"];
    list_of_posts[i]["post_date"] = date.substring(0, 10);

    // Format url to link to post
    let post_name = list_of_posts[i]["post_name"];
    list_of_posts[i]["post_url"] =
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
*/
;angular.module("app")

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