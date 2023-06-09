// Define constant for the URL of the WP API
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
    "bookFactory",
    function ($scope, $bookFactory) {
      $scope.title = "Book Directory Controller";
      $scope.directive_message = "Here we are in book-directory controller";

      // Define list of books in json format
      $scope.list_of_posts = [];
      $scope.books_found = false;
      $scope.num_posts = 0;

      $scope.searchQuery = "";

      // Custom filter function
      $scope.searchFilter = function(post) {
        var query = $scope.searchQuery.toLowerCase();
    
        // Check if the book title or author contains the search query
        return post.post_title.toLowerCase().indexOf(query) !== -1 ||
               post.post_author.toLowerCase().indexOf(query) !== -1;
      };

      // Get list of books from the book factory and WP API
      $bookFactory.getBooks()
      .then(function (books) {
        $scope.books_found = true;
        $scope.list_of_posts = books;
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