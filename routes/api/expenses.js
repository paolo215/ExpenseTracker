const router = require("express").Router();
const bodyparser = require("body-parser");

console.log("expenses");
router.use(bodyparser.json());
router.use(bodyparser.urlencoded({
    extended: true,
    limit: 1024
}));

router.get("/expenses", function(req, res) {
    res.status(200);
    res.end();

});

router.post("/expenses", function(req, res) {
    res.status(200);
    res.end();
    
});


module.exports = router;
