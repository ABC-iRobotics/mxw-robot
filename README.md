# mxw_robot_component
Maxwhere module written in nodejs, to visualize and control "any" robot from Robot Operating System
# This branch contains hand gesture control implemented using the leap motion javascript sdk

This control is based on the follwing SDK:

https://developer.leapmotion.com/documentation/v2/javascript/index.html

The MAXWHERE camera is controlled by the first hand:

* **Tilt** your hand left or right to move left or right
* **Tilt** your hand upwards of downwards to move up or down
* **Move** your hand forward or backward to move forward or backward

Your second hand controlls a robot (both joint_states and trajectory control implemented)

Show the binary number of the joint you would like to turn (for example open thumb and all other finger closed moves the first joint, forefinger open and all other closed is two etc.)

Then **tilt** your hand to move the joint.


![alt text](https://github.com/nemesgyadam/mxw_robot_component/blob/master/iiwa.JPG "KUKA IIWA with controller")

![alt text](https://github.com/nemesgyadam/mxw_robot_component/blob/master/mxw_robots.JPG "Different robots")

![alt text](https://github.com/nemesgyadam/mxw_robot_component/blob/master/cloud_robots.JPG "Robots running in cloud computer")

# Usage:
Copy the module to components/robot folder (which is next to your app.js)

### In maxwhere app:
const robot = require('./components/robot')
wom.installComponent(require('./components/robot'), 'robot')

Add the robot node to your app (for example to the wom load ready function), and specify your settings file:

  ```
  wom.render(<robot file='settings.txt' controller={controller}
  />)
  ```
  
  ### Config
  Createing settings file (location /robot/resources/):
  Parameters:
  * auto_load(default:0)                    <---automaticly load robot(s)
  * show_controller(default:0)              <---add controler browser window to robot(s)
  * show_joint_controller(default:0)        <---add joint controller browser windows to robot(s) (show only when succecfully connected)
  * debug_controller(default:0)             <---show js debug console to (the first) controler browser
  * debug_joint_controller(default:0)       <---show js debug console to (the first) joint controler browser
  
  ### Adding robot(s)
  Plus specify one or more robot:
* ROS_IP [IP:PORT of ROS]
* position {optional} [position of the robot]  --default { x: 0, y: 0, z: 0 },
* rate {optional} [update frequency of tf]     --default 60
* BaseLink {optional} [fix link of the robot]  --default "base_link"
* scale {optional} [scale of the robot]        --default 1
* zoom {optional} [if the mesh was increased during convertation, you can set it here] --default 1
     
  For example:
  
  ```
  ROS_IP=163.172.157.86:9090;position={{ x: 600, y: 0, z: -300 }};rate=50;BaseLink=world;zoom=100;scale=1
  ```
  
  For complete example check settings.txt in resources folder
  
  ### Meshes
  
  Finally place the mesh files of the robot to resources folders subfolder named the same as the robots name specified in the URDF file
 
  For example:
 
  resources/iiwa/
  
  ## **IMPORANT!**
  Maxwhere uses ogre mesh files (http://www.ogre3d.org/tikiwiki/tiki-index.php) so if you have other format you must convert it to ogre   mesh(for help check ConvertReadMe)
  
  OR you can use one of the preconverted robots available in the following link:
  
  https://drive.google.com/drive/folders/0B-bi1_x93sJ5dUNnWVFwRmRybzA?usp=sharing
  
  Available robots are:
  
* ABB IRB2400
* ABB IRB5400
* ABB IRB6600
* ABB IRB6400
* FANUC LRMATE200IC
* FANUC M10IA
* FANUC M16IB
* FANUC M20IA
* FANUC M430IA2P
* KUKA IIWA7
* KUKA IIWA14
* KUKA YOUBOT

# Description

The project built on the robotwebtools project roslib.js module.

https://github.com/RobotWebTools/roslibjs


## ROS

There are the follwing important things must be running on ROS in order to use the modul:

### Robot Description
The robot's URDF file must be loaded to the ROS's robot_description parameter

For example:
  ```
<param name="robot_description" command="$(find xacro)/xacro --inorder '$(find abb_irb6600_support)/urdf/irb6640.xacro'" />
  ```

The module reads this to get all the neccesary detail about the robot. For example links and joints etc.

### Transfer Function

**The module reads the robots movement from the /tf topic**

So there must be a /tf topic and the robots position must be forwarded to it.

### Rosbridge Server

You must install and run a rosbridge server as specified here:

http://wiki.ros.org/rosbridge_server

It connects ROS with javascript, allowing for example to subscribe and to publish to any ROS topic.

### Robot State Publisher

You must install and run a robot state publisher server as specified here:

http://wiki.ros.org/robot_state_publisher

It publish the state of the robot to the /tf topic.

### Joint State Publisher

In order to control the robot, you must install and run a joint state publisher server as specified here:

http://wiki.ros.org/joint_state_publisher

### Editing launch file

If you add the following lines to your launch file the packages and nodes will start automaticly
  ```
	<node name="joint_state_publisher" pkg="joint_state_publisher" type="joint_state_publisher" />
	<node name="robot_state_publisher" pkg="robot_state_publisher" type="robot_state_publisher" />
	<include file="$(find rosbridge_server)/launch/rosbridge_websocket.launch" />
  ```

## Example projects

The module has been tested with the follwing ROS projects:

https://github.com/ros-industrial/abb

https://github.com/SalvoVirga/iiwa_stack

https://github.com/ros-industrial/fanuc

!Note you must add Rosbridge, Robot State Publisher and Joint State Publisher to these projects in order to work with the module.