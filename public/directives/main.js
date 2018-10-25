"use strict";

app.directive("main", function() {
    console.log("test");
    return {
        restrict: "E",
        scope: {},
        controller: [function mainController() {

     }],
    templateUrl: "./templates/main.html"

    }
});
