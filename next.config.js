/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  // hot reload 
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 800,
      aggregateTimeout: 300,
      ignored : ['node_modules']
    }
    return config
  },
}

module.exports = nextConfig
