/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;(function() {
  var context = this;

  (function() {
    (function() {
      var slice = [].slice;

      this.ActionCable = {
        INTERNAL: {
          "message_types": {
            "welcome": "welcome",
            "ping": "ping",
            "confirmation": "confirm_subscription",
            "rejection": "reject_subscription"
          },
          "default_mount_path": "/cable",
          "protocols": ["actioncable-v1-json", "actioncable-unsupported"]
        },
        WebSocket: window.WebSocket,
        logger: window.console,
        createConsumer: function(url) {
          var ref;
          if (url == null) {
            url = (ref = this.getConfig("url")) != null ? ref : this.INTERNAL.default_mount_path;
          }
          return new ActionCable.Consumer(this.createWebSocketURL(url));
        },
        getConfig: function(name) {
          var element;
          element = document.head.querySelector("meta[name='action-cable-" + name + "']");
          return element != null ? element.getAttribute("content") : void 0;
        },
        createWebSocketURL: function(url) {
          var a;
          if (url && !/^wss?:/i.test(url)) {
            a = document.createElement("a");
            a.href = url;
            a.href = a.href;
            a.protocol = a.protocol.replace("http", "ws");
            return a.href;
          } else {
            return url;
          }
        },
        startDebugging: function() {
          return this.debugging = true;
        },
        stopDebugging: function() {
          return this.debugging = null;
        },
        log: function() {
          var messages, ref;
          messages = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          if (this.debugging) {
            messages.push(Date.now());
            return (ref = this.logger).log.apply(ref, ["[ActionCable]"].concat(slice.call(messages)));
          }
        }
      };

    }).call(this);
  }).call(context);

  var ActionCable = context.ActionCable;

  (function() {
    (function() {
      var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

      ActionCable.ConnectionMonitor = (function() {
        var clamp, now, secondsSince;

        ConnectionMonitor.pollInterval = {
          min: 3,
          max: 30
        };

        ConnectionMonitor.staleThreshold = 6;

        function ConnectionMonitor(connection) {
          this.connection = connection;
          this.visibilityDidChange = bind(this.visibilityDidChange, this);
          this.reconnectAttempts = 0;
        }

        ConnectionMonitor.prototype.start = function() {
          if (!this.isRunning()) {
            this.startedAt = now();
            delete this.stoppedAt;
            this.startPolling();
            document.addEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor started. pollInterval = " + (this.getPollInterval()) + " ms");
          }
        };

        ConnectionMonitor.prototype.stop = function() {
          if (this.isRunning()) {
            this.stoppedAt = now();
            this.stopPolling();
            document.removeEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor stopped");
          }
        };

        ConnectionMonitor.prototype.isRunning = function() {
          return (this.startedAt != null) && (this.stoppedAt == null);
        };

        ConnectionMonitor.prototype.recordPing = function() {
          return this.pingedAt = now();
        };

        ConnectionMonitor.prototype.recordConnect = function() {
          this.reconnectAttempts = 0;
          this.recordPing();
          delete this.disconnectedAt;
          return ActionCable.log("ConnectionMonitor recorded connect");
        };

        ConnectionMonitor.prototype.recordDisconnect = function() {
          this.disconnectedAt = now();
          return ActionCable.log("ConnectionMonitor recorded disconnect");
        };

        ConnectionMonitor.prototype.startPolling = function() {
          this.stopPolling();
          return this.poll();
        };

        ConnectionMonitor.prototype.stopPolling = function() {
          return clearTimeout(this.pollTimeout);
        };

        ConnectionMonitor.prototype.poll = function() {
          return this.pollTimeout = setTimeout((function(_this) {
            return function() {
              _this.reconnectIfStale();
              return _this.poll();
            };
          })(this), this.getPollInterval());
        };

        ConnectionMonitor.prototype.getPollInterval = function() {
          var interval, max, min, ref;
          ref = this.constructor.pollInterval, min = ref.min, max = ref.max;
          interval = 5 * Math.log(this.reconnectAttempts + 1);
          return Math.round(clamp(interval, min, max) * 1000);
        };

        ConnectionMonitor.prototype.reconnectIfStale = function() {
          if (this.connectionIsStale()) {
            ActionCable.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + (this.getPollInterval()) + " ms, time disconnected = " + (secondsSince(this.disconnectedAt)) + " s, stale threshold = " + this.constructor.staleThreshold + " s");
            this.reconnectAttempts++;
            if (this.disconnectedRecently()) {
              return ActionCable.log("ConnectionMonitor skipping reopening recent disconnect");
            } else {
              ActionCable.log("ConnectionMonitor reopening");
              return this.connection.reopen();
            }
          }
        };

        ConnectionMonitor.prototype.connectionIsStale = function() {
          var ref;
          return secondsSince((ref = this.pingedAt) != null ? ref : this.startedAt) > this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.disconnectedRecently = function() {
          return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.visibilityDidChange = function() {
          if (document.visibilityState === "visible") {
            return setTimeout((function(_this) {
              return function() {
                if (_this.connectionIsStale() || !_this.connection.isOpen()) {
                  ActionCable.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " + document.visibilityState);
                  return _this.connection.reopen();
                }
              };
            })(this), 200);
          }
        };

        now = function() {
          return new Date().getTime();
        };

        secondsSince = function(time) {
          return (now() - time) / 1000;
        };

        clamp = function(number, min, max) {
          return Math.max(min, Math.min(max, number));
        };

        return ConnectionMonitor;

      })();

    }).call(this);
    (function() {
      var i, message_types, protocols, ref, supportedProtocols, unsupportedProtocol,
        slice = [].slice,
        bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

      ref = ActionCable.INTERNAL, message_types = ref.message_types, protocols = ref.protocols;

      supportedProtocols = 2 <= protocols.length ? slice.call(protocols, 0, i = protocols.length - 1) : (i = 0, []), unsupportedProtocol = protocols[i++];

      ActionCable.Connection = (function() {
        Connection.reopenDelay = 500;

        function Connection(consumer) {
          this.consumer = consumer;
          this.open = bind(this.open, this);
          this.subscriptions = this.consumer.subscriptions;
          this.monitor = new ActionCable.ConnectionMonitor(this);
          this.disconnected = true;
        }

        Connection.prototype.send = function(data) {
          if (this.isOpen()) {
            this.webSocket.send(JSON.stringify(data));
            return true;
          } else {
            return false;
          }
        };

        Connection.prototype.open = function() {
          if (this.isActive()) {
            ActionCable.log("Attempted to open WebSocket, but existing socket is " + (this.getState()));
            return false;
          } else {
            ActionCable.log("Opening WebSocket, current state is " + (this.getState()) + ", subprotocols: " + protocols);
            if (this.webSocket != null) {
              this.uninstallEventHandlers();
            }
            this.webSocket = new ActionCable.WebSocket(this.consumer.url, protocols);
            this.installEventHandlers();
            this.monitor.start();
            return true;
          }
        };

        Connection.prototype.close = function(arg) {
          var allowReconnect, ref1;
          allowReconnect = (arg != null ? arg : {
            allowReconnect: true
          }).allowReconnect;
          if (!allowReconnect) {
            this.monitor.stop();
          }
          if (this.isActive()) {
            return (ref1 = this.webSocket) != null ? ref1.close() : void 0;
          }
        };

        Connection.prototype.reopen = function() {
          var error;
          ActionCable.log("Reopening WebSocket, current state is " + (this.getState()));
          if (this.isActive()) {
            try {
              return this.close();
            } catch (error1) {
              error = error1;
              return ActionCable.log("Failed to reopen WebSocket", error);
            } finally {
              ActionCable.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms");
              setTimeout(this.open, this.constructor.reopenDelay);
            }
          } else {
            return this.open();
          }
        };

        Connection.prototype.getProtocol = function() {
          var ref1;
          return (ref1 = this.webSocket) != null ? ref1.protocol : void 0;
        };

        Connection.prototype.isOpen = function() {
          return this.isState("open");
        };

        Connection.prototype.isActive = function() {
          return this.isState("open", "connecting");
        };

        Connection.prototype.isProtocolSupported = function() {
          var ref1;
          return ref1 = this.getProtocol(), indexOf.call(supportedProtocols, ref1) >= 0;
        };

        Connection.prototype.isState = function() {
          var ref1, states;
          states = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return ref1 = this.getState(), indexOf.call(states, ref1) >= 0;
        };

        Connection.prototype.getState = function() {
          var ref1, state, value;
          for (state in WebSocket) {
            value = WebSocket[state];
            if (value === ((ref1 = this.webSocket) != null ? ref1.readyState : void 0)) {
              return state.toLowerCase();
            }
          }
          return null;
        };

        Connection.prototype.installEventHandlers = function() {
          var eventName, handler;
          for (eventName in this.events) {
            handler = this.events[eventName].bind(this);
            this.webSocket["on" + eventName] = handler;
          }
        };

        Connection.prototype.uninstallEventHandlers = function() {
          var eventName;
          for (eventName in this.events) {
            this.webSocket["on" + eventName] = function() {};
          }
        };

        Connection.prototype.events = {
          message: function(event) {
            var identifier, message, ref1, type;
            if (!this.isProtocolSupported()) {
              return;
            }
            ref1 = JSON.parse(event.data), identifier = ref1.identifier, message = ref1.message, type = ref1.type;
            switch (type) {
              case message_types.welcome:
                this.monitor.recordConnect();
                return this.subscriptions.reload();
              case message_types.ping:
                return this.monitor.recordPing();
              case message_types.confirmation:
                return this.subscriptions.notify(identifier, "connected");
              case message_types.rejection:
                return this.subscriptions.reject(identifier);
              default:
                return this.subscriptions.notify(identifier, "received", message);
            }
          },
          open: function() {
            ActionCable.log("WebSocket onopen event, using '" + (this.getProtocol()) + "' subprotocol");
            this.disconnected = false;
            if (!this.isProtocolSupported()) {
              ActionCable.log("Protocol is unsupported. Stopping monitor and disconnecting.");
              return this.close({
                allowReconnect: false
              });
            }
          },
          close: function(event) {
            ActionCable.log("WebSocket onclose event");
            if (this.disconnected) {
              return;
            }
            this.disconnected = true;
            this.monitor.recordDisconnect();
            return this.subscriptions.notifyAll("disconnected", {
              willAttemptReconnect: this.monitor.isRunning()
            });
          },
          error: function() {
            return ActionCable.log("WebSocket onerror event");
          }
        };

        return Connection;

      })();

    }).call(this);
    (function() {
      var slice = [].slice;

      ActionCable.Subscriptions = (function() {
        function Subscriptions(consumer) {
          this.consumer = consumer;
          this.subscriptions = [];
        }

        Subscriptions.prototype.create = function(channelName, mixin) {
          var channel, params, subscription;
          channel = channelName;
          params = typeof channel === "object" ? channel : {
            channel: channel
          };
          subscription = new ActionCable.Subscription(this.consumer, params, mixin);
          return this.add(subscription);
        };

        Subscriptions.prototype.add = function(subscription) {
          this.subscriptions.push(subscription);
          this.consumer.ensureActiveConnection();
          this.notify(subscription, "initialized");
          this.sendCommand(subscription, "subscribe");
          return subscription;
        };

        Subscriptions.prototype.remove = function(subscription) {
          this.forget(subscription);
          if (!this.findAll(subscription.identifier).length) {
            this.sendCommand(subscription, "unsubscribe");
          }
          return subscription;
        };

        Subscriptions.prototype.reject = function(identifier) {
          var i, len, ref, results, subscription;
          ref = this.findAll(identifier);
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            this.forget(subscription);
            this.notify(subscription, "rejected");
            results.push(subscription);
          }
          return results;
        };

        Subscriptions.prototype.forget = function(subscription) {
          var s;
          this.subscriptions = (function() {
            var i, len, ref, results;
            ref = this.subscriptions;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              s = ref[i];
              if (s !== subscription) {
                results.push(s);
              }
            }
            return results;
          }).call(this);
          return subscription;
        };

        Subscriptions.prototype.findAll = function(identifier) {
          var i, len, ref, results, s;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            s = ref[i];
            if (s.identifier === identifier) {
              results.push(s);
            }
          }
          return results;
        };

        Subscriptions.prototype.reload = function() {
          var i, len, ref, results, subscription;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.sendCommand(subscription, "subscribe"));
          }
          return results;
        };

        Subscriptions.prototype.notifyAll = function() {
          var args, callbackName, i, len, ref, results, subscription;
          callbackName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.notify.apply(this, [subscription, callbackName].concat(slice.call(args))));
          }
          return results;
        };

        Subscriptions.prototype.notify = function() {
          var args, callbackName, i, len, results, subscription, subscriptions;
          subscription = arguments[0], callbackName = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
          if (typeof subscription === "string") {
            subscriptions = this.findAll(subscription);
          } else {
            subscriptions = [subscription];
          }
          results = [];
          for (i = 0, len = subscriptions.length; i < len; i++) {
            subscription = subscriptions[i];
            results.push(typeof subscription[callbackName] === "function" ? subscription[callbackName].apply(subscription, args) : void 0);
          }
          return results;
        };

        Subscriptions.prototype.sendCommand = function(subscription, command) {
          var identifier;
          identifier = subscription.identifier;
          return this.consumer.send({
            command: command,
            identifier: identifier
          });
        };

        return Subscriptions;

      })();

    }).call(this);
    (function() {
      ActionCable.Subscription = (function() {
        var extend;

        function Subscription(consumer, params, mixin) {
          this.consumer = consumer;
          if (params == null) {
            params = {};
          }
          this.identifier = JSON.stringify(params);
          extend(this, mixin);
        }

        Subscription.prototype.perform = function(action, data) {
          if (data == null) {
            data = {};
          }
          data.action = action;
          return this.send(data);
        };

        Subscription.prototype.send = function(data) {
          return this.consumer.send({
            command: "message",
            identifier: this.identifier,
            data: JSON.stringify(data)
          });
        };

        Subscription.prototype.unsubscribe = function() {
          return this.consumer.subscriptions.remove(this);
        };

        extend = function(object, properties) {
          var key, value;
          if (properties != null) {
            for (key in properties) {
              value = properties[key];
              object[key] = value;
            }
          }
          return object;
        };

        return Subscription;

      })();

    }).call(this);
    (function() {
      ActionCable.Consumer = (function() {
        function Consumer(url) {
          this.url = url;
          this.subscriptions = new ActionCable.Subscriptions(this);
          this.connection = new ActionCable.Connection(this);
        }

        Consumer.prototype.send = function(data) {
          return this.connection.send(data);
        };

        Consumer.prototype.connect = function() {
          return this.connection.open();
        };

        Consumer.prototype.disconnect = function() {
          return this.connection.close({
            allowReconnect: false
          });
        };

        Consumer.prototype.ensureActiveConnection = function() {
          if (!this.connection.isActive()) {
            return this.connection.open();
          }
        };

        return Consumer;

      })();

    }).call(this);
  }).call(this);

  if ( true && module.exports) {
    module.exports = ActionCable;
  } else if (true) {
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (ActionCable),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
}).call(this);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "cable", function() { return /* binding */ cable; });
__webpack_require__.d(__webpack_exports__, "body", function() { return /* binding */ body; });
__webpack_require__.d(__webpack_exports__, "userLogInDiv", function() { return /* binding */ userLogInDiv; });
__webpack_require__.d(__webpack_exports__, "inputForm", function() { return /* binding */ inputForm; });
__webpack_require__.d(__webpack_exports__, "column9div", function() { return /* binding */ column9div; });
__webpack_require__.d(__webpack_exports__, "column3div", function() { return /* binding */ column3div; });
__webpack_require__.d(__webpack_exports__, "allPlayer", function() { return /* binding */ allPlayer; });

