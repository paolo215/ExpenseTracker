const webpack = require("webpack");
const path = require("path");
const copyWebpackPlugin = require("copy-webpack-plugin");

const frontend = require("./frontend.js");

module.exports = {

    entry: {
        app: "./public/app.js"
    },

    output: {
        path: __dirname + "/public/",
        filename: "frontend.bundle.js"
    },

    plugins: [
        new copyWebpackPlugin(
            frontend.map(x => {
                var data = {
                    from: path.resolve(__dirname, "./node_modules/" + x),
                    to: path.resolve(__dirname, "./public/static")
                };
                console.log(data);
                return data;

            })
        )

    ]

};
