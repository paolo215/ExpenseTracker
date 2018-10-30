"use strict";

app.directive("expensesForm", function() {
    console.log("test");
    return {
        restrict: "E",
        scope: {},
        controller: ["$scope", "$http", function mainController($scope, $http) {

            $scope.showForm = false;
            $scope.selected = "";
            $scope.showForm = true;
            $scope.categories = [];
            $scope.getCategories = function() {
                console.log("Get categories");
                $http.get("/api/categories/getCategories")
                    .then(function(success) {
                    $scope.categories = success.data.data;
                }, function(err) {

                });
            };

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

            $scope.getCategories();

     }],
    templateUrl: "./templates/expenses-form.html"

    }
});
