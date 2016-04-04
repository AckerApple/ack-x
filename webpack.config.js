var path = require('path')
module.exports = [{
  entry: "./entry.js",
  output: {
    path: path.join(__dirname,'dist'),
    filename: "ack-x.js"
    ,publicPath:"dist/"
  },
  module: {loaders:[]}
},{
  entry: "./entry.js",
  output: {
    path: './',
    filename: "ack-x.js"
  },
  module: {loaders:[]}
},{
  entry: "mocha!./entry-test.js",
  output: {
    path: path.join(__dirname,'dist'),
    filename: "ack-x-test.js"
    ,publicPath:"dist/"
  },
  module: {loaders: []}
}]