const path = require('path');
const paths = require('./paths');
const webpack = require('webpack');

module.exports = {
    context: paths.frontendDir,
    entry: [
          path.resolve(paths.frontendDir, 'css', 'style.scss'),
          path.resolve(paths.frontendDir, 'js', 'index.js'),
    ],
    output: {
        path: path.resolve(paths.baseDir, 'static', 'dist'),
        filename: '[name].js',
        library: '[name]',
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['css-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].css',
                        }
                    },
                    // {
                    //     loader: 'extract-loader'
                    // },
                    // {
                    //     loader: 'css-loader?-url'
                    // },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: path.join(
                                    paths.frontendDir,
                                    'config',
                                    'postcss.config.js',
                                ),
                            },
                        },
                    },
                    {
                        loader: 'resolve-url-loader',
                        options: {
                            keepQuery: true,
                            sourceMap: false,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                indentWidth: 4,
                                includePaths: [
                                    path.join(paths.frontendDir, 'node_modules')
                                ],
                            },
                            sourceMap: false, // Required for resolve-url-loader
                        },
                    }
                ]
            },
            {
                test: /\.(gif|png)$/,
                use: 'url-loader?mimetype=image/png',
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?v=[0-9].[0-9].[0-9])?$/,
                use: 'file-loader?name=[name].[ext]',
            },
        ],
    },
};
