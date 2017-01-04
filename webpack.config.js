/**
 * Created by xiaoxiaosu on 17/1/4.
 */


var webpack = require('webpack');

var extractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
console.log(__dirname + "/build/js")
module.exports = {
    devtool:'inline-source-map',
    entry: {
        'main':'./src/js/main.js',
        'aa':'./src/js/aa.js',
        'bb':'./src/js/bb.js',
        'cc':'./src/js/cc.js',


    },

    devServer:{
        historyApiFallback:true,
        hot:true,
        inline:true,
        progress:true,
        port:9090 //端口你可以自定义
    },

    output:{
        path: __dirname + "/build/js", // 输出到那个目录下（__dirname当前项目目录）
        filename:'[name].js' //最终打包生产的文件名
    },
    module: {
        loaders:[

            { test: /\.css/, loader: extractTextPlugin.extract('style-loader', 'css-loader') },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/html/main.html',
            filename:'../html/main.html',
            inject:'body',
            hash:true,
            chunks:['main','common']
        }),
        new HtmlWebpackPlugin({
            template:'./src/html/aa.html',
            filename:'../html/aa.html',
            inject:'body',
            hash:true,
            chunks:['aa','common']
        }),
        new HtmlWebpackPlugin({
            template:'./src/html/bb.html',
            filename:'../html/bb.html',
            inject:'body',
            hash:true,
            chunks:['bb','common']
        }),
        new HtmlWebpackPlugin({
            template:'./src/html/cc.html',
            filename:'../html/cc.html',
            inject:'body',
            hash:true,
            chunks:['cc','common']
        }),

        new webpack.ProvidePlugin({
            $: 'jquery',
            React: 'react',
            antd: 'antd',
            '_': 'underscore',
        }),

        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true),
            VERSION: JSON.stringify("5fa3b9"),
            BROWSER_SUPPORTS_HTML5: true,
            TWO: "1+1",
            "typeof window": JSON.stringify("object")
        }),

        new extractTextPlugin("../css/[name].css"),

        new webpack.HotModuleReplacementPlugin(),

        new webpack.optimize.CommonsChunkPlugin({
            name:'common', // 注意不要.js后缀
            chunks:['main','aa','bb','cc']
        }),
    ]
}

