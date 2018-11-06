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
                    $scope.clearForm();
                    $scope.data = success.data.data;
                    console.log($scope.data);
                }, function(err) {
                    // TODO: error handling
                });

            };


            $scope.submit = function() {
                console.log("submitting");
                $scope.getExpenses();

            };

            var margin  = {top: 40, right: 40, bottom: 40, left: 40};
            var width = 960 - margin.left - margin.right;
            var height = 500 - margin.top - margin.bottom;
            var parseDate = d3.timeFormat("%m/%d/%y");
        
            var x = d3.scaleTime().range([0, width]);
            var y = d3.scaleLinear().range([height, 0]);

            $scope.data = d3.range(5).map(function(d) { return {"cost": d3.randomUniform(1)()}});
            console.log($scope.data);

            var point = d3.line()
                .x(function(d) { return x(d.cost); })
                .y(function(d) { return y(d.cost); });

            $scope.updateGraph = function() {
                var total = 0;
                var svg = d3.select("body")
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + 50 + "," + 50 + ")");

                // x axis
                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0, " + height + ")")
                    .call(d3.axisBottom(x).ticks(10).tickFormat(parseDate))


                // y axis
                svg.append("g")
                    .attr("class", "y axis")
                    .call(d3.axisLeft(y));

                svg.append("path")
                    .datum($scope.data)
                    .attr("class", "line")
                    .attr("id", "blueLine")
                    .attr("d", point);

                svg.selectAll(".dot")
                    .data($scope.data)
                    .enter().append("circle")
                    .attr("class", "dot")
                    .attr("cx", function(d, i) { return x(i) })
                    .attr("cy", function(d) { return y(d.cost) })
                    .attr("r", 5)
                    .on("mouseover", function(a, b, c) {
                        d3.select(this)
                            .attr("class", "focus")
                    })
            
            };


            $scope.clearForm();
            $scope.updateGraph();

     }],
    templateUrl: "./templates/history.html"

    }
});