// EXTERNAL MODULE: ./node_modules/actioncable/lib/assets/compiled/action_cable.js
var action_cable = __webpack_require__(0);
var action_cable_default = /*#__PURE__*/__webpack_require__.n(action_cable);

// CONCATENATED MODULE: ./src/gameRoom.js


class gameRoom_GameRoom {
  constructor(name, players, id, turn=0) {
    this.name = name;
    this.players = players;
    this.turn = turn
    this.id = id
    this.player = undefined

  }
  static start(json) {
    const gameRoomInstance = new gameRoom_GameRoom(json.game_room.name, allPlayer.value(), json.game_room_id )
    debugger
  }
  static enterGame() { 
    inputForm().addEventListener('keydown', function(e) {
      if (e.keyCode == 13) {
         e.preventDefault()
         gameRoom_GameRoom.stopDisplayingLogin()
         gameRoom_GameRoom.establishActionCableConnection()
         gameRoom_GameRoom.createLayout()
         src_player.getPlayers()
         gameRoom_GameRoom.displayGameBoard()
         
        //  const game = new GameRoom("Default", allPlayer.value())
        //  allPlayer
         // potentially assign the allPlayer input as a constant that invokes the function call when it is run and return the .value()
         
      
         //attempted to assign game.player and it came out undefined. It makes no sense as to why everything comes out undefined.
         // turns out that async functions allow so much code to pass that allPlayer isn't assigned at the time of console.logging the next steps.
         
      } 
    })
   }

   

