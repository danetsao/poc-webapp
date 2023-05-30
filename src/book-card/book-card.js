angular
  .module("app")

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
  var res = `<div ng-repeat="post in list_of_posts">
  <div ng-if="post['ID']===${post_id}">
    <div class="book-container">
    
      <div class="book-card">
        <p class="book-card-title">{{post['post_title']}}</p>
        <p class="date">{{post['post_date']}}</p>
        <p class="content-text">{{post['post_content']}}</p>
        <a href="#!/book-card/{{post['ID']}}">
          <button>Read More</button>
        </a>
        <a href="{{post['post_url']}}"">
          <button>See original WordPress Post</button>
        </a>
      </div>

      <div class="title-container">
        <p class="title">{{post['post_title']}}</p>
      </div>

    </div>
  </div>
</div>`;
return res;
}
