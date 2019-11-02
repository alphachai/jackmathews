const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');

module.exports = (env) => {
    const envConfig = require(`./webpack.config.${env}.js`);
    // return baseConfig.map(conf => webpackMerge(conf, envConfig)); // This is for running a parallel-webpack build.
    return webpackMerge(baseConfig, envConfig);
}
