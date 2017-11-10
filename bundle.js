(function(e, a) { for(var i in a) e[i] = a[i]; }(this, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 48);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var define = false;

/*!
 * EventEmitter2
 * https://github.com/hij1nx/EventEmitter2
 *
 * Copyright (c) 2013 hij1nx
 * Licensed under the MIT license.
 */
;!function(undefined) {

  var isArray = Array.isArray ? Array.isArray : function _isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  };
  var defaultMaxListeners = 10;

  function init() {
    this._events = {};
    if (this._conf) {
      configure.call(this, this._conf);
    }
  }

  function configure(conf) {
    if (conf) {

      this._conf = conf;

      conf.delimiter && (this.delimiter = conf.delimiter);
      conf.maxListeners && (this._events.maxListeners = conf.maxListeners);
      conf.wildcard && (this.wildcard = conf.wildcard);
      conf.newListener && (this.newListener = conf.newListener);

      if (this.wildcard) {
        this.listenerTree = {};
      }
    }
  }

  function EventEmitter(conf) {
    this._events = {};
    this.newListener = false;
    configure.call(this, conf);
  }

  //
  // Attention, function return type now is array, always !
  // It has zero elements if no any matches found and one or more
  // elements (leafs) if there are matches
  //
  function searchListenerTree(handlers, type, tree, i) {
    if (!tree) {
      return [];
    }
    var listeners=[], leaf, len, branch, xTree, xxTree, isolatedBranch, endReached,
        typeLength = type.length, currentType = type[i], nextType = type[i+1];
    if (i === typeLength && tree._listeners) {
      //
      // If at the end of the event(s) list and the tree has listeners
      // invoke those listeners.
      //
      if (typeof tree._listeners === 'function') {
        handlers && handlers.push(tree._listeners);
        return [tree];
      } else {
        for (leaf = 0, len = tree._listeners.length; leaf < len; leaf++) {
          handlers && handlers.push(tree._listeners[leaf]);
        }
        return [tree];
      }
    }

    if ((currentType === '*' || currentType === '**') || tree[currentType]) {
      //
      // If the event emitted is '*' at this part
      // or there is a concrete match at this patch
      //
      if (currentType === '*') {
        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+1));
          }
        }
        return listeners;
      } else if(currentType === '**') {
        endReached = (i+1 === typeLength || (i+2 === typeLength && nextType === '*'));
        if(endReached && tree._listeners) {
          // The next element has a _listeners, add it to the handlers.
          listeners = listeners.concat(searchListenerTree(handlers, type, tree, typeLength));
        }

        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            if(branch === '*' || branch === '**') {
              if(tree[branch]._listeners && !endReached) {
                listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], typeLength));
              }
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            } else if(branch === nextType) {
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+2));
            } else {
              // No match on this one, shift into the tree but not in the type array.
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            }
          }
        }
        return listeners;
      }

      listeners = listeners.concat(searchListenerTree(handlers, type, tree[currentType], i+1));
    }

    xTree = tree['*'];
    if (xTree) {
      //
      // If the listener tree will allow any match for this part,
      // then recursively explore all branches of the tree
      //
      searchListenerTree(handlers, type, xTree, i+1);
    }

    xxTree = tree['**'];
    if(xxTree) {
      if(i < typeLength) {
        if(xxTree._listeners) {
          // If we have a listener on a '**', it will catch all, so add its handler.
          searchListenerTree(handlers, type, xxTree, typeLength);
        }

        // Build arrays of matching next branches and others.
        for(branch in xxTree) {
          if(branch !== '_listeners' && xxTree.hasOwnProperty(branch)) {
            if(branch === nextType) {
              // We know the next element will match, so jump twice.
              searchListenerTree(handlers, type, xxTree[branch], i+2);
            } else if(branch === currentType) {
              // Current node matches, move into the tree.
              searchListenerTree(handlers, type, xxTree[branch], i+1);
            } else {
              isolatedBranch = {};
              isolatedBranch[branch] = xxTree[branch];
              searchListenerTree(handlers, type, { '**': isolatedBranch }, i+1);
            }
          }
        }
      } else if(xxTree._listeners) {
        // We have reached the end and still on a '**'
        searchListenerTree(handlers, type, xxTree, typeLength);
      } else if(xxTree['*'] && xxTree['*']._listeners) {
        searchListenerTree(handlers, type, xxTree['*'], typeLength);
      }
    }

    return listeners;
  }

  function growListenerTree(type, listener) {

    type = typeof type === 'string' ? type.split(this.delimiter) : type.slice();

    //
    // Looks for two consecutive '**', if so, don't add the event at all.
    //
    for(var i = 0, len = type.length; i+1 < len; i++) {
      if(type[i] === '**' && type[i+1] === '**') {
        return;
      }
    }

    var tree = this.listenerTree;
    var name = type.shift();

    while (name) {

      if (!tree[name]) {
        tree[name] = {};
      }

      tree = tree[name];

      if (type.length === 0) {

        if (!tree._listeners) {
          tree._listeners = listener;
        }
        else if(typeof tree._listeners === 'function') {
          tree._listeners = [tree._listeners, listener];
        }
        else if (isArray(tree._listeners)) {

          tree._listeners.push(listener);

          if (!tree._listeners.warned) {

            var m = defaultMaxListeners;

            if (typeof this._events.maxListeners !== 'undefined') {
              m = this._events.maxListeners;
            }

            if (m > 0 && tree._listeners.length > m) {

              tree._listeners.warned = true;
              console.error('(node) warning: possible EventEmitter memory ' +
                            'leak detected. %d listeners added. ' +
                            'Use emitter.setMaxListeners() to increase limit.',
                            tree._listeners.length);
              console.trace();
            }
          }
        }
        return true;
      }
      name = type.shift();
    }
    return true;
  }

  // By default EventEmitters will print a warning if more than
  // 10 listeners are added to it. This is a useful default which
  // helps finding memory leaks.
  //
  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.

  EventEmitter.prototype.delimiter = '.';

  EventEmitter.prototype.setMaxListeners = function(n) {
    this._events || init.call(this);
    this._events.maxListeners = n;
    if (!this._conf) this._conf = {};
    this._conf.maxListeners = n;
  };

  EventEmitter.prototype.event = '';

  EventEmitter.prototype.once = function(event, fn) {
    this.many(event, 1, fn);
    return this;
  };

  EventEmitter.prototype.many = function(event, ttl, fn) {
    var self = this;

    if (typeof fn !== 'function') {
      throw new Error('many only accepts instances of Function');
    }

    function listener() {
      if (--ttl === 0) {
        self.off(event, listener);
      }
      fn.apply(this, arguments);
    }

    listener._origin = fn;

    this.on(event, listener);

    return self;
  };

  EventEmitter.prototype.emit = function() {

    this._events || init.call(this);

    var type = arguments[0];

    if (type === 'newListener' && !this.newListener) {
      if (!this._events.newListener) { return false; }
    }

    // Loop through the *_all* functions and invoke them.
    if (this._all) {
      var l = arguments.length;
      var args = new Array(l - 1);
      for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
      for (i = 0, l = this._all.length; i < l; i++) {
        this.event = type;
        this._all[i].apply(this, args);
      }
    }

    // If there is no 'error' event listener then throw.
    if (type === 'error') {

      if (!this._all &&
        !this._events.error &&
        !(this.wildcard && this.listenerTree.error)) {

        if (arguments[1] instanceof Error) {
          throw arguments[1]; // Unhandled 'error' event
        } else {
          throw new Error("Uncaught, unspecified 'error' event.");
        }
        return false;
      }
    }

    var handler;

    if(this.wildcard) {
      handler = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
    }
    else {
      handler = this._events[type];
    }

    if (typeof handler === 'function') {
      this.event = type;
      if (arguments.length === 1) {
        handler.call(this);
      }
      else if (arguments.length > 1)
        switch (arguments.length) {
          case 2:
            handler.call(this, arguments[1]);
            break;
          case 3:
            handler.call(this, arguments[1], arguments[2]);
            break;
          // slower
          default:
            var l = arguments.length;
            var args = new Array(l - 1);
            for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
            handler.apply(this, args);
        }
      return true;
    }
    else if (handler) {
      var l = arguments.length;
      var args = new Array(l - 1);
      for (var i = 1; i < l; i++) args[i - 1] = arguments[i];

      var listeners = handler.slice();
      for (var i = 0, l = listeners.length; i < l; i++) {
        this.event = type;
        listeners[i].apply(this, args);
      }
      return (listeners.length > 0) || !!this._all;
    }
    else {
      return !!this._all;
    }

  };

  EventEmitter.prototype.on = function(type, listener) {

    if (typeof type === 'function') {
      this.onAny(type);
      return this;
    }

    if (typeof listener !== 'function') {
      throw new Error('on only accepts instances of Function');
    }
    this._events || init.call(this);

    // To avoid recursion in the case that type == "newListeners"! Before
    // adding it to the listeners, first emit "newListeners".
    this.emit('newListener', type, listener);

    if(this.wildcard) {
      growListenerTree.call(this, type, listener);
      return this;
    }

    if (!this._events[type]) {
      // Optimize the case of one listener. Don't need the extra array object.
      this._events[type] = listener;
    }
    else if(typeof this._events[type] === 'function') {
      // Adding the second element, need to change to array.
      this._events[type] = [this._events[type], listener];
    }
    else if (isArray(this._events[type])) {
      // If we've already got an array, just append.
      this._events[type].push(listener);

      // Check for listener leak
      if (!this._events[type].warned) {

        var m = defaultMaxListeners;

        if (typeof this._events.maxListeners !== 'undefined') {
          m = this._events.maxListeners;
        }

        if (m > 0 && this._events[type].length > m) {

          this._events[type].warned = true;
          console.error('(node) warning: possible EventEmitter memory ' +
                        'leak detected. %d listeners added. ' +
                        'Use emitter.setMaxListeners() to increase limit.',
                        this._events[type].length);
          console.trace();
        }
      }
    }
    return this;
  };

  EventEmitter.prototype.onAny = function(fn) {

    if (typeof fn !== 'function') {
      throw new Error('onAny only accepts instances of Function');
    }

    if(!this._all) {
      this._all = [];
    }

    // Add the function to the event listener collection.
    this._all.push(fn);
    return this;
  };

  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

  EventEmitter.prototype.off = function(type, listener) {
    if (typeof listener !== 'function') {
      throw new Error('removeListener only takes instances of Function');
    }

    var handlers,leafs=[];

    if(this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);
    }
    else {
      // does not use listeners(), so no side effect of creating _events[type]
      if (!this._events[type]) return this;
      handlers = this._events[type];
      leafs.push({_listeners:handlers});
    }

    for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
      var leaf = leafs[iLeaf];
      handlers = leaf._listeners;
      if (isArray(handlers)) {

        var position = -1;

        for (var i = 0, length = handlers.length; i < length; i++) {
          if (handlers[i] === listener ||
            (handlers[i].listener && handlers[i].listener === listener) ||
            (handlers[i]._origin && handlers[i]._origin === listener)) {
            position = i;
            break;
          }
        }

        if (position < 0) {
          continue;
        }

        if(this.wildcard) {
          leaf._listeners.splice(position, 1);
        }
        else {
          this._events[type].splice(position, 1);
        }

        if (handlers.length === 0) {
          if(this.wildcard) {
            delete leaf._listeners;
          }
          else {
            delete this._events[type];
          }
        }
        return this;
      }
      else if (handlers === listener ||
        (handlers.listener && handlers.listener === listener) ||
        (handlers._origin && handlers._origin === listener)) {
        if(this.wildcard) {
          delete leaf._listeners;
        }
        else {
          delete this._events[type];
        }
      }
    }

    return this;
  };

  EventEmitter.prototype.offAny = function(fn) {
    var i = 0, l = 0, fns;
    if (fn && this._all && this._all.length > 0) {
      fns = this._all;
      for(i = 0, l = fns.length; i < l; i++) {
        if(fn === fns[i]) {
          fns.splice(i, 1);
          return this;
        }
      }
    } else {
      this._all = [];
    }
    return this;
  };

  EventEmitter.prototype.removeListener = EventEmitter.prototype.off;

  EventEmitter.prototype.removeAllListeners = function(type) {
    if (arguments.length === 0) {
      !this._events || init.call(this);
      return this;
    }

    if(this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      var leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);

      for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
        var leaf = leafs[iLeaf];
        leaf._listeners = null;
      }
    }
    else {
      if (!this._events[type]) return this;
      this._events[type] = null;
    }
    return this;
  };

  EventEmitter.prototype.listeners = function(type) {
    if(this.wildcard) {
      var handlers = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handlers, ns, this.listenerTree, 0);
      return handlers;
    }

    this._events || init.call(this);

    if (!this._events[type]) this._events[type] = [];
    if (!isArray(this._events[type])) {
      this._events[type] = [this._events[type]];
    }
    return this._events[type];
  };

  EventEmitter.prototype.listenersAny = function() {

    if(this._all) {
      return this._all;
    }
    else {
      return [];
    }

  };

  if (typeof define === 'function' && define.amd) {
     // AMD. Register as an anonymous module.
    define(function() {
      return EventEmitter;
    });
  } else if (true) {
    // CommonJS
    exports.EventEmitter2 = EventEmitter;
  }
  else {
    // Browser global.
    window.EventEmitter2 = EventEmitter;
  }
}();



