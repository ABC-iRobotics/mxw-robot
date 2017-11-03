// const ROSLIB = require('./dep/roslib')
const ROSLIB = require('roslib')
const fs = require('fs')
var ipcMain
var nextID = 0
var robots = []
var showJointController = false
var debugController = false
var debugJointController = false
var autoLoad = false
var showController = false
var wom
class MxwRobot {
  constructor (options, id) {
    this.ROS_IP = options.ROS_IP
    this.BaseLink = options.BaseLink || 'base_link'
    this.rate = options.rate || 60
    this.position = options.position || { x: 0, y: 0, z: 0 }
    this.scale = options.scale || 1
    this.zoom = options.zoom || 1
    this.id = id
    this.parent = (<node
      position={this.position}
      orientation={{ w: 0.707, x: -0.707, y: 0, z: 0 }}
      scale={this.scale}
      />)
    this.ros = new ROSLIB.Ros({
      url: 'ws://' + this.ROS_IP
    })
    var robot = this

    this.ros.on('connection', function () {
      console.log('Connected to websocket server.' + options.ROS_IP)
      ControlerLog(id, 'Connected to websocket server.' + options.ROS_IP)
      robot.LoadRos()
    })
    this.ros.on('error', function (error) {
      console.log('Error connecting to websocket server: ', error)
      ControlerLog(id, 'Error!: ' + error)
      robot.ros.close()
      delete robots[this.id]
    })

    this.ros.on('close', function () {
      console.log('Connection to websocket server closed.')
      ControlerLog(id, 'Connection to websocket server closed.')
      delete this.robot
    })
  }
  delete () {
    try {
      this.parent.hide()
    } catch (err) {
      console.log(err)
    }
    try {
      wom.getNodeById('jointnode' + this.id).hide()
    } catch (err) {
      console.log(err)
    }
  }

