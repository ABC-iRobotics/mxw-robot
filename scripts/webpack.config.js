module.exports = {
  entry: './index.js',
  output: {
    filename: './deploy/index.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /dep/,
        loader: 'babel-loader',
        query: {
          presets: ['react']
        }
      }
    ]
  },
  node: {
    fs: 'empty'
  }
}