/***/ }),
/* 3 */
/***/ (function(module, exports) {

/**
 * @fileoverview
 * @author David Gossow - dgossow@willowgarage.com
 */

/**
 * A 3D vector.
 *
 *  @constructor
 *  @param options - object with following keys:
 *   * x - the x value
 *   * y - the y value
 *   * z - the z value
 */
function Vector3(options) {
  options = options || {};
  this.x = options.x || 0;
  this.y = options.y || 0;
  this.z = options.z || 0;
}

/**
 * Set the values of this vector to the sum of itself and the given vector.
 *
 * @param v the vector to add with
 */
Vector3.prototype.add = function(v) {
  this.x += v.x;
  this.y += v.y;
  this.z += v.z;
};

/**
 * Set the values of this vector to the difference of itself and the given vector.
 *
 * @param v the vector to subtract with
 */
Vector3.prototype.subtract = function(v) {
  this.x -= v.x;
  this.y -= v.y;
  this.z -= v.z;
};

/**
 * Multiply the given Quaternion with this vector.
 *
 * @param q - the quaternion to multiply with
 */
Vector3.prototype.multiplyQuaternion = function(q) {
  var ix = q.w * this.x + q.y * this.z - q.z * this.y;
  var iy = q.w * this.y + q.z * this.x - q.x * this.z;
  var iz = q.w * this.z + q.x * this.y - q.y * this.x;
  var iw = -q.x * this.x - q.y * this.y - q.z * this.z;
  this.x = ix * q.w + iw * -q.x + iy * -q.z - iz * -q.y;
  this.y = iy * q.w + iw * -q.y + iz * -q.x - ix * -q.z;
  this.z = iz * q.w + iw * -q.z + ix * -q.y - iy * -q.x;
};

/**
 * Clone a copy of this vector.
 *
 * @returns the cloned vector
 */
Vector3.prototype.clone = function() {
  return new Vector3(this);
};

module.exports = Vector3;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileoverview
 * @author Brandon Alexander - baalexander@gmail.com
 */

var assign = __webpack_require__(1);

/**
 * Message objects are used for publishing and subscribing to and from topics.
 *
 * @constructor
 * @param values - object matching the fields defined in the .msg definition file
 */
function Message(values) {
  assign(this, values);
}

module.exports = Message;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileoverview
 * @author Brandon Alexander - balexander@willowgarage.com
 */

var assign = __webpack_require__(1);

/**
 * A ServiceRequest is passed into the service call.
 *
 * @constructor
 * @param values - object matching the fields defined in the .srv definition file
 */
function ServiceRequest(values) {
  assign(this, values);
}

module.exports = ServiceRequest;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = {
	URDF_SPHERE : 0,
	URDF_BOX : 1,
	URDF_CYLINDER : 2,
	URDF_MESH : 3
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileoverview
 * @author Brandon Alexander - baalexander@gmail.com
 */

var WebSocket = __webpack_require__(33);
var socketAdapter = __webpack_require__(23);

var Service = __webpack_require__(9);
var ServiceRequest = __webpack_require__(6);

var assign = __webpack_require__(1);
var EventEmitter2 = __webpack_require__(2).EventEmitter2;

/**
 * Manages connection to the server and all interactions with ROS.
 *
 * Emits the following events:
 *  * 'error' - there was an error with ROS
 *  * 'connection' - connected to the WebSocket server
 *  * 'close' - disconnected to the WebSocket server
 *  * <topicName> - a message came from rosbridge with the given topic name
 *  * <serviceID> - a service response came from rosbridge with the given ID
 *
 * @constructor
 * @param options - possible keys include:
 *   * url (optional) - the WebSocket URL for rosbridge (can be specified later with `connect`)
 */
function Ros(options) {
  options = options || {};
  this.socket = null;
  this.idCounter = 0;
  this.isConnected = false;

  if (typeof options.groovyCompatibility === 'undefined') {
    this.groovyCompatibility = true;
  }
  else {
    this.groovyCompatibility = options.groovyCompatibility;
  }

  // Sets unlimited event listeners.
  this.setMaxListeners(0);

  // begin by checking if a URL was given
  if (options.url) {
    this.connect(options.url);
  }
}

Ros.prototype.__proto__ = EventEmitter2.prototype;

/**
 * Connect to the specified WebSocket.
 *
 * @param url - WebSocket URL for Rosbridge
 */
Ros.prototype.connect = function(url) {
  this.socket = assign(new WebSocket(url), socketAdapter(this));
};

/**
 * Disconnect from the WebSocket server.
 */
Ros.prototype.close = function() {
  if (this.socket) {
    this.socket.close();
  }
};

/**
 * Sends an authorization request to the server.
 *
 * @param mac - MAC (hash) string given by the trusted source.
 * @param client - IP of the client.
 * @param dest - IP of the destination.
 * @param rand - Random string given by the trusted source.
 * @param t - Time of the authorization request.
 * @param level - User level as a string given by the client.
 * @param end - End time of the client's session.
 */
Ros.prototype.authenticate = function(mac, client, dest, rand, t, level, end) {
  // create the request
  var auth = {
    op : 'auth',
    mac : mac,
    client : client,
    dest : dest,
    rand : rand,
    t : t,
    level : level,
    end : end
  };
  // send the request
  this.callOnConnection(auth);
};

/**
 * Sends the message over the WebSocket, but queues the message up if not yet
 * connected.
 */
Ros.prototype.callOnConnection = function(message) {
  var that = this;
  var messageJson = JSON.stringify(message);

  if (!this.isConnected) {
    that.once('connection', function() {
      that.socket.send(messageJson);
    });
  } else {
    that.socket.send(messageJson);
  }
};

/**
 * Retrieves list of topics in ROS as an array.
 *
 * @param callback function with params:
 *   * topics - Array of topic names
 */
Ros.prototype.getTopics = function(callback, failedCallback) {
  var topicsClient = new Service({
    ros : this,
    name : '/rosapi/topics',
    serviceType : 'rosapi/Topics'
  });

  var request = new ServiceRequest();
  if (typeof failedCallback === 'function'){
    topicsClient.callService(request,
      function(result) {
        callback(result.topics);
      },
      function(message){
        failedCallback(message);
      }
    );
  }else{
    topicsClient.callService(request, function(result) {
      callback(result.topics);
    });
  }
};

/**
 * Retrieves Topics in ROS as an array as specific type
 *
 * @param topicType topic type to find:
 * @param callback function with params:
 *   * topics - Array of topic names
 */
Ros.prototype.getTopicsForType = function(topicType, callback, failedCallback) {
  var topicsForTypeClient = new Service({
    ros : this,
    name : '/rosapi/topics_for_type',
    serviceType : 'rosapi/TopicsForType'
  });

  var request = new ServiceRequest({
    type: topicType
  });
  if (typeof failedCallback === 'function'){
    topicsForTypeClient.callService(request,
      function(result) {
        callback(result.topics);
      },
      function(message){
        failedCallback(message);
      }
    );
  }else{
    topicsForTypeClient.callService(request, function(result) {
      callback(result.topics);
    });
  }
};

/**
 * Retrieves list of active service names in ROS.
 *
 * @param callback - function with the following params:
 *   * services - array of service names
 */
Ros.prototype.getServices = function(callback, failedCallback) {
  var servicesClient = new Service({
    ros : this,
    name : '/rosapi/services',
    serviceType : 'rosapi/Services'
  });

  var request = new ServiceRequest();
  if (typeof failedCallback === 'function'){
    servicesClient.callService(request,
      function(result) {
        callback(result.services);
      },
      function(message) {
        failedCallback(message);
      }
    );
  }else{
    servicesClient.callService(request, function(result) {
      callback(result.services);
    });
  }
};

/**
 * Retrieves list of services in ROS as an array as specific type
 *
 * @param serviceType service type to find:
 * @param callback function with params:
 *   * topics - Array of service names
 */
Ros.prototype.getServicesForType = function(serviceType, callback, failedCallback) {
  var servicesForTypeClient = new Service({
    ros : this,
    name : '/rosapi/services_for_type',
    serviceType : 'rosapi/ServicesForType'
  });

  var request = new ServiceRequest({
    type: serviceType
  });
  if (typeof failedCallback === 'function'){
    servicesForTypeClient.callService(request,
      function(result) {
        callback(result.services);
      },
      function(message) {
        failedCallback(message);
      }
    );
  }else{
    servicesForTypeClient.callService(request, function(result) {
      callback(result.services);
    });
  }
};

/**
 * Retrieves list of active node names in ROS.
 *
 * @param callback - function with the following params:
 *   * nodes - array of node names
 */
Ros.prototype.getNodes = function(callback, failedCallback) {
  var nodesClient = new Service({
    ros : this,
    name : '/rosapi/nodes',
    serviceType : 'rosapi/Nodes'
  });

  var request = new ServiceRequest();
  if (typeof failedCallback === 'function'){
    nodesClient.callService(request,
      function(result) {
        callback(result.nodes);
      },
      function(message) {
        failedCallback(message);
      }
    );
  }else{
    nodesClient.callService(request, function(result) {
      callback(result.nodes);
    });
  }
};

/**
 * Retrieves list of param names from the ROS Parameter Server.
 *
 * @param callback function with params:
 *  * params - array of param names.
 */
Ros.prototype.getParams = function(callback, failedCallback) {
  var paramsClient = new Service({
    ros : this,
    name : '/rosapi/get_param_names',
    serviceType : 'rosapi/GetParamNames'
  });
  var request = new ServiceRequest();
  if (typeof failedCallback === 'function'){
    paramsClient.callService(request,
      function(result) {
        callback(result.names);
      },
      function(message){
        failedCallback(message);
      }
    );
  }else{
    paramsClient.callService(request, function(result) {
      callback(result.names);
    });
  }
};

/**
 * Retrieves a type of ROS topic.
 *
 * @param topic name of the topic:
 * @param callback - function with params:
 *   * type - String of the topic type
 */
Ros.prototype.getTopicType = function(topic, callback, failedCallback) {
  var topicTypeClient = new Service({
    ros : this,
    name : '/rosapi/topic_type',
    serviceType : 'rosapi/TopicType'
  });
  var request = new ServiceRequest({
    topic: topic
  });

  if (typeof failedCallback === 'function'){
    topicTypeClient.callService(request,
      function(result) {
        callback(result.type);
      },
      function(message){
        failedCallback(message);
      }
    );
  }else{
    topicTypeClient.callService(request, function(result) {
      callback(result.type);
    });
  }
};

/**
 * Retrieves a type of ROS service.
 *
 * @param service name of service:
 * @param callback - function with params:
 *   * type - String of the service type
 */
Ros.prototype.getServiceType = function(service, callback, failedCallback) {
  var serviceTypeClient = new Service({
    ros : this,
    name : '/rosapi/service_type',
    serviceType : 'rosapi/ServiceType'
  });
  var request = new ServiceRequest({
    service: service
  });

  if (typeof failedCallback === 'function'){
    serviceTypeClient.callService(request,
      function(result) {
        callback(result.type);
      },
      function(message){
        failedCallback(message);
      }
    );
  }else{
    serviceTypeClient.callService(request, function(result) {
      callback(result.type);
    });
  }
};

/**
 * Retrieves a detail of ROS message.
 *
 * @param callback - function with params:
 *   * details - Array of the message detail
 * @param message - String of a topic type
 */
Ros.prototype.getMessageDetails = function(message, callback, failedCallback) {
  var messageDetailClient = new Service({
    ros : this,
    name : '/rosapi/message_details',
    serviceType : 'rosapi/MessageDetails'
  });
  var request = new ServiceRequest({
    type: message
  });

  if (typeof failedCallback === 'function'){
    messageDetailClient.callService(request,
      function(result) {
        callback(result.typedefs);
      },
      function(message){
        failedCallback(message);
      }
    );
  }else{
    messageDetailClient.callService(request, function(result) {
      callback(result.typedefs);
    });
  }
};

/**
 * Decode a typedefs into a dictionary like `rosmsg show foo/bar`
 *
 * @param defs - array of type_def dictionary
 */
Ros.prototype.decodeTypeDefs = function(defs) {
  var that = this;

  // calls itself recursively to resolve type definition using hints.
  var decodeTypeDefsRec = function(theType, hints) {
    var typeDefDict = {};
    for (var i = 0; i < theType.fieldnames.length; i++) {
      var arrayLen = theType.fieldarraylen[i];
      var fieldName = theType.fieldnames[i];
      var fieldType = theType.fieldtypes[i];
      if (fieldType.indexOf('/') === -1) { // check the fieldType includes '/' or not
        if (arrayLen === -1) {
          typeDefDict[fieldName] = fieldType;
        }
        else {
          typeDefDict[fieldName] = [fieldType];
        }
      }
      else {
        // lookup the name
        var sub = false;
        for (var j = 0; j < hints.length; j++) {
          if (hints[j].type.toString() === fieldType.toString()) {
            sub = hints[j];
            break;
          }
        }
        if (sub) {
          var subResult = decodeTypeDefsRec(sub, hints);
          if (arrayLen === -1) {
            typeDefDict[fieldName] = subResult;
          }
          else {
            typeDefDict[fieldName] = [subResult];
          }
        }
        else {
          that.emit('error', 'Cannot find ' + fieldType + ' in decodeTypeDefs');
        }
      }
    }
    return typeDefDict;
  };
  
  return decodeTypeDefsRec(defs[0], defs);
};


module.exports = Ros;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileoverview
 * @author Brandon Alexander - baalexander@gmail.com
 */

var ServiceResponse = __webpack_require__(22);
var ServiceRequest = __webpack_require__(6);
var EventEmitter2 = __webpack_require__(2).EventEmitter2;

/**
 * A ROS service client.
 *
 * @constructor
 * @params options - possible keys include:
 *   * ros - the ROSLIB.Ros connection handle
 *   * name - the service name, like /add_two_ints
 *   * serviceType - the service type, like 'rospy_tutorials/AddTwoInts'
 */
function Service(options) {
  options = options || {};
  this.ros = options.ros;
  this.name = options.name;
  this.serviceType = options.serviceType;
  this.isAdvertised = false;

  this._serviceCallback = null;
}
Service.prototype.__proto__ = EventEmitter2.prototype;
/**
 * Calls the service. Returns the service response in the callback.
 *
 * @param request - the ROSLIB.ServiceRequest to send
 * @param callback - function with params:
 *   * response - the response from the service request
 * @param failedCallback - the callback function when the service call failed (optional). Params:
 *   * error - the error message reported by ROS
 */
Service.prototype.callService = function(request, callback, failedCallback) {
  if (this.isAdvertised) {
    return;
  }

  var serviceCallId = 'call_service:' + this.name + ':' + (++this.ros.idCounter);

  if (callback || failedCallback) {
    this.ros.once(serviceCallId, function(message) {
      if (message.result !== undefined && message.result === false) {
        if (typeof failedCallback === 'function') {
          failedCallback(message.values);
        }
      } else if (typeof callback === 'function') {
        callback(new ServiceResponse(message.values));
      }
    });
  }

  var call = {
    op : 'call_service',
    id : serviceCallId,
    service : this.name,
    args : request
  };
  this.ros.callOnConnection(call);
};

/**
 * Every time a message is published for the given topic, the callback
 * will be called with the message object.
 *
 * @param callback - function with the following params:
 *   * message - the published message
 */
Service.prototype.advertise = function(callback) {
  if (this.isAdvertised || typeof callback !== 'function') {
    return;
  }

  this._serviceCallback = callback;
  this.ros.on(this.name, this._serviceResponse.bind(this));
  this.ros.callOnConnection({
    op: 'advertise_service',
    type: this.serviceType,
    service: this.name
  });
  this.isAdvertised = true;
};

Service.prototype.unadvertise = function() {
  if (!this.isAdvertised) {
    return;
  }
  this.ros.callOnConnection({
    op: 'unadvertise_service',
    service: this.name
  });
  this.isAdvertised = false;
};

Service.prototype._serviceResponse = function(rosbridgeRequest) {
  var response = {};
  var success = this._serviceCallback(rosbridgeRequest.args, response);

  var call = {
    op: 'service_response',
    service: this.name,
    values: new ServiceResponse(response),
    result: success
  };

  if (rosbridgeRequest.id) {
    call.id = rosbridgeRequest.id;
  }

  this.ros.callOnConnection(call);
};

module.exports = Service;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileoverview
 * @author Brandon Alexander - baalexander@gmail.com
 */

var EventEmitter2 = __webpack_require__(2).EventEmitter2;
var Message = __webpack_require__(5);

/**
 * Publish and/or subscribe to a topic in ROS.
 *
 * Emits the following events:
 *  * 'warning' - if there are any warning during the Topic creation
 *  * 'message' - the message data from rosbridge
 *
 * @constructor
 * @param options - object with following keys:
 *   * ros - the ROSLIB.Ros connection handle
 *   * name - the topic name, like /cmd_vel
 *   * messageType - the message type, like 'std_msgs/String'
 *   * compression - the type of compression to use, like 'png'
 *   * throttle_rate - the rate (in ms in between messages) at which to throttle the topics
 *   * queue_size - the queue created at bridge side for re-publishing webtopics (defaults to 100)
 *   * latch - latch the topic when publishing
 *   * queue_length - the queue length at bridge side used when subscribing (defaults to 0, no queueing).
 */
function Topic(options) {
  options = options || {};
  this.ros = options.ros;
  this.name = options.name;
  this.messageType = options.messageType;
  this.isAdvertised = false;
  this.compression = options.compression || 'none';
  this.throttle_rate = options.throttle_rate || 0;
  this.latch = options.latch || false;
  this.queue_size = options.queue_size || 100;
  this.queue_length = options.queue_length || 0;

  // Check for valid compression types
  if (this.compression && this.compression !== 'png' &&
        this.compression !== 'none') {
    this.emit('warning', this.compression +
      ' compression is not supported. No compression will be used.');
  }

  // Check if throttle rate is negative
  if (this.throttle_rate < 0) {
    this.emit('warning', this.throttle_rate + ' is not allowed. Set to 0');
    this.throttle_rate = 0;
  }

  var that = this;
  this._messageCallback = function(data) {
    that.emit('message', new Message(data));
  };
}
Topic.prototype.__proto__ = EventEmitter2.prototype;

/**
 * Every time a message is published for the given topic, the callback
 * will be called with the message object.
 *
 * @param callback - function with the following params:
 *   * message - the published message
 */
Topic.prototype.subscribe = function(callback) {
  if (typeof callback === 'function') {
    this.on('message', callback);
  }

  if (this.subscribeId) { return; }
  this.ros.on(this.name, this._messageCallback);
  this.subscribeId = 'subscribe:' + this.name + ':' + (++this.ros.idCounter);
  this.ros.callOnConnection({
    op: 'subscribe',
    id: this.subscribeId,
    type: this.messageType,
    topic: this.name,
    compression: this.compression,
    throttle_rate: this.throttle_rate,
    queue_length: this.queue_length
  });
};

/**
 * Unregisters as a subscriber for the topic. Unsubscribing stop remove
 * all subscribe callbacks. To remove a call back, you must explicitly
 * pass the callback function in.
 *
 * @param callback - the optional callback to unregister, if
 *     * provided and other listeners are registered the topic won't
 *     * unsubscribe, just stop emitting to the passed listener
 */
Topic.prototype.unsubscribe = function(callback) {
  if (callback) {
    this.off('message', callback);
    // If there is any other callbacks still subscribed don't unsubscribe
    if (this.listeners('message').length) { return; }
  }
  if (!this.subscribeId) { return; }
  // Note: Don't call this.removeAllListeners, allow client to handle that themselves
  this.ros.off(this.name, this._messageCallback);
  this.emit('unsubscribe');
  this.ros.callOnConnection({
    op: 'unsubscribe',
    id: this.subscribeId,
    topic: this.name
  });
  this.subscribeId = null;
};

/**
 * Registers as a publisher for the topic.
 */
Topic.prototype.advertise = function() {
  if (this.isAdvertised) {
    return;
  }
  this.advertiseId = 'advertise:' + this.name + ':' + (++this.ros.idCounter);
  this.ros.callOnConnection({
    op: 'advertise',
    id: this.advertiseId,
    type: this.messageType,
    topic: this.name,
    latch: this.latch,
    queue_size: this.queue_size
  });
  this.isAdvertised = true;
};

/**
 * Unregisters as a publisher for the topic.
 */
Topic.prototype.unadvertise = function() {
  if (!this.isAdvertised) {
    return;
  }
  this.emit('unadvertise');
  this.ros.callOnConnection({
    op: 'unadvertise',
    id: this.advertiseId,
    topic: this.name
  });
  this.isAdvertised = false;
};

/**
 * Publish the message.
 *
 * @param message - A ROSLIB.Message object.
 */
Topic.prototype.publish = function(message) {
  if (!this.isAdvertised) {
    this.advertise();
  }

  this.ros.idCounter++;
  var call = {
    op: 'publish',
    id: 'publish:' + this.name + ':' + this.ros.idCounter,
    topic: this.name,
    msg: message,
    latch: this.latch
  };
  this.ros.callOnConnection(call);
};

module.exports = Topic;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

/**
 * @fileoverview
 * @author David Gossow - dgossow@willowgarage.com
 */

/**
 * A Quaternion.
 *
 *  @constructor
 *  @param options - object with following keys:
 *   * x - the x value
 *   * y - the y value
 *   * z - the z value
 *   * w - the w value
 */
function Quaternion(options) {
  options = options || {};
  this.x = options.x || 0;
  this.y = options.y || 0;
  this.z = options.z || 0;
  this.w = (typeof options.w === 'number') ? options.w : 1;
}

/**
 * Perform a conjugation on this quaternion.
 */
Quaternion.prototype.conjugate = function() {
  this.x *= -1;
  this.y *= -1;
  this.z *= -1;
};

/**
 * Return the norm of this quaternion.
 */
Quaternion.prototype.norm = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
};

/**
 * Perform a normalization on this quaternion.
 */
Quaternion.prototype.normalize = function() {
  var l = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  if (l === 0) {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.w = 1;
  } else {
    l = 1 / l;
    this.x = this.x * l;
    this.y = this.y * l;
    this.z = this.z * l;
    this.w = this.w * l;
  }
};

/**
 * Convert this quaternion into its inverse.
 */
Quaternion.prototype.invert = function() {
  this.conjugate();
  this.normalize();
};

/**
 * Set the values of this quaternion to the product of itself and the given quaternion.
 *
 * @param q the quaternion to multiply with
 */
Quaternion.prototype.multiply = function(q) {
  var newX = this.x * q.w + this.y * q.z - this.z * q.y + this.w * q.x;
  var newY = -this.x * q.z + this.y * q.w + this.z * q.x + this.w * q.y;
  var newZ = this.x * q.y - this.y * q.x + this.z * q.w + this.w * q.z;
  var newW = -this.x * q.x - this.y * q.y - this.z * q.z + this.w * q.w;
  this.x = newX;
  this.y = newY;
  this.z = newZ;
  this.w = newW;
};

/**
 * Clone a copy of this quaternion.
 *
 * @returns the cloned quaternion
 */
Quaternion.prototype.clone = function() {
  return new Quaternion(this);
};

module.exports = Quaternion;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {


var zlib = __webpack_require__(45);

var AVAILABLE_WINDOW_BITS = [8, 9, 10, 11, 12, 13, 14, 15];
var DEFAULT_WINDOW_BITS = 15;
var DEFAULT_MEM_LEVEL = 8;

PerMessageDeflate.extensionName = 'permessage-deflate';

/**
 * Per-message Compression Extensions implementation
 */

function PerMessageDeflate(options, isServer,maxPayload) {
  if (this instanceof PerMessageDeflate === false) {
    throw new TypeError("Classes can't be function-called");
  }

  this._options = options || {};
  this._isServer = !!isServer;
  this._inflate = null;
  this._deflate = null;
  this.params = null;
  this._maxPayload = maxPayload || 0;
}

/**
 * Create extension parameters offer
 *
 * @api public
 */

PerMessageDeflate.prototype.offer = function() {
  var params = {};
  if (this._options.serverNoContextTakeover) {
    params.server_no_context_takeover = true;
  }
  if (this._options.clientNoContextTakeover) {
    params.client_no_context_takeover = true;
  }
  if (this._options.serverMaxWindowBits) {
    params.server_max_window_bits = this._options.serverMaxWindowBits;
  }
  if (this._options.clientMaxWindowBits) {
    params.client_max_window_bits = this._options.clientMaxWindowBits;
  } else if (this._options.clientMaxWindowBits == null) {
    params.client_max_window_bits = true;
  }
  return params;
};

/**
 * Accept extension offer
 *
 * @api public
 */

PerMessageDeflate.prototype.accept = function(paramsList) {
  paramsList = this.normalizeParams(paramsList);

  var params;
  if (this._isServer) {
    params = this.acceptAsServer(paramsList);
  } else {
    params = this.acceptAsClient(paramsList);
  }

  this.params = params;
  return params;
};

/**
 * Releases all resources used by the extension
 *
 * @api public
 */

PerMessageDeflate.prototype.cleanup = function() {
  if (this._inflate) {
    if (this._inflate.writeInProgress) {
      this._inflate.pendingClose = true;
    } else {
      if (this._inflate.close) this._inflate.close();
      this._inflate = null;
    }
  }
  if (this._deflate) {
    if (this._deflate.writeInProgress) {
      this._deflate.pendingClose = true;
    } else {
      if (this._deflate.close) this._deflate.close();
      this._deflate = null;
    }
  }
};

/**
 * Accept extension offer from client
 *
 * @api private
 */

PerMessageDeflate.prototype.acceptAsServer = function(paramsList) {
  var accepted = {};
  var result = paramsList.some(function(params) {
    accepted = {};
    if (this._options.serverNoContextTakeover === false && params.server_no_context_takeover) {
      return;
    }
    if (this._options.serverMaxWindowBits === false && params.server_max_window_bits) {
      return;
    }
    if (typeof this._options.serverMaxWindowBits === 'number' &&
        typeof params.server_max_window_bits === 'number' &&
        this._options.serverMaxWindowBits > params.server_max_window_bits) {
      return;
    }
    if (typeof this._options.clientMaxWindowBits === 'number' && !params.client_max_window_bits) {
      return;
    }

    if (this._options.serverNoContextTakeover || params.server_no_context_takeover) {
      accepted.server_no_context_takeover = true;
    }
    if (this._options.clientNoContextTakeover) {
      accepted.client_no_context_takeover = true;
    }
    if (this._options.clientNoContextTakeover !== false && params.client_no_context_takeover) {
      accepted.client_no_context_takeover = true;
    }
    if (typeof this._options.serverMaxWindowBits === 'number') {
      accepted.server_max_window_bits = this._options.serverMaxWindowBits;
    } else if (typeof params.server_max_window_bits === 'number') {
      accepted.server_max_window_bits = params.server_max_window_bits;
    }
    if (typeof this._options.clientMaxWindowBits === 'number') {
      accepted.client_max_window_bits = this._options.clientMaxWindowBits;
    } else if (this._options.clientMaxWindowBits !== false && typeof params.client_max_window_bits === 'number') {
      accepted.client_max_window_bits = params.client_max_window_bits;
    }
    return true;
  }, this);

  if (!result) {
    throw new Error('Doesn\'t support the offered configuration');
  }

  return accepted;
};

/**
 * Accept extension response from server
 *
 * @api privaye
 */

PerMessageDeflate.prototype.acceptAsClient = function(paramsList) {
  var params = paramsList[0];
  if (this._options.clientNoContextTakeover != null) {
    if (this._options.clientNoContextTakeover === false && params.client_no_context_takeover) {
      throw new Error('Invalid value for "client_no_context_takeover"');
    }
  }
  if (this._options.clientMaxWindowBits != null) {
    if (this._options.clientMaxWindowBits === false && params.client_max_window_bits) {
      throw new Error('Invalid value for "client_max_window_bits"');
    }
    if (typeof this._options.clientMaxWindowBits === 'number' &&
        (!params.client_max_window_bits || params.client_max_window_bits > this._options.clientMaxWindowBits)) {
      throw new Error('Invalid value for "client_max_window_bits"');
    }
  }
  return params;
};

/**
 * Normalize extensions parameters
 *
 * @api private
 */

PerMessageDeflate.prototype.normalizeParams = function(paramsList) {
  return paramsList.map(function(params) {
    Object.keys(params).forEach(function(key) {
      var value = params[key];
      if (value.length > 1) {
        throw new Error('Multiple extension parameters for ' + key);
      }

      value = value[0];

      switch (key) {
      case 'server_no_context_takeover':
      case 'client_no_context_takeover':
        if (value !== true) {
          throw new Error('invalid extension parameter value for ' + key + ' (' + value + ')');
        }
        params[key] = true;
        break;
      case 'server_max_window_bits':
      case 'client_max_window_bits':
        if (typeof value === 'string') {
          value = parseInt(value, 10);
          if (!~AVAILABLE_WINDOW_BITS.indexOf(value)) {
            throw new Error('invalid extension parameter value for ' + key + ' (' + value + ')');
          }
        }
        if (!this._isServer && value === true) {
          throw new Error('Missing extension parameter value for ' + key);
        }
        params[key] = value;
        break;
      default:
        throw new Error('Not defined extension parameter (' + key + ')');
      }
    }, this);
    return params;
  }, this);
};

/**
 * Decompress message
 *
 * @api public
 */

PerMessageDeflate.prototype.decompress = function (data, fin, callback) {
  var endpoint = this._isServer ? 'client' : 'server';

  if (!this._inflate) {
    var maxWindowBits = this.params[endpoint + '_max_window_bits'];
    this._inflate = zlib.createInflateRaw({
      windowBits: 'number' === typeof maxWindowBits ? maxWindowBits : DEFAULT_WINDOW_BITS
    });
  }
  this._inflate.writeInProgress = true;

  var self = this;
  var buffers = [];
  var cumulativeBufferLength=0;

  this._inflate.on('error', onError).on('data', onData);
  this._inflate.write(data);
  if (fin) {
    this._inflate.write(new Buffer([0x00, 0x00, 0xff, 0xff]));
  }
  this._inflate.flush(function() {
    cleanup();
    callback(null, Buffer.concat(buffers));
  });

  function onError(err) {
    cleanup();
    callback(err);
  }

  function onData(data) {
      if(self._maxPayload!==undefined && self._maxPayload!==null && self._maxPayload>0){
          cumulativeBufferLength+=data.length;
          if(cumulativeBufferLength>self._maxPayload){
            buffers=[];
            cleanup();
            var err={type:1009};
            callback(err);
            return;
          }
      }
      buffers.push(data);
  }

  function cleanup() {
    if (!self._inflate) return;
    self._inflate.removeListener('error', onError);
    self._inflate.removeListener('data', onData);
    self._inflate.writeInProgress = false;
    if ((fin && self.params[endpoint + '_no_context_takeover']) || self._inflate.pendingClose) {
      if (self._inflate.close) self._inflate.close();
      self._inflate = null;
    }
  }
};

/**
 * Compress message
 *
 * @api public
 */

PerMessageDeflate.prototype.compress = function (data, fin, callback) {
  var endpoint = this._isServer ? 'server' : 'client';

  if (!this._deflate) {
    var maxWindowBits = this.params[endpoint + '_max_window_bits'];
    this._deflate = zlib.createDeflateRaw({
      flush: zlib.Z_SYNC_FLUSH,
      windowBits: 'number' === typeof maxWindowBits ? maxWindowBits : DEFAULT_WINDOW_BITS,
      memLevel: this._options.memLevel || DEFAULT_MEM_LEVEL
    });
  }
  this._deflate.writeInProgress = true;

  var self = this;
  var buffers = [];

  this._deflate.on('error', onError).on('data', onData);
  this._deflate.write(data);
  this._deflate.flush(function() {
    cleanup();
    var data = Buffer.concat(buffers);
    if (fin) {
      data = data.slice(0, data.length - 4);
    }
    callback(null, data);
  });

  function onError(err) {
    cleanup();
    callback(err);
  }

  function onData(data) {
    buffers.push(data);
  }

  function cleanup() {
    if (!self._deflate) return;
    self._deflate.removeListener('error', onError);
    self._deflate.removeListener('data', onData);
    self._deflate.writeInProgress = false;
    if ((fin && self.params[endpoint + '_no_context_takeover']) || self._deflate.pendingClose) {
      if (self._deflate.close) self._deflate.close();
      self._deflate = null;
    }
  }
};

module.exports = PerMessageDeflate;


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

/**
 * Mixin a feature to the core/Ros prototype.
 * For example, mixin(Ros, ['Topic'], {Topic: <Topic>})
 * will add a topic bound to any Ros instances so a user
 * can call `var topic = ros.Topic({name: '/foo'});`
 *
 * @author Graeme Yeates - github.com/megawac
 */
module.exports = function(Ros, classes, features) {
    classes.forEach(function(className) {
        var Class = features[className];
        Ros.prototype[className] = function(options) {
            options.ros = this;
            return new Class(options);
        };
    });
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview 
 * @author Benjamin Pitzer - ben.pitzer@gmail.com
 * @author Russell Toris - rctoris@wpi.edu
 */

var UrdfColor = __webpack_require__(27);

/**
 * A Material element in a URDF.
 *
 * @constructor
 * @param options - object with following keys:
 *  * xml - the XML element to parse
 */
function UrdfMaterial(options) {
  this.textureFilename = null;
  this.color = null;

  this.name = options.xml.getAttribute('name');

  // Texture
  var textures = options.xml.getElementsByTagName('texture');
  if (textures.length > 0) {
    this.textureFilename = textures[0].getAttribute('filename');
  }

  // Color
  var colors = options.xml.getElementsByTagName('color');
  if (colors.length > 0) {
    // Parse the RBGA string
    this.color = new UrdfColor({
      xml : colors[0]
    });
  }
}

UrdfMaterial.prototype.isLink = function() {
  return this.color === null && this.textureFilename === null;
};

var assign = __webpack_require__(1);

UrdfMaterial.prototype.assign = function(obj) {
    return assign(this, obj);
};

module.exports = UrdfMaterial;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 18;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
 * MIT Licensed
 */

var fs = __webpack_require__(4);

function Options(defaults) {
  var internalValues = {};
  var values = this.value = {};
  Object.keys(defaults).forEach(function(key) {
    internalValues[key] = defaults[key];
    Object.defineProperty(values, key, {
      get: function() { return internalValues[key]; },
      configurable: false,
      enumerable: true
    });
  });
  this.reset = function() {
    Object.keys(defaults).forEach(function(key) {
      internalValues[key] = defaults[key];
    });
    return this;
  };
  this.merge = function(options, required) {
    options = options || {};
    if (Object.prototype.toString.call(required) === '[object Array]') {
      var missing = [];
      for (var i = 0, l = required.length; i < l; ++i) {
        var key = required[i];
        if (!(key in options)) {
          missing.push(key);
        }
      }
      if (missing.length > 0) {
        if (missing.length > 1) {
          throw new Error('options ' +
            missing.slice(0, missing.length - 1).join(', ') + ' and ' +
            missing[missing.length - 1] + ' must be defined');
        }
        else throw new Error('option ' + missing[0] + ' must be defined');
      }
    }
    Object.keys(options).forEach(function(key) {
      if (key in internalValues) {
        internalValues[key] = options[key];
      }
    });
    return this;
  };
  this.copy = function(keys) {
    var obj = {};
    Object.keys(defaults).forEach(function(key) {
      if (keys.indexOf(key) !== -1) {
        obj[key] = values[key];
      }
    });
    return obj;
  };
  this.read = function(filename, cb) {
    if (typeof cb == 'function') {
      var self = this;
      fs.readFile(filename, function(error, data) {
        if (error) return cb(error);
        var conf = JSON.parse(data);
        self.merge(conf);
        cb();
      });
    }
    else {
      var conf = JSON.parse(fs.readFileSync(filename));
      this.merge(conf);
    }
    return this;
  };
  this.isDefined = function(key) {
    return typeof values[key] != 'undefined';
  };
  this.isDefinedAndNonNull = function(key) {
    return typeof values[key] != 'undefined' && values[key] !== null;
  };
  Object.freeze(values);
  Object.freeze(this);
}

module.exports = Options;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview
 * @author Russell Toris - rctoris@wpi.edu
 */

var Topic = __webpack_require__(10);
var Message = __webpack_require__(5);
var EventEmitter2 = __webpack_require__(2).EventEmitter2;

/**
 * An actionlib action client.
 *
 * Emits the following events:
 *  * 'timeout' - if a timeout occurred while sending a goal
 *  * 'status' - the status messages received from the action server
 *  * 'feedback' -  the feedback messages received from the action server
 *  * 'result' - the result returned from the action server
 *
 *  @constructor
 *  @param options - object with following keys:
 *   * ros - the ROSLIB.Ros connection handle
 *   * serverName - the action server name, like /fibonacci
 *   * actionName - the action message name, like 'actionlib_tutorials/FibonacciAction'
 *   * timeout - the timeout length when connecting to the action server
 */
function ActionClient(options) {
  var that = this;
  options = options || {};
  this.ros = options.ros;
  this.serverName = options.serverName;
  this.actionName = options.actionName;
  this.timeout = options.timeout;
  this.omitFeedback = options.omitFeedback;
  this.omitStatus = options.omitStatus;
  this.omitResult = options.omitResult;
  this.goals = {};

  // flag to check if a status has been received
  var receivedStatus = false;

  // create the topics associated with actionlib
  var feedbackListener = new Topic({
    ros : this.ros,
    name : this.serverName + '/feedback',
    messageType : this.actionName + 'Feedback'
  });

  var statusListener = new Topic({
    ros : this.ros,
    name : this.serverName + '/status',
    messageType : 'actionlib_msgs/GoalStatusArray'
  });

  var resultListener = new Topic({
    ros : this.ros,
    name : this.serverName + '/result',
    messageType : this.actionName + 'Result'
  });

  this.goalTopic = new Topic({
    ros : this.ros,
    name : this.serverName + '/goal',
    messageType : this.actionName + 'Goal'
  });

  this.cancelTopic = new Topic({
    ros : this.ros,
    name : this.serverName + '/cancel',
    messageType : 'actionlib_msgs/GoalID'
  });

  // advertise the goal and cancel topics
  this.goalTopic.advertise();
  this.cancelTopic.advertise();

  // subscribe to the status topic
  if (!this.omitStatus) {
    statusListener.subscribe(function(statusMessage) {
      receivedStatus = true;
      statusMessage.status_list.forEach(function(status) {
        var goal = that.goals[status.goal_id.id];
        if (goal) {
          goal.emit('status', status);
        }
      });
    });
  }

  // subscribe the the feedback topic
  if (!this.omitFeedback) {
    feedbackListener.subscribe(function(feedbackMessage) {
      var goal = that.goals[feedbackMessage.status.goal_id.id];
      if (goal) {
        goal.emit('status', feedbackMessage.status);
        goal.emit('feedback', feedbackMessage.feedback);
      }
    });
  }

  // subscribe to the result topic
  if (!this.omitResult) {
    resultListener.subscribe(function(resultMessage) {
      var goal = that.goals[resultMessage.status.goal_id.id];

      if (goal) {
        goal.emit('status', resultMessage.status);
        goal.emit('result', resultMessage.result);
      }
    });
  }

  // If timeout specified, emit a 'timeout' event if the action server does not respond
  if (this.timeout) {
    setTimeout(function() {
      if (!receivedStatus) {
        that.emit('timeout');
      }
    }, this.timeout);
  }
}

ActionClient.prototype.__proto__ = EventEmitter2.prototype;

/**
 * Cancel all goals associated with this ActionClient.
 */
ActionClient.prototype.cancel = function() {
  var cancelMessage = new Message();
  this.cancelTopic.publish(cancelMessage);
};

module.exports = ActionClient;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview
 * @author Russell Toris - rctoris@wpi.edu
 */

var Message = __webpack_require__(5);
var EventEmitter2 = __webpack_require__(2).EventEmitter2;

/**
 * An actionlib goal goal is associated with an action server.
 *
 * Emits the following events:
 *  * 'timeout' - if a timeout occurred while sending a goal
 *
 *  @constructor
 *  @param object with following keys:
 *   * actionClient - the ROSLIB.ActionClient to use with this goal
 *   * goalMessage - The JSON object containing the goal for the action server
 */
function Goal(options) {
  var that = this;
  this.actionClient = options.actionClient;
  this.goalMessage = options.goalMessage;
  this.isFinished = false;

  // Used to create random IDs
  var date = new Date();

  // Create a random ID
  this.goalID = 'goal_' + Math.random() + '_' + date.getTime();
  // Fill in the goal message
  this.goalMessage = new Message({
    goal_id : {
      stamp : {
        secs : 0,
        nsecs : 0
      },
      id : this.goalID
    },
    goal : this.goalMessage
  });

  this.on('status', function(status) {
    that.status = status;
  });

  this.on('result', function(result) {
    that.isFinished = true;
    that.result = result;
  });

  this.on('feedback', function(feedback) {
    that.feedback = feedback;
  });

  // Add the goal
  this.actionClient.goals[this.goalID] = this;
}

Goal.prototype.__proto__ = EventEmitter2.prototype;

/**
 * Send the goal to the action server.
 *
 * @param timeout (optional) - a timeout length for the goal's result
 */
Goal.prototype.send = function(timeout) {
  var that = this;
  that.actionClient.goalTopic.publish(that.goalMessage);
  if (timeout) {
    setTimeout(function() {
      if (!that.isFinished) {
        that.emit('timeout');
      }
    }, timeout);
  }
};

/**
 * Cancel the current goal.
 */
Goal.prototype.cancel = function() {
  var cancelMessage = new Message({
    id : this.goalID
  });
  this.actionClient.cancelTopic.publish(cancelMessage);
};

module.exports = Goal;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileoverview
 * @author Brandon Alexander - balexander@willowgarage.com
 */

var assign = __webpack_require__(1);

/**
 * A ServiceResponse is returned from the service call.
 *
 * @constructor
 * @param values - object matching the fields defined in the .srv definition file
 */
function ServiceResponse(values) {
  assign(this, values);
}

module.exports = ServiceResponse;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Socket event handling utilities for handling events on either
 * WebSocket and TCP sockets
 *
 * Note to anyone reviewing this code: these functions are called
 * in the context of their parent object, unless bound
 * @fileOverview
 */


var decompressPng = __webpack_require__(64);
var WebSocket = __webpack_require__(33);
var BSON = null;
if(typeof bson !== 'undefined'){
    BSON = bson().BSON;
}

/**
 * Events listeners for a WebSocket or TCP socket to a JavaScript
 * ROS Client. Sets up Messages for a given topic to trigger an
 * event on the ROS client.
 * 
 * @namespace SocketAdapter
 * @private
 */
function SocketAdapter(client) {
  function handleMessage(message) {
    if (message.op === 'publish') {
      client.emit(message.topic, message.msg);
    } else if (message.op === 'service_response') {
      client.emit(message.id, message);
    } else if (message.op === 'call_service') {
      client.emit(message.service, message);
    }
  }

  function handlePng(message, callback) {
    if (message.op === 'png') {
      decompressPng(message.data, callback);
    } else {
      callback(message);
    }
  }

  function decodeBSON(data, callback) {
    if (!BSON) {
      throw 'Cannot process BSON encoded message without BSON header.';
    }
    var reader = new FileReader();
    reader.onload  = function() {
      var uint8Array = new Uint8Array(this.result);
      var msg = BSON.deserialize(uint8Array);
      callback(msg);
    };
    reader.readAsArrayBuffer(data);
  }

  return {
    /**
     * Emits a 'connection' event on WebSocket connection.
     *
     * @param event - the argument to emit with the event.
     * @memberof SocketAdapter
     */
    onopen: function onOpen(event) {
      client.isConnected = true;
      client.emit('connection', event);
    },

    /**
     * Emits a 'close' event on WebSocket disconnection.
     *
     * @param event - the argument to emit with the event.
     * @memberof SocketAdapter
     */
    onclose: function onClose(event) {
      client.isConnected = false;
      client.emit('close', event);
    },

    /**
     * Emits an 'error' event whenever there was an error.
     *
     * @param event - the argument to emit with the event.
     * @memberof SocketAdapter
     */
    onerror: function onError(event) {
      client.emit('error', event);
    },

    /**
     * Parses message responses from rosbridge and sends to the appropriate
     * topic, service, or param.
     *
     * @param message - the raw JSON message from rosbridge.
     * @memberof SocketAdapter
     */
    onmessage: function onMessage(data) {
      if (typeof Blob !== 'undefined' && data.data instanceof Blob) {
        decodeBSON(data.data, function (message) {
          handlePng(message, handleMessage);
        });
      } else {
        var message = JSON.parse(typeof data === 'string' ? data : data.data);
        handlePng(message, handleMessage);
      }
    }
  };
}

module.exports = SocketAdapter;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileoverview
 * @author David Gossow - dgossow@willowgarage.com
 */

var Vector3 = __webpack_require__(3);
var Quaternion = __webpack_require__(11);

/**
 * A Pose in 3D space. Values are copied into this object.
 *
 *  @constructor
 *  @param options - object with following keys:
 *   * position - the Vector3 describing the position
 *   * orientation - the ROSLIB.Quaternion describing the orientation
 */
function Pose(options) {
  options = options || {};
  // copy the values into this object if they exist
  this.position = new Vector3(options.position);
  this.orientation = new Quaternion(options.orientation);
}

/**
 * Apply a transform against this pose.
 *
 * @param tf the transform
 */
Pose.prototype.applyTransform = function(tf) {
  this.position.multiplyQuaternion(tf.rotation);
  this.position.add(tf.translation);
  var tmp = tf.rotation.clone();
  tmp.multiply(this.orientation);
  this.orientation = tmp;
};

/**
 * Clone a copy of this pose.
 *
 * @returns the cloned pose
 */
Pose.prototype.clone = function() {
  return new Pose(this);
};

module.exports = Pose;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileoverview
 * @author David Gossow - dgossow@willowgarage.com
 */

var Vector3 = __webpack_require__(3);
var Quaternion = __webpack_require__(11);

/**
 * A Transform in 3-space. Values are copied into this object.
 *
 *  @constructor
 *  @param options - object with following keys:
 *   * translation - the Vector3 describing the translation
 *   * rotation - the ROSLIB.Quaternion describing the rotation
 */
function Transform(options) {
  options = options || {};
  // Copy the values into this object if they exist
  this.translation = new Vector3(options.translation);
  this.rotation = new Quaternion(options.rotation);
}

/**
 * Clone a copy of this transform.
 *
 * @returns the cloned transform
 */
Transform.prototype.clone = function() {
  return new Transform(this);
};

module.exports = Transform;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview 
 * @author Benjamin Pitzer - ben.pitzer@gmail.com
 * @author Russell Toris - rctoris@wpi.edu
 */

var Vector3 = __webpack_require__(3);
var UrdfTypes = __webpack_require__(7);

/**
 * A Box element in a URDF.
 *
 * @constructor
 * @param options - object with following keys:
 *  * xml - the XML element to parse
 */
function UrdfBox(options) {
  this.dimension = null;
  this.type = UrdfTypes.URDF_BOX;

  // Parse the xml string
  var xyz = options.xml.getAttribute('size').split(' ');
  this.dimension = new Vector3({
    x : parseFloat(xyz[0]),
    y : parseFloat(xyz[1]),
    z : parseFloat(xyz[2])
  });
}

module.exports = UrdfBox;

/***/ }),
/* 27 */
/***/ (function(module, exports) {

/**
 * @fileOverview 
 * @author Benjamin Pitzer - ben.pitzer@gmail.com
 * @author Russell Toris - rctoris@wpi.edu
 */

/**
 * A Color element in a URDF.
 *
 * @constructor
 * @param options - object with following keys:
 *  * xml - the XML element to parse
 */
function UrdfColor(options) {
  // Parse the xml string
  var rgba = options.xml.getAttribute('rgba').split(' ');
  this.r = parseFloat(rgba[0]);
  this.g = parseFloat(rgba[1]);
  this.b = parseFloat(rgba[2]);
  this.a = parseFloat(rgba[3]);
}

module.exports = UrdfColor;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview 
 * @author Benjamin Pitzer - ben.pitzer@gmail.com
 * @author Russell Toris - rctoris@wpi.edu
 */

var UrdfTypes = __webpack_require__(7);

/**
 * A Cylinder element in a URDF.
 *
 * @constructor
 * @param options - object with following keys:
 *  * xml - the XML element to parse
 */
function UrdfCylinder(options) {
  this.type = UrdfTypes.URDF_CYLINDER;
  this.length = parseFloat(options.xml.getAttribute('length'));
  this.radius = parseFloat(options.xml.getAttribute('radius'));
}

module.exports = UrdfCylinder;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview 
 * @author Benjamin Pitzer - ben.pitzer@gmail.com
 * @author Russell Toris - rctoris@wpi.edu
 */

var UrdfVisual = __webpack_require__(32);

/**
 * A Link element in a URDF.
 *
 * @constructor
 * @param options - object with following keys:
 *  * xml - the XML element to parse
 */
function UrdfLink(options) {
  this.name = options.xml.getAttribute('name');
  this.visuals = [];
  var visuals = options.xml.getElementsByTagName('visual');

  for( var i=0; i<visuals.length; i++ ) {
    this.visuals.push( new UrdfVisual({
      xml : visuals[i]
    }) );
  }
}

module.exports = UrdfLink;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview 
 * @author Benjamin Pitzer - ben.pitzer@gmail.com
 * @author Russell Toris - rctoris@wpi.edu
 */

var Vector3 = __webpack_require__(3);
var UrdfTypes = __webpack_require__(7);

/**
 * A Mesh element in a URDF.
 *
 * @constructor
 * @param options - object with following keys:
 *  * xml - the XML element to parse
 */
function UrdfMesh(options) {
  this.scale = null;

  this.type = UrdfTypes.URDF_MESH;
  this.filename = options.xml.getAttribute('filename');

  // Check for a scale
  var scale = options.xml.getAttribute('scale');
  if (scale) {
    // Get the XYZ
    var xyz = scale.split(' ');
    this.scale = new Vector3({
      x : parseFloat(xyz[0]),
      y : parseFloat(xyz[1]),
      z : parseFloat(xyz[2])
    });
  }
}

module.exports = UrdfMesh;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview 
 * @author Benjamin Pitzer - ben.pitzer@gmail.com
 * @author Russell Toris - rctoris@wpi.edu
 */

var UrdfTypes = __webpack_require__(7);

/**
 * A Sphere element in a URDF.
 *
 * @constructor
 * @param options - object with following keys:
 *  * xml - the XML element to parse
 */
function UrdfSphere(options) {
  this.type = UrdfTypes.URDF_SPHERE;
  this.radius = parseFloat(options.xml.getAttribute('radius'));
}

module.exports = UrdfSphere;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview 
 * @author Benjamin Pitzer - ben.pitzer@gmail.com
 * @author Russell Toris - rctoris@wpi.edu
 */

var Pose = __webpack_require__(24);
var Vector3 = __webpack_require__(3);
var Quaternion = __webpack_require__(11);

var UrdfCylinder = __webpack_require__(28);
var UrdfBox = __webpack_require__(26);
var UrdfMaterial = __webpack_require__(15);
var UrdfMesh = __webpack_require__(30);
var UrdfSphere = __webpack_require__(31);

/**
 * A Visual element in a URDF.
 *
 * @constructor
 * @param options - object with following keys:
 *  * xml - the XML element to parse
 */
function UrdfVisual(options) {
  var xml = options.xml;
  this.origin = null;
  this.geometry = null;
  this.material = null;

  // Origin
  var origins = xml.getElementsByTagName('origin');
  if (origins.length === 0) {
    // use the identity as the default
    this.origin = new Pose();
  } else {
    // Check the XYZ
    var xyz = origins[0].getAttribute('xyz');
    var position = new Vector3();
    if (xyz) {
      xyz = xyz.split(' ');
      position = new Vector3({
        x : parseFloat(xyz[0]),
        y : parseFloat(xyz[1]),
        z : parseFloat(xyz[2])
      });
    }

    // Check the RPY
    var rpy = origins[0].getAttribute('rpy');
    var orientation = new Quaternion();
    if (rpy) {
      rpy = rpy.split(' ');
      // Convert from RPY
      var roll = parseFloat(rpy[0]);
      var pitch = parseFloat(rpy[1]);
      var yaw = parseFloat(rpy[2]);
      var phi = roll / 2.0;
      var the = pitch / 2.0;
      var psi = yaw / 2.0;
      var x = Math.sin(phi) * Math.cos(the) * Math.cos(psi) - Math.cos(phi) * Math.sin(the)
          * Math.sin(psi);
      var y = Math.cos(phi) * Math.sin(the) * Math.cos(psi) + Math.sin(phi) * Math.cos(the)
          * Math.sin(psi);
      var z = Math.cos(phi) * Math.cos(the) * Math.sin(psi) - Math.sin(phi) * Math.sin(the)
          * Math.cos(psi);
      var w = Math.cos(phi) * Math.cos(the) * Math.cos(psi) + Math.sin(phi) * Math.sin(the)
          * Math.sin(psi);

      orientation = new Quaternion({
        x : x,
        y : y,
        z : z,
        w : w
      });
      orientation.normalize();
    }
    this.origin = new Pose({
      position : position,
      orientation : orientation
    });
  }

  // Geometry
  var geoms = xml.getElementsByTagName('geometry');
  if (geoms.length > 0) {
    var geom = geoms[0];
    var shape = null;
    // Check for the shape
    for (var i = 0; i < geom.childNodes.length; i++) {
      var node = geom.childNodes[i];
      if (node.nodeType === 1) {
        shape = node;
        break;
      }
    }
    // Check the type
    var type = shape.nodeName;
    if (type === 'sphere') {
      this.geometry = new UrdfSphere({
        xml : shape
      });
    } else if (type === 'box') {
      this.geometry = new UrdfBox({
        xml : shape
      });
    } else if (type === 'cylinder') {
      this.geometry = new UrdfCylinder({
        xml : shape
      });
    } else if (type === 'mesh') {
      this.geometry = new UrdfMesh({
        xml : shape
      });
    } else {
      console.warn('Unknown geometry type ' + type);
    }
  }

  // Material
  var materials = xml.getElementsByTagName('material');
  if (materials.length > 0) {
    this.material = new UrdfMaterial({
      xml : materials[0]
    });
  }
}

module.exports = UrdfVisual;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*!
 * ws: a node.js websocket client
 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
 * MIT Licensed
 */

var WS = module.exports = __webpack_require__(39);

WS.Server = __webpack_require__(74);
WS.Sender = __webpack_require__(38);
WS.Receiver = __webpack_require__(37);

/**
 * Create a new WebSocket server.
 *
 * @param {Object} options Server options
 * @param {Function} fn Optional connection listener.
 * @returns {WS.Server}
 * @api public
 */
WS.createServer = function createServer(options, fn) {
  var server = new WS.Server(options);

  if (typeof fn === 'function') {
    server.on('connection', fn);
  }

  return server;
};

/**
 * Create a new WebSocket connection.
 *
 * @param {String} address The URL/address we need to connect to.
 * @param {Function} fn Open listener.
 * @returns {WS}
 * @api public
 */
WS.connect = WS.createConnection = function connect(address, fn) {
  var client = new WS(address);

  if (typeof fn === 'function') {
    client.on('open', fn);
  }

  return client;
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*!
 * ws: a node.js websocket client
 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
 * MIT Licensed
 */

var bufferUtil;

try {
  bufferUtil = __webpack_require__(79);
} catch (e) {
  bufferUtil = __webpack_require__(69);
}

module.exports = bufferUtil.BufferUtil || bufferUtil;


/***/ }),
/* 35 */
/***/ (function(module, exports) {

/*!
 * ws: a node.js websocket client
 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
 * MIT Licensed
 */

module.exports = {
  isValidErrorCode: function(code) {
    return (code >= 1000 && code <= 1011 && code != 1004 && code != 1005 && code != 1006) ||
         (code >= 3000 && code <= 4999);
  },
  1000: 'normal',
  1001: 'going away',
  1002: 'protocol error',
  1003: 'unsupported data',
  1004: 'reserved',
  1005: 'reserved for extensions',
  1006: 'reserved for extensions',
  1007: 'inconsistent or invalid data',
  1008: 'policy violation',
  1009: 'message too big',
  1010: 'extension handshake missing',
  1011: 'an unexpected condition prevented the request from being fulfilled',
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {


var util = __webpack_require__(0);

/**
 * Module exports.
 */

exports.parse = parse;
exports.format = format;

/**
 * Parse extensions header value
 */

function parse(value) {
  value = value || '';

  var extensions = {};

  value.split(',').forEach(function(v) {
    var params = v.split(';');
    var token = params.shift().trim();
    var paramsList = extensions[token] = extensions[token] || [];
    var parsedParams = {};

    params.forEach(function(param) {
      var parts = param.trim().split('=');
      var key = parts[0];
      var value = parts[1];
      if (typeof value === 'undefined') {
        value = true;
      } else {
        // unquote value
        if (value[0] === '"') {
          value = value.slice(1);
        }
        if (value[value.length - 1] === '"') {
          value = value.slice(0, value.length - 1);
        }
      }
      (parsedParams[key] = parsedParams[key] || []).push(value);
    });

    paramsList.push(parsedParams);
  });

  return extensions;
}

/**
 * Format extensions header value
 */

function format(value) {
  return Object.keys(value).map(function(token) {
    var paramsList = value[token];
    if (!util.isArray(paramsList)) {
      paramsList = [paramsList];
    }
    return paramsList.map(function(params) {
      return [token].concat(Object.keys(params).map(function(k) {
        var p = params[k];
        if (!util.isArray(p)) p = [p];
        return p.map(function(v) {
          return v === true ? k : k + '=' + v;
        }).join('; ');
      })).join('; ');
    }).join(', ');
  }).join(', ');
}


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * ws: a node.js websocket client
 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
 * MIT Licensed
 */

var util = __webpack_require__(0)
  , isValidUTF8 = __webpack_require__(73)
  , ErrorCodes = __webpack_require__(35)
  , BufferPool = __webpack_require__(68)
  , bufferUtil = __webpack_require__(34)
  , PerMessageDeflate = __webpack_require__(12);

/**
 * HyBi Receiver implementation
 */

function Receiver (extensions,maxPayload) {
  if (this instanceof Receiver === false) {
    throw new TypeError("Classes can't be function-called");
  }
  if(typeof extensions==='number'){
    maxPayload=extensions;
    extensions={};
  }


  // memory pool for fragmented messages
  var fragmentedPoolPrevUsed = -1;
  this.fragmentedBufferPool = new BufferPool(1024, function(db, length) {
    return db.used + length;
  }, function(db) {
    return fragmentedPoolPrevUsed = fragmentedPoolPrevUsed >= 0 ?
      Math.ceil((fragmentedPoolPrevUsed + db.used) / 2) :
      db.used;
  });

  // memory pool for unfragmented messages
  var unfragmentedPoolPrevUsed = -1;
  this.unfragmentedBufferPool = new BufferPool(1024, function(db, length) {
    return db.used + length;
  }, function(db) {
    return unfragmentedPoolPrevUsed = unfragmentedPoolPrevUsed >= 0 ?
      Math.ceil((unfragmentedPoolPrevUsed + db.used) / 2) :
      db.used;
  });
  this.extensions = extensions || {};
  this.maxPayload = maxPayload || 0;
  this.currentPayloadLength = 0;
  this.state = {
    activeFragmentedOperation: null,
    lastFragment: false,
    masked: false,
    opcode: 0,
    fragmentedOperation: false
  };
  this.overflow = [];
  this.headerBuffer = new Buffer(10);
  this.expectOffset = 0;
  this.expectBuffer = null;
  this.expectHandler = null;
  this.currentMessage = [];
  this.currentMessageLength = 0;
  this.messageHandlers = [];
  this.expectHeader(2, this.processPacket);
  this.dead = false;
  this.processing = false;

  this.onerror = function() {};
  this.ontext = function() {};
  this.onbinary = function() {};
  this.onclose = function() {};
  this.onping = function() {};
  this.onpong = function() {};
}

module.exports = Receiver;

/**
 * Add new data to the parser.
 *
 * @api public
 */

Receiver.prototype.add = function(data) {
  if (this.dead) return;
  var dataLength = data.length;
  if (dataLength == 0) return;
  if (this.expectBuffer == null) {
    this.overflow.push(data);
    return;
  }
  var toRead = Math.min(dataLength, this.expectBuffer.length - this.expectOffset);
  fastCopy(toRead, data, this.expectBuffer, this.expectOffset);
  this.expectOffset += toRead;
  if (toRead < dataLength) {
    this.overflow.push(data.slice(toRead));
  }
  while (this.expectBuffer && this.expectOffset == this.expectBuffer.length) {
    var bufferForHandler = this.expectBuffer;
    this.expectBuffer = null;
    this.expectOffset = 0;
    this.expectHandler.call(this, bufferForHandler);
  }
};

/**
 * Releases all resources used by the receiver.
 *
 * @api public
 */

Receiver.prototype.cleanup = function() {
  this.dead = true;
  this.overflow = null;
  this.headerBuffer = null;
  this.expectBuffer = null;
  this.expectHandler = null;
  this.unfragmentedBufferPool = null;
  this.fragmentedBufferPool = null;
  this.state = null;
  this.currentMessage = null;
  this.onerror = null;
  this.ontext = null;
  this.onbinary = null;
  this.onclose = null;
  this.onping = null;
  this.onpong = null;
};

/**
 * Waits for a certain amount of header bytes to be available, then fires a callback.
 *
 * @api private
 */

Receiver.prototype.expectHeader = function(length, handler) {
  if (length == 0) {
    handler(null);
    return;
  }
  this.expectBuffer = this.headerBuffer.slice(this.expectOffset, this.expectOffset + length);
  this.expectHandler = handler;
  var toRead = length;
  while (toRead > 0 && this.overflow.length > 0) {
    var fromOverflow = this.overflow.pop();
    if (toRead < fromOverflow.length) this.overflow.push(fromOverflow.slice(toRead));
    var read = Math.min(fromOverflow.length, toRead);
    fastCopy(read, fromOverflow, this.expectBuffer, this.expectOffset);
    this.expectOffset += read;
    toRead -= read;
  }
};

/**
 * Waits for a certain amount of data bytes to be available, then fires a callback.
 *
 * @api private
 */

Receiver.prototype.expectData = function(length, handler) {
  if (length == 0) {
    handler(null);
    return;
  }
  this.expectBuffer = this.allocateFromPool(length, this.state.fragmentedOperation);
  this.expectHandler = handler;
  var toRead = length;
  while (toRead > 0 && this.overflow.length > 0) {
    var fromOverflow = this.overflow.pop();
    if (toRead < fromOverflow.length) this.overflow.push(fromOverflow.slice(toRead));
    var read = Math.min(fromOverflow.length, toRead);
    fastCopy(read, fromOverflow, this.expectBuffer, this.expectOffset);
    this.expectOffset += read;
    toRead -= read;
  }
};

/**
 * Allocates memory from the buffer pool.
 *
 * @api private
 */

Receiver.prototype.allocateFromPool = function(length, isFragmented) {
  return (isFragmented ? this.fragmentedBufferPool : this.unfragmentedBufferPool).get(length);
};

/**
 * Start processing a new packet.
 *
 * @api private
 */

Receiver.prototype.processPacket = function (data) {
  if (this.extensions[PerMessageDeflate.extensionName]) {
    if ((data[0] & 0x30) != 0) {
      this.error('reserved fields (2, 3) must be empty', 1002);
      return;
    }
  } else {
    if ((data[0] & 0x70) != 0) {
      this.error('reserved fields must be empty', 1002);
      return;
    }
  }
  this.state.lastFragment = (data[0] & 0x80) == 0x80;
  this.state.masked = (data[1] & 0x80) == 0x80;
  var compressed = (data[0] & 0x40) == 0x40;
  var opcode = data[0] & 0xf;
  if (opcode === 0) {
    if (compressed) {
      this.error('continuation frame cannot have the Per-message Compressed bits', 1002);
      return;
    }
    // continuation frame
    this.state.fragmentedOperation = true;
    this.state.opcode = this.state.activeFragmentedOperation;
    if (!(this.state.opcode == 1 || this.state.opcode == 2)) {
      this.error('continuation frame cannot follow current opcode', 1002);
      return;
    }
  }
  else {
    if (opcode < 3 && this.state.activeFragmentedOperation != null) {
      this.error('data frames after the initial data frame must have opcode 0', 1002);
      return;
    }
    if (opcode >= 8 && compressed) {
      this.error('control frames cannot have the Per-message Compressed bits', 1002);
      return;
    }
    this.state.compressed = compressed;
    this.state.opcode = opcode;
    if (this.state.lastFragment === false) {
      this.state.fragmentedOperation = true;
      this.state.activeFragmentedOperation = opcode;
    }
    else this.state.fragmentedOperation = false;
  }
  var handler = opcodes[this.state.opcode];
  if (typeof handler == 'undefined') this.error('no handler for opcode ' + this.state.opcode, 1002);
  else {
    handler.start.call(this, data);
  }
};

/**
 * Endprocessing a packet.
 *
 * @api private
 */

Receiver.prototype.endPacket = function() {
  if (this.dead) return;
  if (!this.state.fragmentedOperation) this.unfragmentedBufferPool.reset(true);
  else if (this.state.lastFragment) this.fragmentedBufferPool.reset(true);
  this.expectOffset = 0;
  this.expectBuffer = null;
  this.expectHandler = null;
  if (this.state.lastFragment && this.state.opcode === this.state.activeFragmentedOperation) {
    // end current fragmented operation
    this.state.activeFragmentedOperation = null;
  }
  this.currentPayloadLength = 0;
  this.state.lastFragment = false;
  this.state.opcode = this.state.activeFragmentedOperation != null ? this.state.activeFragmentedOperation : 0;
  this.state.masked = false;
  this.expectHeader(2, this.processPacket);
};

/**
 * Reset the parser state.
 *
 * @api private
 */

Receiver.prototype.reset = function() {
  if (this.dead) return;
  this.state = {
    activeFragmentedOperation: null,
    lastFragment: false,
    masked: false,
    opcode: 0,
    fragmentedOperation: false
  };
  this.fragmentedBufferPool.reset(true);
  this.unfragmentedBufferPool.reset(true);
  this.expectOffset = 0;
  this.expectBuffer = null;
  this.expectHandler = null;
  this.overflow = [];
  this.currentMessage = [];
  this.currentMessageLength = 0;
  this.messageHandlers = [];
  this.currentPayloadLength = 0;
};

/**
 * Unmask received data.
 *
 * @api private
 */

Receiver.prototype.unmask = function (mask, buf, binary) {
  if (mask != null && buf != null) bufferUtil.unmask(buf, mask);
  if (binary) return buf;
  return buf != null ? buf.toString('utf8') : '';
};

/**
 * Handles an error
 *
 * @api private
 */

Receiver.prototype.error = function (reason, protocolErrorCode) {
  if (this.dead) return;
  this.reset();
  if(typeof reason == 'string'){
    this.onerror(new Error(reason), protocolErrorCode);
  }
  else if(reason.constructor == Error){
    this.onerror(reason, protocolErrorCode);
  }
  else{
    this.onerror(new Error("An error occured"),protocolErrorCode);
  }
  return this;
};

/**
 * Execute message handler buffers
 *
 * @api private
 */

Receiver.prototype.flush = function() {
  if (this.processing || this.dead) return;

  var handler = this.messageHandlers.shift();
  if (!handler) return;

  this.processing = true;
  var self = this;

  handler(function() {
    self.processing = false;
    self.flush();
  });
};

/**
 * Apply extensions to message
 *
 * @api private
 */

Receiver.prototype.applyExtensions = function(messageBuffer, fin, compressed, callback) {
  var self = this;
  if (compressed) {
    this.extensions[PerMessageDeflate.extensionName].decompress(messageBuffer, fin, function(err, buffer) {
      if (self.dead) return;
      if (err) {
        callback(new Error('invalid compressed data'));
        return;
      }
      callback(null, buffer);
    });
  } else {
    callback(null, messageBuffer);
  }
};

/**
* Checks payload size, disconnects socket when it exceeds maxPayload
*
* @api private
*/
Receiver.prototype.maxPayloadExceeded = function(length) {
  if (this.maxPayload=== undefined || this.maxPayload === null || this.maxPayload < 1) {
    return false;
  }
  var fullLength = this.currentPayloadLength + length;
  if (fullLength < this.maxPayload) {
    this.currentPayloadLength = fullLength;
    return false;
  }
  this.error('payload cannot exceed ' + this.maxPayload + ' bytes', 1009);
  this.messageBuffer=[];
  this.cleanup();

  return true;
};

/**
 * Buffer utilities
 */

function readUInt16BE(start) {
  return (this[start]<<8) +
         this[start+1];
}

function readUInt32BE(start) {
  return (this[start]<<24) +
         (this[start+1]<<16) +
         (this[start+2]<<8) +
         this[start+3];
}

function fastCopy(length, srcBuffer, dstBuffer, dstOffset) {
  switch (length) {
    default: srcBuffer.copy(dstBuffer, dstOffset, 0, length); break;
    case 16: dstBuffer[dstOffset+15] = srcBuffer[15];
    case 15: dstBuffer[dstOffset+14] = srcBuffer[14];
    case 14: dstBuffer[dstOffset+13] = srcBuffer[13];
    case 13: dstBuffer[dstOffset+12] = srcBuffer[12];
    case 12: dstBuffer[dstOffset+11] = srcBuffer[11];
    case 11: dstBuffer[dstOffset+10] = srcBuffer[10];
    case 10: dstBuffer[dstOffset+9] = srcBuffer[9];
    case 9: dstBuffer[dstOffset+8] = srcBuffer[8];
    case 8: dstBuffer[dstOffset+7] = srcBuffer[7];
    case 7: dstBuffer[dstOffset+6] = srcBuffer[6];
    case 6: dstBuffer[dstOffset+5] = srcBuffer[5];
    case 5: dstBuffer[dstOffset+4] = srcBuffer[4];
    case 4: dstBuffer[dstOffset+3] = srcBuffer[3];
    case 3: dstBuffer[dstOffset+2] = srcBuffer[2];
    case 2: dstBuffer[dstOffset+1] = srcBuffer[1];
    case 1: dstBuffer[dstOffset] = srcBuffer[0];
  }
}

function clone(obj) {
  var cloned = {};
  for (var k in obj) {
    if (obj.hasOwnProperty(k)) {
      cloned[k] = obj[k];
    }
  }
  return cloned;
}

/**
 * Opcode handlers
 */

var opcodes = {
  // text
  '1': {
    start: function(data) {
      var self = this;
      // decode length
      var firstLength = data[1] & 0x7f;
      if (firstLength < 126) {
        if (self.maxPayloadExceeded(firstLength)){
          self.error('Maximumpayload exceeded in compressed text message. Aborting...', 1009);
          return;
        }
        opcodes['1'].getData.call(self, firstLength);
      }
      else if (firstLength == 126) {
        self.expectHeader(2, function(data) {
          var length = readUInt16BE.call(data, 0);
          if (self.maxPayloadExceeded(length)){
            self.error('Maximumpayload exceeded in compressed text message. Aborting...', 1009);
            return;
          }
          opcodes['1'].getData.call(self, length);
        });
      }
      else if (firstLength == 127) {
        self.expectHeader(8, function(data) {
          if (readUInt32BE.call(data, 0) != 0) {
            self.error('packets with length spanning more than 32 bit is currently not supported', 1008);
            return;
          }
          var length = readUInt32BE.call(data, 4);
          if (self.maxPayloadExceeded(length)){
            self.error('Maximumpayload exceeded in compressed text message. Aborting...', 1009);
            return;
          }
          opcodes['1'].getData.call(self, readUInt32BE.call(data, 4));
        });
      }
    },
    getData: function(length) {
      var self = this;
      if (self.state.masked) {
        self.expectHeader(4, function(data) {
          var mask = data;
          self.expectData(length, function(data) {
            opcodes['1'].finish.call(self, mask, data);
          });
        });
      }
      else {
        self.expectData(length, function(data) {
          opcodes['1'].finish.call(self, null, data);
        });
      }
    },
    finish: function(mask, data) {
      var self = this;
      var packet = this.unmask(mask, data, true) || new Buffer(0);
      var state = clone(this.state);
      this.messageHandlers.push(function(callback) {
        self.applyExtensions(packet, state.lastFragment, state.compressed, function(err, buffer) {
          if (err) {
            if(err.type===1009){
                return self.error('Maximumpayload exceeded in compressed text message. Aborting...', 1009);
            }
            return self.error(err.message, 1007);
          }
          if (buffer != null) {
            if( self.maxPayload==0 || (self.maxPayload > 0 && (self.currentMessageLength + buffer.length) < self.maxPayload) ){
              self.currentMessage.push(buffer);
            }
            else{
                self.currentMessage=null;
                self.currentMessage = [];
                self.currentMessageLength = 0;
                self.error(new Error('Maximum payload exceeded. maxPayload: '+self.maxPayload), 1009);
                return;
            }
            self.currentMessageLength += buffer.length;
          }
          if (state.lastFragment) {
            var messageBuffer = Buffer.concat(self.currentMessage);
            self.currentMessage = [];
            self.currentMessageLength = 0;
            if (!isValidUTF8(messageBuffer)) {
              self.error('invalid utf8 sequence', 1007);
              return;
            }
            self.ontext(messageBuffer.toString('utf8'), {masked: state.masked, buffer: messageBuffer});
          }
          callback();
        });
      });
      this.flush();
      this.endPacket();
    }
  },
  // binary
  '2': {
    start: function(data) {
      var self = this;
      // decode length
      var firstLength = data[1] & 0x7f;
      if (firstLength < 126) {
          if (self.maxPayloadExceeded(firstLength)){
            self.error('Max payload exceeded in compressed text message. Aborting...', 1009);
            return;
          }
        opcodes['2'].getData.call(self, firstLength);
      }
      else if (firstLength == 126) {
        self.expectHeader(2, function(data) {
          var length = readUInt16BE.call(data, 0);
          if (self.maxPayloadExceeded(length)){
            self.error('Max payload exceeded in compressed text message. Aborting...', 1009);
            return;
          }
          opcodes['2'].getData.call(self, length);
        });
      }
      else if (firstLength == 127) {
        self.expectHeader(8, function(data) {
          if (readUInt32BE.call(data, 0) != 0) {
            self.error('packets with length spanning more than 32 bit is currently not supported', 1008);
            return;
          }
          var length = readUInt32BE.call(data, 4, true);
          if (self.maxPayloadExceeded(length)){
            self.error('Max payload exceeded in compressed text message. Aborting...', 1009);
            return;
          }
          opcodes['2'].getData.call(self, length);
        });
      }
    },
    getData: function(length) {
      var self = this;
      if (self.state.masked) {
        self.expectHeader(4, function(data) {
          var mask = data;
          self.expectData(length, function(data) {
            opcodes['2'].finish.call(self, mask, data);
          });
        });
      }
      else {
        self.expectData(length, function(data) {
          opcodes['2'].finish.call(self, null, data);
        });
      }
    },
    finish: function(mask, data) {
      var self = this;
      var packet = this.unmask(mask, data, true) || new Buffer(0);
      var state = clone(this.state);
      this.messageHandlers.push(function(callback) {
        self.applyExtensions(packet, state.lastFragment, state.compressed, function(err, buffer) {
          if (err) {
            if(err.type===1009){
                return self.error('Max payload exceeded in compressed binary message. Aborting...', 1009);
            }
            return self.error(err.message, 1007);
          }
          if (buffer != null) {
            if( self.maxPayload==0 || (self.maxPayload > 0 && (self.currentMessageLength + buffer.length) < self.maxPayload) ){
              self.currentMessage.push(buffer);
            }
            else{
                self.currentMessage=null;
                self.currentMessage = [];
                self.currentMessageLength = 0;
                self.error(new Error('Maximum payload exceeded'), 1009);
                return;
            }
            self.currentMessageLength += buffer.length;
          }
          if (state.lastFragment) {
            var messageBuffer = Buffer.concat(self.currentMessage);
            self.currentMessage = [];
            self.currentMessageLength = 0;
            self.onbinary(messageBuffer, {masked: state.masked, buffer: messageBuffer});
          }
          callback();
        });
      });
      this.flush();
      this.endPacket();
    }
  },
  // close
  '8': {
    start: function(data) {
      var self = this;
      if (self.state.lastFragment == false) {
        self.error('fragmented close is not supported', 1002);
        return;
      }

      // decode length
      var firstLength = data[1] & 0x7f;
      if (firstLength < 126) {
        opcodes['8'].getData.call(self, firstLength);
      }
      else {
        self.error('control frames cannot have more than 125 bytes of data', 1002);
      }
    },
    getData: function(length) {
      var self = this;
      if (self.state.masked) {
        self.expectHeader(4, function(data) {
          var mask = data;
          self.expectData(length, function(data) {
            opcodes['8'].finish.call(self, mask, data);
          });
        });
      }
      else {
        self.expectData(length, function(data) {
          opcodes['8'].finish.call(self, null, data);
        });
      }
    },
    finish: function(mask, data) {
      var self = this;
      data = self.unmask(mask, data, true);

      var state = clone(this.state);
      this.messageHandlers.push(function() {
        if (data && data.length == 1) {
          self.error('close packets with data must be at least two bytes long', 1002);
          return;
        }
        var code = data && data.length > 1 ? readUInt16BE.call(data, 0) : 1000;
        if (!ErrorCodes.isValidErrorCode(code)) {
          self.error('invalid error code', 1002);
          return;
        }
        var message = '';
        if (data && data.length > 2) {
          var messageBuffer = data.slice(2);
          if (!isValidUTF8(messageBuffer)) {
            self.error('invalid utf8 sequence', 1007);
            return;
          }
          message = messageBuffer.toString('utf8');
        }
        self.onclose(code, message, {masked: state.masked});
        self.reset();
      });
      this.flush();
    },
  },
  // ping
  '9': {
    start: function(data) {
      var self = this;
      if (self.state.lastFragment == false) {
        self.error('fragmented ping is not supported', 1002);
        return;
      }

      // decode length
      var firstLength = data[1] & 0x7f;
      if (firstLength < 126) {
        opcodes['9'].getData.call(self, firstLength);
      }
      else {
        self.error('control frames cannot have more than 125 bytes of data', 1002);
      }
    },
    getData: function(length) {
      var self = this;
      if (self.state.masked) {
        self.expectHeader(4, function(data) {
          var mask = data;
          self.expectData(length, function(data) {
            opcodes['9'].finish.call(self, mask, data);
          });
        });
      }
      else {
        self.expectData(length, function(data) {
          opcodes['9'].finish.call(self, null, data);
        });
      }
    },
    finish: function(mask, data) {
      var self = this;
      data = this.unmask(mask, data, true);
      var state = clone(this.state);
      this.messageHandlers.push(function(callback) {
        self.onping(data, {masked: state.masked, binary: true});
        callback();
      });
      this.flush();
      this.endPacket();
    }
  },
  // pong
  '10': {
    start: function(data) {
      var self = this;
      if (self.state.lastFragment == false) {
        self.error('fragmented pong is not supported', 1002);
        return;
      }

      // decode length
      var firstLength = data[1] & 0x7f;
      if (firstLength < 126) {
        opcodes['10'].getData.call(self, firstLength);
      }
      else {
        self.error('control frames cannot have more than 125 bytes of data', 1002);
      }
    },
    getData: function(length) {
      var self = this;
      if (this.state.masked) {
        this.expectHeader(4, function(data) {
          var mask = data;
          self.expectData(length, function(data) {
            opcodes['10'].finish.call(self, mask, data);
          });
        });
      }
      else {
        this.expectData(length, function(data) {
          opcodes['10'].finish.call(self, null, data);
        });
      }
    },
    finish: function(mask, data) {
      var self = this;
      data = self.unmask(mask, data, true);
      var state = clone(this.state);
      this.messageHandlers.push(function(callback) {
        self.onpong(data, {masked: state.masked, binary: true});
        callback();
      });
      this.flush();
      this.endPacket();
    }
  }
}


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * ws: a node.js websocket client
 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
 * MIT Licensed
 */

var events = __webpack_require__(13)
  , util = __webpack_require__(0)
  , crypto = __webpack_require__(16)
  , EventEmitter = events.EventEmitter
  , ErrorCodes = __webpack_require__(35)
  , bufferUtil = __webpack_require__(34)
  , PerMessageDeflate = __webpack_require__(12);

/**
 * HyBi Sender implementation
 */

function Sender(socket, extensions) {
  if (this instanceof Sender === false) {
    throw new TypeError("Classes can't be function-called");
  }

  events.EventEmitter.call(this);

  this._socket = socket;
  this.extensions = extensions || {};
  this.firstFragment = true;
  this.compress = false;
  this.messageHandlers = [];
  this.processing = false;
}

/**
 * Inherits from EventEmitter.
 */

util.inherits(Sender, events.EventEmitter);

/**
 * Sends a close instruction to the remote party.
 *
 * @api public
 */

Sender.prototype.close = function(code, data, mask, cb) {
  if (typeof code !== 'undefined') {
    if (typeof code !== 'number' ||
      !ErrorCodes.isValidErrorCode(code)) throw new Error('first argument must be a valid error code number');
  }
  code = code || 1000;
  var dataBuffer = new Buffer(2 + (data ? Buffer.byteLength(data) : 0));
  writeUInt16BE.call(dataBuffer, code, 0);
  if (dataBuffer.length > 2) dataBuffer.write(data, 2);

  var self = this;
  this.messageHandlers.push(function() {
    self.frameAndSend(0x8, dataBuffer, true, mask);
    if (typeof cb == 'function') cb();
  });
  this.flush();
};

/**
 * Sends a ping message to the remote party.
 *
 * @api public
 */

Sender.prototype.ping = function(data, options) {
  var mask = options && options.mask;
  var self = this;
  this.messageHandlers.push(function() {
    self.frameAndSend(0x9, data || '', true, mask);
  });
  this.flush();
};

/**
 * Sends a pong message to the remote party.
 *
 * @api public
 */

Sender.prototype.pong = function(data, options) {
  var mask = options && options.mask;
  var self = this;
  this.messageHandlers.push(function() {
    self.frameAndSend(0xa, data || '', true, mask);
  });
  this.flush();
};

/**
 * Sends text or binary data to the remote party.
 *
 * @api public
 */

Sender.prototype.send = function(data, options, cb) {
  var finalFragment = options && options.fin === false ? false : true;
  var mask = options && options.mask;
  var compress = options && options.compress;
  var opcode = options && options.binary ? 2 : 1;
  if (this.firstFragment === false) {
    opcode = 0;
    compress = false;
  } else {
    this.firstFragment = false;
    this.compress = compress;
  }
  if (finalFragment) this.firstFragment = true

  var compressFragment = this.compress;

  var self = this;
  this.messageHandlers.push(function() {
    if (!data || !compressFragment) {
      self.frameAndSend(opcode, data, finalFragment, mask, compress, cb);
      return;
    }

    self.processing = true;
    self.applyExtensions(data, finalFragment, compressFragment, function(err, data) {
      if (err) {
        if (typeof cb == 'function') cb(err);
        else self.emit('error', err);
        return;
      }
      self.frameAndSend(opcode, data, finalFragment, mask, compress, cb);
      self.processing = false;
      self.flush();
    });
  });
  this.flush();
};

/**
 * Frames and sends a piece of data according to the HyBi WebSocket protocol.
 *
 * @api private
 */

Sender.prototype.frameAndSend = function(opcode, data, finalFragment, maskData, compressed, cb) {
  var canModifyData = false;

  if (!data) {
    try {
      this._socket.write(new Buffer([opcode | (finalFragment ? 0x80 : 0), 0 | (maskData ? 0x80 : 0)].concat(maskData ? [0, 0, 0, 0] : [])), 'binary', cb);
    }
    catch (e) {
      if (typeof cb == 'function') cb(e);
      else this.emit('error', e);
    }
    return;
  }

  if (!Buffer.isBuffer(data)) {
    canModifyData = true;
    if (data && (typeof data.byteLength !== 'undefined' || typeof data.buffer !== 'undefined')) {
      data = getArrayBuffer(data);
    } else {
      //
      // If people want to send a number, this would allocate the number in
      // bytes as memory size instead of storing the number as buffer value. So
      // we need to transform it to string in order to prevent possible
      // vulnerabilities / memory attacks.
      //
      if (typeof data === 'number') data = data.toString();

      data = new Buffer(data);
    }
  }

  var dataLength = data.length
    , dataOffset = maskData ? 6 : 2
    , secondByte = dataLength;

  if (dataLength >= 65536) {
    dataOffset += 8;
    secondByte = 127;
  }
  else if (dataLength > 125) {
    dataOffset += 2;
    secondByte = 126;
  }

  var mergeBuffers = dataLength < 32768 || (maskData && !canModifyData);
  var totalLength = mergeBuffers ? dataLength + dataOffset : dataOffset;
  var outputBuffer = new Buffer(totalLength);
  outputBuffer[0] = finalFragment ? opcode | 0x80 : opcode;
  if (compressed) outputBuffer[0] |= 0x40;

  switch (secondByte) {
    case 126:
      writeUInt16BE.call(outputBuffer, dataLength, 2);
      break;
    case 127:
      writeUInt32BE.call(outputBuffer, 0, 2);
      writeUInt32BE.call(outputBuffer, dataLength, 6);
  }

  if (maskData) {
    outputBuffer[1] = secondByte | 0x80;
    var mask = getRandomMask();
    outputBuffer[dataOffset - 4] = mask[0];
    outputBuffer[dataOffset - 3] = mask[1];
    outputBuffer[dataOffset - 2] = mask[2];
    outputBuffer[dataOffset - 1] = mask[3];
    if (mergeBuffers) {
      bufferUtil.mask(data, mask, outputBuffer, dataOffset, dataLength);
      try {
        this._socket.write(outputBuffer, 'binary', cb);
      }
      catch (e) {
        if (typeof cb == 'function') cb(e);
        else this.emit('error', e);
      }
    }
    else {
      bufferUtil.mask(data, mask, data, 0, dataLength);
      try {
        this._socket.write(outputBuffer, 'binary');
        this._socket.write(data, 'binary', cb);
      }
      catch (e) {
        if (typeof cb == 'function') cb(e);
        else this.emit('error', e);
      }
    }
  }
  else {
    outputBuffer[1] = secondByte;
    if (mergeBuffers) {
      data.copy(outputBuffer, dataOffset);
      try {
        this._socket.write(outputBuffer, 'binary', cb);
      }
      catch (e) {
        if (typeof cb == 'function') cb(e);
        else this.emit('error', e);
      }
    }
    else {
      try {
        this._socket.write(outputBuffer, 'binary');
        this._socket.write(data, 'binary', cb);
      }
      catch (e) {
        if (typeof cb == 'function') cb(e);
        else this.emit('error', e);
      }
    }
  }
};

/**
 * Execute message handler buffers
 *
 * @api private
 */

Sender.prototype.flush = function() {
  while (!this.processing && this.messageHandlers.length) {
    this.messageHandlers.shift()();
  }
};

/**
 * Apply extensions to message
 *
 * @api private
 */

Sender.prototype.applyExtensions = function(data, fin, compress, callback) {
  if ((data.buffer || data) instanceof ArrayBuffer) {
    data = getArrayBuffer(data);
  }
  this.extensions[PerMessageDeflate.extensionName].compress(data, fin, callback);
};

module.exports = Sender;

function writeUInt16BE(value, offset) {
  this[offset] = (value & 0xff00)>>8;
  this[offset+1] = value & 0xff;
}

function writeUInt32BE(value, offset) {
  this[offset] = (value & 0xff000000)>>24;
  this[offset+1] = (value & 0xff0000)>>16;
  this[offset+2] = (value & 0xff00)>>8;
  this[offset+3] = value & 0xff;
}

function getArrayBuffer(data) {
  // data is either an ArrayBuffer or ArrayBufferView.
  var array = new Uint8Array(data.buffer || data)
    , l = data.byteLength || data.length
    , o = data.byteOffset || 0
    , buffer = new Buffer(l);
  for (var i = 0; i < l; ++i) {
    buffer[i] = array[o+i];
  }
  return buffer;
}

function getRandomMask() {
  return crypto.randomBytes(4);
}


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*!
 * ws: a node.js websocket client
 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
 * MIT Licensed
 */

var url = __webpack_require__(44)
  , util = __webpack_require__(0)
  , http = __webpack_require__(42)
  , https = __webpack_require__(80)
  , crypto = __webpack_require__(16)
  , stream = __webpack_require__(17)
  , Ultron = __webpack_require__(65)
  , Options = __webpack_require__(19)
  , Sender = __webpack_require__(38)
  , Receiver = __webpack_require__(37)
  , SenderHixie = __webpack_require__(71)
  , ReceiverHixie = __webpack_require__(70)
  , Extensions = __webpack_require__(36)
  , PerMessageDeflate = __webpack_require__(12)
  , EventEmitter = __webpack_require__(13).EventEmitter;

/**
 * Constants
 */

// Default protocol version

var protocolVersion = 13;

// Close timeout

var closeTimeout = 30 * 1000; // Allow 30 seconds to terminate the connection cleanly

/**
 * WebSocket implementation
 *
 * @constructor
 * @param {String} address Connection address.
 * @param {String|Array} protocols WebSocket protocols.
 * @param {Object} options Additional connection options.
 * @api public
 */
function WebSocket(address, protocols, options) {
  if (this instanceof WebSocket === false) {
    return new WebSocket(address, protocols, options);
  }

  EventEmitter.call(this);

  if (protocols && !Array.isArray(protocols) && 'object' === typeof protocols) {
    // accept the "options" Object as the 2nd argument
    options = protocols;
    protocols = null;
  }

  if ('string' === typeof protocols) {
    protocols = [ protocols ];
  }

  if (!Array.isArray(protocols)) {
    protocols = [];
  }

  this._socket = null;
  this._ultron = null;
  this._closeReceived = false;
  this.bytesReceived = 0;
  this.readyState = null;
  this.supports = {};
  this.extensions = {};
  this._binaryType = 'nodebuffer';

  if (Array.isArray(address)) {
    initAsServerClient.apply(this, address.concat(options));
  } else {
    initAsClient.apply(this, [address, protocols, options]);
  }
}

/**
 * Inherits from EventEmitter.
 */
util.inherits(WebSocket, EventEmitter);

/**
 * Ready States
 */
["CONNECTING", "OPEN", "CLOSING", "CLOSED"].forEach(function each(state, index) {
    WebSocket.prototype[state] = WebSocket[state] = index;
});

/**
 * Gracefully closes the connection, after sending a description message to the server
 *
 * @param {Object} data to be sent to the server
 * @api public
 */
WebSocket.prototype.close = function close(code, data) {
  if (this.readyState === WebSocket.CLOSED) return;

  if (this.readyState === WebSocket.CONNECTING) {
    this.readyState = WebSocket.CLOSED;
    return;
  }

  if (this.readyState === WebSocket.CLOSING) {
    if (this._closeReceived && this._isServer) {
      this.terminate();
    }
    return;
  }

  var self = this;
  try {
    this.readyState = WebSocket.CLOSING;
    this._closeCode = code;
    this._closeMessage = data;
    var mask = !this._isServer;
    this._sender.close(code, data, mask, function(err) {
      if (err) self.emit('error', err);

      if (self._closeReceived && self._isServer) {
        self.terminate();
      } else {
        // ensure that the connection is cleaned up even when no response of closing handshake.
        clearTimeout(self._closeTimer);
        self._closeTimer = setTimeout(cleanupWebsocketResources.bind(self, true), closeTimeout);
      }
    });
  } catch (e) {
    this.emit('error', e);
  }
};

/**
 * Pause the client stream
 *
 * @api public
 */
WebSocket.prototype.pause = function pauser() {
  if (this.readyState !== WebSocket.OPEN) throw new Error('not opened');

  return this._socket.pause();
};

/**
 * Sends a ping
 *
 * @param {Object} data to be sent to the server
 * @param {Object} Members - mask: boolean, binary: boolean
 * @param {boolean} dontFailWhenClosed indicates whether or not to throw if the connection isnt open
 * @api public
 */
WebSocket.prototype.ping = function ping(data, options, dontFailWhenClosed) {
  if (this.readyState !== WebSocket.OPEN) {
    if (dontFailWhenClosed === true) return;
    throw new Error('not opened');
  }

  options = options || {};

  if (typeof options.mask === 'undefined') options.mask = !this._isServer;

  this._sender.ping(data, options);
};

/**
 * Sends a pong
 *
 * @param {Object} data to be sent to the server
 * @param {Object} Members - mask: boolean, binary: boolean
 * @param {boolean} dontFailWhenClosed indicates whether or not to throw if the connection isnt open
 * @api public
 */
WebSocket.prototype.pong = function(data, options, dontFailWhenClosed) {
  if (this.readyState !== WebSocket.OPEN) {
    if (dontFailWhenClosed === true) return;
    throw new Error('not opened');
  }

  options = options || {};

  if (typeof options.mask === 'undefined') options.mask = !this._isServer;

  this._sender.pong(data, options);
};

/**
 * Resume the client stream
 *
 * @api public
 */
WebSocket.prototype.resume = function resume() {
  if (this.readyState !== WebSocket.OPEN) throw new Error('not opened');

  return this._socket.resume();
};

/**
 * Sends a piece of data
 *
 * @param {Object} data to be sent to the server
 * @param {Object} Members - mask: boolean, binary: boolean, compress: boolean
 * @param {function} Optional callback which is executed after the send completes
 * @api public
 */

WebSocket.prototype.send = function send(data, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  if (this.readyState !== WebSocket.OPEN) {
    if (typeof cb === 'function') cb(new Error('not opened'));
    else throw new Error('not opened');
    return;
  }

  if (!data) data = '';
  if (this._queue) {
    var self = this;
    this._queue.push(function() { self.send(data, options, cb); });
    return;
  }

  options = options || {};
  options.fin = true;

  if (typeof options.binary === 'undefined') {
    options.binary = (data instanceof ArrayBuffer || data instanceof Buffer ||
      data instanceof Uint8Array ||
      data instanceof Uint16Array ||
      data instanceof Uint32Array ||
      data instanceof Int8Array ||
      data instanceof Int16Array ||
      data instanceof Int32Array ||
      data instanceof Float32Array ||
      data instanceof Float64Array);
  }

  if (typeof options.mask === 'undefined') options.mask = !this._isServer;
  if (typeof options.compress === 'undefined') options.compress = true;
  if (!this.extensions[PerMessageDeflate.extensionName]) {
    options.compress = false;
  }

  var readable = typeof stream.Readable === 'function'
    ? stream.Readable
    : stream.Stream;

  if (data instanceof readable) {
    startQueue(this);
    var self = this;

    sendStream(this, data, options, function send(error) {
      process.nextTick(function tock() {
        executeQueueSends(self);
      });

      if (typeof cb === 'function') cb(error);
    });
  } else {
    this._sender.send(data, options, cb);
  }
};

/**
 * Streams data through calls to a user supplied function
 *
 * @param {Object} Members - mask: boolean, binary: boolean, compress: boolean
 * @param {function} 'function (error, send)' which is executed on successive ticks of which send is 'function (data, final)'.
 * @api public
 */
WebSocket.prototype.stream = function stream(options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  var self = this;

  if (typeof cb !== 'function') throw new Error('callback must be provided');

  if (this.readyState !== WebSocket.OPEN) {
    if (typeof cb === 'function') cb(new Error('not opened'));
    else throw new Error('not opened');
    return;
  }

  if (this._queue) {
    this._queue.push(function () { self.stream(options, cb); });
    return;
  }

  options = options || {};

  if (typeof options.mask === 'undefined') options.mask = !this._isServer;
  if (typeof options.compress === 'undefined') options.compress = true;
  if (!this.extensions[PerMessageDeflate.extensionName]) {
    options.compress = false;
  }

  startQueue(this);

  function send(data, final) {
    try {
      if (self.readyState !== WebSocket.OPEN) throw new Error('not opened');
      options.fin = final === true;
      self._sender.send(data, options);
      if (!final) process.nextTick(cb.bind(null, null, send));
      else executeQueueSends(self);
    } catch (e) {
      if (typeof cb === 'function') cb(e);
      else {
        delete self._queue;
        self.emit('error', e);
      }
    }
  }

  process.nextTick(cb.bind(null, null, send));
};

/**
 * Immediately shuts down the connection
 *
 * @api public
 */
WebSocket.prototype.terminate = function terminate() {
  if (this.readyState === WebSocket.CLOSED) return;

  if (this._socket) {
    this.readyState = WebSocket.CLOSING;

    // End the connection
    try { this._socket.end(); }
    catch (e) {
      // Socket error during end() call, so just destroy it right now
      cleanupWebsocketResources.call(this, true);
      return;
    }

    // Add a timeout to ensure that the connection is completely
    // cleaned up within 30 seconds, even if the clean close procedure
    // fails for whatever reason
    // First cleanup any pre-existing timeout from an earlier "terminate" call,
    // if one exists.  Otherwise terminate calls in quick succession will leak timeouts
    // and hold the program open for `closeTimout` time.
    if (this._closeTimer) { clearTimeout(this._closeTimer); }
    this._closeTimer = setTimeout(cleanupWebsocketResources.bind(this, true), closeTimeout);
  } else if (this.readyState === WebSocket.CONNECTING) {
    cleanupWebsocketResources.call(this, true);
  }
};

/**
 * Expose bufferedAmount
 *
 * @api public
 */
Object.defineProperty(WebSocket.prototype, 'bufferedAmount', {
  get: function get() {
    var amount = 0;
    if (this._socket) {
      amount = this._socket.bufferSize || 0;
    }
    return amount;
  }
});

/**
 * Expose binaryType
 *
 * This deviates from the W3C interface since ws doesn't support the required
 * default "blob" type (instead we define a custom "nodebuffer" type).
 *
 * @see http://dev.w3.org/html5/websockets/#the-websocket-interface
 * @api public
 */
Object.defineProperty(WebSocket.prototype, 'binaryType', {
  get: function get() {
    return this._binaryType;
  },
  set: function set(type) {
    if (type === 'arraybuffer' || type === 'nodebuffer')
      this._binaryType = type;
    else
      throw new SyntaxError('unsupported binaryType: must be either "nodebuffer" or "arraybuffer"');
  }
});

/**
 * Emulates the W3C Browser based WebSocket interface using function members.
 *
 * @see http://dev.w3.org/html5/websockets/#the-websocket-interface
 * @api public
 */
['open', 'error', 'close', 'message'].forEach(function(method) {
  Object.defineProperty(WebSocket.prototype, 'on' + method, {
    /**
     * Returns the current listener
     *
     * @returns {Mixed} the set function or undefined
     * @api public
     */
    get: function get() {
      var listener = this.listeners(method)[0];
      return listener ? (listener._listener ? listener._listener : listener) : undefined;
    },

    /**
     * Start listening for events
     *
     * @param {Function} listener the listener
     * @returns {Mixed} the set function or undefined
     * @api public
     */
    set: function set(listener) {
      this.removeAllListeners(method);
      this.addEventListener(method, listener);
    }
  });
});

/**
 * Emulates the W3C Browser based WebSocket interface using addEventListener.
 *
 * @see https://developer.mozilla.org/en/DOM/element.addEventListener
 * @see http://dev.w3.org/html5/websockets/#the-websocket-interface
 * @api public
 */
WebSocket.prototype.addEventListener = function(method, listener) {
  var target = this;

  function onMessage (data, flags) {
    if (flags.binary && this.binaryType === 'arraybuffer')
        data = new Uint8Array(data).buffer;
    listener.call(target, new MessageEvent(data, !!flags.binary, target));
  }

  function onClose (code, message) {
    listener.call(target, new CloseEvent(code, message, target));
  }

  function onError (event) {
    event.type = 'error';
    event.target = target;
    listener.call(target, event);
  }

  function onOpen () {
    listener.call(target, new OpenEvent(target));
  }

  if (typeof listener === 'function') {
    if (method === 'message') {
      // store a reference so we can return the original function from the
      // addEventListener hook
      onMessage._listener = listener;
      this.on(method, onMessage);
    } else if (method === 'close') {
      // store a reference so we can return the original function from the
      // addEventListener hook
      onClose._listener = listener;
      this.on(method, onClose);
    } else if (method === 'error') {
      // store a reference so we can return the original function from the
      // addEventListener hook
      onError._listener = listener;
      this.on(method, onError);
    } else if (method === 'open') {
      // store a reference so we can return the original function from the
      // addEventListener hook
      onOpen._listener = listener;
      this.on(method, onOpen);
    } else {
      this.on(method, listener);
    }
  }
};

module.exports = WebSocket;
module.exports.buildHostHeader = buildHostHeader

/**
 * W3C MessageEvent
 *
 * @see http://www.w3.org/TR/html5/comms.html
 * @constructor
 * @api private
 */
function MessageEvent(dataArg, isBinary, target) {
  this.type = 'message';
  this.data = dataArg;
  this.target = target;
  this.binary = isBinary; // non-standard.
}

/**
 * W3C CloseEvent
 *
 * @see http://www.w3.org/TR/html5/comms.html
 * @constructor
 * @api private
 */
function CloseEvent(code, reason, target) {
  this.type = 'close';
  this.wasClean = (typeof code === 'undefined' || code === 1000);
  this.code = code;
  this.reason = reason;
  this.target = target;
}

/**
 * W3C OpenEvent
 *
 * @see http://www.w3.org/TR/html5/comms.html
 * @constructor
 * @api private
 */
function OpenEvent(target) {
  this.type = 'open';
  this.target = target;
}

// Append port number to Host header, only if specified in the url
// and non-default
function buildHostHeader(isSecure, hostname, port) {
  var headerHost = hostname;
  if (hostname) {
    if ((isSecure && (port != 443)) || (!isSecure && (port != 80))){
      headerHost = headerHost + ':' + port;
    }
  }
  return headerHost;
}

/**
 * Entirely private apis,
 * which may or may not be bound to a sepcific WebSocket instance.
 */
function initAsServerClient(req, socket, upgradeHead, options) {
  options = new Options({
    protocolVersion: protocolVersion,
    protocol: null,
    extensions: {},
    maxPayload: 0
  }).merge(options);

  // expose state properties
  this.protocol = options.value.protocol;
  this.protocolVersion = options.value.protocolVersion;
  this.extensions = options.value.extensions;
  this.supports.binary = (this.protocolVersion !== 'hixie-76');
  this.upgradeReq = req;
  this.readyState = WebSocket.CONNECTING;
  this._isServer = true;
  this.maxPayload = options.value.maxPayload;
  // establish connection
  if (options.value.protocolVersion === 'hixie-76') {
    establishConnection.call(this, ReceiverHixie, SenderHixie, socket, upgradeHead);
  } else {
    establishConnection.call(this, Receiver, Sender, socket, upgradeHead);
  }
}

function initAsClient(address, protocols, options) {
  options = new Options({
    origin: null,
    protocolVersion: protocolVersion,
    host: null,
    headers: null,
    protocol: protocols.join(','),
    agent: null,

    // ssl-related options
    pfx: null,
    key: null,
    passphrase: null,
    cert: null,
    ca: null,
    ciphers: null,
    rejectUnauthorized: null,
    perMessageDeflate: true,
    localAddress: null
  }).merge(options);

  if (options.value.protocolVersion !== 8 && options.value.protocolVersion !== 13) {
    throw new Error('unsupported protocol version');
  }

  // verify URL and establish http class
  var serverUrl = url.parse(address);
  var isUnixSocket = serverUrl.protocol === 'ws+unix:';
  if (!serverUrl.host && !isUnixSocket) throw new Error('invalid url');
  var isSecure = serverUrl.protocol === 'wss:' || serverUrl.protocol === 'https:';
  var httpObj = isSecure ? https : http;
  var port = serverUrl.port || (isSecure ? 443 : 80);
  var auth = serverUrl.auth;

  // prepare extensions
  var extensionsOffer = {};
  var perMessageDeflate;
  if (options.value.perMessageDeflate) {
    perMessageDeflate = new PerMessageDeflate(typeof options.value.perMessageDeflate !== true ? options.value.perMessageDeflate : {}, false);
    extensionsOffer[PerMessageDeflate.extensionName] = perMessageDeflate.offer();
  }

  // expose state properties
  this._isServer = false;
  this.url = address;
  this.protocolVersion = options.value.protocolVersion;
  this.supports.binary = (this.protocolVersion !== 'hixie-76');

  // begin handshake
  var key = new Buffer(options.value.protocolVersion + '-' + Date.now()).toString('base64');
  var shasum = crypto.createHash('sha1');
  shasum.update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11');
  var expectedServerKey = shasum.digest('base64');

  var agent = options.value.agent;

  var headerHost = buildHostHeader(isSecure, serverUrl.hostname, port)

  var requestOptions = {
    port: port,
    host: serverUrl.hostname,
    headers: {
      'Connection': 'Upgrade',
      'Upgrade': 'websocket',
      'Host': headerHost,
      'Sec-WebSocket-Version': options.value.protocolVersion,
      'Sec-WebSocket-Key': key
    }
  };

  // If we have basic auth.
  if (auth) {
    requestOptions.headers.Authorization = 'Basic ' + new Buffer(auth).toString('base64');
  }

  if (options.value.protocol) {
    requestOptions.headers['Sec-WebSocket-Protocol'] = options.value.protocol;
  }

  if (options.value.host) {
    requestOptions.headers.Host = options.value.host;
  }

  if (options.value.headers) {
    for (var header in options.value.headers) {
       if (options.value.headers.hasOwnProperty(header)) {
        requestOptions.headers[header] = options.value.headers[header];
       }
    }
  }

  if (Object.keys(extensionsOffer).length) {
    requestOptions.headers['Sec-WebSocket-Extensions'] = Extensions.format(extensionsOffer);
  }

  if (options.isDefinedAndNonNull('pfx')
   || options.isDefinedAndNonNull('key')
   || options.isDefinedAndNonNull('passphrase')
   || options.isDefinedAndNonNull('cert')
   || options.isDefinedAndNonNull('ca')
   || options.isDefinedAndNonNull('ciphers')
   || options.isDefinedAndNonNull('rejectUnauthorized')) {

    if (options.isDefinedAndNonNull('pfx')) requestOptions.pfx = options.value.pfx;
    if (options.isDefinedAndNonNull('key')) requestOptions.key = options.value.key;
    if (options.isDefinedAndNonNull('passphrase')) requestOptions.passphrase = options.value.passphrase;
    if (options.isDefinedAndNonNull('cert')) requestOptions.cert = options.value.cert;
    if (options.isDefinedAndNonNull('ca')) requestOptions.ca = options.value.ca;
    if (options.isDefinedAndNonNull('ciphers')) requestOptions.ciphers = options.value.ciphers;
    if (options.isDefinedAndNonNull('rejectUnauthorized')) requestOptions.rejectUnauthorized = options.value.rejectUnauthorized;

    if (!agent) {
        // global agent ignores client side certificates
        agent = new httpObj.Agent(requestOptions);
    }
  }

  requestOptions.path = serverUrl.path || '/';

  if (agent) {
    requestOptions.agent = agent;
  }

  if (isUnixSocket) {
    requestOptions.socketPath = serverUrl.pathname;
  }

  if (options.value.localAddress) {
    requestOptions.localAddress = options.value.localAddress;
  }

  if (options.value.origin) {
    if (options.value.protocolVersion < 13) requestOptions.headers['Sec-WebSocket-Origin'] = options.value.origin;
    else requestOptions.headers.Origin = options.value.origin;
  }

  var self = this;
  var req = httpObj.request(requestOptions);

  req.on('error', function onerror(error) {
    self.emit('error', error);
    cleanupWebsocketResources.call(self, error);
  });

  req.once('response', function response(res) {
    var error;

    if (!self.emit('unexpected-response', req, res)) {
      error = new Error('unexpected server response (' + res.statusCode + ')');
      req.abort();
      self.emit('error', error);
    }

    cleanupWebsocketResources.call(self, error);
  });

  req.once('upgrade', function upgrade(res, socket, upgradeHead) {
    if (self.readyState === WebSocket.CLOSED) {
      // client closed before server accepted connection
      self.emit('close');
      self.removeAllListeners();
      socket.end();
      return;
    }

    var serverKey = res.headers['sec-websocket-accept'];
    if (typeof serverKey === 'undefined' || serverKey !== expectedServerKey) {
      self.emit('error', 'invalid server key');
      self.removeAllListeners();
      socket.end();
      return;
    }

    var serverProt = res.headers['sec-websocket-protocol'];
    var protList = (options.value.protocol || "").split(/, */);
    var protError = null;

    if (!options.value.protocol && serverProt) {
      protError = 'server sent a subprotocol even though none requested';
    } else if (options.value.protocol && !serverProt) {
      protError = 'server sent no subprotocol even though requested';
    } else if (serverProt && protList.indexOf(serverProt) === -1) {
      protError = 'server responded with an invalid protocol';
    }

    if (protError) {
      self.emit('error', protError);
      self.removeAllListeners();
      socket.end();
      return;
    } else if (serverProt) {
      self.protocol = serverProt;
    }

    var serverExtensions = Extensions.parse(res.headers['sec-websocket-extensions']);
    if (perMessageDeflate && serverExtensions[PerMessageDeflate.extensionName]) {
      try {
        perMessageDeflate.accept(serverExtensions[PerMessageDeflate.extensionName]);
      } catch (err) {
        self.emit('error', 'invalid extension parameter');
        self.removeAllListeners();
        socket.end();
        return;
      }
      self.extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
    }

    establishConnection.call(self, Receiver, Sender, socket, upgradeHead);

    // perform cleanup on http resources
    req.removeAllListeners();
    req = null;
    agent = null;
  });

  req.end();
  this.readyState = WebSocket.CONNECTING;
}

function establishConnection(ReceiverClass, SenderClass, socket, upgradeHead) {
  var ultron = this._ultron = new Ultron(socket)
    , called = false
    , self = this;

  socket.setTimeout(0);
  socket.setNoDelay(true);

  this._receiver = new ReceiverClass(this.extensions,this.maxPayload);
  this._socket = socket;

  // socket cleanup handlers
  ultron.on('end', cleanupWebsocketResources.bind(this));
  ultron.on('close', cleanupWebsocketResources.bind(this));
  ultron.on('error', cleanupWebsocketResources.bind(this));

  // ensure that the upgradeHead is added to the receiver
  function firstHandler(data) {
    if (called || self.readyState === WebSocket.CLOSED) return;

    called = true;
    socket.removeListener('data', firstHandler);
    ultron.on('data', realHandler);

    if (upgradeHead && upgradeHead.length > 0) {
      realHandler(upgradeHead);
      upgradeHead = null;
    }

    if (data) realHandler(data);
  }

  // subsequent packets are pushed straight to the receiver
  function realHandler(data) {
    self.bytesReceived += data.length;
    self._receiver.add(data);
  }

  ultron.on('data', firstHandler);

  // if data was passed along with the http upgrade,
  // this will schedule a push of that on to the receiver.
  // this has to be done on next tick, since the caller
  // hasn't had a chance to set event handlers on this client
  // object yet.
  process.nextTick(firstHandler);

  // receiver event handlers
  self._receiver.ontext = function ontext(data, flags) {
    flags = flags || {};

    self.emit('message', data, flags);
  };

  self._receiver.onbinary = function onbinary(data, flags) {
    flags = flags || {};

    flags.binary = true;
    self.emit('message', data, flags);
  };

  self._receiver.onping = function onping(data, flags) {
    flags = flags || {};

    self.pong(data, {
      mask: !self._isServer,
      binary: flags.binary === true
    }, true);

    self.emit('ping', data, flags);
  };

  self._receiver.onpong = function onpong(data, flags) {
    self.emit('pong', data, flags || {});
  };

  self._receiver.onclose = function onclose(code, data, flags) {
    flags = flags || {};

    self._closeReceived = true;
    self.close(code, data);
  };

  self._receiver.onerror = function onerror(reason, errorCode) {
    // close the connection when the receiver reports a HyBi error code
    self.close(typeof errorCode !== 'undefined' ? errorCode : 1002, '');
    self.emit('error', (reason instanceof Error) ? reason : (new Error(reason)));
  };

  // finalize the client
  this._sender = new SenderClass(socket, this.extensions);
  this._sender.on('error', function onerror(error) {
    self.close(1002, '');
    self.emit('error', error);
  });

  this.readyState = WebSocket.OPEN;
  this.emit('open');
}

function startQueue(instance) {
  instance._queue = instance._queue || [];
}

function executeQueueSends(instance) {
  var queue = instance._queue;
  if (typeof queue === 'undefined') return;

  delete instance._queue;
  for (var i = 0, l = queue.length; i < l; ++i) {
    queue[i]();
  }
}

function sendStream(instance, stream, options, cb) {
  stream.on('data', function incoming(data) {
    if (instance.readyState !== WebSocket.OPEN) {
      if (typeof cb === 'function') cb(new Error('not opened'));
      else {
        delete instance._queue;
        instance.emit('error', new Error('not opened'));
      }
      return;
    }

    options.fin = false;
    instance._sender.send(data, options);
  });

  stream.on('end', function end() {
    if (instance.readyState !== WebSocket.OPEN) {
      if (typeof cb === 'function') cb(new Error('not opened'));
      else {
        delete instance._queue;
        instance.emit('error', new Error('not opened'));
      }
      return;
    }

    options.fin = true;
    instance._sender.send(null, options);

    if (typeof cb === 'function') cb(null);
  });
}

function cleanupWebsocketResources(error) {
  if (this.readyState === WebSocket.CLOSED) return;

  this.readyState = WebSocket.CLOSED;

  clearTimeout(this._closeTimer);
  this._closeTimer = null;

  // If the connection was closed abnormally (with an error), or if
  // the close control frame was not received then the close code
  // must default to 1006.
  if (error || !this._closeReceived) {
    this._closeCode = 1006;
  }
  this.emit('close', this._closeCode || 1000, this._closeMessage || '');

  if (this._socket) {
    if (this._ultron) this._ultron.destroy();
    this._socket.on('error', function onerror() {
      try { this.destroy(); }
      catch (e) {}
    });

    try {
      if (!error) this._socket.end();
      else this._socket.destroy();
    } catch (e) { /* Ignore termination errors */ }

    this._socket = null;
    this._ultron = null;
  }

  if (this._sender) {
    this._sender.removeAllListeners();
    this._sender = null;
  }

  if (this._receiver) {
    this._receiver.cleanup();
    this._receiver = null;
  }

  if (this.extensions[PerMessageDeflate.extensionName]) {
    this.extensions[PerMessageDeflate.extensionName].cleanup();
  }

  this.extensions = null;

  this.removeAllListeners();
  this.on('error', function onerror() {}); // catch all errors after this
  delete this._queue;
}


/***/ }),
/* 40 */
/***/ (function(module, exports) {

/*
 * DOM Level 2
 * Object DOMException
 * @see http://www.w3.org/TR/REC-DOM-Level-1/ecma-script-language-binding.html
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/ecma-script-binding.html
 */

function copy(src,dest){
	for(var p in src){
		dest[p] = src[p];
	}
}
/**
^\w+\.prototype\.([_\w]+)\s*=\s*((?:.*\{\s*?[\r\n][\s\S]*?^})|\S.*?(?=[;\r\n]));?
^\w+\.prototype\.([_\w]+)\s*=\s*(\S.*?(?=[;\r\n]));?
 */
function _extends(Class,Super){
	var pt = Class.prototype;
	if(Object.create){
		var ppt = Object.create(Super.prototype)
		pt.__proto__ = ppt;
	}
	if(!(pt instanceof Super)){
		function t(){};
		t.prototype = Super.prototype;
		t = new t();
		copy(pt,t);
		Class.prototype = pt = t;
	}
	if(pt.constructor != Class){
		if(typeof Class != 'function'){
			console.error("unknow Class:"+Class)
		}
		pt.constructor = Class
	}
}
var htmlns = 'http://www.w3.org/1999/xhtml' ;
// Node Types
var NodeType = {}
var ELEMENT_NODE                = NodeType.ELEMENT_NODE                = 1;
var ATTRIBUTE_NODE              = NodeType.ATTRIBUTE_NODE              = 2;
var TEXT_NODE                   = NodeType.TEXT_NODE                   = 3;
var CDATA_SECTION_NODE          = NodeType.CDATA_SECTION_NODE          = 4;
var ENTITY_REFERENCE_NODE       = NodeType.ENTITY_REFERENCE_NODE       = 5;
var ENTITY_NODE                 = NodeType.ENTITY_NODE                 = 6;
var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
var COMMENT_NODE                = NodeType.COMMENT_NODE                = 8;
var DOCUMENT_NODE               = NodeType.DOCUMENT_NODE               = 9;
var DOCUMENT_TYPE_NODE          = NodeType.DOCUMENT_TYPE_NODE          = 10;
var DOCUMENT_FRAGMENT_NODE      = NodeType.DOCUMENT_FRAGMENT_NODE      = 11;
var NOTATION_NODE               = NodeType.NOTATION_NODE               = 12;

// ExceptionCode
var ExceptionCode = {}
var ExceptionMessage = {};
var INDEX_SIZE_ERR              = ExceptionCode.INDEX_SIZE_ERR              = ((ExceptionMessage[1]="Index size error"),1);
var DOMSTRING_SIZE_ERR          = ExceptionCode.DOMSTRING_SIZE_ERR          = ((ExceptionMessage[2]="DOMString size error"),2);
var HIERARCHY_REQUEST_ERR       = ExceptionCode.HIERARCHY_REQUEST_ERR       = ((ExceptionMessage[3]="Hierarchy request error"),3);
var WRONG_DOCUMENT_ERR          = ExceptionCode.WRONG_DOCUMENT_ERR          = ((ExceptionMessage[4]="Wrong document"),4);
var INVALID_CHARACTER_ERR       = ExceptionCode.INVALID_CHARACTER_ERR       = ((ExceptionMessage[5]="Invalid character"),5);
var NO_DATA_ALLOWED_ERR         = ExceptionCode.NO_DATA_ALLOWED_ERR         = ((ExceptionMessage[6]="No data allowed"),6);
var NO_MODIFICATION_ALLOWED_ERR = ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = ((ExceptionMessage[7]="No modification allowed"),7);
var NOT_FOUND_ERR               = ExceptionCode.NOT_FOUND_ERR               = ((ExceptionMessage[8]="Not found"),8);
var NOT_SUPPORTED_ERR           = ExceptionCode.NOT_SUPPORTED_ERR           = ((ExceptionMessage[9]="Not supported"),9);
var INUSE_ATTRIBUTE_ERR         = ExceptionCode.INUSE_ATTRIBUTE_ERR         = ((ExceptionMessage[10]="Attribute in use"),10);
//level2
var INVALID_STATE_ERR        	= ExceptionCode.INVALID_STATE_ERR        	= ((ExceptionMessage[11]="Invalid state"),11);
var SYNTAX_ERR               	= ExceptionCode.SYNTAX_ERR               	= ((ExceptionMessage[12]="Syntax error"),12);
var INVALID_MODIFICATION_ERR 	= ExceptionCode.INVALID_MODIFICATION_ERR 	= ((ExceptionMessage[13]="Invalid modification"),13);
var NAMESPACE_ERR            	= ExceptionCode.NAMESPACE_ERR           	= ((ExceptionMessage[14]="Invalid namespace"),14);
var INVALID_ACCESS_ERR       	= ExceptionCode.INVALID_ACCESS_ERR      	= ((ExceptionMessage[15]="Invalid access"),15);


function DOMException(code, message) {
	if(message instanceof Error){
		var error = message;
	}else{
		error = this;
		Error.call(this, ExceptionMessage[code]);
		this.message = ExceptionMessage[code];
		if(Error.captureStackTrace) Error.captureStackTrace(this, DOMException);
	}
	error.code = code;
	if(message) this.message = this.message + ": " + message;
	return error;
};
DOMException.prototype = Error.prototype;
copy(ExceptionCode,DOMException)
/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-536297177
 * The NodeList interface provides the abstraction of an ordered collection of nodes, without defining or constraining how this collection is implemented. NodeList objects in the DOM are live.
 * The items in the NodeList are accessible via an integral index, starting from 0.
 */
function NodeList() {
};
NodeList.prototype = {
	/**
	 * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
	 * @standard level1
	 */
	length:0, 
	/**
	 * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
	 * @standard level1
	 * @param index  unsigned long 
	 *   Index into the collection.
	 * @return Node
	 * 	The node at the indexth position in the NodeList, or null if that is not a valid index. 
	 */
	item: function(index) {
		return this[index] || null;
	},
	toString:function(isHTML,nodeFilter){
		for(var buf = [], i = 0;i<this.length;i++){
			serializeToString(this[i],buf,isHTML,nodeFilter);
		}
		return buf.join('');
	}
};
function LiveNodeList(node,refresh){
	this._node = node;
	this._refresh = refresh
	_updateLiveList(this);
}
function _updateLiveList(list){
	var inc = list._node._inc || list._node.ownerDocument._inc;
	if(list._inc != inc){
		var ls = list._refresh(list._node);
		//console.log(ls.length)
		__set__(list,'length',ls.length);
		copy(ls,list);
		list._inc = inc;
	}
}
LiveNodeList.prototype.item = function(i){
	_updateLiveList(this);
	return this[i];
}

_extends(LiveNodeList,NodeList);
/**
 * 
 * Objects implementing the NamedNodeMap interface are used to represent collections of nodes that can be accessed by name. Note that NamedNodeMap does not inherit from NodeList; NamedNodeMaps are not maintained in any particular order. Objects contained in an object implementing NamedNodeMap may also be accessed by an ordinal index, but this is simply to allow convenient enumeration of the contents of a NamedNodeMap, and does not imply that the DOM specifies an order to these Nodes.
 * NamedNodeMap objects in the DOM are live.
 * used for attributes or DocumentType entities 
 */
function NamedNodeMap() {
};

function _findNodeIndex(list,node){
	var i = list.length;
	while(i--){
		if(list[i] === node){return i}
	}
}

function _addNamedNode(el,list,newAttr,oldAttr){
	if(oldAttr){
		list[_findNodeIndex(list,oldAttr)] = newAttr;
	}else{
		list[list.length++] = newAttr;
	}
	if(el){
		newAttr.ownerElement = el;
		var doc = el.ownerDocument;
		if(doc){
			oldAttr && _onRemoveAttribute(doc,el,oldAttr);
			_onAddAttribute(doc,el,newAttr);
		}
	}
}
function _removeNamedNode(el,list,attr){
	//console.log('remove attr:'+attr)
	var i = _findNodeIndex(list,attr);
	if(i>=0){
		var lastIndex = list.length-1
		while(i<lastIndex){
			list[i] = list[++i]
		}
		list.length = lastIndex;
		if(el){
			var doc = el.ownerDocument;
			if(doc){
				_onRemoveAttribute(doc,el,attr);
				attr.ownerElement = null;
			}
		}
	}else{
		throw DOMException(NOT_FOUND_ERR,new Error(el.tagName+'@'+attr))
	}
}
NamedNodeMap.prototype = {
	length:0,
	item:NodeList.prototype.item,
	getNamedItem: function(key) {
//		if(key.indexOf(':')>0 || key == 'xmlns'){
//			return null;
//		}
		//console.log()
		var i = this.length;
		while(i--){
			var attr = this[i];
			//console.log(attr.nodeName,key)
			if(attr.nodeName == key){
				return attr;
			}
		}
	},
	setNamedItem: function(attr) {
		var el = attr.ownerElement;
		if(el && el!=this._ownerElement){
			throw new DOMException(INUSE_ATTRIBUTE_ERR);
		}
		var oldAttr = this.getNamedItem(attr.nodeName);
		_addNamedNode(this._ownerElement,this,attr,oldAttr);
		return oldAttr;
	},
	/* returns Node */
	setNamedItemNS: function(attr) {// raises: WRONG_DOCUMENT_ERR,NO_MODIFICATION_ALLOWED_ERR,INUSE_ATTRIBUTE_ERR
		var el = attr.ownerElement, oldAttr;
		if(el && el!=this._ownerElement){
			throw new DOMException(INUSE_ATTRIBUTE_ERR);
		}
		oldAttr = this.getNamedItemNS(attr.namespaceURI,attr.localName);
		_addNamedNode(this._ownerElement,this,attr,oldAttr);
		return oldAttr;
	},

	/* returns Node */
	removeNamedItem: function(key) {
		var attr = this.getNamedItem(key);
		_removeNamedNode(this._ownerElement,this,attr);
		return attr;
		
		
	},// raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR
	
	//for level2
	removeNamedItemNS:function(namespaceURI,localName){
		var attr = this.getNamedItemNS(namespaceURI,localName);
		_removeNamedNode(this._ownerElement,this,attr);
		return attr;
	},
	getNamedItemNS: function(namespaceURI, localName) {
		var i = this.length;
		while(i--){
			var node = this[i];
			if(node.localName == localName && node.namespaceURI == namespaceURI){
				return node;
			}
		}
		return null;
	}
};
/**
 * @see http://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-102161490
 */
function DOMImplementation(/* Object */ features) {
	this._features = {};
	if (features) {
		for (var feature in features) {
			 this._features = features[feature];
		}
	}
};

DOMImplementation.prototype = {
	hasFeature: function(/* string */ feature, /* string */ version) {
		var versions = this._features[feature.toLowerCase()];
		if (versions && (!version || version in versions)) {
			return true;
		} else {
			return false;
		}
	},
	// Introduced in DOM Level 2:
	createDocument:function(namespaceURI,  qualifiedName, doctype){// raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR,WRONG_DOCUMENT_ERR
		var doc = new Document();
		doc.implementation = this;
		doc.childNodes = new NodeList();
		doc.doctype = doctype;
		if(doctype){
			doc.appendChild(doctype);
		}
		if(qualifiedName){
			var root = doc.createElementNS(namespaceURI,qualifiedName);
			doc.appendChild(root);
		}
		return doc;
	},
	// Introduced in DOM Level 2:
	createDocumentType:function(qualifiedName, publicId, systemId){// raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR
		var node = new DocumentType();
		node.name = qualifiedName;
		node.nodeName = qualifiedName;
		node.publicId = publicId;
		node.systemId = systemId;
		// Introduced in DOM Level 2:
		//readonly attribute DOMString        internalSubset;
		
		//TODO:..
		//  readonly attribute NamedNodeMap     entities;
		//  readonly attribute NamedNodeMap     notations;
		return node;
	}
};


/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247
 */

function Node() {
};

Node.prototype = {
	firstChild : null,
	lastChild : null,
	previousSibling : null,
	nextSibling : null,
	attributes : null,
	parentNode : null,
	childNodes : null,
	ownerDocument : null,
	nodeValue : null,
	namespaceURI : null,
	prefix : null,
	localName : null,
	// Modified in DOM Level 2:
	insertBefore:function(newChild, refChild){//raises 
		return _insertBefore(this,newChild,refChild);
	},
	replaceChild:function(newChild, oldChild){//raises 
		this.insertBefore(newChild,oldChild);
		if(oldChild){
			this.removeChild(oldChild);
		}
	},
	removeChild:function(oldChild){
		return _removeChild(this,oldChild);
	},
	appendChild:function(newChild){
		return this.insertBefore(newChild,null);
	},
	hasChildNodes:function(){
		return this.firstChild != null;
	},
	cloneNode:function(deep){
		return cloneNode(this.ownerDocument||this,this,deep);
	},
	// Modified in DOM Level 2:
	normalize:function(){
		var child = this.firstChild;
		while(child){
			var next = child.nextSibling;
			if(next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE){
				this.removeChild(next);
				child.appendData(next.data);
			}else{
				child.normalize();
				child = next;
			}
		}
	},
  	// Introduced in DOM Level 2:
	isSupported:function(feature, version){
		return this.ownerDocument.implementation.hasFeature(feature,version);
	},
    // Introduced in DOM Level 2:
    hasAttributes:function(){
    	return this.attributes.length>0;
    },
    lookupPrefix:function(namespaceURI){
    	var el = this;
    	while(el){
    		var map = el._nsMap;
    		//console.dir(map)
    		if(map){
    			for(var n in map){
    				if(map[n] == namespaceURI){
    					return n;
    				}
    			}
    		}
    		el = el.nodeType == ATTRIBUTE_NODE?el.ownerDocument : el.parentNode;
    	}
    	return null;
    },
    // Introduced in DOM Level 3:
    lookupNamespaceURI:function(prefix){
    	var el = this;
    	while(el){
    		var map = el._nsMap;
    		//console.dir(map)
    		if(map){
    			if(prefix in map){
    				return map[prefix] ;
    			}
    		}
    		el = el.nodeType == ATTRIBUTE_NODE?el.ownerDocument : el.parentNode;
    	}
    	return null;
    },
    // Introduced in DOM Level 3:
    isDefaultNamespace:function(namespaceURI){
    	var prefix = this.lookupPrefix(namespaceURI);
    	return prefix == null;
    }
};


function _xmlEncoder(c){
	return c == '<' && '&lt;' ||
         c == '>' && '&gt;' ||
         c == '&' && '&amp;' ||
         c == '"' && '&quot;' ||
         '&#'+c.charCodeAt()+';'
}


copy(NodeType,Node);
copy(NodeType,Node.prototype);

/**
 * @param callback return true for continue,false for break
 * @return boolean true: break visit;
 */
function _visitNode(node,callback){
	if(callback(node)){
		return true;
	}
	if(node = node.firstChild){
		do{
			if(_visitNode(node,callback)){return true}
        }while(node=node.nextSibling)
    }
}



function Document(){
}
function _onAddAttribute(doc,el,newAttr){
	doc && doc._inc++;
	var ns = newAttr.namespaceURI ;
	if(ns == 'http://www.w3.org/2000/xmlns/'){
		//update namespace
		el._nsMap[newAttr.prefix?newAttr.localName:''] = newAttr.value
	}
}
function _onRemoveAttribute(doc,el,newAttr,remove){
	doc && doc._inc++;
	var ns = newAttr.namespaceURI ;
	if(ns == 'http://www.w3.org/2000/xmlns/'){
		//update namespace
		delete el._nsMap[newAttr.prefix?newAttr.localName:'']
	}
}
function _onUpdateChild(doc,el,newChild){
	if(doc && doc._inc){
		doc._inc++;
		//update childNodes
		var cs = el.childNodes;
		if(newChild){
			cs[cs.length++] = newChild;
		}else{
			//console.log(1)
			var child = el.firstChild;
			var i = 0;
			while(child){
				cs[i++] = child;
				child =child.nextSibling;
			}
			cs.length = i;
		}
	}
}

/**
 * attributes;
 * children;
 * 
 * writeable properties:
 * nodeValue,Attr:value,CharacterData:data
 * prefix
 */
function _removeChild(parentNode,child){
	var previous = child.previousSibling;
	var next = child.nextSibling;
	if(previous){
		previous.nextSibling = next;
	}else{
		parentNode.firstChild = next
	}
	if(next){
		next.previousSibling = previous;
	}else{
		parentNode.lastChild = previous;
	}
	_onUpdateChild(parentNode.ownerDocument,parentNode);
	return child;
}
/**
 * preformance key(refChild == null)
 */
function _insertBefore(parentNode,newChild,nextChild){
	var cp = newChild.parentNode;
	if(cp){
		cp.removeChild(newChild);//remove and update
	}
	if(newChild.nodeType === DOCUMENT_FRAGMENT_NODE){
		var newFirst = newChild.firstChild;
		if (newFirst == null) {
			return newChild;
		}
		var newLast = newChild.lastChild;
	}else{
		newFirst = newLast = newChild;
	}
	var pre = nextChild ? nextChild.previousSibling : parentNode.lastChild;

	newFirst.previousSibling = pre;
	newLast.nextSibling = nextChild;
	
	
	if(pre){
		pre.nextSibling = newFirst;
	}else{
		parentNode.firstChild = newFirst;
	}
	if(nextChild == null){
		parentNode.lastChild = newLast;
	}else{
		nextChild.previousSibling = newLast;
	}
	do{
		newFirst.parentNode = parentNode;
	}while(newFirst !== newLast && (newFirst= newFirst.nextSibling))
	_onUpdateChild(parentNode.ownerDocument||parentNode,parentNode);
	//console.log(parentNode.lastChild.nextSibling == null)
	if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
		newChild.firstChild = newChild.lastChild = null;
	}
	return newChild;
}
function _appendSingleChild(parentNode,newChild){
	var cp = newChild.parentNode;
	if(cp){
		var pre = parentNode.lastChild;
		cp.removeChild(newChild);//remove and update
		var pre = parentNode.lastChild;
	}
	var pre = parentNode.lastChild;
	newChild.parentNode = parentNode;
	newChild.previousSibling = pre;
	newChild.nextSibling = null;
	if(pre){
		pre.nextSibling = newChild;
	}else{
		parentNode.firstChild = newChild;
	}
	parentNode.lastChild = newChild;
	_onUpdateChild(parentNode.ownerDocument,parentNode,newChild);
	return newChild;
	//console.log("__aa",parentNode.lastChild.nextSibling == null)
}
Document.prototype = {
	//implementation : null,
	nodeName :  '#document',
	nodeType :  DOCUMENT_NODE,
	doctype :  null,
	documentElement :  null,
	_inc : 1,
	
	insertBefore :  function(newChild, refChild){//raises 
		if(newChild.nodeType == DOCUMENT_FRAGMENT_NODE){
			var child = newChild.firstChild;
			while(child){
				var next = child.nextSibling;
				this.insertBefore(child,refChild);
				child = next;
			}
			return newChild;
		}
		if(this.documentElement == null && newChild.nodeType == ELEMENT_NODE){
			this.documentElement = newChild;
		}
		
		return _insertBefore(this,newChild,refChild),(newChild.ownerDocument = this),newChild;
	},
	removeChild :  function(oldChild){
		if(this.documentElement == oldChild){
			this.documentElement = null;
		}
		return _removeChild(this,oldChild);
	},
	// Introduced in DOM Level 2:
	importNode : function(importedNode,deep){
		return importNode(this,importedNode,deep);
	},
	// Introduced in DOM Level 2:
	getElementById :	function(id){
		var rtv = null;
		_visitNode(this.documentElement,function(node){
			if(node.nodeType == ELEMENT_NODE){
				if(node.getAttribute('id') == id){
					rtv = node;
					return true;
				}
			}
		})
		return rtv;
	},
	
	//document factory method:
	createElement :	function(tagName){
		var node = new Element();
		node.ownerDocument = this;
		node.nodeName = tagName;
		node.tagName = tagName;
		node.childNodes = new NodeList();
		var attrs	= node.attributes = new NamedNodeMap();
		attrs._ownerElement = node;
		return node;
	},
	createDocumentFragment :	function(){
		var node = new DocumentFragment();
		node.ownerDocument = this;
		node.childNodes = new NodeList();
		return node;
	},
	createTextNode :	function(data){
		var node = new Text();
		node.ownerDocument = this;
		node.appendData(data)
		return node;
	},
	createComment :	function(data){
		var node = new Comment();
		node.ownerDocument = this;
		node.appendData(data)
		return node;
	},
	createCDATASection :	function(data){
		var node = new CDATASection();
		node.ownerDocument = this;
		node.appendData(data)
		return node;
	},
	createProcessingInstruction :	function(target,data){
		var node = new ProcessingInstruction();
		node.ownerDocument = this;
		node.tagName = node.target = target;
		node.nodeValue= node.data = data;
		return node;
	},
	createAttribute :	function(name){
		var node = new Attr();
		node.ownerDocument	= this;
		node.name = name;
		node.nodeName	= name;
		node.localName = name;
		node.specified = true;
		return node;
	},
	createEntityReference :	function(name){
		var node = new EntityReference();
		node.ownerDocument	= this;
		node.nodeName	= name;
		return node;
	},
	// Introduced in DOM Level 2:
	createElementNS :	function(namespaceURI,qualifiedName){
		var node = new Element();
		var pl = qualifiedName.split(':');
		var attrs	= node.attributes = new NamedNodeMap();
		node.childNodes = new NodeList();
		node.ownerDocument = this;
		node.nodeName = qualifiedName;
		node.tagName = qualifiedName;
		node.namespaceURI = namespaceURI;
		if(pl.length == 2){
			node.prefix = pl[0];
			node.localName = pl[1];
		}else{
			//el.prefix = null;
			node.localName = qualifiedName;
		}
		attrs._ownerElement = node;
		return node;
	},
	// Introduced in DOM Level 2:
	createAttributeNS :	function(namespaceURI,qualifiedName){
		var node = new Attr();
		var pl = qualifiedName.split(':');
		node.ownerDocument = this;
		node.nodeName = qualifiedName;
		node.name = qualifiedName;
		node.namespaceURI = namespaceURI;
		node.specified = true;
		if(pl.length == 2){
			node.prefix = pl[0];
			node.localName = pl[1];
		}else{
			//el.prefix = null;
			node.localName = qualifiedName;
		}
		return node;
	}
};
_extends(Document,Node);


function Element() {
	this._nsMap = {};
};
Element.prototype = {
	nodeType : ELEMENT_NODE,
	hasAttribute : function(name){
		return this.getAttributeNode(name)!=null;
	},
	getAttribute : function(name){
		var attr = this.getAttributeNode(name);
		return attr && attr.value || '';
	},
	getAttributeNode : function(name){
		return this.attributes.getNamedItem(name);
	},
	setAttribute : function(name, value){
		var attr = this.ownerDocument.createAttribute(name);
		attr.value = attr.nodeValue = "" + value;
		this.setAttributeNode(attr)
	},
	removeAttribute : function(name){
		var attr = this.getAttributeNode(name)
		attr && this.removeAttributeNode(attr);
	},
	
	//four real opeartion method
	appendChild:function(newChild){
		if(newChild.nodeType === DOCUMENT_FRAGMENT_NODE){
			return this.insertBefore(newChild,null);
		}else{
			return _appendSingleChild(this,newChild);
		}
	},
	setAttributeNode : function(newAttr){
		return this.attributes.setNamedItem(newAttr);
	},
	setAttributeNodeNS : function(newAttr){
		return this.attributes.setNamedItemNS(newAttr);
	},
	removeAttributeNode : function(oldAttr){
		//console.log(this == oldAttr.ownerElement)
		return this.attributes.removeNamedItem(oldAttr.nodeName);
	},
	//get real attribute name,and remove it by removeAttributeNode
	removeAttributeNS : function(namespaceURI, localName){
		var old = this.getAttributeNodeNS(namespaceURI, localName);
		old && this.removeAttributeNode(old);
	},
	
	hasAttributeNS : function(namespaceURI, localName){
		return this.getAttributeNodeNS(namespaceURI, localName)!=null;
	},
	getAttributeNS : function(namespaceURI, localName){
		var attr = this.getAttributeNodeNS(namespaceURI, localName);
		return attr && attr.value || '';
	},
	setAttributeNS : function(namespaceURI, qualifiedName, value){
		var attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
		attr.value = attr.nodeValue = "" + value;
		this.setAttributeNode(attr)
	},
	getAttributeNodeNS : function(namespaceURI, localName){
		return this.attributes.getNamedItemNS(namespaceURI, localName);
	},
	
	getElementsByTagName : function(tagName){
		return new LiveNodeList(this,function(base){
			var ls = [];
			_visitNode(base,function(node){
				if(node !== base && node.nodeType == ELEMENT_NODE && (tagName === '*' || node.tagName == tagName)){
					ls.push(node);
				}
			});
			return ls;
		});
	},
	getElementsByTagNameNS : function(namespaceURI, localName){
		return new LiveNodeList(this,function(base){
			var ls = [];
			_visitNode(base,function(node){
				if(node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === '*' || node.namespaceURI === namespaceURI) && (localName === '*' || node.localName == localName)){
					ls.push(node);
				}
			});
			return ls;
			
		});
	}
};
Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;


_extends(Element,Node);
function Attr() {
};
Attr.prototype.nodeType = ATTRIBUTE_NODE;
_extends(Attr,Node);


function CharacterData() {
};
CharacterData.prototype = {
	data : '',
	substringData : function(offset, count) {
		return this.data.substring(offset, offset+count);
	},
	appendData: function(text) {
		text = this.data+text;
		this.nodeValue = this.data = text;
		this.length = text.length;
	},
	insertData: function(offset,text) {
		this.replaceData(offset,0,text);
	
	},
	appendChild:function(newChild){
		throw new Error(ExceptionMessage[HIERARCHY_REQUEST_ERR])
	},
	deleteData: function(offset, count) {
		this.replaceData(offset,count,"");
	},
	replaceData: function(offset, count, text) {
		var start = this.data.substring(0,offset);
		var end = this.data.substring(offset+count);
		text = start + text + end;
		this.nodeValue = this.data = text;
		this.length = text.length;
	}
}
_extends(CharacterData,Node);
function Text() {
};
Text.prototype = {
	nodeName : "#text",
	nodeType : TEXT_NODE,
	splitText : function(offset) {
		var text = this.data;
		var newText = text.substring(offset);
		text = text.substring(0, offset);
		this.data = this.nodeValue = text;
		this.length = text.length;
		var newNode = this.ownerDocument.createTextNode(newText);
		if(this.parentNode){
			this.parentNode.insertBefore(newNode, this.nextSibling);
		}
		return newNode;
	}
}
_extends(Text,CharacterData);
function Comment() {
};
Comment.prototype = {
	nodeName : "#comment",
	nodeType : COMMENT_NODE
}
_extends(Comment,CharacterData);

function CDATASection() {
};
CDATASection.prototype = {
	nodeName : "#cdata-section",
	nodeType : CDATA_SECTION_NODE
}
_extends(CDATASection,CharacterData);


function DocumentType() {
};
DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
_extends(DocumentType,Node);

function Notation() {
};
Notation.prototype.nodeType = NOTATION_NODE;
_extends(Notation,Node);

function Entity() {
};
Entity.prototype.nodeType = ENTITY_NODE;
_extends(Entity,Node);

function EntityReference() {
};
EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
_extends(EntityReference,Node);

function DocumentFragment() {
};
DocumentFragment.prototype.nodeName =	"#document-fragment";
DocumentFragment.prototype.nodeType =	DOCUMENT_FRAGMENT_NODE;
_extends(DocumentFragment,Node);


function ProcessingInstruction() {
}
ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
_extends(ProcessingInstruction,Node);
function XMLSerializer(){}
XMLSerializer.prototype.serializeToString = function(node,isHtml,nodeFilter){
	return nodeSerializeToString.call(node,isHtml,nodeFilter);
}
Node.prototype.toString = nodeSerializeToString;
function nodeSerializeToString(isHtml,nodeFilter){
	var buf = [];
	var refNode = this.nodeType == 9?this.documentElement:this;
	var prefix = refNode.prefix;
	var uri = refNode.namespaceURI;
	
	if(uri && prefix == null){
		//console.log(prefix)
		var prefix = refNode.lookupPrefix(uri);
		if(prefix == null){
			//isHTML = true;
			var visibleNamespaces=[
			{namespace:uri,prefix:null}
			//{namespace:uri,prefix:''}
			]
		}
	}
	serializeToString(this,buf,isHtml,nodeFilter,visibleNamespaces);
	//console.log('###',this.nodeType,uri,prefix,buf.join(''))
	return buf.join('');
}
function needNamespaceDefine(node,isHTML, visibleNamespaces) {
	var prefix = node.prefix||'';
	var uri = node.namespaceURI;
	if (!prefix && !uri){
		return false;
	}
	if (prefix === "xml" && uri === "http://www.w3.org/XML/1998/namespace" 
		|| uri == 'http://www.w3.org/2000/xmlns/'){
		return false;
	}
	
	var i = visibleNamespaces.length 
	//console.log('@@@@',node.tagName,prefix,uri,visibleNamespaces)
	while (i--) {
		var ns = visibleNamespaces[i];
		// get namespace prefix
		//console.log(node.nodeType,node.tagName,ns.prefix,prefix)
		if (ns.prefix == prefix){
			return ns.namespace != uri;
		}
	}
	//console.log(isHTML,uri,prefix=='')
	//if(isHTML && prefix ==null && uri == 'http://www.w3.org/1999/xhtml'){
	//	return false;
	//}
	//node.flag = '11111'
	//console.error(3,true,node.flag,node.prefix,node.namespaceURI)
	return true;
}
function serializeToString(node,buf,isHTML,nodeFilter,visibleNamespaces){
	if(nodeFilter){
		node = nodeFilter(node);
		if(node){
			if(typeof node == 'string'){
				buf.push(node);
				return;
			}
		}else{
			return;
		}
		//buf.sort.apply(attrs, attributeSorter);
	}
	switch(node.nodeType){
	case ELEMENT_NODE:
		if (!visibleNamespaces) visibleNamespaces = [];
		var startVisibleNamespaces = visibleNamespaces.length;
		var attrs = node.attributes;
		var len = attrs.length;
		var child = node.firstChild;
		var nodeName = node.tagName;
		
		isHTML =  (htmlns === node.namespaceURI) ||isHTML 
		buf.push('<',nodeName);
		
		
		
		for(var i=0;i<len;i++){
			// add namespaces for attributes
			var attr = attrs.item(i);
			if (attr.prefix == 'xmlns') {
				visibleNamespaces.push({ prefix: attr.localName, namespace: attr.value });
			}else if(attr.nodeName == 'xmlns'){
				visibleNamespaces.push({ prefix: '', namespace: attr.value });
			}
		}
		for(var i=0;i<len;i++){
			var attr = attrs.item(i);
			if (needNamespaceDefine(attr,isHTML, visibleNamespaces)) {
				var prefix = attr.prefix||'';
				var uri = attr.namespaceURI;
				var ns = prefix ? ' xmlns:' + prefix : " xmlns";
				buf.push(ns, '="' , uri , '"');
				visibleNamespaces.push({ prefix: prefix, namespace:uri });
			}
			serializeToString(attr,buf,isHTML,nodeFilter,visibleNamespaces);
		}
		// add namespace for current node		
		if (needNamespaceDefine(node,isHTML, visibleNamespaces)) {
			var prefix = node.prefix||'';
			var uri = node.namespaceURI;
			var ns = prefix ? ' xmlns:' + prefix : " xmlns";
			buf.push(ns, '="' , uri , '"');
			visibleNamespaces.push({ prefix: prefix, namespace:uri });
		}
		
		if(child || isHTML && !/^(?:meta|link|img|br|hr|input)$/i.test(nodeName)){
			buf.push('>');
			//if is cdata child node
			if(isHTML && /^script$/i.test(nodeName)){
				while(child){
					if(child.data){
						buf.push(child.data);
					}else{
						serializeToString(child,buf,isHTML,nodeFilter,visibleNamespaces);
					}
					child = child.nextSibling;
				}
			}else
			{
				while(child){
					serializeToString(child,buf,isHTML,nodeFilter,visibleNamespaces);
					child = child.nextSibling;
				}
			}
			buf.push('</',nodeName,'>');
		}else{
			buf.push('/>');
		}
		// remove added visible namespaces
		//visibleNamespaces.length = startVisibleNamespaces;
		return;
	case DOCUMENT_NODE:
	case DOCUMENT_FRAGMENT_NODE:
		var child = node.firstChild;
		while(child){
			serializeToString(child,buf,isHTML,nodeFilter,visibleNamespaces);
			child = child.nextSibling;
		}
		return;
	case ATTRIBUTE_NODE:
		return buf.push(' ',node.name,'="',node.value.replace(/[<&"]/g,_xmlEncoder),'"');
	case TEXT_NODE:
		return buf.push(node.data.replace(/[<&]/g,_xmlEncoder));
	case CDATA_SECTION_NODE:
		return buf.push( '<![CDATA[',node.data,']]>');
	case COMMENT_NODE:
		return buf.push( "<!--",node.data,"-->");
	case DOCUMENT_TYPE_NODE:
		var pubid = node.publicId;
		var sysid = node.systemId;
		buf.push('<!DOCTYPE ',node.name);
		if(pubid){
			buf.push(' PUBLIC "',pubid);
			if (sysid && sysid!='.') {
				buf.push( '" "',sysid);
			}
			buf.push('">');
		}else if(sysid && sysid!='.'){
			buf.push(' SYSTEM "',sysid,'">');
		}else{
			var sub = node.internalSubset;
			if(sub){
				buf.push(" [",sub,"]");
			}
			buf.push(">");
		}
		return;
	case PROCESSING_INSTRUCTION_NODE:
		return buf.push( "<?",node.target," ",node.data,"?>");
	case ENTITY_REFERENCE_NODE:
		return buf.push( '&',node.nodeName,';');
	//case ENTITY_NODE:
	//case NOTATION_NODE:
	default:
		buf.push('??',node.nodeName);
	}
}
function importNode(doc,node,deep){
	var node2;
	switch (node.nodeType) {
	case ELEMENT_NODE:
		node2 = node.cloneNode(false);
		node2.ownerDocument = doc;
		//var attrs = node2.attributes;
		//var len = attrs.length;
		//for(var i=0;i<len;i++){
			//node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));
		//}
	case DOCUMENT_FRAGMENT_NODE:
		break;
	case ATTRIBUTE_NODE:
		deep = true;
		break;
	//case ENTITY_REFERENCE_NODE:
	//case PROCESSING_INSTRUCTION_NODE:
	////case TEXT_NODE:
	//case CDATA_SECTION_NODE:
	//case COMMENT_NODE:
	//	deep = false;
	//	break;
	//case DOCUMENT_NODE:
	//case DOCUMENT_TYPE_NODE:
	//cannot be imported.
	//case ENTITY_NODE:
	//case NOTATION_NODE：
	//can not hit in level3
	//default:throw e;
	}
	if(!node2){
		node2 = node.cloneNode(false);//false
	}
	node2.ownerDocument = doc;
	node2.parentNode = null;
	if(deep){
		var child = node.firstChild;
		while(child){
			node2.appendChild(importNode(doc,child,deep));
			child = child.nextSibling;
		}
	}
	return node2;
}
//
//var _relationMap = {firstChild:1,lastChild:1,previousSibling:1,nextSibling:1,
//					attributes:1,childNodes:1,parentNode:1,documentElement:1,doctype,};
function cloneNode(doc,node,deep){
	var node2 = new node.constructor();
	for(var n in node){
		var v = node[n];
		if(typeof v != 'object' ){
			if(v != node2[n]){
				node2[n] = v;
			}
		}
	}
	if(node.childNodes){
		node2.childNodes = new NodeList();
	}
	node2.ownerDocument = doc;
	switch (node2.nodeType) {
	case ELEMENT_NODE:
		var attrs	= node.attributes;
		var attrs2	= node2.attributes = new NamedNodeMap();
		var len = attrs.length
		attrs2._ownerElement = node2;
		for(var i=0;i<len;i++){
			node2.setAttributeNode(cloneNode(doc,attrs.item(i),true));
		}
		break;;
	case ATTRIBUTE_NODE:
		deep = true;
	}
	if(deep){
		var child = node.firstChild;
		while(child){
			node2.appendChild(cloneNode(doc,child,deep));
			child = child.nextSibling;
		}
	}
	return node2;
}

function __set__(object,key,value){
	object[key] = value
}
//do dynamic
try{
	if(Object.defineProperty){
		Object.defineProperty(LiveNodeList.prototype,'length',{
			get:function(){
				_updateLiveList(this);
				return this.$$length;
			}
		});
		Object.defineProperty(Node.prototype,'textContent',{
			get:function(){
				return getTextContent(this);
			},
			set:function(data){
				switch(this.nodeType){
				case ELEMENT_NODE:
				case DOCUMENT_FRAGMENT_NODE:
					while(this.firstChild){
						this.removeChild(this.firstChild);
					}
					if(data || String(data)){
						this.appendChild(this.ownerDocument.createTextNode(data));
					}
					break;
				default:
					//TODO:
					this.data = data;
					this.value = data;
					this.nodeValue = data;
				}
			}
		})
		
		function getTextContent(node){
			switch(node.nodeType){
			case ELEMENT_NODE:
			case DOCUMENT_FRAGMENT_NODE:
				var buf = [];
				node = node.firstChild;
				while(node){
					if(node.nodeType!==7 && node.nodeType !==8){
						buf.push(getTextContent(node));
					}
					node = node.nextSibling;
				}
				return buf.join('');
			default:
				return node.nodeValue;
			}
		}
		__set__ = function(object,key,value){
			//console.log(value)
			object['$$'+key] = value
		}
	}
}catch(e){//ie8
}

//if(typeof require == 'function'){
	exports.DOMImplementation = DOMImplementation;
	exports.XMLSerializer = XMLSerializer;
//}


/***/ }),
/* 41 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 41;

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = require("zlib");

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview ROSLIB Node exclusive extensions 
 */
var assign = __webpack_require__(1);

module.exports = assign(__webpack_require__(51), {
  Ros: __webpack_require__(57),
  Topic: __webpack_require__(58)
});

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

const ROSLIB = __webpack_require__(46);
const { ipcMain } =require('electron')
const { wom } =require('maxwhere')
const fs = __webpack_require__(4);
// var ipcMain
var nextID = 0;
var robots = [];
var showJointController = false;
var debugController = false;
var debugJointController = false;
var autoLoad = false;
var showController = false;
// var wom
class MxwRobot {
  constructor(options, id) {
    this.ROS_IP = options.ROS_IP;
    this.BaseLink = options.BaseLink || 'base_link';
    this.rate = options.rate || 60;
    this.position = options.position || { x: 0, y: 0, z: 0 };
    this.scale = options.scale || 1;
    this.zoom = options.zoom || 1;
    this.id = id;
    console.log('robot 1');
    this.parent = (() => {
      var dummy_6731a4b6_4ad6_4679_9ab2_97b83745c232 = args => {
        return jsxFactory(args.elementName, args.attributes, args.children);
      };

      return dummy_6731a4b6_4ad6_4679_9ab2_97b83745c232({
        elementName: 'node',
        attributes: {
          position: this.position,
          orientation: { w: 0.707, x: -0.707, y: 0, z: 0 },
          scale: this.scale
        },
        children: null
      });
    })();
    console.log('robot 2');
    this.ros = new ROSLIB.Ros({
      url: 'ws://' + this.ROS_IP
    });
    console.log('robot 3');
    var robot = this;
    console.log('robot 4');
    this.ros.on('connection', function () {
      console.log('Connected to websocket server.' + options.ROS_IP);
      ControlerLog(id, 'Connected to websocket server.' + options.ROS_IP);
      robot.LoadRos();
    });
    this.ros.on('error', function (error) {
      console.log('Error connecting to websocket server: ', error);
      ControlerLog(id, 'Error!: ' + error);
      robot.ros.close();
      delete robots[this.id];
    });

    this.ros.on('close', function () {
      console.log('Connection to websocket server closed.');
      ControlerLog(id, 'Connection to websocket server closed.');
      delete this.robot;
    });
  }
  delete() {
    try {
      this.parent.hide();
    } catch (err) {
      console.log(err);
    }
    try {
      wom.getNodeById('jointnode' + this.id).hide();
    } catch (err) {
      console.log(err);
    }
  }

  LoadRos() {
    var robot = this;
    var links = [];
    var param = new ROSLIB.Param({
      ros: this.ros,
      name: 'robot_description'
    });
    if (!param) {
      param = new ROSLIB.Param({
        ros: this.ros,
        name: '/robot_description'
      });
    }

    param.get(function (param) {
      var urdfModel = new ROSLIB.UrdfModel({
        string: param
      });

      for (var l in urdfModel.links) {
        var link = urdfModel.links[l];
        var visual = link.visuals[0];
        if (visual && visual.geometry) {
          var origin = visual.origin.position;
          var originxyz = origin.x + ' ' + origin.y + ' ' + origin.z;
          switch (visual.geometry.type) {
            case ROSLIB.URDF_BOX:
              links[l] = (() => {
                var dummy_6731a4b6_4ad6_4679_9ab2_97b83745c232 = args => {
                  return jsxFactory(args.elementName, args.attributes, args.children);
                };

                return dummy_6731a4b6_4ad6_4679_9ab2_97b83745c232({
                  elementName: 'mesh',
                  attributes: {
                    originxyz: originxyz,
                    url: 'N_Aux_Cube.mesh'
                  },
                  children: null
                });
              })();
              break;
            case ROSLIB.URDF_CYLINDER:
              links[l] = (() => {
                var dummy_6731a4b6_4ad6_4679_9ab2_97b83745c232 = args => {
                  return jsxFactory(args.elementName, args.attributes, args.children);
                };

                return dummy_6731a4b6_4ad6_4679_9ab2_97b83745c232({
                  elementName: 'mesh',
                  attributes: {
                    originxyz: originxyz,
                    url: 'N_Cylinder.mesh'
                  },
                  children: null
                });
              })();
              break;
            case ROSLIB.URDF_SPHERE:
              links[l] = (() => {
                var dummy_6731a4b6_4ad6_4679_9ab2_97b83745c232 = args => {
                  return jsxFactory(args.elementName, args.attributes, args.children);
                };

                return dummy_6731a4b6_4ad6_4679_9ab2_97b83745c232({
                  elementName: 'mesh',
                  attributes: {
                    originxyz: originxyz,
                    url: 'N_Sphere.mesh'
                  },
                  children: null
                });
              })();
              break;
            default:
              var file = visual.geometry.filename.split('/');
              var originalMesh = file[file.length - 1].split('.');
              var mesh = urdfModel.name + '/' + originalMesh[0] + '.mesh';
              if (!fs.existsSync(`${__dirname}/resources/` + mesh)) {
                console.log('Mesh unavailable ' + mesh + ' Please place it into the resource folder of the component');
                ControlerLog(robot.id, 'Mesh unavailable ' + mesh + ' Please place it into the resource folder of the component');
              } else {
                links[l] = (() => {
                  var dummy_6731a4b6_4ad6_4679_9ab2_97b83745c232 = args => {
                    return jsxFactory(args.elementName, args.attributes, args.children);
                  };

                  return dummy_6731a4b6_4ad6_4679_9ab2_97b83745c232({
                    elementName: 'mesh',
                    attributes: {
                      originxyz: originxyz,
                      url: mesh
                    },
                    children: null
                  });
                })();
                break;
              }
          }
        }
      }

      // joints
      for (var j in urdfModel.joints) {
        var joint = urdfModel.joints[j];

        if (joint.parent === robot.BaseLink && links[joint.parent]) {
          robot.parent.add(links[joint.parent]);
        }

        if (joint.parent === robot.BaseLink && !links[joint.parent] && links[joint.child]) {
          robot.parent.add(links[joint.child]);
        } else {
          if (links[joint.parent] && links[joint.child]) {
            links[joint.parent].add(links[joint.child]);
          }
        }
      }
      wom.render(robot.parent);
      var tf2Client = new ROSLIB.Topic({
        ros: robot.ros,
        name: '/tf',
        messageType: 'tf2_msgs/TFMessage'

      });
      tf2Client.subscribe(function (message) {
        for (var i = 0; i < message.transforms.length; i++) {
          if (message.transforms[i]) {
            var tf = message.transforms[i].transform;
            var child = message.transforms[i].child_frame_id;
            if (child && tf.translation && links[child]) {
              corrigate(tf.translation, tf.rotation, links[child], links[child].props.originxyz, robot.zoom);
              links[child].setOrientation(tf.rotation.w, tf.rotation.x, tf.rotation.y, tf.rotation.z, 'absolute', 'parent');
            }
          }
        }
      });
      if (showJointController) {
        createJointController(robot);
      }
    });
  }
}
module.exports = {
  resources: `${__dirname}/resources`,
  init() {
    console.log('inti...');
  },
  done(r) {
    console.log('done...');
  },
  render(options) {
    console.log('render...');

    var settings = JSON.parse(fs.readFileSync(`${__dirname}/resources/` + options.file));
    /* var settings = {'auto_load': 1,
      'show_controller': 1,
      'show_joint_controller': 1,
      'debug_controller': 0,
      'debug_joint_controller': 0,
      'robots': [
    {'ROS_IP': '127.0.0.1:9090', 'position': { 'x': 100, 'y': 0, 'z': 0 }, 'rate': 60, 'BaseLink': 'base_link', 'zoom': 100, 'scale': 1}
      ]
    } */
    console.log('1');
    /* wom = options.mxwWom
    ipcMain = options.mxwApp */
    autoLoad = settings.auto_load;
    showController = settings.show_controller;
    console.log('2');
    showJointController = settings.show_joint_controller;
    debugController = settings.debug_controller;
    debugJointController = settings.debug_joint_controller;
    console.log('3');
    settings.robots.forEach(function (element) {
      console.log('4');
      var options = element;
      console.log('41');
      var id = nextID;
      console.log('42');
      nextID++;
      console.log('43');
      if (showController) {
        createController(id, options);
      }
      console.log('44');
      if (autoLoad) {
        robots[id] = new MxwRobot(options, id);
      }
    }, this);
    console.log('5');
    return (() => {
      var dummy_6731a4b6_4ad6_4679_9ab2_97b83745c232 = args => {
        return jsxFactory(args.elementName, args.attributes, args.children);
      };

      return dummy_6731a4b6_4ad6_4679_9ab2_97b83745c232({
        elementName: 'node',
        attributes: {},
        children: null
      });
    })();
  }
};
function createController(id, options) {
  console.log('createing controller 1');
  var url = `${__dirname}/resources/control.html?id=` + id + '&ip=' + options.ROS_IP;
  // var url = `http://ros.nemespc.hu/control.html?id=` + id + '&ip=' + options.ROS_IP
  console.log('creating controller 2');
  wom.render((() => {
    var dummy_6731a4b6_4ad6_4679_9ab2_97b83745c232 = args => {
      return jsxFactory(args.elementName, args.attributes, args.children);
    };

    return dummy_6731a4b6_4ad6_4679_9ab2_97b83745c232({
      elementName: 'node',
      attributes: {},
      children: null
    });
  })());
  console.log('creating cntoler 21');
  wom.render((() => {
    var dummy_6731a4b6_4ad6_4679_9ab2_97b83745c232 = args => {
      return jsxFactory(args.elementName, args.attributes, args.children);
    };

    return dummy_6731a4b6_4ad6_4679_9ab2_97b83745c232({
      elementName: 'node',
      attributes: {
        id: 'controlnode' + id,
        position: { x: parseInt(options.position.x) - 20, y: parseInt(options.position.y) + 50, z: parseInt(options.position.z) + 100 },
        scale: { x: 0.03, y: 0.03, z: 0.03 },
        orientation: { w: 0.924, x: -0.383, y: 0, z: 0 }
      },
      children: [dummy_6731a4b6_4ad6_4679_9ab2_97b83745c232({
        elementName: 'browser',
        attributes: {
          id: 'control' + id,
          url: url,
          nodeIntegration: true, 
 pdf: false,
          done: b => {
            if (debugController) {
              if (b.webview && id === 1) {
                b.nativeRender.browserWindow.webContents.openDevTools({ detach: true });
              }
            }
          }
        },
        children: null
      })]
    });
  })());
  console.log('creating controller 3');
  ipcMain.on('asynchronous-message', (event, arg) => {
    if (arg === 'ready') {
      ControlerSendOptions(id, options);
    }
    var command = arg.split('||');
    if (command[0] == id && command[1] == 'connect' && !robots[id]) {
      options.ROS_IP = command[2];
      options.BaseLink = command[3];
      options.position = { x: parseFloat(command[4]), y: parseFloat(command[5]), z: parseFloat(command[6]) };
      options.rate = parseInt(command[7]);
      options.scale = parseInt(command[8]);
      options.zoom = parseInt(command[9]);
      robots[id] = new MxwRobot(options, id);
      ControlerLog(id, 'Connecting...');
    }
    if (command[0] == id && command[1] == 'disconnect' && robots[id]) {
      robots[id].delete();
      delete robots[id];
      ControlerLog(id, 'Disconnecting...');
    }
    if (command[0] == id && command[1] == 'move') {
      var browsernode = wom.getNodeById('controlnode' + id);
      browsernode.setPosition(parseFloat(command[2]), parseFloat(command[3]) + 50, parseFloat(command[4]) + 100);
    }
  });
}
function createJointController(robot) {
  var jointurl = `${__dirname}/resources/joint_controller.html?id=` + robot.id + '&ip=' + robot.ROS_IP;
  // var jointurl = `http://ros.nemespc.hu/joint_controller.html?id=` + robot.id + '&ip=' + robot.ROS_IP
  robot.parent.render((() => {
    var dummy_6731a4b6_4ad6_4679_9ab2_97b83745c232 = args => {
      return jsxFactory(args.elementName, args.attributes, args.children);
    };

    return dummy_6731a4b6_4ad6_4679_9ab2_97b83745c232({
      elementName: 'node',
      attributes: {
        id: 'jointnode' + robot.id,
        done: b => {
          b.show();
          b.setPosition(parseInt(robot.position.x) + 20, parseInt(robot.position.y) + 50, parseInt(robot.position.z) + 100, 'absolute', 'world');
          b.setOrientation(0.924, -0.383, 0, 0, 'absolute', 'world');
          b.setScale(0.03 / robot.scale, 0.03 / robot.scale, 0.03 / robot.scale);
        }
      },
      children: [dummy_6731a4b6_4ad6_4679_9ab2_97b83745c232({
        elementName: 'browser',
        attributes: {
          id: 'jointcontrol' + robot.id,
          url: jointurl,
          pdf: false,
          done: b => {
            if (debugJointController) if (b.webview && robot.id === 1) {
              b.nativeRender.browserWindow.webContents.openDevTools({ detach: true });
            }
          }
        },
        children: null
      })]
    });
  })());
}

function ControlerSendOptions(id, options) {
  var browser = wom.getNodeById('control' + id);
  browser.webview.browserWindow.webContents.send('main-message', { ROS_IP: options.ROS_IP, position: { x: options.position.x, y: options.position.y, z: options.position.z }, BaseLink: options.BaseLink, zoom: options.zoom, scale: options.scale });
}
function ControlerLog(id, message) {
  var browser = wom.getNodeById('control' + id);
  if (browser) {
    browser.webview.browserWindow.webContents.send('main-message', 'log||' + message);
  }
}

function corrigate(tfposition, rotation, n, pos, zoom) {
  var CorrX = Number(pos.split(' ')[0]);
  var CorrY = Number(pos.split(' ')[1]);
  var CorrZ = Number(pos.split(' ')[2]);

  var ix = rotation.w * CorrX + rotation.y * CorrZ - rotation.z * CorrY;
  var iy = rotation.w * CorrY + rotation.z * CorrX - rotation.x * CorrZ;
  var iz = rotation.w * CorrZ + rotation.x * CorrY - rotation.y * CorrX;
  var iw = -rotation.x * CorrX - rotation.y * CorrY - rotation.z * CorrZ;

  var tempx = ix * rotation.w + iw * -rotation.x + iy * -rotation.z - iz * -rotation.y;
  var tempy = iy * rotation.w + iw * -rotation.y + iz * -rotation.x - ix * -rotation.z;
  var tempz = iz * rotation.w + iw * -rotation.z + ix * -rotation.y - iy * -rotation.x;

  var newPosX = tempx + tfposition.x;
  var newPosY = tempy + tfposition.y;
  var newPosZ = tempz + tfposition.z;

  n.setPosition(newPosX * zoom, newPosY * zoom, newPosZ * zoom, 'absolute', 'parent');
}

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__filename) {
/**
 * Module dependencies.
 */

var fs = __webpack_require__(4)
  , path = __webpack_require__(43)
  , join = path.join
  , dirname = path.dirname
  , exists = fs.existsSync || path.existsSync
  , defaults = {
        arrow: process.env.NODE_BINDINGS_ARROW || ' → '
      , compiled: process.env.NODE_BINDINGS_COMPILED_DIR || 'compiled'
      , platform: process.platform
      , arch: process.arch
      , version: process.versions.node
      , bindings: 'bindings.node'
      , try: [
          // node-gyp's linked version in the "build" dir
          [ 'module_root', 'build', 'bindings' ]
          // node-waf and gyp_addon (a.k.a node-gyp)
        , [ 'module_root', 'build', 'Debug', 'bindings' ]
        , [ 'module_root', 'build', 'Release', 'bindings' ]
          // Debug files, for development (legacy behavior, remove for node v0.9)
        , [ 'module_root', 'out', 'Debug', 'bindings' ]
        , [ 'module_root', 'Debug', 'bindings' ]
          // Release files, but manually compiled (legacy behavior, remove for node v0.9)
        , [ 'module_root', 'out', 'Release', 'bindings' ]
        , [ 'module_root', 'Release', 'bindings' ]
          // Legacy from node-waf, node <= 0.4.x
        , [ 'module_root', 'build', 'default', 'bindings' ]
          // Production "Release" buildtype binary (meh...)
        , [ 'module_root', 'compiled', 'version', 'platform', 'arch', 'bindings' ]
        ]
    }

/**
 * The main `bindings()` function loads the compiled bindings for a given module.
 * It uses V8's Error API to determine the parent filename that this function is
 * being invoked from, which is then used to find the root directory.
 */

function bindings (opts) {

  // Argument surgery
  if (typeof opts == 'string') {
    opts = { bindings: opts }
  } else if (!opts) {
    opts = {}
  }
  opts.__proto__ = defaults

  // Get the module root
  if (!opts.module_root) {
    opts.module_root = exports.getRoot(exports.getFileName())
  }

  // Ensure the given bindings name ends with .node
  if (path.extname(opts.bindings) != '.node') {
    opts.bindings += '.node'
  }

  var tries = []
    , i = 0
    , l = opts.try.length
    , n
    , b
    , err

  for (; i<l; i++) {
    n = join.apply(null, opts.try[i].map(function (p) {
      return opts[p] || p
    }))
    tries.push(n)
    try {
      b = opts.path ? /*require.resolve*/(!(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())) : !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())
      if (!opts.path) {
        b.path = n
      }
      return b
    } catch (e) {
      if (!/not find/i.test(e.message)) {
        throw e
      }
    }
  }

  err = new Error('Could not locate the bindings file. Tried:\n'
    + tries.map(function (a) { return opts.arrow + a }).join('\n'))
  err.tries = tries
  throw err
}
module.exports = exports = bindings


/**
 * Gets the filename of the JavaScript file that invokes this function.
 * Used to help find the root directory of a module.
 * Optionally accepts an filename argument to skip when searching for the invoking filename
 */

exports.getFileName = function getFileName (calling_file) {
  var origPST = Error.prepareStackTrace
    , origSTL = Error.stackTraceLimit
    , dummy = {}
    , fileName

  Error.stackTraceLimit = 10

  Error.prepareStackTrace = function (e, st) {
    for (var i=0, l=st.length; i<l; i++) {
      fileName = st[i].getFileName()
      if (fileName !== __filename) {
        if (calling_file) {
            if (fileName !== calling_file) {
              return
            }
        } else {
          return
        }
      }
    }
  }

  // run the 'prepareStackTrace' function above
  Error.captureStackTrace(dummy)
  dummy.stack

  // cleanup
  Error.prepareStackTrace = origPST
  Error.stackTraceLimit = origSTL

  return fileName
}

/**
 * Gets the root directory of a module, given an arbitrary filename
 * somewhere in the module tree. The "root directory" is the directory
 * containing the `package.json` file.
 *
 *   In:  /home/nate/node-native-module/lib/index.js
 *   Out: /home/nate/node-native-module
 */

exports.getRoot = function getRoot (file) {
  var dir = dirname(file)
    , prev
  while (true) {
    if (dir === '.') {
      // Avoids an infinite loop in rare cases, like the REPL
      dir = process.cwd()
    }
    if (exists(join(dir, 'package.json')) || exists(join(dir, 'node_modules'))) {
      // Found the 'package.json' file or 'node_modules' dir; we're done
      return dir
    }
    if (prev === dir) {
      // Got to the top
      throw new Error('Could not find module root given file: "' + file
                    + '". Do you have a `package.json` file? ')
    }
    // Try the parent dir next
    prev = dir
    dir = join(dir, '..')
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, "/index.js"))

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var fs     = __webpack_require__(4),
    stream = __webpack_require__(17),
    zlib   = __webpack_require__(45),
    HEADER = new Buffer("89504e470d0a1a0a", "hex")

function ImageData(width, height, channels, data, trailer) {
  this.width    = width;
  this.height   = height;
  this.channels = channels;
  this.data     = data;
  this.trailer  = trailer;
}

ImageData.prototype.getPixel = function(x, y) {
  x = x|0;
  y = y|0;

  if(x < 0 || y < 0 || x >= this.width || y >= this.height)
    return 0;

  var index = (y * this.width + x) * this.channels,
      r, g, b, a;

  switch(this.channels) {
    case 1:
      r = g = b = this.data[index];
      a = 255;
      break;

    case 2:
      r = g = b = this.data[index    ];
      a         = this.data[index + 1];
      break;

    case 3:
      r = this.data[index    ];
      g = this.data[index + 1];
      b = this.data[index + 2];
      a = 255;
      break;

    case 4:
      r = this.data[index    ];
      g = this.data[index + 1];
      b = this.data[index + 2];
      a = this.data[index + 3];
      break;
  }

  return ((r << 24) | (g << 16) | (b << 8) | a) >>> 0;
}

function paeth(a, b, c) {
  var p  = a + b - c,
      pa = Math.abs(p - a),
      pb = Math.abs(p - b),
      pc = Math.abs(p - c)

  if((pa <= pb) && (pa <= pc))
    return a

  if(pb <= pc)
    return b

  return c
}

exports.parseStream = function(stream, callback) {
  var inflate           = zlib.createInflate(),
      state             = 0,
      off               = 0,
      buf               = new Buffer(13),
      waiting           = 2,
      b                 = -1,
      p                 = 0,
      pngPaletteEntries = 0,
      pngAlphaEntries   = 0,
      chunkLength, pngWidth, pngHeight, pngBitDepth, pngDepthMult,
      pngColorType, pngPixels, pngSamplesPerPixel, pngBytesPerPixel,
      pngBytesPerScanline, pngSamples, currentScanline, priorScanline,
      scanlineFilter, pngTrailer, pngPalette, pngAlpha, idChannels;

  function error(err) {
    /* FIXME: stream.destroy no longer exists in node 0.10. I can't actually
     * find what the right way to say "hey stream, I am no longer going to read
     * from you ever" or "hey stream, I am never going to write to you ever
     * again", so I'm really not sure what the right way to handle this is.
     *
     * I would appreciate pull requests from somebody who actually understands
     * how node streams are supposed to function. */
    if(stream.destroy)
      stream.destroy()

    if(inflate.destroy)
      inflate.destroy()

    return callback(err)
  }

  function end() {
    if(!--waiting)
      return callback(
        undefined,
        new ImageData(pngWidth, pngHeight, idChannels, pngPixels, pngTrailer)
      )
  }

  stream.on("error", error)
  inflate.on("error", error)

  stream.on("end", function() {
    stream.destroy()

    if(!pngPixels)
      return error(new Error("Corrupt PNG?"))

    if(!pngTrailer)
      return error(new Error("Corrupt PNG?"))

    return end()
  })

  inflate.on("end", function() {
    if(inflate.destroy)
      inflate.destroy()

    if(p !== pngPixels.length)
      return error(new Error("Too little pixel data! (Corrupt PNG?)"))

    return end()
  })

  stream.on("data", function(data) {
    /* If an error occurred, bail. */
    if(!stream.readable)
      return

    var len = data.length,
        i   = 0,
        tmp, j;

    while(i !== len)
      switch(state) {
        case 0: /* PNG header */
          if(data[i++] !== HEADER[off++])
            return error(new Error("Invalid PNG header."))

          if(off === HEADER.length) {
            state = 1
            off   = 0
          }
          break

        case 1: /* PNG chunk length and type */
          if(len - i < 8 - off) {
            data.copy(buf, off, i)
            off += len - i
            i    = len
          }

          else {
            data.copy(buf, off, i, i + 8 - off)

            i          += 8 - off
            off         = 0
            chunkLength = buf.readUInt32BE(0)

            switch(buf.toString("ascii", 4, 8)) {
              case "IHDR":
                state = 2
                break

              case "PLTE":
                /* The PNG spec states that PLTE is only required for type 3.
                 * It may appear in other types, but is only useful if the
                 * display does not support true color. Since we're just a data
                 * storage format, we don't have to worry about it. */
                if(pngColorType !== 3)
                  state = 7

                else {
                  if(chunkLength % 3 !== 0)
                    return error(new Error("Invalid PLTE size."))

                  pngPaletteEntries = chunkLength / 3
                  pngPalette        = new Buffer(chunkLength)
                  state             = 3
                }
                break

              case "tRNS":
                if(pngColorType !== 3)
                  return error(new Error("tRNS for non-paletted images not yet supported."));

                /* We only support tRNS on paletted images right now. Those
                 * images may either have 1 or 3 channels, but in either case
                 * we add one for transparency. */
                idChannels       ++;

                pngAlphaEntries = chunkLength;
                pngAlpha        = new Buffer(chunkLength);
                state           = 4;
                break

              case "IDAT":
                /* Allocate the PNG if we havn't yet. (We wait to do it until
                 * here since tRNS may change idChannels, so we can't be sure of
                 * the size needed until we hit IDAT. With all that, might as
                 * well wait until we're actually going to start filling the
                 * buffer in case of errors...) */
                if(!pngPixels)
                  pngPixels = new Buffer(pngWidth * pngHeight * idChannels);

                state = 5
                break

              case "IEND":
                state = 6
                break

              default:
                state = 7
                break
            }
          }
          break

        case 2: /* IHDR */
          if(chunkLength !== 13)
            return error(new Error("Invalid IHDR chunk."))

          else if(len - i < chunkLength - off) {
            data.copy(buf, off, i)
            off += len - i
            i    = len
          }

          else {
            data.copy(buf, off, i, i + chunkLength - off)

            if(buf.readUInt8(10) !== 0)
              return error(new Error("Unsupported compression method."))

            if(buf.readUInt8(11) !== 0)
              return error(new Error("Unsupported filter method."))

            if(buf.readUInt8(12) !== 0)
              return error(new Error("Unsupported interlace method."))

            i           += chunkLength - off
            state        = 8
            off          = 0
            pngWidth     = buf.readUInt32BE(0)
            pngHeight    = buf.readUInt32BE(4)
            pngBitDepth  = buf.readUInt8(8)
            pngDepthMult = 255 / ((1 << pngBitDepth) - 1)
            pngColorType = buf.readUInt8(9)

            switch(pngColorType) {
              case 0:
                pngSamplesPerPixel = 1;
                pngBytesPerPixel   = Math.ceil(pngBitDepth * 0.125);
                idChannels         = 1;
                break

              case 2:
                pngSamplesPerPixel = 3;
                pngBytesPerPixel   = Math.ceil(pngBitDepth * 0.375);
                idChannels         = 3;
                break;

              case 3:
                pngSamplesPerPixel = 1;
                pngBytesPerPixel   = 1;
                idChannels         = 3;
                break

              case 4:
                pngSamplesPerPixel = 2;
                pngBytesPerPixel   = Math.ceil(pngBitDepth * 0.250);
                idChannels         = 2;
                break

              case 6:
                pngSamplesPerPixel = 4;
                pngBytesPerPixel   = Math.ceil(pngBitDepth * 0.5);
                idChannels         = 4;
                break;

              default:
                return error(
                  new Error("Unsupported color type: " + pngColorType)
                );
            }

            pngBytesPerScanline = Math.ceil(
              pngWidth * pngBitDepth * pngSamplesPerPixel / 8
            )
            pngSamples          = new Buffer(pngSamplesPerPixel)
            currentScanline     = new Buffer(pngBytesPerScanline)
            priorScanline       = new Buffer(pngBytesPerScanline)
            currentScanline.fill(0)
          }
          break

        case 3: /* PLTE */
          if(len - i < chunkLength - off) {
            data.copy(pngPalette, off, i)
            off += len - i
            i    = len
          }

          else {
            data.copy(pngPalette, off, i, i + chunkLength - off)
            i    += chunkLength - off
            state = 8
            off   = 0

            /* If each entry in the color palette is grayscale, set the channel
             * count to 1. */
            idChannels = 1;
            for(j = pngPaletteEntries; j--; )
              if(pngPalette[j * 3 + 0] !== pngPalette[j * 3 + 1] ||
                 pngPalette[j * 3 + 0] !== pngPalette[j * 3 + 2]) {
                idChannels = 3;
                break;
              }
          }
          break

        case 4: /* tRNS */
          if(len - i < chunkLength - off) {
            data.copy(pngAlpha, off, i)
            off += len - i
            i    = len
          }

          else {
            data.copy(pngAlpha, off, i, i + chunkLength - off)
            i    += chunkLength - off
            state = 8
            off   = 0
          }
          break

        case 5: /* IDAT */
          /* If the amount available is less than the amount remaining, then
           * feed as much as we can to the inflator. */
          if(len - i < chunkLength - off) {
            /* FIXME: Do I need to be smart and check the return value? */
            inflate.write(data.slice(i))
            off += len - i
            i    = len
          }

          /* Otherwise, write the last bit of the data to the inflator, and
           * finish processing the chunk. */
          else {
            /* FIXME: Do I need to be smart and check the return value? */
            inflate.write(data.slice(i, i + chunkLength - off))
            i    += chunkLength - off
            state = 8
            off   = 0
          }
          break

        case 6: /* IEND */
          if(chunkLength !== 0)
            return error(new Error("Invalid IEND chunk."))

          else if(len - i < 4 - off) {
            off += len - i
            i    = len
          }

          else {
            pngTrailer = new Buffer(0)
            i         += 4 - off
            state      = 9
            off        = 0

            inflate.end()
          }
          break

        case 7: /* unrecognized chunk */
          if(len - i < chunkLength - off) {
            off += len - i
            i    = len
          }

          else {
            i    += chunkLength - off
            state = 8
            off   = 0
          }
          break

        case 8: /* chunk crc */
          /* FIXME: CRC is blatantly ignored */
          if(len - i < 4 - off) {
            off += len - i
            i    = len
          }

          else {
            i    += 4 - off
            state = 1
            off   = 0
          }
          break

        case 9: /* trailing data */
          /* FIXME: It is inefficient to create a trailer buffer of length zero
           * and keep reallocating it every time we want to add more data. */
          tmp = new Buffer(off + len - i)
          pngTrailer.copy(tmp)
          data.copy(tmp, off, i, len)
          pngTrailer = tmp
          off       += len - i
          i          = len
          break
      }
  })

  inflate.on("data", function(data) {
    /* If an error occurred, bail. */
    if(!inflate.readable)
      return

    var len = data.length,
        i, tmp, x, j, k

    for(i = 0; i !== len; ++i) {
      if(b === -1) {
        scanlineFilter  = data[i]
        tmp             = currentScanline
        currentScanline = priorScanline
        priorScanline   = tmp
      }

      else
        switch(scanlineFilter) {
          case 0:
            currentScanline[b] = data[i]
            break

          case 1:
            currentScanline[b] =
              b < pngBytesPerPixel ?
                data[i] :
                (data[i] + currentScanline[b - pngBytesPerPixel]) & 255
            break

          case 2:
            currentScanline[b] = (data[i] + priorScanline[b]) & 255
            break

          case 3:
            currentScanline[b] = (data[i] + ((
              b < pngBytesPerPixel ?
                priorScanline[b] :
                currentScanline[b - pngBytesPerPixel] + priorScanline[b]
            ) >>> 1)) & 255
            break

          case 4:
            currentScanline[b] = (data[i] + (
              b < pngBytesPerPixel ?
                priorScanline[b] :
                paeth(
                  currentScanline[b - pngBytesPerPixel],
                  priorScanline[b],
                  priorScanline[b - pngBytesPerPixel]
                )
            )) & 255
            break

          default:
            return error(
              new Error("Unsupported scanline filter: " + scanlineFilter)
            )
        }

      if(++b === pngBytesPerScanline) {
        /* One scanline too many? */
        if(p === pngPixels.length)
          return error(new Error("Too much pixel data! (Corrupt PNG?)"))

        /* We have now read a complete scanline, so unfilter it and write it
         * into the pixel array. */
        for(j = 0, x = 0; x !== pngWidth; ++x) {
          /* Read all of the samples into the sample buffer. */
          for(k = 0; k !== pngSamplesPerPixel; ++j, ++k)
            switch(pngBitDepth) {
              case 1:
                pngSamples[k] =
                  (currentScanline[(j >>> 3)] >> (7 - (j & 7))) & 1
                break

              case 2:
                pngSamples[k] =
                  (currentScanline[(j >>> 2)] >> ((3 - (j & 3)) << 1)) & 3
                break

              case 4:
                pngSamples[k] =
                  (currentScanline[(j >>> 1)] >> ((1 - (j & 1)) << 2)) & 15
                break

              case 8:
                pngSamples[k] = currentScanline[j]
                break

              default:
                return error(new Error("Unsupported bit depth: " + pngBitDepth))
            }

          /* Write the pixel based off of the samples so collected. */
          switch(pngColorType) {
            case 0:
              pngPixels[p++] = pngSamples[0] * pngDepthMult;
              break;

            case 2:
              pngPixels[p++] = pngSamples[0] * pngDepthMult;
              pngPixels[p++] = pngSamples[1] * pngDepthMult;
              pngPixels[p++] = pngSamples[2] * pngDepthMult;
              break;

            case 3:
              if(pngSamples[0] >= pngPaletteEntries)
                return error(new Error("Invalid palette index."));

              switch(idChannels) {
                case 1:
                  pngPixels[p++] = pngPalette[pngSamples[0] * 3];
                  break;

                case 2:
                  pngPixels[p++] = pngPalette[pngSamples[0] * 3];
                  pngPixels[p++] =
                    pngSamples[0] < pngAlphaEntries ?
                      pngAlpha[pngSamples[0]] :
                      255;
                  break;

                case 3:
                  pngPixels[p++] = pngPalette[pngSamples[0] * 3 + 0];
                  pngPixels[p++] = pngPalette[pngSamples[0] * 3 + 1];
                  pngPixels[p++] = pngPalette[pngSamples[0] * 3 + 2];
                  break;

                case 4:
                  pngPixels[p++] = pngPalette[pngSamples[0] * 3 + 0];
                  pngPixels[p++] = pngPalette[pngSamples[0] * 3 + 1];
                  pngPixels[p++] = pngPalette[pngSamples[0] * 3 + 2];
                  pngPixels[p++] =
                    pngSamples[0] < pngAlphaEntries ?
                      pngAlpha[pngSamples[0]] :
                      255;
                  break;
              }
              break;

            case 4:
              pngPixels[p++] = pngSamples[0] * pngDepthMult;
              pngPixels[p++] = pngSamples[1] * pngDepthMult;
              break;

            case 6:
              pngPixels[p++] = pngSamples[0] * pngDepthMult;
              pngPixels[p++] = pngSamples[1] * pngDepthMult;
              pngPixels[p++] = pngSamples[2] * pngDepthMult;
              pngPixels[p++] = pngSamples[3] * pngDepthMult;
              break;
          }
        }

        b = -1;
      }
    }
  })
}

exports.parseFile = function(pathname, callback) {
  return exports.parseStream(fs.createReadStream(pathname), callback)
}

exports.parseBuffer = function(buf, callback) {
  /* Create a mock stream. */
  var s = new stream.Stream()

  /* Set up the destroy functionality. */
  s.readable = true
  s.destroy  = function() { s.readable = false }

  /* Set up the PNG parsing hooks. */
  exports.parseStream(s, callback)

  /* Send the data down the stream. */
  s.emit("data", buf)

  /* If no errors occurred in the data, close the stream. */
  if(s.readable)
    s.emit("end")
}

/* FIXME: This is deprecated. Remove it in 2.0. */
exports.parse = exports.parseBuffer


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview
 * @author Russell Toris - rctoris@wpi.edu
 */

/**
 * If you use roslib in a browser, all the classes will be exported to a global variable called ROSLIB.
 *
 * If you use nodejs, this is the variable you get when you require('roslib')
 */
var ROSLIB = this.ROSLIB || {
  REVISION : '0.18.0'
};

var assign = __webpack_require__(1);

// Add core components
assign(ROSLIB, __webpack_require__(55));

assign(ROSLIB, __webpack_require__(53));

assign(ROSLIB, __webpack_require__(56));

assign(ROSLIB, __webpack_require__(60));

assign(ROSLIB, __webpack_require__(63));

module.exports = ROSLIB;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview
 * @author Laura Lindzey - lindzey@gmail.com
 */

var Topic = __webpack_require__(10);
var Message = __webpack_require__(5);
var EventEmitter2 = __webpack_require__(2).EventEmitter2;

/**
 * An actionlib action server client.
 *
 * Emits the following events:
 *  * 'goal' - goal sent by action client
 *  * 'cancel' - action client has canceled the request
 *
 *  @constructor
 *  @param options - object with following keys:
 *   * ros - the ROSLIB.Ros connection handle
 *   * serverName - the action server name, like /fibonacci
 *   * actionName - the action message name, like 'actionlib_tutorials/FibonacciAction'
 */

function SimpleActionServer(options) {
    var that = this;
    options = options || {};
    this.ros = options.ros;
    this.serverName = options.serverName;
    this.actionName = options.actionName;

    // create and advertise publishers
    this.feedbackPublisher = new Topic({
        ros : this.ros,
        name : this.serverName + '/feedback',
        messageType : this.actionName + 'Feedback'
    });
    this.feedbackPublisher.advertise();

    var statusPublisher = new Topic({
        ros : this.ros,
        name : this.serverName + '/status',
        messageType : 'actionlib_msgs/GoalStatusArray'
    });
    statusPublisher.advertise();

    this.resultPublisher = new Topic({
        ros : this.ros,
        name : this.serverName + '/result',
        messageType : this.actionName + 'Result'
    });
    this.resultPublisher.advertise();

    // create and subscribe to listeners
    var goalListener = new Topic({
        ros : this.ros,
        name : this.serverName + '/goal',
        messageType : this.actionName + 'Goal'
    });

    var cancelListener = new Topic({
        ros : this.ros,
        name : this.serverName + '/cancel',
        messageType : 'actionlib_msgs/GoalID'
    });

    // Track the goals and their status in order to publish status...
    this.statusMessage = new Message({
        header : {
            stamp : {secs : 0, nsecs : 100},
            frame_id : ''
        },
        status_list : []
    });

    // needed for handling preemption prompted by a new goal being received
    this.currentGoal = null; // currently tracked goal
    this.nextGoal = null; // the one that'll be preempting

    goalListener.subscribe(function(goalMessage) {
        
    if(that.currentGoal) {
            that.nextGoal = goalMessage;
            // needs to happen AFTER rest is set up
            that.emit('cancel');
    } else {
            that.statusMessage.status_list = [{goal_id : goalMessage.goal_id, status : 1}];
            that.currentGoal = goalMessage;
            that.emit('goal', goalMessage.goal);
    }
    });

    // helper function for determing ordering of timestamps
    // returns t1 < t2
    var isEarlier = function(t1, t2) {
        if(t1.secs > t2.secs) {
            return false;
        } else if(t1.secs < t2.secs) {
            return true;
        } else if(t1.nsecs < t2.nsecs) {
            return true;
        } else {
            return false;
        }
    };

    // TODO: this may be more complicated than necessary, since I'm
    // not sure if the callbacks can ever wind up with a scenario
    // where we've been preempted by a next goal, it hasn't finished
    // processing, and then we get a cancel message
    cancelListener.subscribe(function(cancelMessage) {

        // cancel ALL goals if both empty
        if(cancelMessage.stamp.secs === 0 && cancelMessage.stamp.secs === 0 && cancelMessage.id === '') {
            that.nextGoal = null;
            if(that.currentGoal) {
                that.emit('cancel');
            }
        } else { // treat id and stamp independently
            if(that.currentGoal && cancelMessage.id === that.currentGoal.goal_id.id) {
                that.emit('cancel');
            } else if(that.nextGoal && cancelMessage.id === that.nextGoal.goal_id.id) {
                that.nextGoal = null;
            }

            if(that.nextGoal && isEarlier(that.nextGoal.goal_id.stamp,
                                          cancelMessage.stamp)) {
                that.nextGoal = null;
            }
            if(that.currentGoal && isEarlier(that.currentGoal.goal_id.stamp,
                                             cancelMessage.stamp)) {
                
                that.emit('cancel');
            }
        }
    });

    // publish status at pseudo-fixed rate; required for clients to know they've connected
    var statusInterval = setInterval( function() {
        var currentTime = new Date();
        var secs = Math.floor(currentTime.getTime()/1000);
        var nsecs = Math.round(1000000000*(currentTime.getTime()/1000-secs));
        that.statusMessage.header.stamp.secs = secs;
        that.statusMessage.header.stamp.nsecs = nsecs;
        statusPublisher.publish(that.statusMessage);
    }, 500); // publish every 500ms

}

SimpleActionServer.prototype.__proto__ = EventEmitter2.prototype;

/**
*  Set action state to succeeded and return to client
*/

SimpleActionServer.prototype.setSucceeded = function(result2) {
    

    var resultMessage = new Message({
        status : {goal_id : this.currentGoal.goal_id, status : 3},
        result : result2
    });
    this.resultPublisher.publish(resultMessage);

    this.statusMessage.status_list = [];
    if(this.nextGoal) {
        this.currentGoal = this.nextGoal;
        this.nextGoal = null;
        this.emit('goal', this.currentGoal.goal);
    } else {
        this.currentGoal = null;
    }
};

/**
*  Function to send feedback
*/

SimpleActionServer.prototype.sendFeedback = function(feedback2) {

    var feedbackMessage = new Message({
        status : {goal_id : this.currentGoal.goal_id, status : 1},
        feedback : feedback2
    });
    this.feedbackPublisher.publish(feedbackMessage);
};

/**
*  Handle case where client requests preemption
*/

SimpleActionServer.prototype.setPreempted = function() {

    this.statusMessage.status_list = [];
    var resultMessage = new Message({
        status : {goal_id : this.currentGoal.goal_id, status : 2},
    });
    this.resultPublisher.publish(resultMessage);

    if(this.nextGoal) {
        this.currentGoal = this.nextGoal;
        this.nextGoal = null;
        this.emit('goal', this.currentGoal.goal);
    } else {
        this.currentGoal = null;
    }
};

module.exports = SimpleActionServer;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var Ros = __webpack_require__(8);
var mixin = __webpack_require__(14);

var action = module.exports = {
    ActionClient: __webpack_require__(20),
    Goal: __webpack_require__(21),
    SimpleActionServer: __webpack_require__(52)
};

mixin(Ros, ['ActionClient', 'SimpleActionServer'], action);

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileoverview
 * @author Brandon Alexander - baalexander@gmail.com
 */

var Service = __webpack_require__(9);
var ServiceRequest = __webpack_require__(6);

/**
 * A ROS parameter.
 *
 * @constructor
 * @param options - possible keys include:
 *   * ros - the ROSLIB.Ros connection handle
 *   * name - the param name, like max_vel_x
 */
function Param(options) {
  options = options || {};
  this.ros = options.ros;
  this.name = options.name;
}

/**
 * Fetches the value of the param.
 *
 * @param callback - function with the following params:
 *  * value - the value of the param from ROS.
 */
Param.prototype.get = function(callback) {
  var paramClient = new Service({
    ros : this.ros,
    name : '/rosapi/get_param',
    serviceType : 'rosapi/GetParam'
  });

  var request = new ServiceRequest({
    name : this.name
  });

  paramClient.callService(request, function(result) {
    var value = JSON.parse(result.value);
    callback(value);
  });
};

/**
 * Sets the value of the param in ROS.
 *
 * @param value - value to set param to.
 */
Param.prototype.set = function(value, callback) {
  var paramClient = new Service({
    ros : this.ros,
    name : '/rosapi/set_param',
    serviceType : 'rosapi/SetParam'
  });

  var request = new ServiceRequest({
    name : this.name,
    value : JSON.stringify(value)
  });

  paramClient.callService(request, callback);
};

/**
 * Delete this parameter on the ROS server.
 */
Param.prototype.delete = function(callback) {
  var paramClient = new Service({
    ros : this.ros,
    name : '/rosapi/delete_param',
    serviceType : 'rosapi/DeleteParam'
  });

  var request = new ServiceRequest({
    name : this.name
  });

  paramClient.callService(request, callback);
};

module.exports = Param;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var mixin = __webpack_require__(14);

var core = module.exports = {
    Ros: __webpack_require__(8),
    Topic: __webpack_require__(10),
    Message: __webpack_require__(5),
    Param: __webpack_require__(54),
    Service: __webpack_require__(9),
    ServiceRequest: __webpack_require__(6),
    ServiceResponse: __webpack_require__(22)
};

mixin(core.Ros, ['Param', 'Service', 'Topic'], core);


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    Pose: __webpack_require__(24),
    Quaternion: __webpack_require__(11),
    Transform: __webpack_require__(25),
    Vector3: __webpack_require__(3)
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var Ros = __webpack_require__(8);
var net = __webpack_require__(81);
var socketAdapter = __webpack_require__(23);
var util = __webpack_require__(0);

/**
 * Same as core Ros except supports TCP connections
 * @private
 */ 
function RosTCP(options) {
  options = options || {};
  if (!options.encoding) {
    util.debug('ROSLib uses utf8 encoding by default.' +
      'It would be more efficent to use ascii (if possible)');
  }
  this.encoding = options.encoding || 'utf8';
  Ros.call(this, options);

  if (!this.socket && (options.host || options.port)) {
    this.connect({
      host: options.host,
      port: options.port
    });
  }
}

util.inherits(RosTCP, Ros);

/**
 * Connects to a live socket
 *
 * * url (String|Int|Object): Address and port to connect to (see http://nodejs.org/api/net.html)
 *     format {host: String, port: Int} or (port:Int), or "host:port"
 */
RosTCP.prototype.connect = function(url) {
  if (typeof url === 'string' && url.slice(0, 5) === 'ws://') {
    Ros.prototype.connect.call(this, url);
  } else {
    var events = socketAdapter(this);
    this.socket = net.connect(url)
      .on('data', events.onmessage)
      .on('close', events.onclose)
      .on('error', events.onerror)
      .on('connect', events.onopen);
    this.socket.setEncoding(this.encoding);
    this.socket.setTimeout(0);

    // Little hack for call on connection
    this.socket.send = this.socket.write;
    // Similarly for close
    this.socket.close = this.socket.end;
  }
};

module.exports = RosTCP;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var Topic = __webpack_require__(10);
var DuplexStream = __webpack_require__(17).Duplex;

/**
 * Publish a connected ROS topic to a duplex
 * stream. This stream can be piped to, which will
 * publish to the topic
 *
 * @options
 *   * subscribe: whether to subscribe to the topic and start emitting
 *              Data
 *   * publish: whether to register the stream as a publisher to the topic
 *   * transform: a function to change the data to be published
 *              or filter it if false is returned
 */
Topic.prototype.toStream = function(options) {
    options = options || {subscribe: true, publish: true};

    var topic = this;
    var hasTransform = typeof options.transform === 'function';

    var stream = new DuplexStream({
        objectMode: true
    });
    stream._read = function() {};
    
    // Publish to the topic if someone pipes to stream
    stream._write = function(chunk, encoding, callback) {
        if (hasTransform) {
            chunk = options.transform(chunk);
        }
        if (chunk === false) {
            topic.publish(chunk);
        }
        callback();
    };
    
    if (options.subscribe) {
        this.subscribe(function(message) {
            stream.push(message);
        });
        this.on('unsubscribe', stream.push.bind(stream, null));
    }

    if (options.publish) {
        this.advertise();
    }

    return stream;
};

module.exports = Topic;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileoverview
 * @author David Gossow - dgossow@willowgarage.com
 */

var ActionClient = __webpack_require__(20);
var Goal = __webpack_require__(21);

var Service = __webpack_require__(9);
var ServiceRequest = __webpack_require__(6);

var Transform = __webpack_require__(25);

/**
 * A TF Client that listens to TFs from tf2_web_republisher.
 *
 *  @constructor
 *  @param options - object with following keys:
 *   * ros - the ROSLIB.Ros connection handle
 *   * fixedFrame - the fixed frame, like /base_link
 *   * angularThres - the angular threshold for the TF republisher
 *   * transThres - the translation threshold for the TF republisher
 *   * rate - the rate for the TF republisher
 *   * updateDelay - the time (in ms) to wait after a new subscription
 *                   to update the TF republisher's list of TFs
 *   * topicTimeout - the timeout parameter for the TF republisher
 *   * serverName (optional) - the name of the tf2_web_republisher server
 *   * repubServiceName (optional) - the name of the republish_tfs service (non groovy compatibility mode only)
 *   																 default: '/republish_tfs'
 */
function TFClient(options) {
  options = options || {};
  this.ros = options.ros;
  this.fixedFrame = options.fixedFrame || '/base_link';
  this.angularThres = options.angularThres || 2.0;
  this.transThres = options.transThres || 0.01;
  this.rate = options.rate || 10.0;
  this.updateDelay = options.updateDelay || 50;
  var seconds = options.topicTimeout || 2.0;
  var secs = Math.floor(seconds);
  var nsecs = Math.floor((seconds - secs) * 1000000000);
  this.topicTimeout = {
    secs: secs,
    nsecs: nsecs
  };
  this.serverName = options.serverName || '/tf2_web_republisher';
  this.repubServiceName = options.repubServiceName || '/republish_tfs';

  this.currentGoal = false;
  this.currentTopic = false;
  this.frameInfos = {};
  this.republisherUpdateRequested = false;

  // Create an Action client
  this.actionClient = this.ros.ActionClient({
    serverName : this.serverName,
    actionName : 'tf2_web_republisher/TFSubscriptionAction',
    omitStatus : true,
    omitResult : true
  });

  // Create a Service client
  this.serviceClient = this.ros.Service({
    name: this.repubServiceName,
    serviceType: 'tf2_web_republisher/RepublishTFs'
  });
}

/**
 * Process the incoming TF message and send them out using the callback
 * functions.
 *
 * @param tf - the TF message from the server
 */
TFClient.prototype.processTFArray = function(tf) {
  var that = this;
  tf.transforms.forEach(function(transform) {
    var frameID = transform.child_frame_id;
    if (frameID[0] === '/')
    {
      frameID = frameID.substring(1);
    }
    var info = this.frameInfos[frameID];
    if (info) {
      info.transform = new Transform({
        translation : transform.transform.translation,
        rotation : transform.transform.rotation
      });
      info.cbs.forEach(function(cb) {
        cb(info.transform);
      });
    }
  }, this);
};

/**
 * Create and send a new goal (or service request) to the tf2_web_republisher
 * based on the current list of TFs.
 */
TFClient.prototype.updateGoal = function() {
  var goalMessage = {
    source_frames : Object.keys(this.frameInfos),
    target_frame : this.fixedFrame,
    angular_thres : this.angularThres,
    trans_thres : this.transThres,
    rate : this.rate
  };

  // if we're running in groovy compatibility mode (the default)
  // then use the action interface to tf2_web_republisher
  if(this.ros.groovyCompatibility) {
    if (this.currentGoal) {
      this.currentGoal.cancel();
    }
    this.currentGoal = new Goal({
      actionClient : this.actionClient,
      goalMessage : goalMessage
    });

    this.currentGoal.on('feedback', this.processTFArray.bind(this));
    this.currentGoal.send();
  }
  else {
    // otherwise, use the service interface
    // The service interface has the same parameters as the action,
    // plus the timeout
    goalMessage.timeout = this.topicTimeout;
    var request = new ServiceRequest(goalMessage);

    this.serviceClient.callService(request, this.processResponse.bind(this));
  }

  this.republisherUpdateRequested = false;
};

/**
 * Process the service response and subscribe to the tf republisher
 * topic
 *
 * @param response the service response containing the topic name
 */
TFClient.prototype.processResponse = function(response) {
  // if we subscribed to a topic before, unsubscribe so
  // the republisher stops publishing it
  if (this.currentTopic) {
    this.currentTopic.unsubscribe();
  }

  this.currentTopic = this.ros.Topic({
    name: response.topic_name,
    messageType: 'tf2_web_republisher/TFArray'
  });
  this.currentTopic.subscribe(this.processTFArray.bind(this));
};

/**
 * Subscribe to the given TF frame.
 *
 * @param frameID - the TF frame to subscribe to
 * @param callback - function with params:
 *   * transform - the transform data
 */
TFClient.prototype.subscribe = function(frameID, callback) {
  // remove leading slash, if it's there
  if (frameID[0] === '/')
  {
    frameID = frameID.substring(1);
  }
  // if there is no callback registered for the given frame, create emtpy callback list
  if (!this.frameInfos[frameID]) {
    this.frameInfos[frameID] = {
      cbs: []
    };
    if (!this.republisherUpdateRequested) {
      setTimeout(this.updateGoal.bind(this), this.updateDelay);
      this.republisherUpdateRequested = true;
    }
  }
  // if we already have a transform, call back immediately
  else if (this.frameInfos[frameID].transform) {
    callback(this.frameInfos[frameID].transform);
  }
  this.frameInfos[frameID].cbs.push(callback);
};

/**
 * Unsubscribe from the given TF frame.
 *
 * @param frameID - the TF frame to unsubscribe from
 * @param callback - the callback function to remove
 */
TFClient.prototype.unsubscribe = function(frameID, callback) {
  // remove leading slash, if it's there
  if (frameID[0] === '/')
  {
    frameID = frameID.substring(1);
  }
  var info = this.frameInfos[frameID];
  for (var cbs = info && info.cbs || [], idx = cbs.length; idx--;) {
    if (cbs[idx] === callback) {
      cbs.splice(idx, 1);
    }
  }
  if (!callback || cbs.length === 0) {
    delete this.frameInfos[frameID];
  }
};

module.exports = TFClient;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var Ros = __webpack_require__(8);
var mixin = __webpack_require__(14);

var tf = module.exports = {
    TFClient: __webpack_require__(59)
};

mixin(Ros, ['TFClient'], tf);

/***/ }),
/* 61 */
/***/ (function(module, exports) {

/**
 * @fileOverview 
 * @author David V. Lu!!  davidvlu@gmail.com
 */

/**
 * A Joint element in a URDF.
 *
 * @constructor
 * @param options - object with following keys:
 *  * xml - the XML element to parse
 */
function UrdfJoint(options) {
  this.name = options.xml.getAttribute('name');
  this.type = options.xml.getAttribute('type');
  
this.parent = options.xml.getElementsByTagName('parent')[0].getAttribute('link')  
    this.child = options.xml.getElementsByTagName('child')[0].getAttribute('link')   
   var limits = options.xml.getElementsByTagName('limit')
  if (limits.length > 0) {
    this.minval = parseFloat( limits[0].getAttribute('lower') );
    this.maxval = parseFloat( limits[0].getAttribute('upper') );
  }
}

module.exports = UrdfJoint;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview 
 * @author Benjamin Pitzer - ben.pitzer@gmail.com
 * @author Russell Toris - rctoris@wpi.edu
 */

var UrdfMaterial = __webpack_require__(15);
var UrdfLink = __webpack_require__(29);
var UrdfJoint = __webpack_require__(61);
var DOMParser = __webpack_require__(75).DOMParser;

// See https://developer.mozilla.org/docs/XPathResult#Constants
var XPATH_FIRST_ORDERED_NODE_TYPE = 9;

/**
 * A URDF Model can be used to parse a given URDF into the appropriate elements.
 *
 * @constructor
 * @param options - object with following keys:
 *  * xml - the XML element to parse
 *  * string - the XML element to parse as a string
 */
function UrdfModel(options) {
  options = options || {};
  var xmlDoc = options.xml;
  var string = options.string;
  this.materials = {};
  this.links = {};
  this.joints = {};

  // Check if we are using a string or an XML element
  if (string) {
    // Parse the string
    var parser = new DOMParser();
    xmlDoc = parser.parseFromString(string, 'text/xml');
  }

  // Initialize the model with the given XML node.
  // Get the robot tag
  var robotXml = xmlDoc.documentElement;

  // Get the robot name
  this.name = robotXml.getAttribute('name');

  // Parse all the visual elements we need
  for (var nodes = robotXml.childNodes, i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    if (node.tagName === 'material') {
      var material = new UrdfMaterial({
        xml : node
      });
      // Make sure this is unique
      if (this.materials[material.name] !== void 0) {
        if( this.materials[material.name].isLink() ) {
          this.materials[material.name].assign( material );
        } else {
          console.warn('Material ' + material.name + 'is not unique.');
        }
      } else {
        this.materials[material.name] = material;
      }
    } else if (node.tagName === 'link') {
      var link = new UrdfLink({
        xml : node
      });
      // Make sure this is unique
      if (this.links[link.name] !== void 0) {
        console.warn('Link ' + link.name + ' is not unique.');
      } else {
        // Check for a material
        for( var j=0; j<link.visuals.length; j++ )
        {
          var mat = link.visuals[j].material; 
          if ( mat !== null ) {
            if (this.materials[mat.name] !== void 0) {
              link.visuals[j].material = this.materials[mat.name];
            } else {
              this.materials[mat.name] = mat;
            }
          }
        }

        // Add the link
        this.links[link.name] = link;
      }
    } else if (node.tagName === 'joint') {
      var joint = new UrdfJoint({
        xml : node
      });
      this.joints[joint.name] = joint;
    }
  }
}

module.exports = UrdfModel;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1)({
    UrdfBox: __webpack_require__(26),
    UrdfColor: __webpack_require__(27),
    UrdfCylinder: __webpack_require__(28),
    UrdfLink: __webpack_require__(29),
    UrdfMaterial: __webpack_require__(15),
    UrdfMesh: __webpack_require__(30),
    UrdfModel: __webpack_require__(62),
    UrdfSphere: __webpack_require__(31),
    UrdfVisual: __webpack_require__(32)
}, __webpack_require__(7));


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileOverview
 * @author Ramon Wijnands - rayman747@hotmail.com
 */



var pngparse = __webpack_require__(50);

/**
 * If a message was compressed as a PNG image (a compression hack since
 * gzipping over WebSockets * is not supported yet), this function decodes
 * the "image" as a Base64 string.
 *
 * @private
 * @param data - object containing the PNG data.
 * @param callback - function with params:
 *   * data - the uncompressed data
 */
function decompressPng(data, callback) {
  var buffer = new Buffer(data, 'base64');

  pngparse.parse(buffer, function(err, data) {
    if(err) {
      console.warn('Cannot process PNG encoded message ');
    } else {
      var jsonData = data.data.toString();
      callback(JSON.parse(jsonData));
    }
  });
}

module.exports = decompressPng;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;

/**
 * An auto incrementing id which we can use to create "unique" Ultron instances
 * so we can track the event emitters that are added through the Ultron
 * interface.
 *
 * @type {Number}
 * @private
 */
var id = 0;

/**
 * Ultron is high-intelligence robot. It gathers intelligence so it can start improving
 * upon his rudimentary design. It will learn from your EventEmitting patterns
 * and exterminate them.
 *
 * @constructor
 * @param {EventEmitter} ee EventEmitter instance we need to wrap.
 * @api public
 */
function Ultron(ee) {
  if (!(this instanceof Ultron)) return new Ultron(ee);

  this.id = id++;
  this.ee = ee;
}

/**
 * Register a new EventListener for the given event.
 *
 * @param {String} event Name of the event.
 * @param {Functon} fn Callback function.
 * @param {Mixed} context The context of the function.
 * @returns {Ultron}
 * @api public
 */
Ultron.prototype.on = function on(event, fn, context) {
  fn.__ultron = this.id;
  this.ee.on(event, fn, context);

  return this;
};
/**
 * Add an EventListener that's only called once.
 *
 * @param {String} event Name of the event.
 * @param {Function} fn Callback function.
 * @param {Mixed} context The context of the function.
 * @returns {Ultron}
 * @api public
 */
Ultron.prototype.once = function once(event, fn, context) {
  fn.__ultron = this.id;
  this.ee.once(event, fn, context);

  return this;
};

/**
 * Remove the listeners we assigned for the given event.
 *
 * @returns {Ultron}
 * @api public
 */
Ultron.prototype.remove = function remove() {
  var args = arguments
    , event;

  //
  // When no event names are provided we assume that we need to clear all the
  // events that were assigned through us.
  //
  if (args.length === 1 && 'string' === typeof args[0]) {
    args = args[0].split(/[, ]+/);
  } else if (!args.length) {
    args = [];

    for (event in this.ee._events) {
      if (has.call(this.ee._events, event)) args.push(event);
    }
  }

  for (var i = 0; i < args.length; i++) {
    var listeners = this.ee.listeners(args[i]);

    for (var j = 0; j < listeners.length; j++) {
      event = listeners[j];

      //
      // Once listeners have a `listener` property that stores the real listener
      // in the EventEmitter that ships with Node.js.
      //
      if (event.listener) {
        if (event.listener.__ultron !== this.id) continue;
        delete event.listener.__ultron;
      } else {
        if (event.__ultron !== this.id) continue;
        delete event.__ultron;
      }

      this.ee.removeListener(args[i], event);
    }
  }

  return this;
};

/**
 * Destroy the Ultron instance, remove all listeners and release all references.
 *
 * @returns {Boolean}
 * @api public
 */
Ultron.prototype.destroy = function destroy() {
  if (!this.ee) return false;

  this.remove();
  this.ee = null;

  return true;
};

//
// Expose the module.
//
module.exports = Ultron;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*!
 * UTF-8 validate: UTF-8 validation for WebSockets.
 * Copyright(c) 2015 Einar Otto Stangvik <einaros@gmail.com>
 * MIT Licensed
 */

exports.Validation = {
  isValidUTF8: function(buffer) {
    return true;
  }
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


try {
  module.exports = __webpack_require__(49)('validation');
} catch (e) {
  module.exports = __webpack_require__(66);
}


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * ws: a node.js websocket client
 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
 * MIT Licensed
 */

var util = __webpack_require__(0);

function BufferPool(initialSize, growStrategy, shrinkStrategy) {
  if (this instanceof BufferPool === false) {
    throw new TypeError("Classes can't be function-called");
  }

  if (typeof initialSize === 'function') {
    shrinkStrategy = growStrategy;
    growStrategy = initialSize;
    initialSize = 0;
  }
  else if (typeof initialSize === 'undefined') {
    initialSize = 0;
  }
  this._growStrategy = (growStrategy || function(db, size) {
    return db.used + size;
  }).bind(null, this);
  this._shrinkStrategy = (shrinkStrategy || function(db) {
    return initialSize;
  }).bind(null, this);
  this._buffer = initialSize ? new Buffer(initialSize) : null;
  this._offset = 0;
  this._used = 0;
  this._changeFactor = 0;
  this.__defineGetter__('size', function(){
    return this._buffer == null ? 0 : this._buffer.length;
  });
  this.__defineGetter__('used', function(){
    return this._used;
  });
}

BufferPool.prototype.get = function(length) {
  if (this._buffer == null || this._offset + length > this._buffer.length) {
    var newBuf = new Buffer(this._growStrategy(length));
    this._buffer = newBuf;
    this._offset = 0;
  }
  this._used += length;
  var buf = this._buffer.slice(this._offset, this._offset + length);
  this._offset += length;
  return buf;
}

BufferPool.prototype.reset = function(forceNewBuffer) {
  var len = this._shrinkStrategy();
  if (len < this.size) this._changeFactor -= 1;
  if (forceNewBuffer || this._changeFactor < -2) {
    this._changeFactor = 0;
    this._buffer = len ? new Buffer(len) : null;
  }
  this._offset = 0;
  this._used = 0;
}

module.exports = BufferPool;


/***/ }),
/* 69 */
/***/ (function(module, exports) {

/*!
 * ws: a node.js websocket client
 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
 * MIT Licensed
 */

exports.BufferUtil = {
  merge: function(mergedBuffer, buffers) {
    var offset = 0;
    for (var i = 0, l = buffers.length; i < l; ++i) {
      var buf = buffers[i];
      buf.copy(mergedBuffer, offset);
      offset += buf.length;
    }
  },
  mask: function(source, mask, output, offset, length) {
    var maskNum = mask.readUInt32LE(0, true);
    var i = 0;
    for (; i < length - 3; i += 4) {
      var num = maskNum ^ source.readUInt32LE(i, true);
      if (num < 0) num = 4294967296 + num;
      output.writeUInt32LE(num, offset + i, true);
    }
    switch (length % 4) {
      case 3: output[offset + i + 2] = source[i + 2] ^ mask[2];
      case 2: output[offset + i + 1] = source[i + 1] ^ mask[1];
      case 1: output[offset + i] = source[i] ^ mask[0];
      case 0:;
    }
  },
  unmask: function(data, mask) {
    var maskNum = mask.readUInt32LE(0, true);
    var length = data.length;
    var i = 0;
    for (; i < length - 3; i += 4) {
      var num = maskNum ^ data.readUInt32LE(i, true);
      if (num < 0) num = 4294967296 + num;
      data.writeUInt32LE(num, i, true);
    }
    switch (length % 4) {
      case 3: data[i + 2] = data[i + 2] ^ mask[2];
      case 2: data[i + 1] = data[i + 1] ^ mask[1];
      case 1: data[i] = data[i] ^ mask[0];
      case 0:;
    }
  }
}


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * ws: a node.js websocket client
 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
 * MIT Licensed
 */

var util = __webpack_require__(0);

/**
 * State constants
 */

var EMPTY = 0
  , BODY = 1;
var BINARYLENGTH = 2
  , BINARYBODY = 3;

/**
 * Hixie Receiver implementation
 */

function Receiver () {
  if (this instanceof Receiver === false) {
    throw new TypeError("Classes can't be function-called");
  }

  this.state = EMPTY;
  this.buffers = [];
  this.messageEnd = -1;
  this.spanLength = 0;
  this.dead = false;

  this.onerror = function() {};
  this.ontext = function() {};
  this.onbinary = function() {};
  this.onclose = function() {};
  this.onping = function() {};
  this.onpong = function() {};
}

module.exports = Receiver;

/**
 * Add new data to the parser.
 *
 * @api public
 */

Receiver.prototype.add = function(data) {
  if (this.dead) return;
  var self = this;
  function doAdd() {
    if (self.state === EMPTY) {
      if (data.length == 2 && data[0] == 0xFF && data[1] == 0x00) {
        self.reset();
        self.onclose();
        return;
      }
      if (data[0] === 0x80) {
        self.messageEnd = 0;
        self.state = BINARYLENGTH;
        data = data.slice(1);
      } else {

      if (data[0] !== 0x00) {
        self.error('payload must start with 0x00 byte', true);
        return;
      }
      data = data.slice(1);
      self.state = BODY;

      }
    }
    if (self.state === BINARYLENGTH) {
      var i = 0;
      while ((i < data.length) && (data[i] & 0x80)) {
        self.messageEnd = 128 * self.messageEnd + (data[i] & 0x7f);
        ++i;
      }
      if (i < data.length) {
        self.messageEnd = 128 * self.messageEnd + (data[i] & 0x7f);
        self.state = BINARYBODY;
        ++i;
      }
      if (i > 0)
        data = data.slice(i);
    }
    if (self.state === BINARYBODY) {
      var dataleft = self.messageEnd - self.spanLength;
      if (data.length >= dataleft) {
        // consume the whole buffer to finish the frame
        self.buffers.push(data);
        self.spanLength += dataleft;
        self.messageEnd = dataleft;
        return self.parse();
      }
      // frame's not done even if we consume it all
      self.buffers.push(data);
      self.spanLength += data.length;
      return;
    }
    self.buffers.push(data);
    if ((self.messageEnd = bufferIndex(data, 0xFF)) != -1) {
      self.spanLength += self.messageEnd;
      return self.parse();
    }
    else self.spanLength += data.length;
  }
  while(data) data = doAdd();
};

/**
 * Releases all resources used by the receiver.
 *
 * @api public
 */

Receiver.prototype.cleanup = function() {
  this.dead = true;
  this.state = EMPTY;
  this.buffers = [];
};

/**
 * Process buffered data.
 *
 * @api public
 */

Receiver.prototype.parse = function() {
  var output = new Buffer(this.spanLength);
  var outputIndex = 0;
  for (var bi = 0, bl = this.buffers.length; bi < bl - 1; ++bi) {
    var buffer = this.buffers[bi];
    buffer.copy(output, outputIndex);
    outputIndex += buffer.length;
  }
  var lastBuffer = this.buffers[this.buffers.length - 1];
  if (this.messageEnd > 0) lastBuffer.copy(output, outputIndex, 0, this.messageEnd);
  if (this.state !== BODY) --this.messageEnd;
  var tail = null;
  if (this.messageEnd < lastBuffer.length - 1) {
    tail = lastBuffer.slice(this.messageEnd + 1);
  }
  this.reset();
  this.ontext(output.toString('utf8'));
  return tail;
};

/**
 * Handles an error
 *
 * @api private
 */

Receiver.prototype.error = function (reason, terminate) {
  if (this.dead) return;
  this.reset();
  if(typeof reason == 'string'){
    this.onerror(new Error(reason), terminate);
  }
  else if(reason.constructor == Error){
    this.onerror(reason, terminate);
  }
  else{
    this.onerror(new Error("An error occured"),terminate);
  }
  return this;
};

/**
 * Reset parser state
 *
 * @api private
 */

Receiver.prototype.reset = function (reason) {
  if (this.dead) return;
  this.state = EMPTY;
  this.buffers = [];
  this.messageEnd = -1;
  this.spanLength = 0;
};

/**
 * Internal api
 */

function bufferIndex(buffer, byte) {
  for (var i = 0, l = buffer.length; i < l; ++i) {
    if (buffer[i] === byte) return i;
  }
  return -1;
}


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * ws: a node.js websocket client
 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
 * MIT Licensed
 */

var events = __webpack_require__(13)
  , util = __webpack_require__(0)
  , EventEmitter = events.EventEmitter;

/**
 * Hixie Sender implementation
 */

function Sender(socket) {
  if (this instanceof Sender === false) {
    throw new TypeError("Classes can't be function-called");
  }

  events.EventEmitter.call(this);

  this.socket = socket;
  this.continuationFrame = false;
  this.isClosed = false;
}

module.exports = Sender;

/**
 * Inherits from EventEmitter.
 */

util.inherits(Sender, events.EventEmitter);

/**
 * Frames and writes data.
 *
 * @api public
 */

Sender.prototype.send = function(data, options, cb) {
  if (this.isClosed) return;

  var isString = typeof data == 'string'
    , length = isString ? Buffer.byteLength(data) : data.length
    , lengthbytes = (length > 127) ? 2 : 1 // assume less than 2**14 bytes
    , writeStartMarker = this.continuationFrame == false
    , writeEndMarker = !options || !(typeof options.fin != 'undefined' && !options.fin)
    , buffer = new Buffer((writeStartMarker ? ((options && options.binary) ? (1 + lengthbytes) : 1) : 0) + length + ((writeEndMarker && !(options && options.binary)) ? 1 : 0))
    , offset = writeStartMarker ? 1 : 0;

  if (writeStartMarker) {
    if (options && options.binary) {
      buffer.write('\x80', 'binary');
      // assume length less than 2**14 bytes
      if (lengthbytes > 1)
        buffer.write(String.fromCharCode(128+length/128), offset++, 'binary');
      buffer.write(String.fromCharCode(length&0x7f), offset++, 'binary');
    } else
      buffer.write('\x00', 'binary');
  }

  if (isString) buffer.write(data, offset, 'utf8');
  else data.copy(buffer, offset, 0);

  if (writeEndMarker) {
    if (options && options.binary) {
      // sending binary, not writing end marker
    } else
      buffer.write('\xff', offset + length, 'binary');
    this.continuationFrame = false;
  }
  else this.continuationFrame = true;

  try {
    this.socket.write(buffer, 'binary', cb);
  } catch (e) {
    this.error(e.toString());
  }
};

/**
 * Sends a close instruction to the remote party.
 *
 * @api public
 */

Sender.prototype.close = function(code, data, mask, cb) {
  if (this.isClosed) return;
  this.isClosed = true;
  try {
    if (this.continuationFrame) this.socket.write(new Buffer([0xff], 'binary'));
    this.socket.write(new Buffer([0xff, 0x00]), 'binary', cb);
  } catch (e) {
    this.error(e.toString());
  }
};

/**
 * Sends a ping message to the remote party. Not available for hixie.
 *
 * @api public
 */

Sender.prototype.ping = function(data, options) {};

/**
 * Sends a pong message to the remote party. Not available for hixie.
 *
 * @api public
 */

Sender.prototype.pong = function(data, options) {};

/**
 * Handles an error
 *
 * @api private
 */

Sender.prototype.error = function (reason) {
  this.emit('error', reason);
  return this;
};


/***/ }),
/* 72 */
/***/ (function(module, exports) {

/*!
 * ws: a node.js websocket client
 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
 * MIT Licensed
 */

exports.Validation = {
  isValidUTF8: function(buffer) {
    return true;
  }
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*!
 * ws: a node.js websocket client
 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
 * MIT Licensed
 */

var isValidUTF8;

try {
  isValidUTF8 = __webpack_require__(67);
} catch (e) {
  isValidUTF8 = __webpack_require__(72);
}

module.exports = typeof isValidUTF8 === 'object'
  ? isValidUTF8.Validation.isValidUTF8
  : isValidUTF8;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * ws: a node.js websocket client
 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
 * MIT Licensed
 */

var util = __webpack_require__(0)
  , events = __webpack_require__(13)
  , http = __webpack_require__(42)
  , crypto = __webpack_require__(16)
  , Options = __webpack_require__(19)
  , WebSocket = __webpack_require__(39)
  , Extensions = __webpack_require__(36)
  , PerMessageDeflate = __webpack_require__(12)
  , tls = __webpack_require__(82)
  , url = __webpack_require__(44);

/**
 * WebSocket Server implementation
 */

function WebSocketServer(options, callback) {
  if (this instanceof WebSocketServer === false) {
    return new WebSocketServer(options, callback);
  }

  events.EventEmitter.call(this);

  options = new Options({
    host: '0.0.0.0',
    port: null,
    server: null,
    verifyClient: null,
    handleProtocols: null,
    path: null,
    noServer: false,
    disableHixie: false,
    clientTracking: true,
    perMessageDeflate: true,
    maxPayload: 100 * 1024 * 1024
  }).merge(options);

  if (!options.isDefinedAndNonNull('port') && !options.isDefinedAndNonNull('server') && !options.value.noServer) {
    throw new TypeError('`port` or a `server` must be provided');
  }

  var self = this;

  if (options.isDefinedAndNonNull('port')) {
    this._server = http.createServer(function (req, res) {
      var body = http.STATUS_CODES[426];
      res.writeHead(426, {
        'Content-Length': body.length,
        'Content-Type': 'text/plain'
      });
      res.end(body);
    });
    this._server.allowHalfOpen = false;
    this._server.listen(options.value.port, options.value.host, callback);
    this._closeServer = function() { if (self._server) self._server.close(); };
  }
  else if (options.value.server) {
    this._server = options.value.server;
    if (options.value.path) {
      // take note of the path, to avoid collisions when multiple websocket servers are
      // listening on the same http server
      if (this._server._webSocketPaths && options.value.server._webSocketPaths[options.value.path]) {
        throw new Error('two instances of WebSocketServer cannot listen on the same http server path');
      }
      if (typeof this._server._webSocketPaths !== 'object') {
        this._server._webSocketPaths = {};
      }
      this._server._webSocketPaths[options.value.path] = 1;
    }
  }
  if (this._server) {
    this._onceServerListening = function() { self.emit('listening'); };
    this._server.once('listening', this._onceServerListening);
  }

  if (typeof this._server != 'undefined') {
    this._onServerError = function(error) { self.emit('error', error) };
    this._server.on('error', this._onServerError);
    this._onServerUpgrade = function(req, socket, upgradeHead) {
      //copy upgradeHead to avoid retention of large slab buffers used in node core
      var head = new Buffer(upgradeHead.length);
      upgradeHead.copy(head);

      self.handleUpgrade(req, socket, head, function(client) {
        self.emit('connection'+req.url, client);
        self.emit('connection', client);
      });
    };
    this._server.on('upgrade', this._onServerUpgrade);
  }

  this.options = options.value;
  this.path = options.value.path;
  this.clients = [];
}

/**
 * Inherits from EventEmitter.
 */

util.inherits(WebSocketServer, events.EventEmitter);

/**
 * Immediately shuts down the connection.
 *
 * @api public
 */

WebSocketServer.prototype.close = function(callback) {
  // terminate all associated clients
  var error = null;
  try {
    for (var i = 0, l = this.clients.length; i < l; ++i) {
      this.clients[i].terminate();
    }
  }
  catch (e) {
    error = e;
  }

  // remove path descriptor, if any
  if (this.path && this._server._webSocketPaths) {
    delete this._server._webSocketPaths[this.path];
    if (Object.keys(this._server._webSocketPaths).length == 0) {
      delete this._server._webSocketPaths;
    }
  }

  // close the http server if it was internally created
  try {
    if (typeof this._closeServer !== 'undefined') {
      this._closeServer();
    }
  }
  finally {
    if (this._server) {
      this._server.removeListener('listening', this._onceServerListening);
      this._server.removeListener('error', this._onServerError);
      this._server.removeListener('upgrade', this._onServerUpgrade);
    }
    delete this._server;
  }
  if(callback)
    callback(error);
  else if(error)
    throw error;
}

/**
 * Handle a HTTP Upgrade request.
 *
 * @api public
 */

WebSocketServer.prototype.handleUpgrade = function(req, socket, upgradeHead, cb) {
  // check for wrong path
  if (this.options.path) {
    var u = url.parse(req.url);
    if (u && u.pathname !== this.options.path) return;
  }

  if (typeof req.headers.upgrade === 'undefined' || req.headers.upgrade.toLowerCase() !== 'websocket') {
    abortConnection(socket, 400, 'Bad Request');
    return;
  }

  if (req.headers['sec-websocket-key1']) handleHixieUpgrade.apply(this, arguments);
  else handleHybiUpgrade.apply(this, arguments);
}

module.exports = WebSocketServer;

/**
 * Entirely private apis,
 * which may or may not be bound to a sepcific WebSocket instance.
 */

function handleHybiUpgrade(req, socket, upgradeHead, cb) {
  // handle premature socket errors
  var errorHandler = function() {
    try { socket.destroy(); } catch (e) {}
  }
  socket.on('error', errorHandler);

  // verify key presence
  if (!req.headers['sec-websocket-key']) {
    abortConnection(socket, 400, 'Bad Request');
    return;
  }

  // verify version
  var version = parseInt(req.headers['sec-websocket-version']);
  if ([8, 13].indexOf(version) === -1) {
    abortConnection(socket, 400, 'Bad Request');
    return;
  }

  // verify protocol
  var protocols = req.headers['sec-websocket-protocol'];

  // verify client
  var origin = version < 13 ?
    req.headers['sec-websocket-origin'] :
    req.headers['origin'];

  // handle extensions offer
  var extensionsOffer = Extensions.parse(req.headers['sec-websocket-extensions']);

  // handler to call when the connection sequence completes
  var self = this;
  var completeHybiUpgrade2 = function(protocol) {

    // calc key
    var key = req.headers['sec-websocket-key'];
    var shasum = crypto.createHash('sha1');
    shasum.update(key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11");
    key = shasum.digest('base64');

    var headers = [
        'HTTP/1.1 101 Switching Protocols'
      , 'Upgrade: websocket'
      , 'Connection: Upgrade'
      , 'Sec-WebSocket-Accept: ' + key
    ];

    if (typeof protocol != 'undefined') {
      headers.push('Sec-WebSocket-Protocol: ' + protocol);
    }

    var extensions = {};
    try {
      extensions = acceptExtensions.call(self, extensionsOffer);
    } catch (err) {
      abortConnection(socket, 400, 'Bad Request');
      return;
    }

    if (Object.keys(extensions).length) {
      var serverExtensions = {};
      Object.keys(extensions).forEach(function(token) {
        serverExtensions[token] = [extensions[token].params]
      });
      headers.push('Sec-WebSocket-Extensions: ' + Extensions.format(serverExtensions));
    }

    // allows external modification/inspection of handshake headers
    self.emit('headers', headers);

    socket.setTimeout(0);
    socket.setNoDelay(true);
    try {
      socket.write(headers.concat('', '').join('\r\n'));
    }
    catch (e) {
      // if the upgrade write fails, shut the connection down hard
      try { socket.destroy(); } catch (e) {}
      return;
    }

    var client = new WebSocket([req, socket, upgradeHead], {
      protocolVersion: version,
      protocol: protocol,
      extensions: extensions,
      maxPayload: self.options.maxPayload
    });

    if (self.options.clientTracking) {
      self.clients.push(client);
      client.on('close', function() {
        var index = self.clients.indexOf(client);
        if (index != -1) {
          self.clients.splice(index, 1);
        }
      });
    }

    // signal upgrade complete
    socket.removeListener('error', errorHandler);
    cb(client);
  }

  // optionally call external protocol selection handler before
  // calling completeHybiUpgrade2
  var completeHybiUpgrade1 = function() {
    // choose from the sub-protocols
    if (typeof self.options.handleProtocols == 'function') {
        var protList = (protocols || "").split(/, */);
        var callbackCalled = false;
        var res = self.options.handleProtocols(protList, function(result, protocol) {
          callbackCalled = true;
          if (!result) abortConnection(socket, 401, 'Unauthorized');
          else completeHybiUpgrade2(protocol);
        });
        if (!callbackCalled) {
            // the handleProtocols handler never called our callback
            abortConnection(socket, 501, 'Could not process protocols');
        }
        return;
    } else {
        if (typeof protocols !== 'undefined') {
            completeHybiUpgrade2(protocols.split(/, */)[0]);
        }
        else {
            completeHybiUpgrade2();
        }
    }
  }

  // optionally call external client verification handler
  if (typeof this.options.verifyClient == 'function') {
    var info = {
      origin: origin,
      secure: typeof req.connection.authorized !== 'undefined' || typeof req.connection.encrypted !== 'undefined',
      req: req
    };
    if (this.options.verifyClient.length == 2) {
      this.options.verifyClient(info, function(result, code, name) {
        if (typeof code === 'undefined') code = 401;
        if (typeof name === 'undefined') name = http.STATUS_CODES[code];

        if (!result) abortConnection(socket, code, name);
        else completeHybiUpgrade1();
      });
      return;
    }
    else if (!this.options.verifyClient(info)) {
      abortConnection(socket, 401, 'Unauthorized');
      return;
    }
  }

  completeHybiUpgrade1();
}

function handleHixieUpgrade(req, socket, upgradeHead, cb) {
  // handle premature socket errors
  var errorHandler = function() {
    try { socket.destroy(); } catch (e) {}
  }
  socket.on('error', errorHandler);

  // bail if options prevent hixie
  if (this.options.disableHixie) {
    abortConnection(socket, 401, 'Hixie support disabled');
    return;
  }

  // verify key presence
  if (!req.headers['sec-websocket-key2']) {
    abortConnection(socket, 400, 'Bad Request');
    return;
  }

  var origin = req.headers['origin']
    , self = this;

  // setup handshake completion to run after client has been verified
  var onClientVerified = function() {
    var wshost;
    if (!req.headers['x-forwarded-host'])
        wshost = req.headers.host;
    else
        wshost = req.headers['x-forwarded-host'];
    var location = ((req.headers['x-forwarded-proto'] === 'https' || socket.encrypted) ? 'wss' : 'ws') + '://' + wshost + req.url
      , protocol = req.headers['sec-websocket-protocol'];

    // build the response header and return a Buffer
    var buildResponseHeader = function() {
      var headers = [
          'HTTP/1.1 101 Switching Protocols'
        , 'Upgrade: WebSocket'
        , 'Connection: Upgrade'
        , 'Sec-WebSocket-Location: ' + location
      ];
      if (typeof protocol != 'undefined') headers.push('Sec-WebSocket-Protocol: ' + protocol);
      if (typeof origin != 'undefined') headers.push('Sec-WebSocket-Origin: ' + origin);

      return new Buffer(headers.concat('', '').join('\r\n'));
    };

    // send handshake response before receiving the nonce
    var handshakeResponse = function() {

      socket.setTimeout(0);
      socket.setNoDelay(true);

      var headerBuffer = buildResponseHeader();

      try {
        socket.write(headerBuffer, 'binary', function(err) {
          // remove listener if there was an error
          if (err) socket.removeListener('data', handler);
          return;
        });
      } catch (e) {
        try { socket.destroy(); } catch (e) {}
        return;
      };
    };

    // handshake completion code to run once nonce has been successfully retrieved
    var completeHandshake = function(nonce, rest, headerBuffer) {
      // calculate key
      var k1 = req.headers['sec-websocket-key1']
        , k2 = req.headers['sec-websocket-key2']
        , md5 = crypto.createHash('md5');

      [k1, k2].forEach(function (k) {
        var n = parseInt(k.replace(/[^\d]/g, ''))
          , spaces = k.replace(/[^ ]/g, '').length;
        if (spaces === 0 || n % spaces !== 0){
          abortConnection(socket, 400, 'Bad Request');
          return;
        }
        n /= spaces;
        md5.update(String.fromCharCode(
          n >> 24 & 0xFF,
          n >> 16 & 0xFF,
          n >> 8  & 0xFF,
          n       & 0xFF));
      });
      md5.update(nonce.toString('binary'));

      socket.setTimeout(0);
      socket.setNoDelay(true);

      try {
        var hashBuffer = new Buffer(md5.digest('binary'), 'binary');
        var handshakeBuffer = new Buffer(headerBuffer.length + hashBuffer.length);
        headerBuffer.copy(handshakeBuffer, 0);
        hashBuffer.copy(handshakeBuffer, headerBuffer.length);

        // do a single write, which - upon success - causes a new client websocket to be setup
        socket.write(handshakeBuffer, 'binary', function(err) {
          if (err) return; // do not create client if an error happens
          var client = new WebSocket([req, socket, rest], {
            protocolVersion: 'hixie-76',
            protocol: protocol
          });
          if (self.options.clientTracking) {
            self.clients.push(client);
            client.on('close', function() {
              var index = self.clients.indexOf(client);
              if (index != -1) {
                self.clients.splice(index, 1);
              }
            });
          }

          // signal upgrade complete
          socket.removeListener('error', errorHandler);
          cb(client);
        });
      }
      catch (e) {
        try { socket.destroy(); } catch (e) {}
        return;
      }
    }

    // retrieve nonce
    var nonceLength = 8;
    if (upgradeHead && upgradeHead.length >= nonceLength) {
      var nonce = upgradeHead.slice(0, nonceLength);
      var rest = upgradeHead.length > nonceLength ? upgradeHead.slice(nonceLength) : null;
      completeHandshake.call(self, nonce, rest, buildResponseHeader());
    }
    else {
      // nonce not present in upgradeHead
      var nonce = new Buffer(nonceLength);
      upgradeHead.copy(nonce, 0);
      var received = upgradeHead.length;
      var rest = null;
      var handler = function (data) {
        var toRead = Math.min(data.length, nonceLength - received);
        if (toRead === 0) return;
        data.copy(nonce, received, 0, toRead);
        received += toRead;
        if (received == nonceLength) {
          socket.removeListener('data', handler);
          if (toRead < data.length) rest = data.slice(toRead);

          // complete the handshake but send empty buffer for headers since they have already been sent
          completeHandshake.call(self, nonce, rest, new Buffer(0));
        }
      }

      // handle additional data as we receive it
      socket.on('data', handler);

      // send header response before we have the nonce to fix haproxy buffering
      handshakeResponse();
    }
  }

  // verify client
  if (typeof this.options.verifyClient == 'function') {
    var info = {
      origin: origin,
      secure: typeof req.connection.authorized !== 'undefined' || typeof req.connection.encrypted !== 'undefined',
      req: req
    };
    if (this.options.verifyClient.length == 2) {
      var self = this;
      this.options.verifyClient(info, function(result, code, name) {
        if (typeof code === 'undefined') code = 401;
        if (typeof name === 'undefined') name = http.STATUS_CODES[code];

        if (!result) abortConnection(socket, code, name);
        else onClientVerified.apply(self);
      });
      return;
    }
    else if (!this.options.verifyClient(info)) {
      abortConnection(socket, 401, 'Unauthorized');
      return;
    }
  }

  // no client verification required
  onClientVerified();
}

function acceptExtensions(offer) {
  var extensions = {};
  var options = this.options.perMessageDeflate;
  var maxPayload = this.options.maxPayload;
  if (options && offer[PerMessageDeflate.extensionName]) {
    var perMessageDeflate = new PerMessageDeflate(options !== true ? options : {}, true, maxPayload);
    perMessageDeflate.accept(offer[PerMessageDeflate.extensionName]);
    extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
  }
  return extensions;
}

function abortConnection(socket, code, name) {
  try {
    var response = [
      'HTTP/1.1 ' + code + ' ' + name,
      'Content-type: text/html'
    ];
    socket.write(response.concat('', '').join('\r\n'));
  }
  catch (e) { /* ignore errors - we've aborted this connection */ }
  finally {
    // ensure that an early aborted connection is shut down completely
    try { socket.destroy(); } catch (e) {}
  }
}


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

function DOMParser(options){
	this.options = options ||{locator:{}};
	
}
DOMParser.prototype.parseFromString = function(source,mimeType){
	var options = this.options;
	var sax =  new XMLReader();
	var domBuilder = options.domBuilder || new DOMHandler();//contentHandler and LexicalHandler
	var errorHandler = options.errorHandler;
	var locator = options.locator;
	var defaultNSMap = options.xmlns||{};
	var entityMap = {'lt':'<','gt':'>','amp':'&','quot':'"','apos':"'"}
	if(locator){
		domBuilder.setDocumentLocator(locator)
	}
	
	sax.errorHandler = buildErrorHandler(errorHandler,domBuilder,locator);
	sax.domBuilder = options.domBuilder || domBuilder;
	if(/\/x?html?$/.test(mimeType)){
		entityMap.nbsp = '\xa0';
		entityMap.copy = '\xa9';
		defaultNSMap['']= 'http://www.w3.org/1999/xhtml';
	}
	defaultNSMap.xml = defaultNSMap.xml || 'http://www.w3.org/XML/1998/namespace';
	if(source){
		sax.parse(source,defaultNSMap,entityMap);
	}else{
		sax.errorHandler.error("invalid doc source");
	}
	return domBuilder.doc;
}
function buildErrorHandler(errorImpl,domBuilder,locator){
	if(!errorImpl){
		if(domBuilder instanceof DOMHandler){
			return domBuilder;
		}
		errorImpl = domBuilder ;
	}
	var errorHandler = {}
	var isCallback = errorImpl instanceof Function;
	locator = locator||{}
	function build(key){
		var fn = errorImpl[key];
		if(!fn && isCallback){
			fn = errorImpl.length == 2?function(msg){errorImpl(key,msg)}:errorImpl;
		}
		errorHandler[key] = fn && function(msg){
			fn('[xmldom '+key+']\t'+msg+_locator(locator));
		}||function(){};
	}
	build('warning');
	build('error');
	build('fatalError');
	return errorHandler;
}

//console.log('#\n\n\n\n\n\n\n####')
/**
 * +ContentHandler+ErrorHandler
 * +LexicalHandler+EntityResolver2
 * -DeclHandler-DTDHandler 
 * 
 * DefaultHandler:EntityResolver, DTDHandler, ContentHandler, ErrorHandler
 * DefaultHandler2:DefaultHandler,LexicalHandler, DeclHandler, EntityResolver2
 * @link http://www.saxproject.org/apidoc/org/xml/sax/helpers/DefaultHandler.html
 */
function DOMHandler() {
    this.cdata = false;
}
function position(locator,node){
	node.lineNumber = locator.lineNumber;
	node.columnNumber = locator.columnNumber;
}
/**
 * @see org.xml.sax.ContentHandler#startDocument
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
 */ 
DOMHandler.prototype = {
	startDocument : function() {
    	this.doc = new DOMImplementation().createDocument(null, null, null);
    	if (this.locator) {
        	this.doc.documentURI = this.locator.systemId;
    	}
	},
	startElement:function(namespaceURI, localName, qName, attrs) {
		var doc = this.doc;
	    var el = doc.createElementNS(namespaceURI, qName||localName);
	    var len = attrs.length;
	    appendElement(this, el);
	    this.currentElement = el;
	    
		this.locator && position(this.locator,el)
	    for (var i = 0 ; i < len; i++) {
	        var namespaceURI = attrs.getURI(i);
	        var value = attrs.getValue(i);
	        var qName = attrs.getQName(i);
			var attr = doc.createAttributeNS(namespaceURI, qName);
			this.locator &&position(attrs.getLocator(i),attr);
			attr.value = attr.nodeValue = value;
			el.setAttributeNode(attr)
	    }
	},
	endElement:function(namespaceURI, localName, qName) {
		var current = this.currentElement
		var tagName = current.tagName;
		this.currentElement = current.parentNode;
	},
	startPrefixMapping:function(prefix, uri) {
	},
	endPrefixMapping:function(prefix) {
	},
	processingInstruction:function(target, data) {
	    var ins = this.doc.createProcessingInstruction(target, data);
	    this.locator && position(this.locator,ins)
	    appendElement(this, ins);
	},
	ignorableWhitespace:function(ch, start, length) {
	},
	characters:function(chars, start, length) {
		chars = _toString.apply(this,arguments)
		//console.log(chars)
		if(chars){
			if (this.cdata) {
				var charNode = this.doc.createCDATASection(chars);
			} else {
				var charNode = this.doc.createTextNode(chars);
			}
			if(this.currentElement){
				this.currentElement.appendChild(charNode);
			}else if(/^\s*$/.test(chars)){
				this.doc.appendChild(charNode);
				//process xml
			}
			this.locator && position(this.locator,charNode)
		}
	},
	skippedEntity:function(name) {
	},
	endDocument:function() {
		this.doc.normalize();
	},
	setDocumentLocator:function (locator) {
	    if(this.locator = locator){// && !('lineNumber' in locator)){
	    	locator.lineNumber = 0;
	    }
	},
	//LexicalHandler
	comment:function(chars, start, length) {
		chars = _toString.apply(this,arguments)
	    var comm = this.doc.createComment(chars);
	    this.locator && position(this.locator,comm)
	    appendElement(this, comm);
	},
	
	startCDATA:function() {
	    //used in characters() methods
	    this.cdata = true;
	},
	endCDATA:function() {
	    this.cdata = false;
	},
	
	startDTD:function(name, publicId, systemId) {
		var impl = this.doc.implementation;
	    if (impl && impl.createDocumentType) {
	        var dt = impl.createDocumentType(name, publicId, systemId);
	        this.locator && position(this.locator,dt)
	        appendElement(this, dt);
	    }
	},
	/**
	 * @see org.xml.sax.ErrorHandler
	 * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
	 */
	warning:function(error) {
		console.warn('[xmldom warning]\t'+error,_locator(this.locator));
	},
	error:function(error) {
		console.error('[xmldom error]\t'+error,_locator(this.locator));
	},
	fatalError:function(error) {
		console.error('[xmldom fatalError]\t'+error,_locator(this.locator));
	    throw error;
	}
}
function _locator(l){
	if(l){
		return '\n@'+(l.systemId ||'')+'#[line:'+l.lineNumber+',col:'+l.columnNumber+']'
	}
}
function _toString(chars,start,length){
	if(typeof chars == 'string'){
		return chars.substr(start,length)
	}else{//java sax connect width xmldom on rhino(what about: "? && !(chars instanceof String)")
		if(chars.length >= start+length || start){
			return new java.lang.String(chars,start,length)+'';
		}
		return chars;
	}
}

/*
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/LexicalHandler.html
 * used method of org.xml.sax.ext.LexicalHandler:
 *  #comment(chars, start, length)
 *  #startCDATA()
 *  #endCDATA()
 *  #startDTD(name, publicId, systemId)
 *
 *
 * IGNORED method of org.xml.sax.ext.LexicalHandler:
 *  #endDTD()
 *  #startEntity(name)
 *  #endEntity(name)
 *
 *
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/DeclHandler.html
 * IGNORED method of org.xml.sax.ext.DeclHandler
 * 	#attributeDecl(eName, aName, type, mode, value)
 *  #elementDecl(name, model)
 *  #externalEntityDecl(name, publicId, systemId)
 *  #internalEntityDecl(name, value)
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/EntityResolver2.html
 * IGNORED method of org.xml.sax.EntityResolver2
 *  #resolveEntity(String name,String publicId,String baseURI,String systemId)
 *  #resolveEntity(publicId, systemId)
 *  #getExternalSubset(name, baseURI)
 * @link http://www.saxproject.org/apidoc/org/xml/sax/DTDHandler.html
 * IGNORED method of org.xml.sax.DTDHandler
 *  #notationDecl(name, publicId, systemId) {};
 *  #unparsedEntityDecl(name, publicId, systemId, notationName) {};
 */
"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g,function(key){
	DOMHandler.prototype[key] = function(){return null}
})

/* Private static helpers treated below as private instance methods, so don't need to add these to the public API; we might use a Relator to also get rid of non-standard public properties */
function appendElement (hander,node) {
    if (!hander.currentElement) {
        hander.doc.appendChild(node);
    } else {
        hander.currentElement.appendChild(node);
    }
}//appendChild and setAttributeNS are preformance key

//if(typeof require == 'function'){
	var XMLReader = __webpack_require__(76).XMLReader;
	var DOMImplementation = exports.DOMImplementation = __webpack_require__(40).DOMImplementation;
	exports.XMLSerializer = __webpack_require__(40).XMLSerializer ;
	exports.DOMParser = DOMParser;
//}


/***/ }),
/* 76 */
/***/ (function(module, exports) {

//[4]   	NameStartChar	   ::=   	":" | [A-Z] | "_" | [a-z] | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x2FF] | [#x370-#x37D] | [#x37F-#x1FFF] | [#x200C-#x200D] | [#x2070-#x218F] | [#x2C00-#x2FEF] | [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]
//[4a]   	NameChar	   ::=   	NameStartChar | "-" | "." | [0-9] | #xB7 | [#x0300-#x036F] | [#x203F-#x2040]
//[5]   	Name	   ::=   	NameStartChar (NameChar)*
var nameStartChar = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]///\u10000-\uEFFFF
var nameChar = new RegExp("[\\-\\.0-9"+nameStartChar.source.slice(1,-1)+"\\u00B7\\u0300-\\u036F\\u203F-\\u2040]");
var tagNamePattern = new RegExp('^'+nameStartChar.source+nameChar.source+'*(?:\:'+nameStartChar.source+nameChar.source+'*)?$');
//var tagNamePattern = /^[a-zA-Z_][\w\-\.]*(?:\:[a-zA-Z_][\w\-\.]*)?$/
//var handlers = 'resolveEntity,getExternalSubset,characters,endDocument,endElement,endPrefixMapping,ignorableWhitespace,processingInstruction,setDocumentLocator,skippedEntity,startDocument,startElement,startPrefixMapping,notationDecl,unparsedEntityDecl,error,fatalError,warning,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,comment,endCDATA,endDTD,endEntity,startCDATA,startDTD,startEntity'.split(',')

//S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
//S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
var S_TAG = 0;//tag name offerring
var S_ATTR = 1;//attr name offerring 
var S_ATTR_SPACE=2;//attr name end and space offer
var S_EQ = 3;//=space?
var S_ATTR_NOQUOT_VALUE = 4;//attr value(no quot value only)
var S_ATTR_END = 5;//attr value end and no space(quot end)
var S_TAG_SPACE = 6;//(attr value end || tag end ) && (space offer)
var S_TAG_CLOSE = 7;//closed el<el />

function XMLReader(){
	
}

XMLReader.prototype = {
	parse:function(source,defaultNSMap,entityMap){
		var domBuilder = this.domBuilder;
		domBuilder.startDocument();
		_copy(defaultNSMap ,defaultNSMap = {})
		parse(source,defaultNSMap,entityMap,
				domBuilder,this.errorHandler);
		domBuilder.endDocument();
	}
}
function parse(source,defaultNSMapCopy,entityMap,domBuilder,errorHandler){
	function fixedFromCharCode(code) {
		// String.prototype.fromCharCode does not supports
		// > 2 bytes unicode chars directly
		if (code > 0xffff) {
			code -= 0x10000;
			var surrogate1 = 0xd800 + (code >> 10)
				, surrogate2 = 0xdc00 + (code & 0x3ff);

			return String.fromCharCode(surrogate1, surrogate2);
		} else {
			return String.fromCharCode(code);
		}
	}
	function entityReplacer(a){
		var k = a.slice(1,-1);
		if(k in entityMap){
			return entityMap[k]; 
		}else if(k.charAt(0) === '#'){
			return fixedFromCharCode(parseInt(k.substr(1).replace('x','0x')))
		}else{
			errorHandler.error('entity not found:'+a);
			return a;
		}
	}
	function appendText(end){//has some bugs
		if(end>start){
			var xt = source.substring(start,end).replace(/&#?\w+;/g,entityReplacer);
			locator&&position(start);
			domBuilder.characters(xt,0,end-start);
			start = end
		}
	}
	function position(p,m){
		while(p>=lineEnd && (m = linePattern.exec(source))){
			lineStart = m.index;
			lineEnd = lineStart + m[0].length;
			locator.lineNumber++;
			//console.log('line++:',locator,startPos,endPos)
		}
		locator.columnNumber = p-lineStart+1;
	}
	var lineStart = 0;
	var lineEnd = 0;
	var linePattern = /.*(?:\r\n?|\n)|.*$/g
	var locator = domBuilder.locator;
	
	var parseStack = [{currentNSMap:defaultNSMapCopy}]
	var closeMap = {};
	var start = 0;
	while(true){
		try{
			var tagStart = source.indexOf('<',start);
			if(tagStart<0){
				if(!source.substr(start).match(/^\s*$/)){
					var doc = domBuilder.doc;
	    			var text = doc.createTextNode(source.substr(start));
	    			doc.appendChild(text);
	    			domBuilder.currentElement = text;
				}
				return;
			}
			if(tagStart>start){
				appendText(tagStart);
			}
			switch(source.charAt(tagStart+1)){
			case '/':
				var end = source.indexOf('>',tagStart+3);
				var tagName = source.substring(tagStart+2,end);
				var config = parseStack.pop();
				if(end<0){
					
	        		tagName = source.substring(tagStart+2).replace(/[\s<].*/,'');
	        		//console.error('#@@@@@@'+tagName)
	        		errorHandler.error("end tag name: "+tagName+' is not complete:'+config.tagName);
	        		end = tagStart+1+tagName.length;
	        	}else if(tagName.match(/\s</)){
	        		tagName = tagName.replace(/[\s<].*/,'');
	        		errorHandler.error("end tag name: "+tagName+' maybe not complete');
	        		end = tagStart+1+tagName.length;
				}
				//console.error(parseStack.length,parseStack)
				//console.error(config);
				var localNSMap = config.localNSMap;
				var endMatch = config.tagName == tagName;
				var endIgnoreCaseMach = endMatch || config.tagName&&config.tagName.toLowerCase() == tagName.toLowerCase()
		        if(endIgnoreCaseMach){
		        	domBuilder.endElement(config.uri,config.localName,tagName);
					if(localNSMap){
						for(var prefix in localNSMap){
							domBuilder.endPrefixMapping(prefix) ;
						}
					}
					if(!endMatch){
		            	errorHandler.fatalError("end tag name: "+tagName+' is not match the current start tagName:'+config.tagName );
					}
		        }else{
		        	parseStack.push(config)
		        }
				
				end++;
				break;
				// end elment
			case '?':// <?...?>
				locator&&position(tagStart);
				end = parseInstruction(source,tagStart,domBuilder);
				break;
			case '!':// <!doctype,<![CDATA,<!--
				locator&&position(tagStart);
				end = parseDCC(source,tagStart,domBuilder,errorHandler);
				break;
			default:
				locator&&position(tagStart);
				var el = new ElementAttributes();
				var currentNSMap = parseStack[parseStack.length-1].currentNSMap;
				//elStartEnd
				var end = parseElementStartPart(source,tagStart,el,currentNSMap,entityReplacer,errorHandler);
				var len = el.length;
				
				
				if(!el.closed && fixSelfClosed(source,end,el.tagName,closeMap)){
					el.closed = true;
					if(!entityMap.nbsp){
						errorHandler.warning('unclosed xml attribute');
					}
				}
				if(locator && len){
					var locator2 = copyLocator(locator,{});
					//try{//attribute position fixed
					for(var i = 0;i<len;i++){
						var a = el[i];
						position(a.offset);
						a.locator = copyLocator(locator,{});
					}
					//}catch(e){console.error('@@@@@'+e)}
					domBuilder.locator = locator2
					if(appendElement(el,domBuilder,currentNSMap)){
						parseStack.push(el)
					}
					domBuilder.locator = locator;
				}else{
					if(appendElement(el,domBuilder,currentNSMap)){
						parseStack.push(el)
					}
				}
				
				
				
				if(el.uri === 'http://www.w3.org/1999/xhtml' && !el.closed){
					end = parseHtmlSpecialContent(source,end,el.tagName,entityReplacer,domBuilder)
				}else{
					end++;
				}
			}
		}catch(e){
			errorHandler.error('element parse error: '+e)
			//errorHandler.error('element parse error: '+e);
			end = -1;
			//throw e;
		}
		if(end>start){
			start = end;
		}else{
			//TODO: 这里有可能sax回退，有位置错误风险
			appendText(Math.max(tagStart,start)+1);
		}
	}
}
function copyLocator(f,t){
	t.lineNumber = f.lineNumber;
	t.columnNumber = f.columnNumber;
	return t;
}

/**
 * @see #appendElement(source,elStartEnd,el,selfClosed,entityReplacer,domBuilder,parseStack);
 * @return end of the elementStartPart(end of elementEndPart for selfClosed el)
 */
function parseElementStartPart(source,start,el,currentNSMap,entityReplacer,errorHandler){
	var attrName;
	var value;
	var p = ++start;
	var s = S_TAG;//status
	while(true){
		var c = source.charAt(p);
		switch(c){
		case '=':
			if(s === S_ATTR){//attrName
				attrName = source.slice(start,p);
				s = S_EQ;
			}else if(s === S_ATTR_SPACE){
				s = S_EQ;
			}else{
				//fatalError: equal must after attrName or space after attrName
				throw new Error('attribute equal must after attrName');
			}
			break;
		case '\'':
		case '"':
			if(s === S_EQ || s === S_ATTR //|| s == S_ATTR_SPACE
				){//equal
				if(s === S_ATTR){
					errorHandler.warning('attribute value must after "="')
					attrName = source.slice(start,p)
				}
				start = p+1;
				p = source.indexOf(c,start)
				if(p>0){
					value = source.slice(start,p).replace(/&#?\w+;/g,entityReplacer);
					el.add(attrName,value,start-1);
					s = S_ATTR_END;
				}else{
					//fatalError: no end quot match
					throw new Error('attribute value no end \''+c+'\' match');
				}
			}else if(s == S_ATTR_NOQUOT_VALUE){
				value = source.slice(start,p).replace(/&#?\w+;/g,entityReplacer);
				//console.log(attrName,value,start,p)
				el.add(attrName,value,start);
				//console.dir(el)
				errorHandler.warning('attribute "'+attrName+'" missed start quot('+c+')!!');
				start = p+1;
				s = S_ATTR_END
			}else{
				//fatalError: no equal before
				throw new Error('attribute value must after "="');
			}
			break;
		case '/':
			switch(s){
			case S_TAG:
				el.setTagName(source.slice(start,p));
			case S_ATTR_END:
			case S_TAG_SPACE:
			case S_TAG_CLOSE:
				s =S_TAG_CLOSE;
				el.closed = true;
			case S_ATTR_NOQUOT_VALUE:
			case S_ATTR:
			case S_ATTR_SPACE:
				break;
			//case S_EQ:
			default:
				throw new Error("attribute invalid close char('/')")
			}
			break;
		case ''://end document
			//throw new Error('unexpected end of input')
			errorHandler.error('unexpected end of input');
			if(s == S_TAG){
				el.setTagName(source.slice(start,p));
			}
			return p;
		case '>':
			switch(s){
			case S_TAG:
				el.setTagName(source.slice(start,p));
			case S_ATTR_END:
			case S_TAG_SPACE:
			case S_TAG_CLOSE:
				break;//normal
			case S_ATTR_NOQUOT_VALUE://Compatible state
			case S_ATTR:
				value = source.slice(start,p);
				if(value.slice(-1) === '/'){
					el.closed  = true;
					value = value.slice(0,-1)
				}
			case S_ATTR_SPACE:
				if(s === S_ATTR_SPACE){
					value = attrName;
				}
				if(s == S_ATTR_NOQUOT_VALUE){
					errorHandler.warning('attribute "'+value+'" missed quot(")!!');
					el.add(attrName,value.replace(/&#?\w+;/g,entityReplacer),start)
				}else{
					if(currentNSMap[''] !== 'http://www.w3.org/1999/xhtml' || !value.match(/^(?:disabled|checked|selected)$/i)){
						errorHandler.warning('attribute "'+value+'" missed value!! "'+value+'" instead!!')
					}
					el.add(value,value,start)
				}
				break;
			case S_EQ:
				throw new Error('attribute value missed!!');
			}
//			console.log(tagName,tagNamePattern,tagNamePattern.test(tagName))
			return p;
		/*xml space '\x20' | #x9 | #xD | #xA; */
		case '\u0080':
			c = ' ';
		default:
			if(c<= ' '){//space
				switch(s){
				case S_TAG:
					el.setTagName(source.slice(start,p));//tagName
					s = S_TAG_SPACE;
					break;
				case S_ATTR:
					attrName = source.slice(start,p)
					s = S_ATTR_SPACE;
					break;
				case S_ATTR_NOQUOT_VALUE:
					var value = source.slice(start,p).replace(/&#?\w+;/g,entityReplacer);
					errorHandler.warning('attribute "'+value+'" missed quot(")!!');
					el.add(attrName,value,start)
				case S_ATTR_END:
					s = S_TAG_SPACE;
					break;
				//case S_TAG_SPACE:
				//case S_EQ:
				//case S_ATTR_SPACE:
				//	void();break;
				//case S_TAG_CLOSE:
					//ignore warning
				}
			}else{//not space
//S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
//S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
				switch(s){
				//case S_TAG:void();break;
				//case S_ATTR:void();break;
				//case S_ATTR_NOQUOT_VALUE:void();break;
				case S_ATTR_SPACE:
					var tagName =  el.tagName;
					if(currentNSMap[''] !== 'http://www.w3.org/1999/xhtml' || !attrName.match(/^(?:disabled|checked|selected)$/i)){
						errorHandler.warning('attribute "'+attrName+'" missed value!! "'+attrName+'" instead2!!')
					}
					el.add(attrName,attrName,start);
					start = p;
					s = S_ATTR;
					break;
				case S_ATTR_END:
					errorHandler.warning('attribute space is required"'+attrName+'"!!')
				case S_TAG_SPACE:
					s = S_ATTR;
					start = p;
					break;
				case S_EQ:
					s = S_ATTR_NOQUOT_VALUE;
					start = p;
					break;
				case S_TAG_CLOSE:
					throw new Error("elements closed character '/' and '>' must be connected to");
				}
			}
		}//end outer switch
		//console.log('p++',p)
		p++;
	}
}
/**
 * @return true if has new namespace define
 */
function appendElement(el,domBuilder,currentNSMap){
	var tagName = el.tagName;
	var localNSMap = null;
	//var currentNSMap = parseStack[parseStack.length-1].currentNSMap;
	var i = el.length;
	while(i--){
		var a = el[i];
		var qName = a.qName;
		var value = a.value;
		var nsp = qName.indexOf(':');
		if(nsp>0){
			var prefix = a.prefix = qName.slice(0,nsp);
			var localName = qName.slice(nsp+1);
			var nsPrefix = prefix === 'xmlns' && localName
		}else{
			localName = qName;
			prefix = null
			nsPrefix = qName === 'xmlns' && ''
		}
		//can not set prefix,because prefix !== ''
		a.localName = localName ;
		//prefix == null for no ns prefix attribute 
		if(nsPrefix !== false){//hack!!
			if(localNSMap == null){
				localNSMap = {}
				//console.log(currentNSMap,0)
				_copy(currentNSMap,currentNSMap={})
				//console.log(currentNSMap,1)
			}
			currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
			a.uri = 'http://www.w3.org/2000/xmlns/'
			domBuilder.startPrefixMapping(nsPrefix, value) 
		}
	}
	var i = el.length;
	while(i--){
		a = el[i];
		var prefix = a.prefix;
		if(prefix){//no prefix attribute has no namespace
			if(prefix === 'xml'){
				a.uri = 'http://www.w3.org/XML/1998/namespace';
			}if(prefix !== 'xmlns'){
				a.uri = currentNSMap[prefix || '']
				
				//{console.log('###'+a.qName,domBuilder.locator.systemId+'',currentNSMap,a.uri)}
			}
		}
	}
	var nsp = tagName.indexOf(':');
	if(nsp>0){
		prefix = el.prefix = tagName.slice(0,nsp);
		localName = el.localName = tagName.slice(nsp+1);
	}else{
		prefix = null;//important!!
		localName = el.localName = tagName;
	}
	//no prefix element has default namespace
	var ns = el.uri = currentNSMap[prefix || ''];
	domBuilder.startElement(ns,localName,tagName,el);
	//endPrefixMapping and startPrefixMapping have not any help for dom builder
	//localNSMap = null
	if(el.closed){
		domBuilder.endElement(ns,localName,tagName);
		if(localNSMap){
			for(prefix in localNSMap){
				domBuilder.endPrefixMapping(prefix) 
			}
		}
	}else{
		el.currentNSMap = currentNSMap;
		el.localNSMap = localNSMap;
		//parseStack.push(el);
		return true;
	}
}
function parseHtmlSpecialContent(source,elStartEnd,tagName,entityReplacer,domBuilder){
	if(/^(?:script|textarea)$/i.test(tagName)){
		var elEndStart =  source.indexOf('</'+tagName+'>',elStartEnd);
		var text = source.substring(elStartEnd+1,elEndStart);
		if(/[&<]/.test(text)){
			if(/^script$/i.test(tagName)){
				//if(!/\]\]>/.test(text)){
					//lexHandler.startCDATA();
					domBuilder.characters(text,0,text.length);
					//lexHandler.endCDATA();
					return elEndStart;
				//}
			}//}else{//text area
				text = text.replace(/&#?\w+;/g,entityReplacer);
				domBuilder.characters(text,0,text.length);
				return elEndStart;
			//}
			
		}
	}
	return elStartEnd+1;
}
function fixSelfClosed(source,elStartEnd,tagName,closeMap){
	//if(tagName in closeMap){
	var pos = closeMap[tagName];
	if(pos == null){
		//console.log(tagName)
		pos =  source.lastIndexOf('</'+tagName+'>')
		if(pos<elStartEnd){//忘记闭合
			pos = source.lastIndexOf('</'+tagName)
		}
		closeMap[tagName] =pos
	}
	return pos<elStartEnd;
	//} 
}
function _copy(source,target){
	for(var n in source){target[n] = source[n]}
}
function parseDCC(source,start,domBuilder,errorHandler){//sure start with '<!'
	var next= source.charAt(start+2)
	switch(next){
	case '-':
		if(source.charAt(start + 3) === '-'){
			var end = source.indexOf('-->',start+4);
			//append comment source.substring(4,end)//<!--
			if(end>start){
				domBuilder.comment(source,start+4,end-start-4);
				return end+3;
			}else{
				errorHandler.error("Unclosed comment");
				return -1;
			}
		}else{
			//error
			return -1;
		}
	default:
		if(source.substr(start+3,6) == 'CDATA['){
			var end = source.indexOf(']]>',start+9);
			domBuilder.startCDATA();
			domBuilder.characters(source,start+9,end-start-9);
			domBuilder.endCDATA() 
			return end+3;
		}
		//<!DOCTYPE
		//startDTD(java.lang.String name, java.lang.String publicId, java.lang.String systemId) 
		var matchs = split(source,start);
		var len = matchs.length;
		if(len>1 && /!doctype/i.test(matchs[0][0])){
			var name = matchs[1][0];
			var pubid = len>3 && /^public$/i.test(matchs[2][0]) && matchs[3][0]
			var sysid = len>4 && matchs[4][0];
			var lastMatch = matchs[len-1]
			domBuilder.startDTD(name,pubid && pubid.replace(/^(['"])(.*?)\1$/,'$2'),
					sysid && sysid.replace(/^(['"])(.*?)\1$/,'$2'));
			domBuilder.endDTD();
			
			return lastMatch.index+lastMatch[0].length
		}
	}
	return -1;
}



function parseInstruction(source,start,domBuilder){
	var end = source.indexOf('?>',start);
	if(end){
		var match = source.substring(start,end).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
		if(match){
			var len = match[0].length;
			domBuilder.processingInstruction(match[1], match[2]) ;
			return end+2;
		}else{//error
			return -1;
		}
	}
	return -1;
}

/**
 * @param source
 */
function ElementAttributes(source){
	
}
ElementAttributes.prototype = {
	setTagName:function(tagName){
		if(!tagNamePattern.test(tagName)){
			throw new Error('invalid tagName:'+tagName)
		}
		this.tagName = tagName
	},
	add:function(qName,value,offset){
		if(!tagNamePattern.test(qName)){
			throw new Error('invalid attribute:'+qName)
		}
		this[this.length++] = {qName:qName,value:value,offset:offset}
	},
	length:0,
	getLocalName:function(i){return this[i].localName},
	getLocator:function(i){return this[i].locator},
	getQName:function(i){return this[i].qName},
	getURI:function(i){return this[i].uri},
	getValue:function(i){return this[i].value}
//	,getIndex:function(uri, localName)){
//		if(localName){
//			
//		}else{
//			var qName = uri
//		}
//	},
//	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
//	getType:function(uri,localName){}
//	getType:function(i){},
}




function _set_proto_(thiz,parent){
	thiz.__proto__ = parent;
	return thiz;
}
if(!(_set_proto_({},_set_proto_.prototype) instanceof _set_proto_)){
	_set_proto_ = function(thiz,parent){
		function p(){};
		p.prototype = parent;
		p = new p();
		for(parent in thiz){
			p[parent] = thiz[parent];
		}
		return p;
	}
}

function split(source,start){
	var match;
	var buf = [];
	var reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
	reg.lastIndex = start;
	reg.exec(source);//skip <
	while(match = reg.exec(source)){
		buf.push(match);
		if(match[1])return buf;
	}
}

exports.XMLReader = XMLReader;



/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__filename) {
/**
 * Module dependencies.
 */

var fs = __webpack_require__(4)
  , path = __webpack_require__(43)
  , join = path.join
  , dirname = path.dirname
  , exists = fs.existsSync || path.existsSync
  , defaults = {
        arrow: process.env.NODE_BINDINGS_ARROW || ' → '
      , compiled: process.env.NODE_BINDINGS_COMPILED_DIR || 'compiled'
      , platform: process.platform
      , arch: process.arch
      , version: process.versions.node
      , bindings: 'bindings.node'
      , try: [
          // node-gyp's linked version in the "build" dir
          [ 'module_root', 'build', 'bindings' ]
          // node-waf and gyp_addon (a.k.a node-gyp)
        , [ 'module_root', 'build', 'Debug', 'bindings' ]
        , [ 'module_root', 'build', 'Release', 'bindings' ]
          // Debug files, for development (legacy behavior, remove for node v0.9)
        , [ 'module_root', 'out', 'Debug', 'bindings' ]
        , [ 'module_root', 'Debug', 'bindings' ]
          // Release files, but manually compiled (legacy behavior, remove for node v0.9)
        , [ 'module_root', 'out', 'Release', 'bindings' ]
        , [ 'module_root', 'Release', 'bindings' ]
          // Legacy from node-waf, node <= 0.4.x
        , [ 'module_root', 'build', 'default', 'bindings' ]
          // Production "Release" buildtype binary (meh...)
        , [ 'module_root', 'compiled', 'version', 'platform', 'arch', 'bindings' ]
        ]
    }

/**
 * The main `bindings()` function loads the compiled bindings for a given module.
 * It uses V8's Error API to determine the parent filename that this function is
 * being invoked from, which is then used to find the root directory.
 */

function bindings (opts) {

  // Argument surgery
  if (typeof opts == 'string') {
    opts = { bindings: opts }
  } else if (!opts) {
    opts = {}
  }
  opts.__proto__ = defaults

  // Get the module root
  if (!opts.module_root) {
    opts.module_root = exports.getRoot(exports.getFileName())
  }

  // Ensure the given bindings name ends with .node
  if (path.extname(opts.bindings) != '.node') {
    opts.bindings += '.node'
  }

  var tries = []
    , i = 0
    , l = opts.try.length
    , n
    , b
    , err

  for (; i<l; i++) {
    n = join.apply(null, opts.try[i].map(function (p) {
      return opts[p] || p
    }))
    tries.push(n)
    try {
      b = opts.path ? /*require.resolve*/(!(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())) : !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())
      if (!opts.path) {
        b.path = n
      }
      return b
    } catch (e) {
      if (!/not find/i.test(e.message)) {
        throw e
      }
    }
  }

  err = new Error('Could not locate the bindings file. Tried:\n'
    + tries.map(function (a) { return opts.arrow + a }).join('\n'))
  err.tries = tries
  throw err
}
module.exports = exports = bindings


/**
 * Gets the filename of the JavaScript file that invokes this function.
 * Used to help find the root directory of a module.
 * Optionally accepts an filename argument to skip when searching for the invoking filename
 */

exports.getFileName = function getFileName (calling_file) {
  var origPST = Error.prepareStackTrace
    , origSTL = Error.stackTraceLimit
    , dummy = {}
    , fileName

  Error.stackTraceLimit = 10

  Error.prepareStackTrace = function (e, st) {
    for (var i=0, l=st.length; i<l; i++) {
      fileName = st[i].getFileName()
      if (fileName !== __filename) {
        if (calling_file) {
            if (fileName !== calling_file) {
              return
            }
        } else {
          return
        }
      }
    }
  }

  // run the 'prepareStackTrace' function above
  Error.captureStackTrace(dummy)
  dummy.stack

  // cleanup
  Error.prepareStackTrace = origPST
  Error.stackTraceLimit = origSTL

  return fileName
}

/**
 * Gets the root directory of a module, given an arbitrary filename
 * somewhere in the module tree. The "root directory" is the directory
 * containing the `package.json` file.
 *
 *   In:  /home/nate/node-native-module/lib/index.js
 *   Out: /home/nate/node-native-module
 */

exports.getRoot = function getRoot (file) {
  var dir = dirname(file)
    , prev
  while (true) {
    if (dir === '.') {
      // Avoids an infinite loop in rare cases, like the REPL
      dir = process.cwd()
    }
    if (exists(join(dir, 'package.json')) || exists(join(dir, 'node_modules'))) {
      // Found the 'package.json' file or 'node_modules' dir; we're done
      return dir
    }
    if (prev === dir) {
      // Got to the top
      throw new Error('Could not find module root given file: "' + file
                    + '". Do you have a `package.json` file? ')
    }
    // Try the parent dir next
    prev = dir
    dir = join(dir, '..')
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, "/index.js"))

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*!
 * bufferutil: WebSocket buffer utils
 * Copyright(c) 2015 Einar Otto Stangvik <einaros@gmail.com>
 * MIT Licensed
 */

module.exports.BufferUtil = {
  merge: function(mergedBuffer, buffers) {
    for (var i = 0, offset = 0, l = buffers.length; i < l; ++i) {
      var buf = buffers[i];

      buf.copy(mergedBuffer, offset);
      offset += buf.length;
    }
  },

  mask: function(source, mask, output, offset, length) {
    var maskNum = mask.readUInt32LE(0, true)
      , i = 0
      , num;

    for (; i < length - 3; i += 4) {
      num = maskNum ^ source.readUInt32LE(i, true);

      if (num < 0) num = 4294967296 + num;
      output.writeUInt32LE(num, offset + i, true);
    }

    switch (length % 4) {
      case 3: output[offset + i + 2] = source[i + 2] ^ mask[2];
      case 2: output[offset + i + 1] = source[i + 1] ^ mask[1];
      case 1: output[offset + i] = source[i] ^ mask[0];
    }
  },

  unmask: function(data, mask) {
    var maskNum = mask.readUInt32LE(0, true)
      , length = data.length
      , i = 0
      , num;

    for (; i < length - 3; i += 4) {
      num = maskNum ^ data.readUInt32LE(i, true);

      if (num < 0) num = 4294967296 + num;
      data.writeUInt32LE(num, i, true);
    }

    switch (length % 4) {
      case 3: data[i + 2] = data[i + 2] ^ mask[2];
      case 2: data[i + 1] = data[i + 1] ^ mask[1];
      case 1: data[i] = data[i] ^ mask[0];
    }
  }
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


try {
  module.exports = __webpack_require__(77)('bufferutil');
} catch (e) {
  module.exports = __webpack_require__(78);
}


/***/ }),
/* 80 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = require("net");

/***/ }),
/* 82 */
/***/ (function(module, exports) {

module.exports = require("tls");

/***/ })
/******/ ])));