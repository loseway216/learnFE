const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')

const modeConfig = function (mode) {
  return require(`./build-utils/webpack.${mode}`)(mode)
}

module.exports = ({ mode, presets } = { mode: 'production', presets: [] }) => {
  return merge(
    {
      mode,
      output: {
        filename: 'bundle.js'
      },
      module: {
        rules: [{ test: /\.jpe?g$/, use: ['url-loader'] }, {}]
      },
      plugins: [new HtmlWebpackPlugin(), new webpack.ProgressPlugin()]
    },
    modeConfig(mode)
  )
}