   static createLayout() {
    const rowDiv = document.createElement('div')
    const col3Div = document.createElement('div')
    const col9Div = document.createElement('div')
    rowDiv.className = "row"
    col3Div.className = "col s3"
    col3Div.setAttribute('id', 'col3')
    col9Div.className = "col s9"
    col9Div.setAttribute('id', 'col9')
    body().append(rowDiv)
    rowDiv.append(col3Div)
    rowDiv.append(col9Div)
  }
  
  static displayGameBoard() {
    const div = document.createElement('div')
    const ul = document.createElement('ul' )
    const titleLi = document.createElement('li')
    const gameLI  = document.createElement('li')
    const gameCardDiv = document.createElement('div')
    const cardDivContent = document.createElement('div')
  
    div.className = 'row'
    ul.className = 'collection with-header'
    titleLi.className = 'collection-header blue-grey'
    gameLI.className = 'collection-item'
    gameCardDiv.className = 'card blue-grey'
    cardDivContent.className = 'card-content white-text'
    
    column9div().append(div)
    div.append(ul)
    ul.append(titleLi)
    ul.append(gameLI)
    gameLI.append(gameCardDiv)
    gameCardDiv.append(cardDivContent)

  }
   static stopDisplayingLogin() {
    userLogInDiv().style.display = "none"
    }

