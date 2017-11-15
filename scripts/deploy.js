var mkdirp = require('mkdirp')
const webpack = require('webpack')
const configuration = require('./webpack.config.js')
var fs = require('fs')
var path = require('path')
var wrench = require('wrench')
console.log('Fixing ws version...')
deleteFolder(path.join(__dirname, '/../node_modules/roslib/node_modules/ws'))
mkdirp('/deploy', function () {
  let compiler = webpack(configuration)
  compiler.apply(new webpack.ProgressPlugin())
  console.log('Creating bundle file...')
  compiler.run(function () {
    var data = fs.readFileSync('./deploy/index.js', 'utf-8')
    console.log('Fixing maxwhere require...')
    var newValue = data.replace(/^const { wom } =.*$/m, 'const { wom } =require(\'maxwhere\')')

    console.log('Fixing electron require...')
    newValue = newValue.replace(/^const { ipcMain } =.*$/m, 'const { ipcMain } =require(\'electron\')')

    console.log('Fixing rolsib version...')
    newValue = newValue.replace(/^ {2}var limits = options.xml.*$/m, 'this.parent = options.xml.getElementsByTagName(\'parent\')[0].getAttribute(\'link\')  \n    this.child = options.xml.getElementsByTagName(\'child\')[0].getAttribute(\'link\')   \n   var limits = options.xml.getElementsByTagName(\'limit\')')

    console.log('Fixing nodeIntegratin...')
    newValue = newValue.replace('pdf: false', 'nodeIntegration: true, \n pdf: false')
    fs.writeFileSync('./deploy/index.js', newValue, 'utf-8')
    console.log('Copying resources...')
    wrench.copyDirSyncRecursive('./resources', './deploy/resources')
    fs.writeFile('./deploy/component.json', '{ \n "name": "mxw-robot"  ,\n "main": "index.js",\n "resources": "./components/mxw-robot/resources" \n }', function (err) {
      if (err) {
        return console.log(err)
      }

      console.log('Component.json is created')
    })
    console.log('Deploy done...')
  })
})

function deleteFolder (path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file, index) {
      var curPath = path + '/' + file
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolder(curPath)
      } else { // delete file
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(path)
  }
}
