const path = require('path');
const paths = require('./paths');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: paths.frontendDir,
    entry: {
        productLineTagger: ['babel-polyfill', path.resolve(paths.resolveAppSrc('product_line_tagger'), 'index.js')],
        taxonomyManager: ['babel-polyfill', path.resolve(paths.resolveAppSrc('taxonomy_manager'), 'index.js')],
        sherpa: ['babel-polyfill', path.resolve(paths.resolveAppSrc('sherpa'), 'index.js')],
        docViewer: ['babel-polyfill', path.resolve(paths.resolveAppSrc('doc_viewer'), 'index.js')],
        workflowManager: ['babel-polyfill', path.resolve(paths.resolveAppSrc('workflow_manager'), 'index.js')],
        userManager: ['babel-polyfill', path.resolve(paths.resolveAppSrc('user_manager'), 'index.js')],
        webNephron: ['babel-polyfill', path.resolve(paths.resolveAppSrc('web_nephron'), 'index.js')],
    },
    output: {
        path: paths.resolveAppStatic('sherpa'),
        filename: '[name].js',
        library: '[name]',
    },
    module: {
        loaders: [
            {
                loader: 'uglify-loader',
                options: {
                    beautify: false,
                    mangle: false,
                    compress: false,
                },
            },
            {
                loader: 'babel-loader?cacheDirectory',
                test: /\.js$/,
                exclude: /node_modules/,
                query: {
                    plugins: ['lodash'],
                    presets: [['env', { targets: { node: 4 } }]],
                },
            },
        ],
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader?cacheDirectory',
                    options: {
                        presets: [
                            require.resolve('babel-preset-es2015'),
                            require.resolve('babel-preset-react'),
                        ],
                        plugins: [
                            require.resolve('babel-plugin-transform-object-rest-spread'),
                            require.resolve('babel-plugin-transform-class-properties'),
                            require.resolve('babel-plugin-mrui-audit'),
                        ],
                    },
                },
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 2,
                            },
                        },
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
                        },
                    ],
                }),
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                localIdentName: '[name]__[local]___[hash:base64:5]',
                                importLoaders: 3,
                            },
                        },
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
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                includePaths: [
                                    path.join(paths.frontendDir, 'node_modules'),

                                ],
                                sourceMap: true, // Required for resolve-url-loader
                            },
                        },
                    ],
                }),
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
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true,
        }),
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /(en)$/),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: module => module.context && module.context.indexOf('node_modules') >= 0,
        }),
    ],
    resolve: {
        modules: [path.resolve(paths.frontendDir, 'node_modules')],
        extensions: ['.js', '.jsx'],
        alias: {
            Sherpa: path.resolve(paths.resolveAppSrc('sherpa')),
            ProductLineTagger: path.resolve(paths.resolveAppSrc('product_line_tagger')),
            TaxonomyManager: path.resolve(paths.resolveAppSrc('taxonomy_manager')),
            DocViewer: path.resolve(paths.resolveAppSrc('doc_viewer')),
            WorkflowManager: path.resolve(paths.resolveAppSrc('workflow_manager')),
            UserManager: path.resolve(paths.resolveAppSrc('user_manager')),
            WebNephron: path.resolve(paths.resolveAppSrc('web_nephron')),
        },
        symlinks: false,
    },
};