  LoadRos () {
    var robot = this
    var links = []
    var param = new ROSLIB.Param({
      ros: this.ros,
      name: 'robot_description'
    })
    if (!param) {
      param = new ROSLIB.Param({
        ros: this.ros,
        name: '/robot_description'
      })
    }

    param.get(function (param) {
      var urdfModel = new ROSLIB.UrdfModel({
        string: param
      })

      for (var l in urdfModel.links) {
        var link = urdfModel.links[l]
        var visual = link.visuals[0]
        if (visual && visual.geometry) {
          var origin = visual.origin.position
          var originxyz = origin.x + ' ' + origin.y + ' ' + origin.z
          switch (visual.geometry.type) {
            case ROSLIB.URDF_BOX:
              links[l] = <mesh
                originxyz={originxyz}
                url='N_Aux_Cube.mesh' />
              break
            case ROSLIB.URDF_CYLINDER:
              links[l] = <mesh
                originxyz={originxyz}
                url='N_Cylinder.mesh' />
              break
            case ROSLIB.URDF_SPHERE:
              links[l] = <mesh
                originxyz={originxyz}
                url='N_Sphere.mesh' />
              break
            default:
              var file = visual.geometry.filename.split('/')
              var originalMesh = file[file.length - 1].split('.')
              var mesh = urdfModel.name + '/' + originalMesh[0] + '.mesh'

              /* if (!fs.existsSync(`${__dirname}/resources/` + mesh)) {
                console.log('Mesh unavailable ' + mesh + ' Please place it into the resource folder of the component')
                ControlerLog(robot.id, 'Mesh unavailable ' + mesh + ' Please place it into the resource folder of the component')
              } else { */
              links[l] = <mesh
                originxyz={originxyz}
                url={mesh}
                />
              break
              // }
          }
        }
      }

      // joints
      for (var j in urdfModel.joints) {
        var joint = urdfModel.joints[j]

        if (joint.parent === robot.BaseLink && links[joint.parent]) { robot.parent.add(links[joint.parent]) }

        if (joint.parent === robot.BaseLink && !links[joint.parent] && links[joint.child]) {
          robot.parent.add(links[joint.child])
        } else {
          if (links[joint.parent] && links[joint.child]) { links[joint.parent].add(links[joint.child]) }
        }
      }
      wom.render(robot.parent)
      var tf2Client = new ROSLIB.Topic({
        ros: robot.ros,
        name: '/tf',
        messageType: 'tf2_msgs/TFMessage'

      })
      tf2Client.subscribe(function (message) {
        for (var i = 0; i < message.transforms.length; i++) {
          if (message.transforms[i]) {
            var tf = message.transforms[i].transform
            var child = message.transforms[i].child_frame_id
            if (child && tf.translation && links[child]) {
              corrigate(tf.translation, tf.rotation, links[child], links[child].props.originxyz, robot.zoom)
              links[child].setOrientation(tf.rotation.w, tf.rotation.x, tf.rotation.y, tf.rotation.z, 'absolute', 'parent')
            }
          }
        }
      })
      if (showJointController) { createJointController(robot) }
    })
  }
}
module.exports = {
  resources: `${__dirname}/resources`,
  init () {
    console.log('inti...')
  },
  done (r) {
    console.log('done...')
  },
  render (options) {
    console.log('render...')
    // var settings = JSON.parse(fs.readFileSync(`${__dirname}/resources/` + options.file))
    var settings = {'auto_load': 1,
      'show_controller': 1,
      'show_joint_controller': 1,
      'debug_controller': 0,
      'debug_joint_controller': 0,
      'robots': [
    {'ROS_IP': '193.224.41.168:9090', 'position': { 'x': 100, 'y': 0, 'z': 0 }, 'rate': 60, 'BaseLink': 'base_link', 'zoom': 100, 'scale': 1}
      ]
    }
    console.log('1')
    wom = options.mxwWom
    ipcMain = options.mxwApp
    autoLoad = settings.auto_load
    showController = settings.show_controller
    console.log('2')
    showJointController = settings.show_joint_controller
    debugController = settings.debug_controller
    debugJointController = settings.debug_joint_controller
    console.log('3')
    settings.robots.forEach(function (element) {
      console.log('4')
      var options = element
      console.log('41')
      var id = nextID
      console.log('42')
      nextID++
      console.log('43')
      if (showController) { createController(id, options) }
      console.log('44')
      if (autoLoad) {
        robots[id] = new MxwRobot(options, id)
      }
    }, this)
    console.log('5')
    return <node />
  }
}
function createController (id, options) {
  console.log('createing controller 1')
  var url = `${__dirname}/resources/control.html?id=` + id + '&ip=' + options.ROS_IP
  console.log('creating controller 2')
  wom.render(<node />)
  console.log('creating cntoler 21')
  wom.render(<node
    id={'controlnode' + id}
    position={{ x: parseInt(options.position.x) - 20, y: parseInt(options.position.y) + 50, z: parseInt(options.position.z) + 100 }}
    scale={{ x: 0.03, y: 0.03, z: 0.03 }}
    orientation={{ w: 0.924, x: -0.383, y: 0, z: 0 }}
    >
    <browser
      id={'control' + id}
      url={url}
      pdf={false}
      done={b => {
        if (debugController) { if (b.webview && id === 1) { b.nativeRender.browserWindow.webContents.openDevTools({ detach: true }) } }
      }}
      />
  </node>)
  console.log('creating controller 3')
  ipcMain.on('asynchronous-message', (event, arg) => {
    if (arg === 'ready') { ControlerSendOptions(id, options) }
    var command = arg.split('||')
    if (command[0] == id && command[1] == 'connect' && !robots[id]) {
      options.ROS_IP = command[2]
      options.BaseLink = command[3]
      options.position = {x: parseFloat(command[4]), y: parseFloat(command[5]), z: parseFloat(command[6])}
      options.rate = parseInt(command[7])
      options.scale = parseInt(command[8])
      options.zoom = parseInt(command[9])
      robots[id] = new MxwRobot(options, id
        )
      ControlerLog(id, 'Connecting...')
    }
    if (command[0] == id && command[1] == 'disconnect' && robots[id]) {
      robots[id].delete()
      delete robots[id]
      ControlerLog(id, 'Disconnecting...')
    }
    if (command[0] == id && command[1] == 'move') {
      var browsernode = wom.getNodeById('controlnode' + id)
      browsernode.setPosition(parseFloat(command[2]), parseFloat(command[3]) + 50, parseFloat(command[4]) + 100)
    }
  })
}
function createJointController (robot) {
  var jointurl = `${__dirname}/resources/joint_controller.html?id=` + robot.id + '&ip=' + robot.ROS_IP
  robot.parent.render(<node
    id={'jointnode' + robot.id}
    done={b => {
      b.show()
      b.setPosition(parseInt(robot.position.x) + 20, parseInt(robot.position.y) + 50, parseInt(robot.position.z) + 100, 'absolute', 'world')
      b.setOrientation(0.924, -0.383, 0, 0, 'absolute', 'world')
      b.setScale(0.03 / robot.scale, 0.03 / robot.scale, 0.03 / robot.scale)
    }}
    >
    <browser
      id={'jointcontrol' + robot.id}
      url={jointurl}
      pdf={false}
      done={b => {
        if (debugJointController) if (b.webview && robot.id === 1) { b.nativeRender.browserWindow.webContents.openDevTools({ detach: true }) }
      }}
      />
  </node>)
}

function ControlerSendOptions (id, options) {
  var browser = wom.getNodeById('control' + id)
  browser.webview.browserWindow.webContents.send('main-message', { ROS_IP: options.ROS_IP, position: {x: options.position.x, y: options.position.y, z: options.position.z}, BaseLink: options.BaseLink, zoom: options.zoom, scale: options.scale })
}
function ControlerLog (id, message) {
  var browser = wom.getNodeById('control' + id)
  if (browser) { browser.webview.browserWindow.webContents.send('main-message', 'log||' + message) }
}

function corrigate (tfposition, rotation, n, pos, zoom) {
  var CorrX = Number(pos.split(' ')[0])
  var CorrY = Number(pos.split(' ')[1])
  var CorrZ = Number(pos.split(' ')[2])

  var ix = rotation.w * CorrX + rotation.y * CorrZ - rotation.z * CorrY
  var iy = rotation.w * CorrY + rotation.z * CorrX - rotation.x * CorrZ
  var iz = rotation.w * CorrZ + rotation.x * CorrY - rotation.y * CorrX
  var iw = -rotation.x * CorrX - rotation.y * CorrY - rotation.z * CorrZ

  var tempx = ix * rotation.w + iw * -rotation.x + iy * -rotation.z - iz * -rotation.y
  var tempy = iy * rotation.w + iw * -rotation.y + iz * -rotation.x - ix * -rotation.z
  var tempz = iz * rotation.w + iw * -rotation.z + ix * -rotation.y - iy * -rotation.x

  var newPosX = tempx + tfposition.x
  var newPosY = tempy + tfposition.y
  var newPosZ = tempz + tfposition.z

  n.setPosition(newPosX * zoom,
    newPosY * zoom,
    newPosZ * zoom, 'absolute', 'parent')
}
