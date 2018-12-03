const webpack = require("webpack");
const path = require("path");
const copyWebpackPlugin = require("copy-webpack-plugin");

const frontend = require("./frontend.js");
var data = [];
Object.keys(frontend).forEach(function(key) {
    frontend[key].forEach(function(x) {
        var mapping = {
            from: path.resolve(__dirname, "./node_modules/" + x),
            to: path.resolve(__dirname, "./public/static/" + key + "/")
        };
        data.push(mapping);
    });
});
module.exports = {

    entry: {
        app: "./public/app.js"
    },

    output: {
        path: __dirname + "/public/",
        filename: "frontend.bundle.js"
    },

    plugins: [
        new copyWebpackPlugin(data)
    ]

};
