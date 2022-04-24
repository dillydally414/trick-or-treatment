/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config, options) => {
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.test('.svg'),
    );
    fileLoaderRule.exclude = /\.svg$/;
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // Important: return the modified config
    return config;
  },
  compiler: {
    styledComponents: true
  }
};