const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')

module.exports = () => ({
  entry: {
    web: './src/web.js',
    hook: './src/hook.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [
          path.join(__dirname, './src'),
          path.join(__dirname, './node_modules/proxyee-down-extension-sdk'),
          path.join(__dirname, './node_modules/bilibili-playurl')
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          mangle: {
            eval: true
          }
        }
      })
    ]
  }
})
