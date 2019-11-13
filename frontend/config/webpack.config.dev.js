const webpack = require('webpack');
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
    mode: 'development', // WEBPACK 4
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
    ],
};
