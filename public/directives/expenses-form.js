"use strict";

app.directive("expenses-form", function() {
    console.log("test");
    return {
        restrict: "E",
        scope: {},
        controller: ["$scope", "$http", function mainController($scope, $http) {

            $scope.showForm = false;
            $scope.showForm = true;

            $scope.submit = function() {
                console.log("submitting");
                // post data

                $http.post("/api/expenses/addExpense", $scope.formData)
                    .then(function(success) {
                    console.log(success);
                }, function(err) {
            
                });
                // clear form
            };

     }],
    templateUrl: "./templates/expenses-form.html"

    }
});
