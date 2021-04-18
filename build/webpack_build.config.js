const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const {commonRules} = require('./webpack_common.config');
module.exports = {
    mode: 'production',
    entry: './src/main.ts',
    output: {
        path: path.resolve(__dirname, '../', "dist"),
        filename: "bundle.[hash:8].js"
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    optimization: {
        splitChunks: {  //分割代码块
            cacheGroups: {  //缓存组 缓存公共代码
                commons: {  //公共模块
                    name: "commons",
                    chunks: "initial",  //入口处开始提取代码
                    minSize: 0,      //代码最小多大，进行抽离
                    minChunks: 2,    //代码复 2 次以上的抽离
                },
                // vendor:{    //比较优雅的分离打包配置：将重复引入的第三方包抽离出来
                //     priority:1,     //优先级
                //     test:/node_modules/,    //引用的代码包位置
                //     chunks:'initial',   //代码入口
                //     minSize:0,      //代码最小大小
                //     minChunks:2  //最少引用次数
                // }
                vendors: {
                    test: /node_modules/,
                    name: 'vendors',
                    minSize: 0,
                    minChunks: 1,
                    chunks: 'initial',
                    priority: 1 // 该配置项是设置处理的优先级，数值越大越优先处理
                }
            }
        },
        minimizer: [
            new UglifyJSPlugin(),
            new TerserPlugin({
                terserOptions: {
                    ecma: undefined,
                    warnings: false,
                    parse: {},
                    compress: {
                        drop_console: true,
                        drop_debugger: false,
                        pure_funcs: ['console.log'] // 移除console
                    }
                },
            }),
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
    ],
    module: {
        rules: [
            ...commonRules,
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader',
                    options: { configFile: '../tsconfig.build.json' }
                },
                // exclude: /node_modules/,
            },
        ]
    }
}
