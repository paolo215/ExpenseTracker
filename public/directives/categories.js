"use strict";

app.directive("categories", function() {
    console.log("test");
    return {
        restrict: "E",
        scope: {},
        controller: ["$scope", "$http", function mainController($scope, $http) {

            $scope.showForm = true;
            $scope.formData = {};
            

            $scope.clearForm = function() {
                $scope.formData = {};
            };

            $scope.getAllExpenses = function() {
                $http({
                    url: "/api/expenses/getAllExpenses",
                    method: "GET"
                }).then(function(success) {
                    console.log(success);
                }, function(err) {
                    // TODO: error handling
                });
            };

            $scope.submit = function() {
                console.log("submitting");
                // post data
                $http.post("/api/categories/addCategory", $scope.formData)
                    .then(function(success) {
                    console.log(success);

                    $scope.clearForm();
                }, function(err) {
            
                });
                // clear form
            };
            
            $scope.clearForm();

     }],
    templateUrl: "./templates/categories.html"

    }
});
