"use strict";

app.directive("history", function() {
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

            $scope.clearForm = function() {
                $scope.formData = {};
                $scope.formData.message = "";
                $scope.formData.success = true;
                var today = getToday();
                $scope.formData.end = today;
                $scope.formData.start = today.clone().startOf("month");
            };


            $scope.getHistory = function() {
                console.log("Get history");
                $http.get("/api/expenses/getExpensesByDates", $scope.formData)
                    .then(function(success) {
                    console.log(success);
                    $scope.clearForm();

                }, function(err) {

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
