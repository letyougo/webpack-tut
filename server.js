var Webpack = require("webpack")
var WebpackDevServer = require('webpack-dev-server')
var webpackConfig = require("./webpack.config")


var compiler = Webpack(webpackConfig)

var server = new WebpackDevServer(compiler, {
    publicPath:'/app/',
    stats: {
        colors: true //显示不同的颜色区分打包的文件
    },
    proxy: { //代理服务器

    },

})

server.listen(3000,"0.0.0.0")