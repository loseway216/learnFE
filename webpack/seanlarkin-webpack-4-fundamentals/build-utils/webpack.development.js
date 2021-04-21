module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        // 链式调用loaders，顺序是从右到左，style(css(less()))
        use: ["style-loader", "css-loader"],
      },
    ],
  },
});
