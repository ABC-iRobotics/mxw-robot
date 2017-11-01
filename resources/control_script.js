const { ipcRenderer } = require('electron')
var id
window.onload = function (e) {
  id = findGetParameter('id')

  ipcRenderer.on('main-message', (event, arg) => {
    console.log(arg)
    if (!arg.length) {
      document.getElementById('IP').value = arg.ROS_IP
      document.getElementById('BaseLink').value = arg.BaseLink || 'base_link'
      document.getElementById('PositionX').value = parseFloat(arg.position.x)
      document.getElementById('PositionY').value = parseFloat(arg.position.y)
      document.getElementById('PositionZ').value = parseFloat(arg.position.z)
      document.getElementById('Rate').value = arg.rate || 60
      document.getElementById('Scale').value = arg.scale || 1
      document.getElementById('Zoom').value = arg.zoom || 1
    } else {
      var command = arg.split('||')
      if (command[0] == 'log') { document.getElementById('result').innerHTML = command[1] + '<br>' + document.getElementById('result').innerHTML }
    }
  })

  ipcRenderer.send('asynchronous-message', 'ready')
}
function Connect () {
  ipcRenderer.send('asynchronous-message', id + '||' + 'connect' + '||' + document.getElementById('IP').value +
            '||' + document.getElementById('BaseLink').value +
            '||' + document.getElementById('PositionX').value +
            '||' + document.getElementById('PositionY').value +
            '||' + document.getElementById('PositionZ').value +
            '||' + document.getElementById('Rate').value +
            '||' + document.getElementById('Scale').value +
            '||' + document.getElementById('Zoom').value
        )
}

function Disconnect () {
  ipcRenderer.send('asynchronous-message', id + '||' + 'disconnect' + '||' + document.getElementById('IP').value)
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
function Move () {
  ipcRenderer.send('asynchronous-message', id + '||' + 'move' + '||' + document.getElementById('PositionX').value +
            '||' + document.getElementById('PositionY').value +
            '||' + document.getElementById('PositionZ').value
        )
}
