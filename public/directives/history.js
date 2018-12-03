"use strict";

app.directive("history", function() {
    return {
        restrict: "E",
        scope: {},
        controller: ["$scope", "$http", function expenseController($scope, $http) {

            $scope.formData = {};
            $scope.showForm = true;
            $scope.dateFormat = "MM/DD/YYYY";
            $scope.data = [];
            var today = moment();


            $scope.clearForm = function() {
                $scope.formData.message = "";
                $scope.formData.success = true;
            }

            $scope.getExpenses = function() {
                console.log("Get history");
                $http({
                    url: "/api/expenses/getExpensesByDates",
                    method: "GET",
                    params: $scope.formData
                }).then(function(success) {
                    $scope.clearForm();
                    $scope.data = success.data.data;
                    // createChart();
                }, function(err) {
                    // TODO: error handling
                });

            };

            $scope.submit = function() {
                console.log("submitting");
                $scope.getExpenses();

            };

            $scope.clearForm();
            $scope.formData.end = today.format($scope.dateFormat).toString();
            $scope.formData.start = today.clone().startOf("month").format($scope.dateFormat).toString();
            //$scope.formData.start = moment("01/01/2018", $scope.dateFormat).format($scope.dateFormat).toString();
            $scope.submit();

     }],
    templateUrl: "./templates/history.html"

    }
});
