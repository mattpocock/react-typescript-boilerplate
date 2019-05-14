const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(tsx?)$/,
    exclude: /node_modules/,
    use: [
      {
        loader: require.resolve('awesome-typescript-loader'),
      },
    ],
  });
  config.resolve.extensions.push('.ts', '.tsx');
  config.resolve.modules.push('app');
  config.plugins.push(new CheckerPlugin());
  return config;
};
