const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {commonRules} = require('./webpack_common.config');
module.exports = {
    entry: './src/main.ts',
    output: {
        path: path.resolve(__dirname, '../', "dist"),
        filename: "bundle.[hash:8].js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, './release'),
        open: true,
        port: 9005,
    },
    devtool: '#eval-source-map',
    module: {
        rules: [
            ...commonRules
        ]
    }
}
