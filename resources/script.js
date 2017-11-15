var i = 0
var ros
var command_joint_Topic
var joint_names_array = []
var positions_array = []
var upkeys = ['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o']
var downkeys = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']
var stepRange = 0.1
var isAuto = false
var messageTypes = {

  '/iiwa/PositionJointInterface_trajectory_controller/command': 'trajectory_msgs/JointTrajectory',
  '/joint_states': 'sensor_msgs/JointState'

}

var command_joint_Topic
$(function () {
  $('#tags').autocomplete({
    source: availableTags
  })
})
function searchMessage (topic) {
  if (messageTypes[topic.value]) { document.getElementById('tags').value = messageTypes[topic.value] }
}
function toBase () {
  for (i = 0; i < joint_names_array.length; i++) {
    document.getElementById('slider_' + joint_names_array[i]).value = 0
    SliderChange(document.getElementById('slider_' + joint_names_array[i]), 0)
  }
}
function toRandom () {
  for (i = 0; i < joint_names_array.length; i++) {
    var slider = document.getElementById('slider_' + joint_names_array[i])

    var newValue = (Math.random() * ((slider.max * 100) - (slider.min * 100)) + (slider.min * 100)) / 100
    slider.value = newValue
    SliderChange(document.getElementById('slider_' + joint_names_array[i]), newValue)
  }
}
function toAuto () {
  if (isAuto) {
    toRandom()
    setTimeout(function () {
      toRandom()
      toAuto()
    }, 1500)
  }
}

function Auto () {
  if (document.getElementById('autoButton').innerHTML == 'Auto Pilot') { startAuto() } else	{ stopAuto() }
}
function startAuto () {
  console.log(document.getElementById('autoButton').value)
  isAuto = true
  document.getElementById('autoButton').innerHTML = 'Stop Auto Pilot'
  toAuto()
}
function stopAuto () {
  isAuto = false
  document.getElementById('autoButton').innerHTML = 'Auto Pilot'
}

function applyTopic () {
  console.log(document.getElementById('selectNumber').value)
  console.log(document.getElementById('tags').value)
  i = 1
  command_joint_Topic = new ROSLIB.Topic({

    ros: ros,
    name: document.getElementById('selectNumber').value,
    messageType: document.getElementById('tags').value

  })

  command_joint_Topic.subscribe(function (message) {
    console.log(message)
    for (var si in message.joint_names) {
      console.log(si)
      console.log(message.joint_names[si])
      document.getElementById('slider_' + message.joint_names[si]).value = message.points[0].positions[si]
      document.getElementById('slider_value_' + message.joint_names[si]).value = message.points[0].positions[si]
    }
  })
}
function SliderChange (slider_name, value) {
  positions_array[slider_name.id.substr(7)] = parseFloat(value)
  document.getElementById('slider_value_' + slider_name.id.substr(7)).value = value
  controlling_message()
}
function NumberChange (number_name, value) {
  document.getElementById('slider_' + number_name.substr(13)).value = value
  SliderChange(document.getElementById('slider_' + number_name.substr(13)), value)
}
	 function controlling_message () {
		 switch (command_joint_Topic.messageType) {
   case 'trajectory_msgs/JointTrajectory':
     var message = new ROSLIB.Message({
       joint_names: joint_names_array,
       points: [
         {
           positions: Object.keys(positions_array).map(function (key) {
             return positions_array[key]
           }),
           time_from_start: {
             secs: 1,
             nsec: 0
           }
         }
       ]
     })
     break
   case 'sensor_msgs/JointState':
     var message = new ROSLIB.Message({
       name: joint_names_array,
       position:
			Object.keys(positions_array).map(function (key) {
  return positions_array[key]
})

     })
     break
		 }
   console.log('Publishing for topic |' + command_joint_Topic.name + '| with type |' + command_joint_Topic.messageType + '|')
   console.log(message)
   command_joint_Topic.publish(message)
 }
