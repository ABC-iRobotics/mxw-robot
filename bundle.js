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
/******/ 	return __webpack_require__(__webpack_require__.s = 28);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!
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
      this._events.maxListeners = conf.maxListeners !== undefined ? conf.maxListeners : defaultMaxListeners;
      conf.wildcard && (this.wildcard = conf.wildcard);
      conf.newListener && (this.newListener = conf.newListener);
      conf.verboseMemoryLeak && (this.verboseMemoryLeak = conf.verboseMemoryLeak);

      if (this.wildcard) {
        this.listenerTree = {};
      }
    } else {
      this._events.maxListeners = defaultMaxListeners;
    }
  }

  function logPossibleMemoryLeak(count, eventName) {
    var errorMsg = '(node) warning: possible EventEmitter memory ' +
        'leak detected. %d listeners added. ' +
        'Use emitter.setMaxListeners() to increase limit.';

    if(this.verboseMemoryLeak){
      errorMsg += ' Event name: %s.';
      console.error(errorMsg, count, eventName);
    } else {
      console.error(errorMsg, count);
    }

    if (console.trace){
      console.trace();
    }
  }

  function EventEmitter(conf) {
    this._events = {};
    this.newListener = false;
    this.verboseMemoryLeak = false;
    configure.call(this, conf);
  }
  EventEmitter.EventEmitter2 = EventEmitter; // backwards compatibility for exporting EventEmitter property

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

    while (name !== undefined) {

      if (!tree[name]) {
        tree[name] = {};
      }

      tree = tree[name];

      if (type.length === 0) {

        if (!tree._listeners) {
          tree._listeners = listener;
        }
        else {
          if (typeof tree._listeners === 'function') {
            tree._listeners = [tree._listeners];
          }

          tree._listeners.push(listener);

          if (
            !tree._listeners.warned &&
            this._events.maxListeners > 0 &&
            tree._listeners.length > this._events.maxListeners
          ) {
            tree._listeners.warned = true;
            logPossibleMemoryLeak.call(this, tree._listeners.length, name);
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
    if (n !== undefined) {
      this._events || init.call(this);
      this._events.maxListeners = n;
      if (!this._conf) this._conf = {};
      this._conf.maxListeners = n;
    }
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
      if (!this._events.newListener) {
        return false;
      }
    }

    var al = arguments.length;
    var args,l,i,j;
    var handler;

    if (this._all && this._all.length) {
      handler = this._all.slice();
      if (al > 3) {
        args = new Array(al);
        for (j = 0; j < al; j++) args[j] = arguments[j];
      }

      for (i = 0, l = handler.length; i < l; i++) {
        this.event = type;
        switch (al) {
        case 1:
          handler[i].call(this, type);
          break;
        case 2:
          handler[i].call(this, type, arguments[1]);
          break;
        case 3:
          handler[i].call(this, type, arguments[1], arguments[2]);
          break;
        default:
          handler[i].apply(this, args);
        }
      }
    }

    if (this.wildcard) {
      handler = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
    } else {
      handler = this._events[type];
      if (typeof handler === 'function') {
        this.event = type;
        switch (al) {
        case 1:
          handler.call(this);
          break;
        case 2:
          handler.call(this, arguments[1]);
          break;
        case 3:
          handler.call(this, arguments[1], arguments[2]);
          break;
        default:
          args = new Array(al - 1);
          for (j = 1; j < al; j++) args[j - 1] = arguments[j];
          handler.apply(this, args);
        }
        return true;
      } else if (handler) {
        // need to make copy of handlers because list can change in the middle
        // of emit call
        handler = handler.slice();
      }
    }

    if (handler && handler.length) {
      if (al > 3) {
        args = new Array(al - 1);
        for (j = 1; j < al; j++) args[j - 1] = arguments[j];
      }
      for (i = 0, l = handler.length; i < l; i++) {
        this.event = type;
        switch (al) {
        case 1:
          handler[i].call(this);
          break;
        case 2:
          handler[i].call(this, arguments[1]);
          break;
        case 3:
          handler[i].call(this, arguments[1], arguments[2]);
          break;
        default:
          handler[i].apply(this, args);
        }
      }
      return true;
    } else if (!this._all && type === 'error') {
      if (arguments[1] instanceof Error) {
        throw arguments[1]; // Unhandled 'error' event
      } else {
        throw new Error("Uncaught, unspecified 'error' event.");
      }
      return false;
    }

    return !!this._all;
  };

  EventEmitter.prototype.emitAsync = function() {

    this._events || init.call(this);

    var type = arguments[0];

    if (type === 'newListener' && !this.newListener) {
        if (!this._events.newListener) { return Promise.resolve([false]); }
    }

    var promises= [];

    var al = arguments.length;
    var args,l,i,j;
    var handler;

    if (this._all) {
      if (al > 3) {
        args = new Array(al);
        for (j = 1; j < al; j++) args[j] = arguments[j];
      }
      for (i = 0, l = this._all.length; i < l; i++) {
        this.event = type;
        switch (al) {
        case 1:
          promises.push(this._all[i].call(this, type));
          break;
        case 2:
          promises.push(this._all[i].call(this, type, arguments[1]));
          break;
        case 3:
          promises.push(this._all[i].call(this, type, arguments[1], arguments[2]));
          break;
        default:
          promises.push(this._all[i].apply(this, args));
        }
      }
    }

    if (this.wildcard) {
      handler = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
    } else {
      handler = this._events[type];
    }

    if (typeof handler === 'function') {
      this.event = type;
      switch (al) {
      case 1:
        promises.push(handler.call(this));
        break;
      case 2:
        promises.push(handler.call(this, arguments[1]));
        break;
      case 3:
        promises.push(handler.call(this, arguments[1], arguments[2]));
        break;
      default:
        args = new Array(al - 1);
        for (j = 1; j < al; j++) args[j - 1] = arguments[j];
        promises.push(handler.apply(this, args));
      }
    } else if (handler && handler.length) {
      if (al > 3) {
        args = new Array(al - 1);
        for (j = 1; j < al; j++) args[j - 1] = arguments[j];
      }
      for (i = 0, l = handler.length; i < l; i++) {
        this.event = type;
        switch (al) {
        case 1:
          promises.push(handler[i].call(this));
          break;
        case 2:
          promises.push(handler[i].call(this, arguments[1]));
          break;
        case 3:
          promises.push(handler[i].call(this, arguments[1], arguments[2]));
          break;
        default:
          promises.push(handler[i].apply(this, args));
        }
      }
    } else if (!this._all && type === 'error') {
      if (arguments[1] instanceof Error) {
        return Promise.reject(arguments[1]); // Unhandled 'error' event
      } else {
        return Promise.reject("Uncaught, unspecified 'error' event.");
      }
    }

    return Promise.all(promises);
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

    if (this.wildcard) {
      growListenerTree.call(this, type, listener);
      return this;
    }

    if (!this._events[type]) {
      // Optimize the case of one listener. Don't need the extra array object.
      this._events[type] = listener;
    }
    else {
      if (typeof this._events[type] === 'function') {
        // Change to array.
        this._events[type] = [this._events[type]];
      }

      // If we've already got an array, just append.
      this._events[type].push(listener);

      // Check for listener leak
      if (
        !this._events[type].warned &&
        this._events.maxListeners > 0 &&
        this._events[type].length > this._events.maxListeners
      ) {
        this._events[type].warned = true;
        logPossibleMemoryLeak.call(this, this._events[type].length, type);
      }
    }

    return this;
  };

  EventEmitter.prototype.onAny = function(fn) {
    if (typeof fn !== 'function') {
      throw new Error('onAny only accepts instances of Function');
    }

    if (!this._all) {
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

        this.emit("removeListener", type, listener);

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

        this.emit("removeListener", type, listener);
      }
    }

    function recursivelyGarbageCollect(root) {
      if (root === undefined) {
        return;
      }
      var keys = Object.keys(root);
      for (var i in keys) {
        var key = keys[i];
        var obj = root[key];
        if ((obj instanceof Function) || (typeof obj !== "object") || (obj === null))
          continue;
        if (Object.keys(obj).length > 0) {
          recursivelyGarbageCollect(root[key]);
        }
        if (Object.keys(obj).length === 0) {
          delete root[key];
        }
      }
    }
    recursivelyGarbageCollect(this.listenerTree);

    return this;
  };

  EventEmitter.prototype.offAny = function(fn) {
    var i = 0, l = 0, fns;
    if (fn && this._all && this._all.length > 0) {
      fns = this._all;
      for(i = 0, l = fns.length; i < l; i++) {
        if(fn === fns[i]) {
          fns.splice(i, 1);
          this.emit("removeListenerAny", fn);
          return this;
        }
      }
    } else {
      fns = this._all;
      for(i = 0, l = fns.length; i < l; i++)
        this.emit("removeListenerAny", fns[i]);
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

    if (this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      var leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);

      for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
        var leaf = leafs[iLeaf];
        leaf._listeners = null;
      }
    }
    else if (this._events) {
      this._events[type] = null;
    }
    return this;
  };

  EventEmitter.prototype.listeners = function(type) {
    if (this.wildcard) {
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

  EventEmitter.prototype.listenerCount = function(type) {
    return this.listeners(type).length;
  };

  EventEmitter.prototype.listenersAny = function() {

    if(this._all) {
      return this._all;
    }
    else {
      return [];
    }

  };

  if (true) {
     // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
      return EventEmitter;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports === 'object') {
    // CommonJS
    module.exports = EventEmitter;
  }
  else {
    // Browser global.
    window.EventEmitter2 = EventEmitter;
  }
}();


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
/* 5 */
/***/ (function(module, exports) {

module.exports = {
	URDF_SPHERE : 0,
	URDF_BOX : 1,
	URDF_CYLINDER : 2,
	URDF_MESH : 3
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileoverview
 * @author Brandon Alexander - baalexander@gmail.com
 */

var ServiceResponse = __webpack_require__(15);
var ServiceRequest = __webpack_require__(4);
var EventEmitter2 = __webpack_require__(0).EventEmitter2;

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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileoverview
 * @author Brandon Alexander - baalexander@gmail.com
 */

var EventEmitter2 = __webpack_require__(0).EventEmitter2;
var Message = __webpack_require__(2);

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
 *   * reconnect_on_close - the flag to enable resubscription and readvertisement on close event(defaults to true).
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
  this.reconnect_on_close = options.reconnect_on_close || true;

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
  if (this.reconnect_on_close) {
    this.callForSubscribeAndAdvertise = function(message) {
      that.ros.callOnConnection(message);

      that.waitForReconnect = false;
      that.reconnectFunc = function() {
        if(!that.waitForReconnect) {
          that.waitForReconnect = true;
          that.ros.callOnConnection(message);
          that.ros.once('connection', function() {
            that.waitForReconnect = false;
          });
        }
      };
      that.ros.on('close', that.reconnectFunc);
    };
  }
  else {
    this.callForSubscribeAndAdvertise = this.ros.callOnConnection;
  }

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

  this.callForSubscribeAndAdvertise({
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
  if(this.reconnect_on_close) {
    this.ros.off('close', this.reconnectFunc);
  }
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
  this.callForSubscribeAndAdvertise({
    op: 'advertise',
    id: this.advertiseId,
    type: this.messageType,
    topic: this.name,
    latch: this.latch,
    queue_size: this.queue_size
  });
  this.isAdvertised = true;

  if(!this.reconnect_on_close) {
    var that = this;
    this.ros.on('close', function() {
      that.isAdvertised = false;
    });
  }
};

/**
 * Unregisters as a publisher for the topic.
 */
Topic.prototype.unadvertise = function() {
  if (!this.isAdvertised) {
    return;
  }
  if(this.reconnect_on_close) {
    this.ros.off('close', this.reconnectFunc);
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
/* 8 */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileoverview
 * @author Brandon Alexander - baalexander@gmail.com
 */

var WebSocket = __webpack_require__(25);
var socketAdapter = __webpack_require__(33);

var Service = __webpack_require__(6);
var ServiceRequest = __webpack_require__(4);

var assign = __webpack_require__(1);
var EventEmitter2 = __webpack_require__(0).EventEmitter2;

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
 * @param options - possible keys include: <br>
 *   * url (optional) - (can be specified later with `connect`) the WebSocket URL for rosbridge or the node server url to connect using socket.io (if socket.io exists in the page) <br>
 *   * groovyCompatibility - don't use interfaces that changed after the last groovy release or rosbridge_suite and related tools (defaults to true)
 *   * transportLibrary (optional) - one of 'websocket' (default), 'socket.io' or RTCPeerConnection instance controlling how the connection is created in `connect`.
 *   * transportOptions (optional) - the options to use use when creating a connection. Currently only used if `transportLibrary` is RTCPeerConnection.
 */
function Ros(options) {
  options = options || {};
  this.socket = null;
  this.idCounter = 0;
  this.isConnected = false;
  this.transportLibrary = options.transportLibrary || 'websocket';
  this.transportOptions = options.transportOptions || {};

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
 * @param url - WebSocket URL or RTCDataChannel label for Rosbridge
 */
Ros.prototype.connect = function(url) {
  if (this.transportLibrary === 'socket.io') {
    this.socket = assign(io(url, {'force new connection': true}), socketAdapter(this));
    this.socket.on('connect', this.socket.onopen);
    this.socket.on('data', this.socket.onmessage);
    this.socket.on('close', this.socket.onclose);
    this.socket.on('error', this.socket.onerror);
  } else if (this.transportLibrary.constructor.name === 'RTCPeerConnection') {
    this.socket = assign(this.transportLibrary.createDataChannel(url, this.transportOptions), socketAdapter(this));
  }else {
    this.socket = assign(new WebSocket(url), socketAdapter(this));
  }

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
  var emitter = null;
  if (this.transportLibrary === 'socket.io') {
    emitter = function(msg){that.socket.emit('operation', msg);};
  } else {
    emitter = function(msg){that.socket.send(msg);};
  }

  if (!this.isConnected) {
    that.once('connection', function() {
      emitter(messageJson);
    });
  } else {
    emitter(messageJson);
  }
};

/**
 * Sends a set_level request to the server
 *
 * @param level - Status level (none, error, warning, info)
 * @param id - Optional: Operation ID to change status level on
 */
Ros.prototype.setStatusLevel = function(level, id){
  var levelMsg = {
    op: 'set_level',
    level: level,
    id: id
  };

  this.callOnConnection(levelMsg);
};

/**
 * Retrieves Action Servers in ROS as an array of string
 *
 *   * actionservers - Array of action server names
 */
Ros.prototype.getActionServers = function(callback, failedCallback) {
  var getActionServers = new Service({
    ros : this,
    name : '/rosapi/action_servers',
    serviceType : 'rosapi/GetActionServers'
  });

  var request = new ServiceRequest({});
  if (typeof failedCallback === 'function'){
    getActionServers.callService(request,
      function(result) {
        callback(result.action_servers);
      },
      function(message){
        failedCallback(message);
      }
    );
  }else{
    getActionServers.callService(request, function(result) {
      callback(result.action_servers);
    });
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
        callback(result);
      },
      function(message){
        failedCallback(message);
      }
    );
  }else{
    topicsClient.callService(request, function(result) {
      callback(result);
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
 * Retrieves a detail of ROS service request.
 *
 * @param service name of service:
 * @param callback - function with params:
 *   * type - String of the service type
 */
Ros.prototype.getServiceRequestDetails = function(type, callback, failedCallback) {
  var serviceTypeClient = new Service({
    ros : this,
    name : '/rosapi/service_request_details',
    serviceType : 'rosapi/ServiceRequestDetails'
  });
  var request = new ServiceRequest({
    type: type
  });

  if (typeof failedCallback === 'function'){
    serviceTypeClient.callService(request,
      function(result) {
        callback(result);
      },
      function(message){
        failedCallback(message);
      }
    );
  }else{
    serviceTypeClient.callService(request, function(result) {
      callback(result);
    });
  }
};

/**
 * Retrieves a detail of ROS service request.
 *
 * @param service name of service:
 * @param callback - function with params:
 *   * type - String of the service type
 */
Ros.prototype.getServiceResponseDetails = function(type, callback, failedCallback) {
  var serviceTypeClient = new Service({
    ros : this,
    name : '/rosapi/service_response_details',
    serviceType : 'rosapi/ServiceResponseDetails'
  });
  var request = new ServiceRequest({
    type: type
  });

  if (typeof failedCallback === 'function'){
    serviceTypeClient.callService(request,
      function(result) {
        callback(result);
      },
      function(message){
        failedCallback(message);
      }
    );
  }else{
    serviceTypeClient.callService(request, function(result) {
      callback(result);
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
  * Retrieves list subscribed topics, publishing topics and services of a specific node
  *
  * @param node name of the node:
  * @param callback - function with params:
  *   * publications - array of published topic names
  *   * subscriptions - array of subscribed topic names
  *   * services - array of service names hosted
  */
Ros.prototype.getNodeDetails = function(node, callback, failedCallback) {
  var nodesClient = new Service({
    ros : this,
    name : '/rosapi/node_details',
    serviceType : 'rosapi/NodeDetails'
  });

  var request = new ServiceRequest({
    node: node
  });
  if (typeof failedCallback === 'function'){
    nodesClient.callService(request,
      function(result) {
        callback(result.subscribing, result.publishing, result.services);
      },
      function(message) {
        failedCallback(message);
      }
    );
  } else {
    nodesClient.callService(request, function(result) {
      callback(result);
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
/* 10 */
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview 
 * @author Benjamin Pitzer - ben.pitzer@gmail.com
 * @author Russell Toris - rctoris@wpi.edu
 */

var UrdfColor = __webpack_require__(19);

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
/* 12 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview
 * @author Russell Toris - rctoris@wpi.edu
 */

var Topic = __webpack_require__(7);
var Message = __webpack_require__(2);
var EventEmitter2 = __webpack_require__(0).EventEmitter2;

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
  this.feedbackListener = new Topic({
    ros : this.ros,
    name : this.serverName + '/feedback',
    messageType : this.actionName + 'Feedback'
  });

  this.statusListener = new Topic({
    ros : this.ros,
    name : this.serverName + '/status',
    messageType : 'actionlib_msgs/GoalStatusArray'
  });

  this.resultListener = new Topic({
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
    this.statusListener.subscribe(function(statusMessage) {
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
    this.feedbackListener.subscribe(function(feedbackMessage) {
      var goal = that.goals[feedbackMessage.status.goal_id.id];
      if (goal) {
        goal.emit('status', feedbackMessage.status);
        goal.emit('feedback', feedbackMessage.feedback);
      }
    });
  }

  // subscribe to the result topic
  if (!this.omitResult) {
    this.resultListener.subscribe(function(resultMessage) {
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

/**
 * Unsubscribe and unadvertise all topics associated with this ActionClient.
 */
ActionClient.prototype.dispose = function() {
  this.goalTopic.unadvertise();
  this.cancelTopic.unadvertise();
  if (!this.omitStatus) {this.statusListener.unsubscribe();}
  if (!this.omitFeedback) {this.feedbackListener.unsubscribe();}
  if (!this.omitResult) {this.resultListener.unsubscribe();}
};

module.exports = ActionClient;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview
 * @author Russell Toris - rctoris@wpi.edu
 */

var Message = __webpack_require__(2);
var EventEmitter2 = __webpack_require__(0).EventEmitter2;

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
/* 15 */
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileoverview
 * @author David Gossow - dgossow@willowgarage.com
 */

var Vector3 = __webpack_require__(3);
var Quaternion = __webpack_require__(8);

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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileoverview
 * @author David Gossow - dgossow@willowgarage.com
 */

var Vector3 = __webpack_require__(3);
var Quaternion = __webpack_require__(8);

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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview 
 * @author Benjamin Pitzer - ben.pitzer@gmail.com
 * @author Russell Toris - rctoris@wpi.edu
 */

var Vector3 = __webpack_require__(3);
var UrdfTypes = __webpack_require__(5);

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
/* 19 */
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview 
 * @author Benjamin Pitzer - ben.pitzer@gmail.com
 * @author Russell Toris - rctoris@wpi.edu
 */

var UrdfTypes = __webpack_require__(5);

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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview 
 * @author Benjamin Pitzer - ben.pitzer@gmail.com
 * @author Russell Toris - rctoris@wpi.edu
 */

var UrdfVisual = __webpack_require__(24);

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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview 
 * @author Benjamin Pitzer - ben.pitzer@gmail.com
 * @author Russell Toris - rctoris@wpi.edu
 */

var Vector3 = __webpack_require__(3);
var UrdfTypes = __webpack_require__(5);

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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview 
 * @author Benjamin Pitzer - ben.pitzer@gmail.com
 * @author Russell Toris - rctoris@wpi.edu
 */

var UrdfTypes = __webpack_require__(5);

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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview 
 * @author Benjamin Pitzer - ben.pitzer@gmail.com
 * @author Russell Toris - rctoris@wpi.edu
 */

var Pose = __webpack_require__(16);
var Vector3 = __webpack_require__(3);
var Quaternion = __webpack_require__(8);

var UrdfCylinder = __webpack_require__(20);
var UrdfBox = __webpack_require__(18);
var UrdfMaterial = __webpack_require__(11);
var UrdfMesh = __webpack_require__(22);
var UrdfSphere = __webpack_require__(23);

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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {module.exports = global.WebSocket;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ }),
/* 26 */
/***/ (function(module, exports) {



/***/ }),
/* 27 */
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
  REVISION : '0.19.0-SNAPSHOT'
};

var assign = __webpack_require__(1);

// Add core components
assign(ROSLIB, __webpack_require__(34));

assign(ROSLIB, __webpack_require__(31));

assign(ROSLIB, __webpack_require__(35));

assign(ROSLIB, __webpack_require__(37));

assign(ROSLIB, __webpack_require__(40));

module.exports = ROSLIB;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {// const ROSLIB = require('./dep/roslib')
const ROSLIB = __webpack_require__(27);
const fs = __webpack_require__(26);
var ipcMain;
var nextID = 0;
var robots = [];
var showJointController = false;
var debugController = false;
var debugJointController = false;
var autoLoad = false;
var showController = false;
var wom;
class MxwRobot {
  constructor(options, id) {
    this.ROS_IP = options.ROS_IP;
    this.BaseLink = options.BaseLink || 'base_link';
    this.rate = options.rate || 60;
    this.position = options.position || { x: 0, y: 0, z: 0 };
    this.scale = options.scale || 1;
    this.zoom = options.zoom || 1;
    this.id = id;
    this.parent = jsxFactory({
      elementName: 'node',
      attributes: {
        position: this.position,
        orientation: { w: 0.707, x: -0.707, y: 0, z: 0 },
        scale: this.scale
      },
      children: null
    });
    this.ros = new ROSLIB.Ros({
      url: 'ws://' + this.ROS_IP
    });
    var robot = this;

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
              links[l] = jsxFactory({
                elementName: 'mesh',
                attributes: {
                  originxyz: originxyz,
                  url: 'N_Aux_Cube.mesh'
                },
                children: null
              });
              break;
            case ROSLIB.URDF_CYLINDER:
              links[l] = jsxFactory({
                elementName: 'mesh',
                attributes: {
                  originxyz: originxyz,
                  url: 'N_Cylinder.mesh'
                },
                children: null
              });
              break;
            case ROSLIB.URDF_SPHERE:
              links[l] = jsxFactory({
                elementName: 'mesh',
                attributes: {
                  originxyz: originxyz,
                  url: 'N_Sphere.mesh'
                },
                children: null
              });
              break;
            default:
              var file = visual.geometry.filename.split('/');
              var originalMesh = file[file.length - 1].split('.');
              var mesh = urdfModel.name + '/' + originalMesh[0] + '.mesh';

              /* if (!fs.existsSync(`${__dirname}/resources/` + mesh)) {
                console.log('Mesh unavailable ' + mesh + ' Please place it into the resource folder of the component')
                ControlerLog(robot.id, 'Mesh unavailable ' + mesh + ' Please place it into the resource folder of the component')
              } else { */
              links[l] = jsxFactory({
                elementName: 'mesh',
                attributes: {
                  originxyz: originxyz,
                  url: mesh
                },
                children: null
              });
              break;
            // }
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
    // var settings = JSON.parse(fs.readFileSync(`${__dirname}/resources/` + options.file))
    var settings = { 'auto_load': 1,
      'show_controller': 1,
      'show_joint_controller': 1,
      'debug_controller': 0,
      'debug_joint_controller': 0,
      'robots': [{ 'ROS_IP': '193.224.41.168:9090', 'position': { 'x': 100, 'y': 0, 'z': 0 }, 'rate': 60, 'BaseLink': 'base_link', 'zoom': 100, 'scale': 1 }]
    };
    console.log('1');
    wom = options.mxwWom;
    ipcMain = options.mxwApp;
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
    return jsxFactory({
      elementName: 'node',
      attributes: {},
      children: null
    });
  }
};
function createController(id, options) {
  console.log('createing controller 1');
  var url = `${__dirname}/resources/control.html?id=` + id + '&ip=' + options.ROS_IP;
  console.log('creating controller 2');
  wom.render(jsxFactory({
    elementName: 'node',
    attributes: {},
    children: null
  }));
  console.log('creating cntoler 21');
  wom.render(jsxFactory({
    elementName: 'node',
    attributes: {
      id: 'controlnode' + id,
      position: { x: parseInt(options.position.x) - 20, y: parseInt(options.position.y) + 50, z: parseInt(options.position.z) + 100 },
      scale: { x: 0.03, y: 0.03, z: 0.03 },
      orientation: { w: 0.924, x: -0.383, y: 0, z: 0 }
    },
    children: [jsxFactory({
      elementName: 'browser',
      attributes: {
        id: 'control' + id,
        url: url,
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
  }));
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
  robot.parent.render(jsxFactory({
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
    children: [jsxFactory({
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
  }));
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
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview
 * @author Justin Young - justin@oodar.com.au
 * @author Russell Toris - rctoris@wpi.edu
 */

var Topic = __webpack_require__(7);
var Message = __webpack_require__(2);
var EventEmitter2 = __webpack_require__(0).EventEmitter2;

/**
 * An actionlib action listener
 *
 * Emits the following events:
 *  * 'status' - the status messages received from the action server
 *  * 'feedback' -  the feedback messages received from the action server
 *  * 'result' - the result returned from the action server
 *
 *  @constructor
 *  @param options - object with following keys:
 *   * ros - the ROSLIB.Ros connection handle
 *   * serverName - the action server name, like /fibonacci
 *   * actionName - the action message name, like 'actionlib_tutorials/FibonacciAction'
 */
function ActionListener(options) {
  var that = this;
  options = options || {};
  this.ros = options.ros;
  this.serverName = options.serverName;
  this.actionName = options.actionName;
  this.timeout = options.timeout;
  this.omitFeedback = options.omitFeedback;
  this.omitStatus = options.omitStatus;
  this.omitResult = options.omitResult;


  // create the topics associated with actionlib
  var goalListener = new Topic({
    ros : this.ros,
    name : this.serverName + '/goal',
    messageType : this.actionName + 'Goal'
  });

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

  goalListener.subscribe(function(goalMessage) {
      that.emit('goal', goalMessage);
  });

  statusListener.subscribe(function(statusMessage) {
      statusMessage.status_list.forEach(function(status) {
          that.emit('status', status);
      });
  });

  feedbackListener.subscribe(function(feedbackMessage) {
      that.emit('status', feedbackMessage.status);
      that.emit('feedback', feedbackMessage.feedback);
  });

  // subscribe to the result topic
  resultListener.subscribe(function(resultMessage) {
      that.emit('status', resultMessage.status);
      that.emit('result', resultMessage.result);
  });

}

ActionListener.prototype.__proto__ = EventEmitter2.prototype;

module.exports = ActionListener;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview
 * @author Laura Lindzey - lindzey@gmail.com
 */

var Topic = __webpack_require__(7);
var Message = __webpack_require__(2);
var EventEmitter2 = __webpack_require__(0).EventEmitter2;

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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var Ros = __webpack_require__(9);
var mixin = __webpack_require__(10);

var action = module.exports = {
    ActionClient: __webpack_require__(13),
    ActionListener: __webpack_require__(29),
    Goal: __webpack_require__(14),
    SimpleActionServer: __webpack_require__(30)
};

mixin(Ros, ['ActionClient', 'SimpleActionServer'], action);


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileoverview
 * @author Brandon Alexander - baalexander@gmail.com
 */

var Service = __webpack_require__(6);
var ServiceRequest = __webpack_require__(4);

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
/* 33 */
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


var decompressPng = __webpack_require__(42);
var WebSocket = __webpack_require__(25);
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
    } else if(message.op === 'status'){
      if(message.id){
        client.emit('status:'+message.id, message);
      } else {
        client.emit('status', message);
      }
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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var mixin = __webpack_require__(10);

var core = module.exports = {
    Ros: __webpack_require__(9),
    Topic: __webpack_require__(7),
    Message: __webpack_require__(2),
    Param: __webpack_require__(32),
    Service: __webpack_require__(6),
    ServiceRequest: __webpack_require__(4),
    ServiceResponse: __webpack_require__(15)
};

mixin(core.Ros, ['Param', 'Service', 'Topic'], core);


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    Pose: __webpack_require__(16),
    Quaternion: __webpack_require__(8),
    Transform: __webpack_require__(17),
    Vector3: __webpack_require__(3)
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileoverview
 * @author David Gossow - dgossow@willowgarage.com
 */

var ActionClient = __webpack_require__(13);
var Goal = __webpack_require__(14);

var Service = __webpack_require__(6);
var ServiceRequest = __webpack_require__(4);

var Transform = __webpack_require__(17);

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

/**
 * Unsubscribe and unadvertise all topics associated with this TFClient.
 */
TFClient.prototype.dispose = function() {
  this.actionClient.dispose();
  if (this.currentTopic) {
    this.currentTopic.unsubscribe();
  }
};

module.exports = TFClient;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var Ros = __webpack_require__(9);
var mixin = __webpack_require__(10);

var tf = module.exports = {
    TFClient: __webpack_require__(36)
};

mixin(Ros, ['TFClient'], tf);

/***/ }),
/* 38 */
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

  var parents = options.xml.getElementsByTagName('parent');
  if(parents.length > 0) {
    this.parent = parents[0].getAttribute('link');
  }

  var children = options.xml.getElementsByTagName('child');
  if(children.length > 0) {
    this.child = children[0].getAttribute('link');
  }

  var limits = options.xml.getElementsByTagName('limit');
  if (limits.length > 0) {
    this.minval = parseFloat( limits[0].getAttribute('lower') );
    this.maxval = parseFloat( limits[0].getAttribute('upper') );
  }
}

module.exports = UrdfJoint;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview 
 * @author Benjamin Pitzer - ben.pitzer@gmail.com
 * @author Russell Toris - rctoris@wpi.edu
 */

var UrdfMaterial = __webpack_require__(11);
var UrdfLink = __webpack_require__(21);
var UrdfJoint = __webpack_require__(38);
var DOMParser = __webpack_require__(43).DOMParser;

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
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1)({
    UrdfBox: __webpack_require__(18),
    UrdfColor: __webpack_require__(19),
    UrdfCylinder: __webpack_require__(20),
    UrdfLink: __webpack_require__(21),
    UrdfMaterial: __webpack_require__(11),
    UrdfMesh: __webpack_require__(22),
    UrdfModel: __webpack_require__(39),
    UrdfSphere: __webpack_require__(23),
    UrdfVisual: __webpack_require__(24)
}, __webpack_require__(5));


/***/ }),
/* 41 */
/***/ (function(module, exports) {

/* global document */
module.exports = function Canvas() {
	return document.createElement('canvas');
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/**
 * @fileOverview
 * @author Graeme Yeates - github.com/megawac
 */



var Canvas = __webpack_require__(41);
var Image = Canvas.Image || global.Image;

/**
 * If a message was compressed as a PNG image (a compression hack since
 * gzipping over WebSockets * is not supported yet), this function places the
 * "image" in a canvas element then decodes the * "image" as a Base64 string.
 *
 * @private
 * @param data - object containing the PNG data.
 * @param callback - function with params:
 *   * data - the uncompressed data
 */
function decompressPng(data, callback) {
  // Uncompresses the data before sending it through (use image/canvas to do so).
  var image = new Image();
  // When the image loads, extracts the raw data (JSON message).
  image.onload = function() {
    // Creates a local canvas to draw on.
    var canvas = new Canvas();
    var context = canvas.getContext('2d');

    // Sets width and height.
    canvas.width = image.width;
    canvas.height = image.height;

    // Prevents anti-aliasing and loosing data
    context.imageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.mozImageSmoothingEnabled = false;

    // Puts the data into the image.
    context.drawImage(image, 0, 0);
    // Grabs the raw, uncompressed data.
    var imageData = context.getImageData(0, 0, image.width, image.height).data;

    // Constructs the JSON.
    var jsonData = '';
    for (var i = 0; i < imageData.length; i += 4) {
      // RGB
      jsonData += String.fromCharCode(imageData[i], imageData[i + 1], imageData[i + 2]);
    }
    callback(JSON.parse(jsonData));
  };
  // Sends the image data to load.
  image.src = 'data:image/png;base64,' + data;
}

module.exports = decompressPng;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {exports.DOMImplementation = global.DOMImplementation;
exports.XMLSerializer = global.XMLSerializer;
exports.DOMParser = global.DOMParser;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ })
/******/ ])));