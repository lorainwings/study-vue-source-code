const merge = require('webpack-merge');
const base = require('./webpack.base.js');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = merge(base, {
  mode: 'production',
  devtool: 'none',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin({ analyzerPort: 8090 }),
  ]
})
