"use strict";

app.directive("history", function() {
    console.log("test");
    return {
        restrict: "E",
        scope: {},
        controller: ["$scope", "$http", function expenseController($scope, $http) {

            $scope.formData = {};
            $scope.showForm = false;
            $scope.dateFormat = "MM/DD/YYYY";

            $scope.clearForm = function() {
                $scope.formData = {};
                $scope.formData.message = "";
                $scope.formData.success = true;
                var today = moment();
                $scope.formData.end = today.format($scope.dateFormat).toString();
                $scope.formData.start = today.clone().startOf("month").format($scope.dateFormat).toString();

                console.log($scope.formData.start);
                console.log($scope.formData.end);
            };


            $scope.getHistory = function() {
                console.log("Get history");

                $http({
                    url: "/api/expenses/getExpensesByDates",
                    method: "GET",
                    params: $scope.formData
                }).then(function(success) {
                    console.log(success);
                    $scope.clearForm();
                }, function(err) {
                    // TODO: error handling
                });

            };

            $scope.submit = function() {
                console.log("submitting");
                $scope.getHistory();

            };

            $scope.clearForm();
            $scope.getHistory();

     }],
    templateUrl: "./templates/history.html"

    }
});
