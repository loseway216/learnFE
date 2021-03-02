const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = ({ mode, presets } = { mode: 'production', presets: [] }) => ({
  mode,
  output: {
    filename: 'bundle.js'
    // chunkFilename: '[name].lazy-chunk.js'
  },
  plugins: [new HtmlWebpackPlugin()]
})
