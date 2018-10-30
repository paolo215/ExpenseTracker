const router = require("express").Router();
const bodyparser = require("body-parser");
const moment = require("moment");
const dateFormat = "YYYY-MM-DD HH:mm:ss";


module.exports = function(path, db) {
    var exports = {};

    console.log("categories");
    router.use(bodyparser.json());
    router.use(bodyparser.urlencoded({
        extended: true,
        limit: 1024
    }));

    router.get("/getCategories", function(req, res) {
        res.send("get"); 

        res.status(200);
        res.end();

    });

    router.post("/addCategory", function(req, res) {
        var body = req.body;
        var message = "";
        var success = false;

        var insert = function() {
            var now = moment().format(dateFormat).toString();

            db.db.query("INSERT INTO categories (name, created, updated, comments) " +
                "VALUES(?, ?, ?, ?)", 
                [body.name, now, now, body.comment],
                function(err, results, fields) {
                    if(err == null) {
                        success = true;
                    } else {
                        console.log(err);
                    }
                    res.status(200);
                    res.send({
                        "message": message,
                        "success": success
                    });
                    res.end();
                });
        
        }; 
        console.log("inserting category");
        insert();
        
    });

    exports.router = router;
    return exports;
}

