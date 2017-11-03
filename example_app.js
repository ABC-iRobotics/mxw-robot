
const { app } = require('electron')
const { wom } = require('maxwhere')
const path = require('path')
const scenePath = path.join(__dirname, 'static', 'scene')
var MxwRobot = require('./components/mxw_robot/bundle.js')
wom.setConfig({
  width: 1280,
  height: 720,
  title: 'Maxwhere - Robot',
  'display-mode': 'maximized',
  navigation: 'coginav-lite',
  show: false
})

wom.installComponent(require('./components/mxw_robot/bundle.js'), 'MxwRobot')
wom.load(path.join(scenePath, 'where.json')).once('ready', () => {
 
  wom.render(<MxwRobot mxwWom={wom} mxwApp={app}
   />)

  wom.render(<node>
    <browser
      url='http://www.ros.org/'
      position={{ x: 437, y: 100, z: -374 }}
      scale={{ x: 0.1, y: 0.1, z: 0.1 }}
  />
  </node>)
  wom.showWindow()
})
wom.on('quit', app.quit)
