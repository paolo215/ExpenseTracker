"use strict";

app.directive("expenses", function() {
    console.log("test");
    return {
        restrict: "E",
        scope: {},
        controller: ["$scope", "$http", function expenseController($scope, $http) {

            var getToday = function() {
                return moment().format("MM/DD/YYYY").toString();
            };

            $scope.formData = {};
            $scope.showForm = false;
            $scope.selected = "";
            $scope.categories = [];

            $scope.clearForm = function() {
                $scope.formData = {};
                $scope.formData.date = getToday();
                $scope.formData.message = "";
                $scope.formData.success = true;
            };

            $scope.getAllExpenses = function() {
                console.log("Get all expenses");
                $http.get("/api/expenses/getAllTransactions")
                    .then(function(success) {
                    console.log(success);
                }, function(err) {

                });
            };

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

                $http.post("/api/expenses/addTransaction", $scope.formData)
                    .then(function(success) {
                    $scope.clearForm();
                    $scope.formData.message = success.data.message;
                }, function(err) {
            
                });
                // clear form
            };

            $scope.clearForm();
            $scope.getCategories();
            $scope.getAllExpenses();

     }],
    templateUrl: "./templates/expenses.html"

    }
});