  static establishActionCableConnection() {
    cable.subscriptions.create('GameRoomChannel', {
      connected() {
        console.log("connected to the room")
      },
  
      disconnected() {
        // fetch(`http://127.0.0.1:3000/players/${allPlayer.currentPlayer()}`)
      },
  
      received(data) {
        // console.log(`This is the received data: ${data}`)
        src_player.nameBoxCreator(data)
      },
      
    });
  }
    
  
  incrementTurn() {
    this.turn += 1
    return this.turn
  }
  whoseTurnIsIt() {
    // both methods somehow cause a bug in console. If you copy the entire code over everything works fine.
    // the errors are potentially due to the speed of async functions and the rest.
    let players = allPlayer.value()
  
    src_player.nameBoxCreator(this.players[0])
    
    console.log('test')
    console.log(this.players)
    
     console.log(allPlayer.currentPlayer(this.turn))
   return allPlayer.currentPlayer(this.turn)
  }
}

/* harmony default export */ var gameRoom = (gameRoom_GameRoom);
// CONCATENATED MODULE: ./src/player.js


const HEADERS = {
  'Content-Type': 'application/json',
  'Accept' : 'application/json',
};

class player_Player {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  static create(id, name) {
   
    let player = new player_Player(id, name)
    
    allPlayer.addPlayer(player);
    
