var webpack = require('webpack')
var path = require('path')
// var UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin");

module.exports = [{
  mode: "production",
  entry: "./entry.js",
  output: {
    path: path.join(__dirname,'dist'),
    filename: "ack-x.js"
  }
},{
  mode: "production",
  entry: "./entry.js",
  output: {
    path: path.join(__dirname,'dist'),
    filename: "ack-x-min.js"
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        compress: false,
        ecma: 5,
        mangle: true
      }
    })],
  },
  plugins: [
    /*
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      uglifyOptions: {
        compress: false,
        ecma: 5,
        mangle: true
      },
      sourceMap: true
    })*/
  ]
}]