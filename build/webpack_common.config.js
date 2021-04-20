const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const commonRules = [
    {
        test:/\.js|jsx$/,
        exclude: /node_modules/,
        loader: "babel-loader",
    },
    {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
            loader: 'url-loader',
            options: {
                name: '[name].[ext]',
                limit: 20*1024,
                outputPath: 'assets/'
            }
        }
    },
    {
        test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader',
        options: {
            limit: 5000,
            name: 'fonts/[name].[ext]?[hash:8]'
        }
    },
    {
        test: /\.css$/,
        use:[ // 由后向前加载
            {loader: "style-loader"},
            {loader: 'css-loader'},
            {loader: "postcss-loader"}
        ]
    },
    {
        test: /\.less$/,
        use:[
            {loader: "style-loader"},
            {loader: 'css-loader'},
            {loader: "postcss-loader"},
            {loader: 'less-loader'}
        ]
    },
    {
        test: /\.sass$/,
        use: [
            {loader: "style-loader"},
            {loader: 'css-loader'},
            {loader: "postcss-loader"},
            {loader: 'sass-loader'}
        ]
    },
    {
        //test: /\.styl$/,
        test: /\.styl(us)?$/,
        use: [
            {loader: "style-loader"},
            {loader: 'css-loader'},
            {loader: "postcss-loader"},
            {loader: 'stylus-loader'}
        ]
    }
]
const commonPlugins = [
    new MiniCssExtractPlugin({
        filename: 'css/[name][hash:8].css',
        chunkFilename: 'css/[id].css'
    })
]
module.exports = { commonRules, commonPlugins };
