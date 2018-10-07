const router = require("express").Router();

router.get("/getExpenses", function(req, res) {
    res.status(200);
    res.end();

});


module.exports = router;
