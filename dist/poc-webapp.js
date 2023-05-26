// Initialize the app
angular.module('app', []);;angular.module("app")

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
    },
    ]);
;// Get the module
const URL =
  "http://localhost/sites/wordpress/?rest_route=/poc-plugin/v1/custom-posts";

angular
  .module("app")


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
