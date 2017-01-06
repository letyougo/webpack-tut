/**
 * Created by xiaoxiaosu on 17/1/4.
 */


var webpack = require('webpack');
var path = require('path');
var extractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
var WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
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
        // preLoaders: [
        //     {
        //         test: /\.(js|jsx)$/,
        //         loader: 'eslint',
        //         include: path.join(__dirname,'src')
        //     }
        // ],
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
            {
                test: /\.json$/,
                loader: 'json'
            },

            // "file" loader makes sure those assets end up in the `build` folder.
            // When you `import` an asset, you get its filename.
            {
                test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                loader: 'file',
                query: {
                    name: 'static/media/[name].[hash:8].[ext]'
                }
            },
            // "url" loader works just like "file" loader but it also embeds
            // assets smaller than specified size as data URLs to avoid requests.
            {
                test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:8].[ext]'
                }
            }
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

        // new CaseSensitivePathsPlugin(),
        new WatchMissingNodeModulesPlugin(path.join(__dirname,'node_modules')),
        new ManifestPlugin({
            fileName: 'asset-manifest.json'
        })
    ]
}

