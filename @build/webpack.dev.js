const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.js');


module.exports = merge(base, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,// 开启gzip压缩
        port: 8080,
        open: true,
        hot: true,
        overlay: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
})
