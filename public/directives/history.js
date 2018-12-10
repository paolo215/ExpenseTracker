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
                    var data = convertDataToPoints($scope.data);
                    createChart(data);
                }, function(err) {
                    // TODO: error handling
                });

            };

            $scope.submit = function() {
                console.log("submitting");
                $scope.getExpenses();

            };
    
            var convertDataToPoints = function(data) {
                var dataY = [];
                var dataX = [];
                data.forEach(function(x) {
                    var point = {};
                    dataY.push(x.cost);
                    var purchased = moment(x.purchased).format($scope.dateFormat);
                    dataX.push(purchased);
                });
                return {"cost": dataY, "updated": dataX}; 
            };

            var createChart = function(data) {
                var ctx = document.getElementById("chart").getContext("2d");
                var chart = new Chart(ctx, {
                    type: "line",
                    data: {
                        labels: data.updated,
                        datasets: [{
                            label: "time",
                            backgroundColor: "transparent",
                            borderColor: "#0088d4",
                            data: data.cost
                        }]
                    }
                });
                console.log(chart);

            };

            $scope.clearForm();
            $scope.formData.end = today.format($scope.dateFormat).toString();
            $scope.formData.start = today.clone().startOf("month").format($scope.dateFormat).toString();
            $scope.formData.start = moment("01/01/2018", $scope.dateFormat).format($scope.dateFormat).toString();
            $scope.submit();

     }],
    templateUrl: "./templates/history.html"

    }
});
