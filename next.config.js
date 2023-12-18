/* eslint-disable @typescript-eslint/no-var-requires */
/**
 *  @type {import('next').NextConfig}
 */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: true,
  i18n,
  webpack: (config, options) => {
    require('./webpack.config')(config, options);
    return config;
  },
  devtool: 'source-map',
};

module.exports = withBundleAnalyzer(nextConfig);
