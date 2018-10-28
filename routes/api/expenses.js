const router = require("express").Router();
const bodyparser = require("body-parser");
const moment = require("moment");
const dateFormat = "MM/DD/YYYY";


module.exports = function(path, db) {
    var exports = {};

    console.log("expenses");
    router.use(bodyparser.json());
    router.use(bodyparser.urlencoded({
        extended: true,
        limit: 1024
    }));

    router.get("/getExpenses", function(req, res) {
        res.send("get"); 

        res.status(200);
        res.end();

    });

    router.post("/addExpenses", function(req, res) {
        var body = req.body;
        var message = "";
        var success = false;

        var insert = function() {
            var date = moment().toString();
            db.db.query("INSERT INTO expenses (title, purchaseDate, cost, created, " +
                "updated, comments) " +
                "VALUES(?, ?, ?, ?, ?, ?)", 
                [body.title, body.purchaseDate, body.cost, date, date, body.comments],
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
        console.log("inserting expenses");
        insert();
        
    });

    exports.router = router;
    return exports;
}

