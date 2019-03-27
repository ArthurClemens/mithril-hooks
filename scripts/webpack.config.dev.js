/* global process */
const path = require("path");
const createConfig = require("./webpack.config.js");

const baseDir = process.cwd();
const config = createConfig(false);

config.mode = "development";

config.devServer = {
  contentBase: path.resolve(baseDir, "./dist")
};

config.watchOptions = {
  ignored: /node_modules/
};

module.exports = config;
