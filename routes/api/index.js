var router = require("express").Router();

module.exports = function(path, db) {
    var exports = {};
    var expenses = require("./expenses.js")(path, db);
    var categories = require("./categories.js")(path, db);
    router.use("/expenses", expenses.router);
    router.use("/categories", categories.router);


    exports.router = router;
    return exports;
}   


