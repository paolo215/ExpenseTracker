
var router = require("express").Router();

module.exports = function(path, db) {
    var exports = {};
    router.get("/", function(req, res) {
        res.status(302);
        res.redirect("/dashboard");
    });

    router.get("/dashboard", function(req, res) {
        res.status(302);
        res.sendFile("/index.html", {
            root: path + "/views"
        });

    });


    router.get("/expenses", function(req, res) {
        res.status(302);
        res.sendFile("/expenses.html", {
            root: path + "/views"
        });

    });

    router.get("/categories", function(req, res) {
        res.status(302);
        res.sendFile("/categories.html", {
            root: path + "/views"
        });    
    });

    var api = require("./api")(path, db);
    router.use("/api", api.router);

    exports.router = router;
    return exports;
}


