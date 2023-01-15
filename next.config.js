/**
 *  @type {import('next').NextConfig} 
*/

const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  i18n,
  // hot reload 
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 5000,
      aggregateTimeout: 300,
      ignored : ['node_modules']
    }
    return config
  },
  
};

module.exports = nextConfig
