const webpack = require('webpack');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    // mode: 'production', // WEBPACK 4
    devtool: 'cheap-module-source-map',
    stats: 'errors-only',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        // new UglifyJsPlugin({
        //     cache: true,
        //     parallel: true,
        //     uglifyOptions: {
        //         beautify: false,
        //         mangle: false,

        //         compress: {
        //             arrows: false,
        //             booleans: false,
        //             collapse_vars: false,
        //             comparisons: false,
        //             computed_props: false,
        //             hoist_funs: false,
        //             hoist_props: false,
        //             hoist_vars: false,
        //             if_return: false,
        //             inline: false,
        //             join_vars: false,
        //             keep_infinity: false,
        //             loops: false,
        //             negate_iife: false,
        //             properties: false,
        //             reduce_funcs: false,
        //             reduce_vars: false,
        //             sequences: false,
        //             side_effects: false,
        //             switches: false,
        //             top_retain: false,
        //             toplevel: false,
        //             typeofs: false,
        //             unused: false,

        //             // Switch off all types of compression except those needed to convince
        //             // react-devtools that we're using a production build
        //             conditionals: false,
        //             dead_code: false,
        //             evaluate: false,
        //         },
        //     },
        // }),
        // new HardSourceWebpackPlugin(),
    ],
};
