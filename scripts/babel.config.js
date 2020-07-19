module.exports = function (api) {
  const presets = ['@babel/preset-env', '@babel/preset-typescript'];
  const plugins = [];

  api.cache(false);

  return {
    presets,
    plugins,
  };
};
