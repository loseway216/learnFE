const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = () => ({
  mode: "none",
  devtool: "source-map",
  output: {
    filename: "[name].[chunkhash].js",
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
