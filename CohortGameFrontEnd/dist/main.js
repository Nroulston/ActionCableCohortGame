!function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(o,i,function(e){return t[e]}.bind(null,i));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e,n){var o,i;(function(){(function(){(function(){var t=[].slice;this.ActionCable={INTERNAL:{message_types:{welcome:"welcome",ping:"ping",confirmation:"confirm_subscription",rejection:"reject_subscription"},default_mount_path:"/cable",protocols:["actioncable-v1-json","actioncable-unsupported"]},WebSocket:window.WebSocket,logger:window.console,createConsumer:function(t){var e;return null==t&&(t=null!=(e=this.getConfig("url"))?e:this.INTERNAL.default_mount_path),new r.Consumer(this.createWebSocketURL(t))},getConfig:function(t){var e;return null!=(e=document.head.querySelector("meta[name='action-cable-"+t+"']"))?e.getAttribute("content"):void 0},createWebSocketURL:function(t){var e;return t&&!/^wss?:/i.test(t)?((e=document.createElement("a")).href=t,e.href=e.href,e.protocol=e.protocol.replace("http","ws"),e.href):t},startDebugging:function(){return this.debugging=!0},stopDebugging:function(){return this.debugging=null},log:function(){var e,n;if(e=1<=arguments.length?t.call(arguments,0):[],this.debugging)return e.push(Date.now()),(n=this.logger).log.apply(n,["[ActionCable]"].concat(t.call(e)))}}}).call(this)}).call(this);var r=this.ActionCable;(function(){(function(){r.ConnectionMonitor=function(){var t,e,n;function o(t){var e,n;this.connection=t,this.visibilityDidChange=(e=this.visibilityDidChange,n=this,function(){return e.apply(n,arguments)}),this.reconnectAttempts=0}return o.pollInterval={min:3,max:30},o.staleThreshold=6,o.prototype.start=function(){if(!this.isRunning())return this.startedAt=e(),delete this.stoppedAt,this.startPolling(),document.addEventListener("visibilitychange",this.visibilityDidChange),r.log("ConnectionMonitor started. pollInterval = "+this.getPollInterval()+" ms")},o.prototype.stop=function(){if(this.isRunning())return this.stoppedAt=e(),this.stopPolling(),document.removeEventListener("visibilitychange",this.visibilityDidChange),r.log("ConnectionMonitor stopped")},o.prototype.isRunning=function(){return null!=this.startedAt&&null==this.stoppedAt},o.prototype.recordPing=function(){return this.pingedAt=e()},o.prototype.recordConnect=function(){return this.reconnectAttempts=0,this.recordPing(),delete this.disconnectedAt,r.log("ConnectionMonitor recorded connect")},o.prototype.recordDisconnect=function(){return this.disconnectedAt=e(),r.log("ConnectionMonitor recorded disconnect")},o.prototype.startPolling=function(){return this.stopPolling(),this.poll()},o.prototype.stopPolling=function(){return clearTimeout(this.pollTimeout)},o.prototype.poll=function(){return this.pollTimeout=setTimeout((t=this,function(){return t.reconnectIfStale(),t.poll()}),this.getPollInterval());var t},o.prototype.getPollInterval=function(){var e,n,o,i;return o=(i=this.constructor.pollInterval).min,n=i.max,e=5*Math.log(this.reconnectAttempts+1),Math.round(1e3*t(e,o,n))},o.prototype.reconnectIfStale=function(){if(this.connectionIsStale())return r.log("ConnectionMonitor detected stale connection. reconnectAttempts = "+this.reconnectAttempts+", pollInterval = "+this.getPollInterval()+" ms, time disconnected = "+n(this.disconnectedAt)+" s, stale threshold = "+this.constructor.staleThreshold+" s"),this.reconnectAttempts++,this.disconnectedRecently()?r.log("ConnectionMonitor skipping reopening recent disconnect"):(r.log("ConnectionMonitor reopening"),this.connection.reopen())},o.prototype.connectionIsStale=function(){var t;return n(null!=(t=this.pingedAt)?t:this.startedAt)>this.constructor.staleThreshold},o.prototype.disconnectedRecently=function(){return this.disconnectedAt&&n(this.disconnectedAt)<this.constructor.staleThreshold},o.prototype.visibilityDidChange=function(){if("visible"===document.visibilityState)return setTimeout((t=this,function(){if(t.connectionIsStale()||!t.connection.isOpen())return r.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = "+document.visibilityState),t.connection.reopen()}),200);var t},e=function(){return(new Date).getTime()},n=function(t){return(e()-t)/1e3},t=function(t,e,n){return Math.max(e,Math.min(n,t))},o}()}).call(this),function(){var t,e,n,o,i,s=[].slice,c=[].indexOf||function(t){for(var e=0,n=this.length;e<n;e++)if(e in this&&this[e]===t)return e;return-1};o=r.INTERNAL,e=o.message_types,n=o.protocols,i=2<=n.length?s.call(n,0,t=n.length-1):(t=0,[]),n[t++],r.Connection=function(){function t(t){var e,n;this.consumer=t,this.open=(e=this.open,n=this,function(){return e.apply(n,arguments)}),this.subscriptions=this.consumer.subscriptions,this.monitor=new r.ConnectionMonitor(this),this.disconnected=!0}return t.reopenDelay=500,t.prototype.send=function(t){return!!this.isOpen()&&(this.webSocket.send(JSON.stringify(t)),!0)},t.prototype.open=function(){return this.isActive()?(r.log("Attempted to open WebSocket, but existing socket is "+this.getState()),!1):(r.log("Opening WebSocket, current state is "+this.getState()+", subprotocols: "+n),null!=this.webSocket&&this.uninstallEventHandlers(),this.webSocket=new r.WebSocket(this.consumer.url,n),this.installEventHandlers(),this.monitor.start(),!0)},t.prototype.close=function(t){var e;if((null!=t?t:{allowReconnect:!0}).allowReconnect||this.monitor.stop(),this.isActive())return null!=(e=this.webSocket)?e.close():void 0},t.prototype.reopen=function(){var t;if(r.log("Reopening WebSocket, current state is "+this.getState()),!this.isActive())return this.open();try{return this.close()}catch(e){return t=e,r.log("Failed to reopen WebSocket",t)}finally{r.log("Reopening WebSocket in "+this.constructor.reopenDelay+"ms"),setTimeout(this.open,this.constructor.reopenDelay)}},t.prototype.getProtocol=function(){var t;return null!=(t=this.webSocket)?t.protocol:void 0},t.prototype.isOpen=function(){return this.isState("open")},t.prototype.isActive=function(){return this.isState("open","connecting")},t.prototype.isProtocolSupported=function(){var t;return t=this.getProtocol(),c.call(i,t)>=0},t.prototype.isState=function(){var t,e;return e=1<=arguments.length?s.call(arguments,0):[],t=this.getState(),c.call(e,t)>=0},t.prototype.getState=function(){var t,e;for(e in WebSocket)if(WebSocket[e]===(null!=(t=this.webSocket)?t.readyState:void 0))return e.toLowerCase();return null},t.prototype.installEventHandlers=function(){var t,e;for(t in this.events)e=this.events[t].bind(this),this.webSocket["on"+t]=e},t.prototype.uninstallEventHandlers=function(){var t;for(t in this.events)this.webSocket["on"+t]=function(){}},t.prototype.events={message:function(t){var n,o,i;if(this.isProtocolSupported())switch(n=(i=JSON.parse(t.data)).identifier,o=i.message,i.type){case e.welcome:return this.monitor.recordConnect(),this.subscriptions.reload();case e.ping:return this.monitor.recordPing();case e.confirmation:return this.subscriptions.notify(n,"connected");case e.rejection:return this.subscriptions.reject(n);default:return this.subscriptions.notify(n,"received",o)}},open:function(){if(r.log("WebSocket onopen event, using '"+this.getProtocol()+"' subprotocol"),this.disconnected=!1,!this.isProtocolSupported())return r.log("Protocol is unsupported. Stopping monitor and disconnecting."),this.close({allowReconnect:!1})},close:function(t){if(r.log("WebSocket onclose event"),!this.disconnected)return this.disconnected=!0,this.monitor.recordDisconnect(),this.subscriptions.notifyAll("disconnected",{willAttemptReconnect:this.monitor.isRunning()})},error:function(){return r.log("WebSocket onerror event")}},t}()}.call(this),function(){var t=[].slice;r.Subscriptions=function(){function e(t){this.consumer=t,this.subscriptions=[]}return e.prototype.create=function(t,e){var n,o,i;return o="object"==typeof(n=t)?n:{channel:n},i=new r.Subscription(this.consumer,o,e),this.add(i)},e.prototype.add=function(t){return this.subscriptions.push(t),this.consumer.ensureActiveConnection(),this.notify(t,"initialized"),this.sendCommand(t,"subscribe"),t},e.prototype.remove=function(t){return this.forget(t),this.findAll(t.identifier).length||this.sendCommand(t,"unsubscribe"),t},e.prototype.reject=function(t){var e,n,o,i,r;for(i=[],e=0,n=(o=this.findAll(t)).length;e<n;e++)r=o[e],this.forget(r),this.notify(r,"rejected"),i.push(r);return i},e.prototype.forget=function(t){var e;return this.subscriptions=function(){var n,o,i,r;for(r=[],n=0,o=(i=this.subscriptions).length;n<o;n++)(e=i[n])!==t&&r.push(e);return r}.call(this),t},e.prototype.findAll=function(t){var e,n,o,i,r;for(i=[],e=0,n=(o=this.subscriptions).length;e<n;e++)(r=o[e]).identifier===t&&i.push(r);return i},e.prototype.reload=function(){var t,e,n,o,i;for(o=[],t=0,e=(n=this.subscriptions).length;t<e;t++)i=n[t],o.push(this.sendCommand(i,"subscribe"));return o},e.prototype.notifyAll=function(){var e,n,o,i,r,s,c;for(n=arguments[0],e=2<=arguments.length?t.call(arguments,1):[],s=[],o=0,i=(r=this.subscriptions).length;o<i;o++)c=r[o],s.push(this.notify.apply(this,[c,n].concat(t.call(e))));return s},e.prototype.notify=function(){var e,n,o,i,r,s,c;for(s=arguments[0],n=arguments[1],e=3<=arguments.length?t.call(arguments,2):[],r=[],o=0,i=(c="string"==typeof s?this.findAll(s):[s]).length;o<i;o++)s=c[o],r.push("function"==typeof s[n]?s[n].apply(s,e):void 0);return r},e.prototype.sendCommand=function(t,e){var n;return n=t.identifier,this.consumer.send({command:e,identifier:n})},e}()}.call(this),function(){r.Subscription=function(){var t;function e(e,n,o){this.consumer=e,null==n&&(n={}),this.identifier=JSON.stringify(n),t(this,o)}return e.prototype.perform=function(t,e){return null==e&&(e={}),e.action=t,this.send(e)},e.prototype.send=function(t){return this.consumer.send({command:"message",identifier:this.identifier,data:JSON.stringify(t)})},e.prototype.unsubscribe=function(){return this.consumer.subscriptions.remove(this)},t=function(t,e){var n,o;if(null!=e)for(n in e)o=e[n],t[n]=o;return t},e}()}.call(this),function(){r.Consumer=function(){function t(t){this.url=t,this.subscriptions=new r.Subscriptions(this),this.connection=new r.Connection(this)}return t.prototype.send=function(t){return this.connection.send(t)},t.prototype.connect=function(){return this.connection.open()},t.prototype.disconnect=function(){return this.connection.close({allowReconnect:!1})},t.prototype.ensureActiveConnection=function(){if(!this.connection.isActive())return this.connection.open()},t}()}.call(this)}).call(this),t.exports?t.exports=r:void 0===(i="function"==typeof(o=r)?o.call(e,n,e,t):o)||(t.exports=i)}).call(this)},function(t,e,n){"use strict";n.r(e);var o=n(0);const i=n.n(o).a.createConsumer("ws://localhost:3000/cable"),r=()=>{document.querySelector("#user_name").addEventListener("keydown",(function(t){13==t.keyCode&&(t.preventDefault(),i.subscriptions.create("GameRoomChannel",{connected(){console.log("connected to the room")},disconnected(){},received(t){alert(t.message)}}),console.log(t))}))};document.addEventListener("DOMContentLoaded",(function(){const t=document.createElement("div"),e=document.createElement("div"),n=document.createElement("FORM"),o=document.createElement("div"),i=document.createElement("input"),s=document.createElement("label");i.placeholder="Enter Name",i.setAttribute("id","user_name"),i.setAttribute("name","user[name]"),s.setAttribute("for","user_name"),s.innerText="First Name",document.querySelector("body").append(t),t.append(n),n.append(e),e.append(o),o.append(s),o.append(i),r()}))}]);