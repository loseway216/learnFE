const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = ({ mode, presets } = { mode: 'production', presets: [] }) => ({
  mode,
  plugins: [new HtmlWebpackPlugin()]
})
