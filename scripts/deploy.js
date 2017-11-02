var mkdirp = require('mkdirp')
const webpack = require('webpack')
const configuration = require('./webpack.config.js')

console.log('Deploying...')
mkdirp('/deploy', function () {
  let compiler = webpack(configuration)
  compiler.apply(new webpack.ProgressPlugin())

  compiler.run(function () {
    console.log('Creating Webpack file')
  })
})
