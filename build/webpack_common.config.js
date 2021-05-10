const VueLoaderPlugin = require('vue-loader/lib/plugin-webpack5');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const commonRules = [
    {
        test: /\.pug$/,
        use: ['pug-plain-loader']
    },
    {
        test: /\.(vue)$/,
        loader: "vue-loader",
        options: {
            loaders: {
                'scss': 'vue-style-loader!css-loader!sass-loader',
                'styl': 'vue-style-loader!css-loader!stylus-loader',
            },
            preserveWhitespace: false,
            extractCSS: true
        }

    },
    {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
    },
    // {
    //     test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    //     use: {
    //         loader: 'url-loader',
    //         options: {
    //             name: '[name].[ext]',
    //             limit: 20*1024,
    //             outputPath: 'assets/'
    //         }
    //     }
    // },
    // webpack5  内置图片处理器
    {
        test: /\.png|jpg|gif|jpeg|svg/,
        type: 'asset',
        parser: {
            dataUrlCondition: {
                maxSize: 10 * 1024,
            },
        },
        generator: {
            filename: 'images/[base]',
        },
    },
    {
        test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
        type: 'asset',
        generator: {
            filename: 'fonts/[base]',
        },
    },
    {
        test: /\.txt|xlsx/,
        type: 'asset',
        generator: {
            filename: 'files/[base]',
        },
    },
    {
        test: /\.css$/,
        use:[ // 由后向前加载
            {loader: "vue-style-loader"},
            {loader: 'css-loader'},
            {loader: "postcss-loader"}
        ]
    },
    {
        test: /\.less$/,
        use:[
            {loader: "vue-style-loader"},
            {loader: 'css-loader'},
            {loader: "postcss-loader"},
            {loader: 'less-loader'}
        ]
    },
    {
        test: /\.sass$/,
        use: [
            {loader: "vue-style-loader"},
            {loader: 'css-loader'},
            {loader: "postcss-loader"},
            {loader: 'sass-loader'}
        ]
    },
    {
        //test: /\.styl$/,
        test: /\.styl(us)?$/,
        use: [
            {loader: "vue-style-loader"},
            {loader: 'css-loader'},
            {loader: "postcss-loader"},
            {loader: 'stylus-loader'}
        ]
    }
]
const commonPlugins = [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
        filename: 'css/[name][hash:8].css',
        chunkFilename: 'css/[id].css'
    }),
    new VueLoaderPlugin(),
]
module.exports = { commonRules, commonPlugins };
