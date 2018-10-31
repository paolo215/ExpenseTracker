"use strict";

app.directive("expensesForm", function() {
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
            $scope.showForm = true;
            $scope.categories = [];

            $scope.clearForm = function() {
                $scope.formData = {};
                $scope.formData.date = getToday();
                $scope.formData.message = "";
                $scope.formData.success = true;
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

                $http.post("/api/expenses/addExpense", $scope.formData)
                    .then(function(success) {
                    $scope.clearForm();
                    $scope.formData.message = success.data.message;
                }, function(err) {
            
                });
                // clear form
            };

            $scope.clearForm();
            $scope.getCategories();
            console.log($scope.formData.message);

     }],
    templateUrl: "./templates/expenses-form.html"

    }
});
