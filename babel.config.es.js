const plugins = require("./babel.config.base").plugins;

const presets = [
  ["@babel/preset-env",
    {
      "targets": {
        "esmodules": true
      }
    }
  ]
];

module.exports = {
  presets,
  plugins
};
