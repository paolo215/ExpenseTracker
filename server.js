"use strict";

var express = require("express");
var session = require("express-session");

var app = express();

var dbHandler = require("./db.js");
dbHandler.init();
var path = __dirname + "/public";

var routes = require("./routes")(__dirname + "/public", dbHandler);


app.use(express.static(path));
app.use(routes.router);
app.listen(10000);
