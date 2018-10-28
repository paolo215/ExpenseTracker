var router = require("express").Router();

module.exports = function(path, db) {
    var exports = {};
    router.use("/", require("./expenses.js"));


    exports.router = router;
    return exports;
}   


