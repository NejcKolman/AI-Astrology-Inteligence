const path = require("path");

module.exports = {
  mode: "development",
  entry: "./script/poučni_članki.js",
  output: {
    path: path.resolve(__dirname),
    filename: "bundle.js",
  },
  watch: true,
};
