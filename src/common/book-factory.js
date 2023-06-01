var app = angular.module("app");

app.factory("bookFactory", [
  "$http",
  function ($http) {
    var BASEURL =
      "http://localhost/sites/wordpress/?rest_route=/poc-plugin/v1/custom-posts";
    var BASEURLID =
      "http://localhost/sites/wordpress/?rest_route=/poc-plugin/v1/custom-post";

    // Define the factory object
    var factory = {};

    // Function to get a list of books
    factory.getBooks = function () {
      return $http
        .get(BASEURL)
        .then(function (response) {
          var data = formatData(response.data);
          return data;
        })
        .catch(function (error) {
          console.log("Error fetching books:", error);
          return [];
        });
    };

    // Function to get a single book by ID
    factory.getBookById = function (bookId) {
      var url = BASEURLID + "/" + bookId;
      return $http
        .get(url)
        .then(function (response) {
          var data = formatData(response.data);
          return data;
        })
        .catch(function (error) {
          console.log("Error fetching book:", error);
          return null;
        });
    };

    // Return the factory object
    return factory;
  },
]);

function formatData(list_of_posts) {
    // Format content, ie remove <span> tags
    for (var i = 0; i < list_of_posts.length; i++) {
        var content = list_of_posts[i].post_content;
        list_of_posts[i].post_content = content
        .replace("<span>", "")
        .replace("</span>", "");
        list_of_posts[i].post_content_preview =
        list_of_posts[i].post_content.substring(0, 100) + "...";

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