    return player
  }
  
  static getPlayers() {
    fetch('http://127.0.0.1:3000/players.json')
    .then(response => response.json())
    .then(json => { 
      // console.log(`this is the fetch ${json} data`)
      json.forEach( player => {
        player_Player.nameBoxCreator(player)
        player_Player.create(player.id, player.name)
      })
       player_Player.sendNameFetch()
    })
    .catch((error) => {
      console.error('error:', error)
    })
  }
  
  static sendNameFetch() {
    
    const strongParamsPlayer = {
      player: {
        name: inputForm().value
      }
    } 
  
    fetch('http://127.0.0.1:3000/players', {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(strongParamsPlayer)
      })
      .then(response => response.json())
      .then(json => { 
       
        player_Player.create(json.id, json.name)
        gameRoom.start(json)
        
       
      })
  }

  static nameBoxCreator(data) {
    const nameBoxDiv = document.createElement('div')
    const div1InsideOfBoxDiv = document.createElement('div')
    const div2InsideOfBoxDiv = document.createElement('div')
    const nameBoxSpan = document.createElement('span')
    nameBoxDiv.className = "row"
    div2InsideOfBoxDiv.className = 'card-panel teal'
    nameBoxSpan.className = 'white-text'
    nameBoxSpan.innerText = data.name
    column3div().append(nameBoxDiv)
    nameBoxDiv.append(div1InsideOfBoxDiv)
    div1InsideOfBoxDiv.append(div2InsideOfBoxDiv)
    div2InsideOfBoxDiv.append(nameBoxSpan)
  }
}

