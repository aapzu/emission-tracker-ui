const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const cssProcessor = require('cssnano')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isProduction = () => process.env.NODE_ENV === 'production'

const root = path.resolve(__dirname)
const dist = path.resolve(root, 'dist')

module.exports = {
    mode: isProduction() ? 'production' : 'development',
    // babel-polyfill is required to get async-await to work
    entry: [
        'babel-polyfill',
        path.resolve(root, 'src', 'index.jsx'),
    ],
    output: {
        path: dist,
        filename: 'bundle_[hash:6].js',
        chunkFilename: '[name].bundle_[hash:6].js',
        sourceMapFilename: '[file].map',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: path.resolve(root, 'src'),
                enforce: 'pre',
                loader: 'eslint-loader',
            },
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                include: path.resolve(root, 'src'),
            },
            // Images are put to <BASE_URL>/images
            {
                test: /\.(png|jpg|jpeg|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[ext]',
                },
            },
            {
                test: /\.css$/,
                use: [
                    !isProduction() ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            // .pcss files treated as modules
            {
                test: /\.pcss$/,
                use: [
                    !isProduction() ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentRegExp: /app\/src\/([^/]+)/i,
                            localIdentName: isProduction() ? '[local]_[hash:base64:6]' : '[1]_[name]_[local]',
                        },
                    },
                    'postcss-loader',
                ],
            },
        ],
    },
    plugins: [
        // Common plugins between prod and dev
        new CleanWebpackPlugin([dist]),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: isProduction() ? '[name].css' : '[name].[hash].css',
            chunkFilename: isProduction() ? '[id].css' : '[id].[hash].css',
        }),
    ].concat(isProduction() ? [
        // Production plugins
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'production',
        }),
        new UglifyJsPlugin({
            uglifyOptions: {
                parallel: true,
                compressor: {
                    warnings: false,
                },
            },
            sourceMap: true,
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessor,
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true,
                },
            },
            canPrint: true,
        }),
    ] : [
        new WebpackNotifierPlugin(),
    ]),
    devtool: isProduction() ? 'source-map' : 'eval-source-map',
    devServer: {
        hot: true,
        inline: true,
        progress: true,
        port: process.env.PORT || 3333,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },
}