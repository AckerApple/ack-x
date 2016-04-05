var webpack = require('webpack');
var path = require('path')

module.exports = [{
  //target: 'node',
  entry: "./entry-party.js",
  output: {
    path: './',
    filename: "parties-pack.js",
    library:"modules",
    libraryTarget:"this"
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ]
},{
  entry: "./entry.js",
  output: {
    path: path.join(__dirname,'dist'),
    filename: "ack-x.js"
  }
},{
  entry: "./entry.js",
  output: {
    path: path.join(__dirname,'dist'),
    filename: "ack-x-min.js"
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ]
},{
  entry: "./entry.js",
  output: {
    path: path.join(__dirname,'tests'),
    filename: "ack-x.js"
  }
},{
  entry: "mocha!./entry-test.js",
  output: {
    path: path.join(__dirname,'tests'),
    filename: "ack-x-test.js"
  }
}]