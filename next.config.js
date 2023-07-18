/* eslint-disable @typescript-eslint/no-var-requires */
/**
 *  @type {import('next').NextConfig} 
*/

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const i18n = {
  defaultLocale: "ja",
  locales: ["ja", "en"],
  // localeDetection: false,
  // localePath: path.resolve("./src/locales"),
}

const nextConfig = {
  reactStrictMode: true,
  i18n,
  webpack:(config, options) => {
    require('./webpack.config')(config, options);
    return config;
  },
  devtool: 'source-map',
  // hot reload 
  // webpackDevMiddleware: config => {
  //   config.watchOptions = {
  //     poll: 5000,
  //     aggregateTimeout: 300,
  //     ignored : ['node_modules']
  //   }
  //   return config
  // }, 
};

module.exports = withBundleAnalyzer(nextConfig);
