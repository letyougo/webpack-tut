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
        'main':'./src/app.js',
    },
    output:{
        path: "./build/", // 输出到那个目录下（__dirname当前项目目录）
        filename:'bundle.js' //最终打包生产的文件名
    },
    module:{
        loaders:[
            { test: /\.css$/, loader: 'style-loader!css-loader' },
        ]
    },

}

