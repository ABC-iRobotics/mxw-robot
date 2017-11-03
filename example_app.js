
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
 // Duck.init()
   // Usage
   /*
     Load URDF to robot_description parameter of ROS
     convert all mesh files to ogre mesh and copy them to \components\robot\resources\[robot name] with the original name but .mesh extension

     ROS_IP [IP:PORT of ROS]
     position {optional} [position of the robot]  --default { x: 0, y: 0, z: 0 },
     rate {optional} [update frequency of tf]     --default 60
     BaseLink {optional} [fix link of the robot] --default "base_link"
     scale {optional} [scale of the robot]        --default 1
     zoom {optional} [if the mesh was increased during convertation, you can set it here] --default 1
    */
  //wom.render(<Duck />)
  //MxwRobot.init()
  wom.render(<MxwRobot file='settings.json' mxwWom={wom} mxwApp={app}
   />)
 //MxwRobot.render(file='settings.json', mxwWom=wom, "mxwApp=app)
 //wom.render(<MxwRobot />)

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
