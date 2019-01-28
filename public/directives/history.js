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
                    url: "/api/expenses/getTransactionsByDates",
                    method: "GET",
                    params: $scope.formData
                }).then(function(success) {
                    $scope.clearForm();
                    $scope.data = success.data.data;

                    // chart creation starts here
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
                var expensesByDate = {};
                var dataY = [];
                var dataX = [];
                data.forEach(function(x) {
                    if(! expensesByDate.hasOwnProperty(x.purchased)) {
                        expensesByDate[x.purchased] = x.cost;
                    } else {
                        expensesByDate[x.purchased] += x.cost;
                    }
                });

                Object.keys(expensesByDate).forEach(function(key) {
                    dataX.push(moment(key, $scope.dateFormat));
                    dataY.push(expensesByDate[key]);
                });


                return {"cost": dataY, "updated": dataX}; 

            };

            var createChart = function(data) {
                var ctx = document.getElementById("chart").getContext("2d");
                var chart = new Chart(ctx, {
                    type: "bar",
                    data: {
                        labels: data.updated,
                        datasets: [{
                            label: "Expense",
                            backgroundColor: "#cccccc",
                            borderColor: "#0088d4",
                            data: data.cost
                        }]
                    },
                    options: {
                        scales: {
                            xAxes: [{
                                type: 'time',
                                time: {
                                    unit: 'day',
                                    displayFormats: {
                                        day: 'MMM D YYYY'
                                    },
                                },
                                ticks: {
                                    min: 0,
                                },
                                distribution: 'linear'
                            }],
                            yAxes: [{
                            }]
                        }
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
