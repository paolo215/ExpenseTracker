
var router = require("express").Router();

module.exports = function(path, db) {
    var exports = {};
    router.get("/", function(req, res) {
        res.status(302);
        res.sendFile("/index.html", {
            root: path + "/views"
        });
    });


    var api = require("./api")(path, db);
    router.use("/api", api.router);

    exports.router = router;
    return exports;
}


