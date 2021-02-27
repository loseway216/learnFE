const { merge } = require('webpack-merge')

const applyPresets = env => {
  const { presets = [] } = env

  const mergedPresets = [presets].flat()
  const mergedConfigs = mergedPresets.map(presetName =>
    require(`./presets/webpack.${presetName}`)(env)
  )

  return merge({}, ...mergedConfigs)
}

module.exports = applyPresets
