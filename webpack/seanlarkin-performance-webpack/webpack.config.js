const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = ({ mode, presets } = { mode: "production", presets: [] }) => ({
  mode: "none",
  entry: {
    index: "./src/index.js",
    // mobile: './src/mobile.js'
  },
  output: {
    filename: "[name].bundle.js",
    chunkFilename: "[name].lazy-chunk.js",
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      // include all types of chunks
      // chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  plugins: [new CleanWebpackPlugin(), new HtmlWebpackPlugin()],
});
