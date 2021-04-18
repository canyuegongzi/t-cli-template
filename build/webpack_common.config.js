const commonRules = [
    {
        test:/\.tsx?$/,
        use: "ts-loader"
    },
    {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
    },
    {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
            loader: 'url-loader',
            options: {
                name: '[name].[ext]', // 保持名称不变
                limit: 20*1024, // 小于20k的图片 打包成base64
                outputPath: 'assets/' // 打包后的存放路径 dist/assets
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
        test: /\.styl$/,
        use: [
            {loader: "style-loader"},
            {loader: 'css-loader'},
            {loader: "postcss-loader"},
            {loader: 'stylus-loader'}
        ]
    }
]
module.exports = { commonRules };