/* harmony default export */ var src_player = (player_Player);
// CONCATENATED MODULE: ./src/index.js
// Todo figure out why when first accessing the site starts the actioncable process, on reload it doesn't.

// Todo figure out how to write async functions inside the class and make it a class method.

 
 
 


// class GameRoom {
//   constructor(name, players, turn=0) {
//     this.name = name;
//     this.players = players;
//     this.turn = turn
//     this.player = undefined
//   }
  
//   incrementTurn() {
//     this.turn += 1
//     return this.turn
//   }
//   whoseTurnIsIt() {
//     // both methods somehow cause a bug in console. If you copy the entire code over everything works fine.
//     let players = allPlayer.value()
  
//     Player.nameBoxCreator(this.players[0])
    
//     console.log('test')
//     console.log(this.players)
    
//      console.log(allPlayer.currentPlayer(this.turn))
//    return allPlayer.currentPlayer(this.turn)
//   }
// }

class src_testGame extends gameRoom {

}
class src_PressTheLetterFirstGame extends gameRoom {
  constructor(name, players) {
    this.name = name
    super(players)
  }
}

const API_WS_ROOT = 'ws://localhost:3000/cable';

 
const cable = action_cable_default.a.createConsumer(API_WS_ROOT)
// //getters
const body = () => document.querySelector(".container")
const userLogInDiv = () => document.querySelector('#showLogIn')
const inputForm = () => document.querySelector("#user_name")
const column9div = () => document.querySelector('#col9')
const column3div = () => document.querySelector('#col3')


