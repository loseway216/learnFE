const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = () => ({
  mode: "production",
  devtool: "source-map",
  output: {
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  plugins: [new MiniCssExtractPlugin()]
});
