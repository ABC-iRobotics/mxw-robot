module.exports = {
  entry: './index.js',
  output: {
    filename: './bundle.js',
    libraryTarget: 'this'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
        query: {
          plugins: [['transform-jsx-except-react', { function: 'jsxFactory' }]],
          presets: ['react']
        }

      }
    ]
  },
  node: {
    fs: 'empty'
  }

}
