var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var {CleanWebpackPlugin} = require("clean-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        authorization: './src/authorization.js',
        registration: './src/registration.js',
        students: './src/students.js',
        account: './src/account.js'
    },
    output: {
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname, "./dist")
    },
    devServer: {
        port: 3030,
        index: 'authorization.html',
        overlay: true
    },
    module: {
        rules: [
            {
                test: /\.(less|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.(svg|png|jpg)$/,
                oneOf: [
                    {
                        test: /\.(svg)$/,
                        use: [
                            {
                                loader: 'url-loader',
                            }
                        ]
                    },
                    {
                        test: /\.(png|jpg)$/,
                        use: [
                            {
                                loader: 'file-loader',
                                options: {
                                    name: '[path][name].[ext]',
                                }
                            }
                        ]
                    }
                ],
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles.[hash:8].css',
        }),
        new HtmlWebpackPlugin({
            filename: 'authorization.html',
            template: 'public/authorization.html',
            excludeChunks: ['registration', 'students', 'account']
        }),
        new HtmlWebpackPlugin({
            filename: 'registration.html',
            template: 'public/registration.html',
            excludeChunks: ['authorization', 'students', 'account']
        }),
        new HtmlWebpackPlugin({
            filename: 'students.html',
            template: 'public/students.html',
            excludeChunks: ['authorization', 'registration', 'account']
        }),
        new HtmlWebpackPlugin({
            filename: 'account.html',
            template: 'public/account.html',
            excludeChunks: ['authorization', 'registration', 'students']
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
};