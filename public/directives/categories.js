"use strict";

app.directive("categories", function() {
    console.log("test");
    return {
        restrict: "E",
        scope: {},
        controller: ["$scope", "$http", function mainController($scope, $http) {

            $scope.showForm = false;
            $scope.formData = {};
            $scope.selectedCategory = "";
            $scope.types = ["Income", "Expense"];
            $scope.data = {};
            

            $scope.clearForm = function() {
                $scope.formData = {};
                $scope.formData.type = $scope.types[0];
            };

            $scope.getAllTransactionsByCategory = function() {
                $http({
                    url: "/api/expenses/getTransactionsByCategory",
                    method: "GET",
                    params: $scope.selectedCategory
                }).then(function(success) {
                    console.log(success);
                }, function(err) {
                    // TODO: error handling
                });
            };

            $scope.getAllAndProcessTransactions = function() {
                $http({
                    url: "/api/expenses/getAllTransactions",
                    method: "GET"
                }).then(function(success) {
                    var data = success.data.data;
                    processTransactions(data);
                }, function(err) {
                    // TODO: error handling
                });
            };

            var processTransactions = function(data) {
                console.log(data);
                data = segregateByTypes(data);
                console.log(data);
            };

            var segregateByTypes = function(data) {
                var output = {};
                data.forEach(function(x) {
                    if(output.hasOwnProperty(x.type) === false) {
                        output[x.type] = []; 
                    }
                    output[x.type].push(x);
                });
                return output;
            };

            $scope.submit = function() {
                console.log("submitting");
                // post data
                $http.post("/api/categories/addCategory", $scope.formData)
                    .then(function(success) {
                    console.log(success);

                    $scope.clearForm();
                }, function(err) {
            
                });
                // clear form
            };
            
            $scope.clearForm();
            $scope.getAllAndProcessTransactions();

     }],
    templateUrl: "./templates/categories.html"

    }
});
