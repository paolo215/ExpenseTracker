"use strict";

var express = require("express");
var session = require("express-session");

var app = express();

var dbHandler = require("./db.js");
var path = __dirname;
var routes = require("./routes")(__dirname + "/public");

app.use(routes.router);
app.listen(10000);