function findGetParameter (parameterName) {
  var result = null,
    tmp = []
  location.search
            .substr(1)
            .split('&')
            .forEach(function (item) {
              tmp = item.split('=')
              if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1])
            })
  return result
}
function init () {
    // Connect to ROS.
  ros = new ROSLIB.Ros({

		// url : 'ws://localhost:10023'
    // url:'ws://'+window.location.href.split('/')[2].split(':')[0]+':9090'
		   url: 'ws://' + findGetParameter('ip')
  })
  console.log('ws://' + findGetParameter('ip'))
  var param = new ROSLIB.Param({
    ros: this.ros,
    name: 'robot_description'
  })
	 var container = document.getElementById('slider_container')
 	param.get(function (param) {
   var urdfModel = new ROSLIB.UrdfModel({
     string: param
   })

   for (var j in urdfModel.joints) {
		 var joint = urdfModel.joints[j]
		 if (joint.type != 'fixed') {
			 joint_names_array.push(joint.name)
			 positions_array[joint.name] = 0
			 var div = document.createElement('div')
			 var step = (joint.maxval - joint.minval) / 100
			 div.innerHTML =
			' <div><p class="title">' + joint.name + '</p>	<input  value=0  id="slider_' + joint.name + '" oninput="SliderChange(this,this.value)" type="range" min="' + joint.minval + '" max="' + joint.maxval + '" step="' + step + '"><input type="number" value=0 oninput="NumberChange(this.id,this.value)" min="' + joint.minval + '" max="' + joint.maxval + '" step="' + step + '" id="slider_value_' + joint.name + '"></div> '
   container.appendChild(div)
 }
   }
 })
  var match = ''
  ros.getTopics(function (params) {
	      var options = params
		    var select = document.getElementById('selectNumber')

    options.forEach(function (opt) {
				// check for known topic
      if (opt in messageTypes) {
        if (match === '' || match.substring(0, 2) === '/j') {
        match = opt
      }
      }
      var el = document.createElement('option')
			  el.textContent = opt
			  el.value = opt
			  select.appendChild(el)
    })
    if (match != '') {
      document.getElementById('selectNumber').value = match
      document.getElementById('selectNumber').onchange()
      applyTopic()
    }
  })

  command_joint_Topic = new ROSLIB.Topic({

    ros: ros
      /* name : '/iiwa/PositionJointInterface_trajectory_controller/command',
      messageType : 'trajectory_msgs/JointTrajectory', */
	  /* name:'/joint_states',
	  messageType: 'sensor_msgs/JointState', */

  })

    // keypress controlling_message

	     document.onkeypress = function (event) {
       if (upkeys.indexOf(event.key) > -1) {
         positions_array[joint_names_array[upkeys.indexOf(event.key)]] += stepRange

         document.getElementById('slider_' + joint_names_array[upkeys.indexOf(event.key)])
				.value = positions_array[joint_names_array[upkeys.indexOf(event.key)]]

         SliderChange(document.getElementById('slider_' + joint_names_array[upkeys.indexOf(event.key)]), positions_array[joint_names_array[upkeys.indexOf(event.key)]])
       }
       if (downkeys.indexOf(event.key) > -1) {
         positions_array[joint_names_array[downkeys.indexOf(event.key)]] -= stepRange

         document.getElementById('slider_' + joint_names_array[downkeys.indexOf(event.key)])
				.value = positions_array[joint_names_array[downkeys.indexOf(event.key)]]

         SliderChange(document.getElementById('slider_' + joint_names_array[downkeys.indexOf(event.key)]), positions_array[joint_names_array[downkeys.indexOf(event.key)]])
       }
		 }
}

function getChar (event) {
  if (event.which == null) {
    return String.fromCharCode(event.keyCode) // IE
  } else if (event.which != 0 && event.charCode != 0) {
    return String.fromCharCode(event.which)   // the rest
  } else {
    return null // special key
  }
}
