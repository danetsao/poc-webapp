angular.module('app')

    .directive('book_profile', function() {
        console.log('book-profile directive');
        return {
        restrict: 'EA',
        templateUrl: 'book-profile/book-profile.tpl.html'
        };
    }
);