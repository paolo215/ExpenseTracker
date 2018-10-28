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
    router.get("/", function(req, res) {
        res.send("hi");
        res.status(200);
        res.end();
    });


    router.get("/get", function(req, res) {
        

        res.status(200);
        res.end();

    });

    router.post("/expenses", function(req, res) {
        var body = req.body;
        var message = "";
        var success = false;

        var insert = function() {
            var date = moment(dateFormat).toString();
            db.db.run("INSERT INTO expenses (title, purchaseDate, cost, created, " +
                "updated, comments) " +
                "VALUES(:title, :purchaseDate, :cost, :created, :updated, :comments)",
                {
                    ":title": body.title,
                    ":purchaseDate": body.purchaseDate,
                    ":cost": body.cost,
                    ":created": date,
                    ":updated": date,
                    ":comments": body.comments
                }, function(err) {
                    if(err == null) {
                        success = true;

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

