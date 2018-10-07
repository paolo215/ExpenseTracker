const router = require("express").Router();

router.use("/expenses", require("./expenses.js"));

router.post("/login", function(req, res) {
    res.status(200);
});


module.exports = router;
