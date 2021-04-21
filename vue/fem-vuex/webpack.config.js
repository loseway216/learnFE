const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = ({ mode = "production" }) => {
  return {
    mode,
    entry: "./src/main.js",
    output: {
      filename: "bundle.js",
      clean: true,
    },
    resolve: {
      extensions: [".vue", ".js", ".json"],
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: { loader: "vue-loader" },
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          use: [{ loader: "url-loader", options: { limit: 4096 } }],
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.css$/,
          use: ["vue-style-loader", "css-loader"],
        },
        {
          test: /\.s[ac]ss$/,
          use: ["vue-style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({ template: "./public/index.html" }),
    ],
  };
};
