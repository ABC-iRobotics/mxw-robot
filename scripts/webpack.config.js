const path = require('path')

module.exports = {
  target: 'electron-main',
  entry: './index.js',
  output: {
    filename: './mxw-robot/index.js',
    libraryTarget: 'this'
  },
  module: {
    loaders: [
      {
        test: /eventemitter2/,
        loader: 'imports-loader?define=>false'
      },
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
        query: {
          plugins: [
            ['transform-jsx-except-react', { function: 'jsxFactory', callStyle: 'individual', useVariables: true }]],
          presets: ['react']
        }
      }
    ]
  },
  node: {
    __dirname: false,
    fs: 'empty',
    maxwhere: 'empty',
    electron: 'empty'
  }
}
