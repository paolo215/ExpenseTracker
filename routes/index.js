
var router = require("express").Router();
var path = __dirname + "/..";



router.get("/", function(req, res) {
    res.status(302);
    res.sendFile("/index.html", {
        root: path + "/views"
    });
});



router.use("/api", require("./api"));


module.exports = router;
