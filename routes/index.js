
var router = require("express").Router();

module.exports = function(path) {
    var exports = {};

    router.get("/", function(req, res) {
        res.status(302);
        res.sendFile("/index.html", {
            root: path + "/views"
        });
    });



    router.use("/api", require("./api"));

    exports.router = router;

    return exports;
}