// // the power of IIFE and closure all in one.
// // Gives us a constant that has persistent memory of the player array
const allPlayer = (function() {
  const playersArray = []
  function addPlayerToAll(player) {
    playersArray.push(player)
  }

  return {
    addPlayer: function(player) {
      addPlayerToAll(player)
    },

    value: function() {
      return playersArray
    },

    currentPlayer: function(index) {
      let players = allPlayer.value()

      const player = players[index]
      
      return player
    }
  }
})();

// const enterGame = () => { 
//  inputForm().addEventListener('keydown', function(e) {
//    if (e.keyCode == 13) {
//       e.preventDefault()
//       stopDisplayingLogin()
//       establishActionCableConnection()
//       createLayout()
//       Player.getPlayers()
//       displayGameBoard()
//       
//       const game = new GameRoom("Default", allPlayer.value())
//       //attempted to assign game.player and it came out undefined. It makes no sense as to why everything comes out undefined.
      
//    } 
//  })
// }

// function createLayout() {
//   const rowDiv = document.createElement('div')
//   const col3Div = document.createElement('div')
//   const col9Div = document.createElement('div')
//   rowDiv.className = "row"
//   col3Div.className = "col s3"
//   col3Div.setAttribute('id', 'col3')
//   col9Div.className = "col s9"
//   col9Div.setAttribute('id', 'col9')
//   body().append(rowDiv)
//   rowDiv.append(col3Div)
//   rowDiv.append(col9Div)
// }

// const displayGameBoard = () => {
//   const div = document.createElement('div')
//   const ul = document.createElement('ul' )
//   const titleLi = document.createElement('li')
//   const gameLI  = document.createElement('li')
//   const gameCardDiv = document.createElement('div')
//   const cardDivContent = document.createElement('div')

//   div.className = 'row'
//   ul.className = 'collection with-header'
//   titleLi.className = 'collection-header blue-grey'
//   gameLI.className = 'collection-item'
//   gameCardDiv.className = 'card blue-grey'
//   cardDivContent.className = 'card-content white-text'
  
//   column9div().append(div)
//   div.append(ul)
//   ul.append(titleLi)
//   ul.append(gameLI)
//   gameLI.append(gameCardDiv)
//   gameCardDiv.append(cardDivContent)
// }

document.addEventListener("DOMContentLoaded", function() {
  const div = document.createElement("div")
  const formDiv = document.createElement('div')
  const form = document.createElement("FORM")
  const inputDiv = document.createElement("div")
  const inputField = document.createElement('input')
  const inputLabel = document.createElement('label')
  div.className = 'row'
  div.setAttribute('id', 'showLogIn')
  form.className = 'col s6'
  formDiv.className = 'row'
  inputDiv.className = 'input-field col s6'
  inputField.placeholder = "Enter Name"
  inputField.setAttribute("id", "user_name")
  inputField.setAttribute("name", "user[name]")
  inputField.setAttribute('type', 'text')
  inputLabel.setAttribute("for", "user_name")
  inputLabel.className = "active"
  inputLabel.innerText = "First Name"
  body().append(div)
  div.append(form)
  form.append(formDiv)
  formDiv.append(inputDiv)
  inputDiv.append(inputField)
  inputDiv.append(inputLabel)
  gameRoom.enterGame()
  
})



// function establishActionCableConnection() {
//   cable.subscriptions.create('GameRoomChannel', {
//     connected() {
//       console.log("connected to the room")
//     },

//     disconnected() {
//       // fetch(`http://127.0.0.1:3000/players/${allPlayer.currentPlayer()}`)
//     },

//     received(data) {
//       // console.log(`This is the received data: ${data}`)
//       Player.nameBoxCreator(data)
//     },
    
//   });
// }







/***/ })
/******/ ]);