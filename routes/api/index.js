const router = require("express").Router();

router.use("/", require("./expenses.js"));


module.exports = router;
