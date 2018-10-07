"use strict";

var express = require("express");
var session = require("express-session");

var app = express();

var dbHandler = require("./db.js");
var path = __dirname;
var routes = require("./routes");

app.use(routes);
app.listen(10000);
