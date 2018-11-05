const router = require("express").Router();
const bodyparser = require("body-parser");
const moment = require("moment");
const dateFormat = "YYYY-MM-DD HH:mm:ss";


module.exports = function(path, db) {
    var exports = {};

    console.log("expenses");
    router.use(bodyparser.json());
    router.use(bodyparser.urlencoded({
        extended: true,
        limit: 1024
    }));

    router.get("/getAllExpenses", function(req, res) {
        var success = false;
        var message = "";

        var get = function() {
            db.db.query("SELECT * FROM expenses",
                function(err, results, fields) {
                    if(err == null) {
                        success = true;
                    } else {
                        console.log(err);
                    }
                    res.status(200);
                    res.send({
                        "message": message,
                        "success": success,
                        "data": results
                    });
                });
        };
        get();
    });


    router.get("/getExpensesByDates", function(req, res) {
        var query = req.query;
        var message = "";
        var success = false;

        var get = function() {
            var start = query.start;
            var end = query.end;
            console.log(query.start);
            console.log(query.end);
            db.db.query("SELECT * FROM expenses WHERE purchased >= STR_TO_DATE(?, '%m/%d/%Y') " +  
                " AND purchased <= STR_TO_DATE(?, '%m/%d/%Y')", [start, end],
                function(err, results, fields) {
                    if(err == null) {
                        success = true;
                    } else {
                        console.log(err);
                    }
                    console.log(results);

                    res.status(200);
                    res.send({
                        "message": message,
                        "success": success,
                        "data": results
                    });
        
                });
        };

        get();
    });


    router.post("/addExpense", function(req, res) {
        var body = req.body;
        var message = "";
        var success = false;

        var insert = function() {
            var currentDate = moment().format(dateFormat).toString();
            var purchaseDate = moment(body.date).format(dateFormat).toString();
            console.log(currentDate);
            console.log(body);

            // TODO: verify and sanitize user inputs
            db.db.query("INSERT INTO expenses (title, purchaseDate, cost, created, " +
                "updated, comments, categoryId) " +
                "VALUES(?, ?, ?, ?, ?, ?, ?)", 
                [body.title, body.purchaseDate, body.cost, currentDate, currentDate, body.comments, body.category.categoryId],
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

