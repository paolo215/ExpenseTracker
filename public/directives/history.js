"use strict";

app.directive("history", function() {
    return {
        restrict: "E",
        scope: {},
        controller: ["$scope", "$http", function expenseController($scope, $http) {

            $scope.formData = {};
            $scope.showForm = false;
            $scope.dateFormat = "MM/DD/YYYY";
            $scope.data = [];

            $scope.clearForm = function() {
                $scope.formData = {};
                $scope.formData.message = "";
                $scope.formData.success = true;
                var today = moment();
                $scope.formData.end = today.format($scope.dateFormat).toString();
                $scope.formData.start = today.clone().startOf("month").format($scope.dateFormat).toString();

            }


            $scope.getExpenses = function() {
                console.log("Get history");

                $http({
                    url: "/api/expenses/getExpensesByDates",
                    method: "GET",
                    params: $scope.formData
                }).then(function(success) {
                    console.log(success);
                    $scope.clearForm();
                    $scope.data = success.data.data;
                }, function(err) {
                    // TODO: error handling
                });

            };

            $scope.submit = function() {
                console.log("submitting");
                $scope.getExpenses();

            };

            $scope.clearForm();
            $scope.getExpenses();

     }],
    templateUrl: "./templates/history.html"

    }
});
