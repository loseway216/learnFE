const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')

const modeConfig = function (mode) {
  return require(`./build-utils/webpack.${mode}`)(mode)
}
const loadPresets = require('./build-utils/loadPresets')

module.exports = ({ mode, presets } = { mode: 'production', presets: [] }) => {
  return merge(
    {
      mode,
      output: {
        filename: 'bundle.js'
      },
      module: {
        rules: [
          {
            test: /\.jpe?g$/,
            use: [{ loader: 'url-loader', options: { limit: 50000 } }]
          },
          {}
        ]
      },
      plugins: [new HtmlWebpackPlugin(), new webpack.ProgressPlugin()]
    },
    modeConfig(mode),
    loadPresets({ mode, presets })
  )
}
