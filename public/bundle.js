(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var t,n=function(){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t)}var n,i,a;return n=t,a=[{key:"getInstance",value:function(){return t.instance||(t.instance=new t),t.instance}}],(i=[{key:"init",value:function(){document.addEventListener("keydown",this.keyDown),document.addEventListener("keyup",this.keyUp)}},{key:"keyDown",value:function(e){console.log(e.keyCode,"down")}},{key:"keyUp",value:function(e){console.log(e.keyCode,"up")}}])&&e(n.prototype,i),a&&e(n,a),t}();!function(e){e.BgColor="#231f20",e.PlayerColor="#c2c2c2",e.ItemColor="#e66916"}(t||(t={}));function i(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var a=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var n,a,r;return n=e,a=[{key:"init",value:function(){this.canvas=document.getElementById("canvas"),this.ctx=this.canvas.getContext("2d"),this.canvas.height=600,this.canvas.width=600}},{key:"renderGame",value:function(e){this.renderWorld(e),this.renderFood(e),this.renderPlayer(e)}},{key:"renderWorld",value:function(e){this.ctx.fillStyle=t.BgColor,this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.ctx.fillStyle=t.BgColor,this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)}},{key:"renderFood",value:function(e){var n=e.food[0],i=this.canvas.width/e.gridSize,a=this.canvas.height/e.gridSize;this.ctx.fillStyle=t.ItemColor,this.ctx.fillRect(n.x*i,n.y*a,i,a)}},{key:"renderPlayer",value:function(e){var n=e.player,i=this.canvas.width/e.gridSize,a=this.canvas.height/e.gridSize;this.ctx.fillStyle=t.PlayerColor,this.ctx.fillRect(n.pos.x*i,n.pos.y*a,i,a)}}],r=[{key:"getInstance",value:function(){return e.instance||(e.instance=new e),e.instance}}],a&&i(n.prototype,a),r&&i(n,r),e}();function r(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var o=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,n,i;return t=e,i=[{key:"getInstance",value:function(){return e.instance||(e.instance=new e),e.instance}}],(n=[{key:"init",value:function(){this.state={player:{pos:{x:5,y:10},vel:{x:0,y:0}},food:[{x:7,y:7}],gridSize:20}}},{key:"getState",value:function(){return this.state}}])&&r(t.prototype,n),i&&r(t,i),e}(),c=a.getInstance(),s=n.getInstance(),l=o.getInstance();l.init(),c.init(),s.init(),c.renderGame(l.getState())})();
//# sourceMappingURL=bundle.js.map