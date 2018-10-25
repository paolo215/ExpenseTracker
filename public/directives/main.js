"use strict";

app.directive("main", function() {
    console.log("test");
    return {
        restrict: "E",
        scope: {},
        controller: ["$scope", "$http", function mainController($scope, $http) {

            $scope.showForm = false;
            $scope.dateFormat = "L";

            $scope.submit = function() {
                // post data
                // clear form
            };

     }],
    templateUrl: "./templates/main.html"

    }
});
