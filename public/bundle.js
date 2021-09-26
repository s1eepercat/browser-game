(()=>{var e={176:e=>{e.exports={PlayerSpeed:1,VisibilityDistanceX:48,VisibilityDistanceY:21,CanvasW:.7,CanvasH:.8,FrameRate:30,GridSize:30,MapWidth:140,MapHeight:140,SpawnX:3,SpawnY:3,SpawnSize:10,ItemAmountPerPlayer:10,CrawlersPerPlayer:10,CrawlersSpawnDistance:25}}},t={};function r(i){var n=t[i];if(void 0!==n)return n.exports;var a=t[i]={exports:{}};return e[i](a,a.exports,r),a.exports}(()=>{"use strict";function e(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var t,i=function(){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t)}var r,i,n;return r=t,n=[{key:"getInstance",value:function(){return t.instance||(t.instance=new t),t.instance}}],(i=[{key:"init",value:function(e){this.initMovement(e)}},{key:"initMovement",value:function(e){var t=0,r=0,i=0,n=0;document.addEventListener("keydown",(function(a){switch(a.key){case"a":t=-1;break;case"d":r=1;break;case"w":i=-1;break;case"s":n=1}e.emit("velocityChange",{x:t+r,y:i+n})})),document.addEventListener("keyup",(function(a){switch(a.key){case"a":t=0;break;case"d":r=0;break;case"w":i=0;break;case"s":n=0}e.emit("velocityChange",{x:t+r,y:i+n})}))}}])&&e(r.prototype,i),n&&e(r,n),t}(),n=r(176);function a(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}!function(e){e.BgColor="#231f20",e.FloorColor="#93c09e",e.SpawnColor="#767676",e.PlayerColor="#006a4e",e.PlayersColor="#136185",e.ItemColor="#e66916",e.NameColor="#F0FFF0",e.CrawlerColor="#AA4A44"}(t||(t={}));var o=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var r,i,o;return r=e,o=[{key:"getInstance",value:function(){return e.instance||(e.instance=new e),e.instance}}],(i=[{key:"init",value:function(){return this.canvas=document.getElementById("canvas"),this.ctx=this.canvas.getContext("2d"),this.canvas.width=window.innerWidth*n.CanvasW,this.canvas.height=window.innerHeight*n.CanvasH,{gridW:Math.floor(this.canvas.width/n.GridSize),gridH:Math.floor(this.canvas.height/n.GridSize)}}},{key:"renderGame",value:function(e){var t=this.getPlayerPosition(e),r=t.playerX,i=t.playerY;this.renderWorld(e),this.renderSpawn(e,r,i),this.renderPlayer(e,r,i),this.renderPlayers(e,r,i),this.renderCrawlers(e,r,i),this.renderItems(e,r,i)}},{key:"getPlayerPosition",value:function(e){var t=e.player,r=Math.ceil(this.canvas.width/n.GridSize),i=Math.ceil(this.canvas.height/n.GridSize);return{playerX:t.pos.x<=r/2?t.pos.x*n.GridSize:t.pos.x>=n.MapWidth-r/2?this.canvas.width-(n.MapWidth-t.pos.x)*n.GridSize:this.canvas.width/2,playerY:t.pos.y<=i/2?t.pos.y*n.GridSize:t.pos.y>=n.MapHeight-i/2?this.canvas.height-(n.MapHeight-t.pos.y)*n.GridSize:this.canvas.height/2}}},{key:"renderWorld",value:function(e){this.ctx.fillStyle=t.FloorColor,this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)}},{key:"renderSpawn",value:function(e,r,i){var a=Math.ceil(this.canvas.width/n.GridSize),o=Math.ceil(this.canvas.height/n.GridSize),s=n.SpawnX-e.player.pos.x,c=n.SpawnY-e.player.pos.y;Math.abs(s)<a&&Math.abs(c)<o&&(this.ctx.fillStyle=t.SpawnColor,this.ctx.fillRect(r+s*n.GridSize,i+c*n.GridSize,n.SpawnSize*n.GridSize,n.SpawnSize*n.GridSize))}},{key:"renderPlayer",value:function(e,r,i){this.ctx.fillStyle=t.NameColor,this.ctx.font="25px Arial";var a=this.ctx.measureText(e.player.name).width;this.ctx.fillText(e.player.name,r-a/2+n.GridSize/2,i-n.GridSize/2),this.ctx.fillStyle=t.PlayerColor,this.ctx.fillRect(r,i,n.GridSize,n.GridSize)}},{key:"renderPlayers",value:function(e,r,i){var a=this;e.hasOwnProperty("players")&&e.players.forEach((function(o){var s=o.pos.x-e.player.pos.x,c=o.pos.y-e.player.pos.y;a.ctx.fillStyle=t.NameColor,a.ctx.font="25px Arial";var l=a.ctx.measureText(o.name).width;a.ctx.fillText(o.name,r+s*n.GridSize-l/2+n.GridSize/2,i+c*n.GridSize-n.GridSize/2),a.ctx.fillStyle=t.PlayersColor,a.ctx.fillRect(r+s*n.GridSize,i+c*n.GridSize,n.GridSize,n.GridSize)}))}},{key:"renderCrawlers",value:function(e,r,i){var a=this;e.hasOwnProperty("crawlers")&&e.crawlers.forEach((function(o){var s=o.pos.x-e.player.pos.x,c=o.pos.y-e.player.pos.y;a.ctx.fillStyle=t.CrawlerColor,a.ctx.fillRect(r+s*n.GridSize,i+c*n.GridSize,n.GridSize,n.GridSize)}))}},{key:"renderItems",value:function(e,r,i){var a=this;e.hasOwnProperty("items")&&e.items.forEach((function(o){var s=o.pos.x-e.player.pos.x,c=o.pos.y-e.player.pos.y;a.ctx.fillStyle=t.ItemColor,a.ctx.fillRect(r+s*n.GridSize,i+c*n.GridSize,n.GridSize,n.GridSize)}))}}])&&a(r.prototype,i),o&&a(r,o),e}();function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,i)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){y(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function y(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var u=document.getElementById("game-screen"),h=document.getElementById("form-screen"),d=document.getElementById("nickname-form"),p=document.getElementById("username-input");d.addEventListener("submit",(function(e){return(new f).init(e)}));var f=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),y(this,"controls",i.getInstance()),y(this,"renderer",o.getInstance())}var t,r;return t=e,(r=[{key:"init",value:function(e){var t=this;e.preventDefault(),h.style.display="none",u.style.display="block";var r=io("/");this.controls.init(r);var i=this.renderer.init();r.emit("playerInit",{name:p.value,canvasSize:i}),r.on("staticState",(function(e){return t.staticState=e})),r.on("dynamicState",this.onDynamicStateChange.bind(this))}},{key:"onDynamicStateChange",value:function(e){var t=this;requestAnimationFrame((function(){return t.renderer.renderGame(c(c({},t.staticState),e))}))}}])&&l(t.prototype,r),e}()})()})();
//# sourceMappingURL=bundle.js.map