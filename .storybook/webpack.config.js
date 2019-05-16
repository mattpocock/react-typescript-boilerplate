module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(tsx?)$/,
    exclude: /node_modules/,
    use: [
      {
        loader: require.resolve('ts-loader'),
      },
    ],
  });
  config.resolve.extensions.push('.ts', '.tsx');
  config.resolve.modules.push('app');
  return config;
};
