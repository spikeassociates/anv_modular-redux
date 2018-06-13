const path = require("path");

module.exports = {
  entry: "./src/index.js",
  resolve: {
    extensions: ["*", ".js", ".jsx", ".json"],
    modules: ["node_modules"]
  },
  output: {
    libraryTarget: "umd",
    filename: "index.js",
    path: path.resolve(__dirname, "./dist")
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: "babel-loader",
        exclude: /node_modules/
      }
    ]
  }
};
