const path = require("path")
const UglifyJSPlugin = require('webpack/lib/optimize/UglifyJsPlugin')
const webpack_config = {
  entry: {
    uploader: './src/index.js'
  },
  output: {
    filename: "index.js",
    path: path.join(__dirname, 'dist')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modles/,
        query: {
          presets: ['es2015', 'stage-0'],
          compact: false
        }
      }
    ],
  },
  plugins: []
}
if ('production' === process.env.NODE_ENV) {
  const uglify_config = {
    compress: {
      warnings: false,
      drop_console: true
    },
    output: {
      beautify: false,
      comments: false
    }
  }
  webpack_config.plugins.push(new UglifyJSPlugin(uglify_config))
}
module.exports = webpack_config
