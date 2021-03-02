const { merge } = require('webpack-merge')
const MyFirstWebpackPlugin = require('./build-utils/MyFirstWebpackPlugin')

const loadPresets = require('./build-utils/loadPresets')

module.exports = ({ mode, presets } = { mode: 'production', presets: [] }) => {
  return merge(
    {
      mode,
      plugins: [new MyFirstWebpackPlugin()]
    },
    loadPresets({ mode, presets })
  )
}
