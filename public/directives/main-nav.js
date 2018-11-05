"use strict";

app.directive("mainNav", function() {
    return {
        restrict: "E",
        scope: {},
        controller: ["$scope", "$http", function mainController($scope, $http) {
            $scope.test = "test";

     }],
    templateUrl: "./templates/main-nav.html"

    }
});
