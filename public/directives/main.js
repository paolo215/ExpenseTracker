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
                console.log("submitting");
                // post data
                $http.post("/api/expenses/addExpenses", $scope.formData)
                    .then(function(success) {
                    console.log(success);
                }, function(err) {

                });
                // clear form
            };

     }],
    templateUrl: "./templates/main.html"

    }
});
