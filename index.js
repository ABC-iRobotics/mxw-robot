const ROSLIB = require('roslib')
const { wom } = require('maxwhere')
const fs = require('fs')
const path = require('path')

class MxwRobot {
  constructor (options) {
    this.name = options.name || 'mxw-robot'
    this.rosIP = options.rosIP
    this.baseLink = options.baseLink || 'base_link'
    this.position = options.position || { x: 0, y: 0, z: 0 }
    this.orientation = options.orientation || { x: -0.707, y: 0, z: 0, w: 0.707 } // Y points up in MaxWhere
    this.scale = options.scale || 1

    this.root = (<node
      position={this.position}
      orientation={this.orientation}
      scale={this.scale} />)

    this.ros = new ROSLIB.Ros({url: 'ws://' + this.rosIP})

    this.ros.on('connection', () => {
      console.log('Connecting to ROS ' + this.rosIP)
      this.init()
    })

    this.ros.on('error', (error) => {
      console.log('Error while connecting to ROS: ', error)
      this.ros.close()
      delete this
    })

    this.ros.on('close', () => {
      console.log('Closing websocket connection to ROS')
      delete this
    })
  }

  delete () {
    try {
      this.root.hide()
    } catch (err) {
      console.log(err)
    }
    try {
      wom.getNodeById('jointnode' + this.id).hide()
    } catch (err) {
      console.log(err)
    }
  }

  init () {
    var links = []
    var param = new ROSLIB.Param({
      ros: this.ros,
      name: 'robot_description'
    })

    // Why we need this???
    if (!param) {
      param = new ROSLIB.Param({
        ros: this.ros,
        name: '/robot_description'
      })
    }

    param.get((param) => {
      var urdfModel = new ROSLIB.UrdfModel({
        string: param
      })

      for (var l in urdfModel.links) {
        let link = urdfModel.links[l]
        let visual = link.visuals[0]
        if (visual && visual.geometry) {
          let pos = visual.origin.position.x + ' ' +
            visual.origin.position.y + ' ' +
            visual.origin.position.z

          switch (visual.geometry.type) {
            case ROSLIB.URDF_BOX:
              links[l] = <mesh
                originxyz={pos}
                url='N_Aux_Cube.mesh' />
              break
            case ROSLIB.URDF_CYLINDER:
              links[l] = <mesh
                originxyz={pos}
                url='N_Cylinder.mesh' />
              break
            case ROSLIB.URDF_SPHERE:
              links[l] = <mesh
                originxyz={pos}
                url='N_Sphere.mesh' />
              break
            default:
              let file = visual.geometry.filename.split('/')
              let originalMesh = file[file.length - 1].split('.')
              let mesh = urdfModel.name + '/' + originalMesh[0] + '.mesh'
              let fullpath = path.join(__dirname, 'resources', mesh)
              // console.log(fullpath)
              if (!fs.existsSync(fullpath)) {
                console.log('mxw-robot: WARNING: Mesh unavailable ' + mesh + '. Place it into the resource folder of the component')
              }
              links[l] = <mesh
                originxyz={pos}
                url={mesh}
              />
              break
          }
        }
      }

      // Build up the structure
      for (var j in urdfModel.joints) {
        let joint = urdfModel.joints[j]
        if ((joint.parent === this.baseLink) && links[joint.parent]) this.root.add(links[joint.parent])
        if (links[joint.parent] && links[joint.child]) links[joint.parent].add(links[joint.child])
      }

      console.log('mxw-robot: ROBOT STRUCTURE:')
      for (var q in links) {
        console.log(`${links[q].parent ? links[q].parent.url : 0} <- ${links[q].url} -> ${links[q].children[0] ? links[q].children[0].url : 0}`)
      }

      wom.render(this.root)

      var tf2Client = new ROSLIB.Topic({
        ros: this.ros,
        name: '/tf',
        messageType: 'tf2_msgs/TFMessage'
      })

      tf2Client.subscribe((message) => {
        for (let i = 0; i < message.transforms.length; i++) {
          if (message.transforms[i]) {
            let tf = message.transforms[i].transform
            let child = message.transforms[i].child_frame_id
            if (child && tf.translation && links[child]) {
              links[child].setPosition(tf.translation.x * 100,
                tf.translation.y * 100,
                tf.translation.z * 100, 'absolute', 'parent')
              links[child].setOrientation(tf.rotation.w, tf.rotation.x, tf.rotation.y, tf.rotation.z, 'absolute', 'parent')
            }
          }
        }
      })
    })
  }
}

module.exports = {
  resources: `${__dirname}/resources`,
  init () {
    console.log('mxw-robot: Init...')
  },
  done (r) {
    console.log('mxw-robot: Done...')
  },
  render (options) {
    console.log('mxw-robot: Render...')
    const robot = new MxwRobot(options)
    return <node />
  }
}
