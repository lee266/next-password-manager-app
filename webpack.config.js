

module.exports = (config, options) => {
  // Add your custom Dev Middleware configuration here
  config.watchOptions = {
    poll: 5000,
    aggregateTimeout: 300,
    ignored: ['node_modules'],
  };
  return config;
};