const path = require("path");
const GasPlugin = require("gas-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "Code.js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    // We no not want to minimize our code.
    minimize: false,
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [new GasPlugin()],
  devtool: false,
};
