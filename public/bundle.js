/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controls.ts":
/*!*************************!*\
  !*** ./src/controls.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Controls": () => (/* binding */ Controls)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Controls = /*#__PURE__*/function () {
  function Controls() {
    _classCallCheck(this, Controls);
  }

  _createClass(Controls, [{
    key: "init",
    value: function init(socket) {
      this.initMovement(socket);
    }
  }, {
    key: "initMovement",
    value: function initMovement(socket) {
      var left = 0;
      var right = 0;
      var up = 0;
      var down = 0;
      document.addEventListener('keydown', function (event) {
        switch (event.key) {
          case 'a':
            left = -1;
            break;

          case 'd':
            right = 1;
            break;

          case 'w':
            up = -1;
            break;

          case 's':
            down = 1;
            break;
        }

        socket.emit('velocityChange', {
          x: left + right,
          y: up + down
        });
      });
      document.addEventListener('keyup', function (event) {
        switch (event.key) {
          case 'a':
            left = 0;
            break;

          case 'd':
            right = 0;
            break;

          case 'w':
            up = 0;
            break;

          case 's':
            down = 0;
            break;
        }

        socket.emit('velocityChange', {
          x: left + right,
          y: up + down
        });
      });
    }
  }], [{
    key: "getInstance",
    value: function getInstance() {
      if (!Controls.instance) {
        Controls.instance = new Controls();
      }

      return Controls.instance;
    }
  }]);

  return Controls;
}();

/***/ }),

/***/ "./src/enums/colors.enum.ts":
/*!**********************************!*\
  !*** ./src/enums/colors.enum.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Colors": () => (/* binding */ Colors)
/* harmony export */ });
var Colors;

(function (Colors) {
  Colors["BgColor"] = "#231f20";
  Colors["FloorColor"] = "#93c09e";
  Colors["PlayerColor"] = "#006a4e";
  Colors["PlayersColor"] = "#136185";
  Colors["ItemColor"] = "#e66916";
  Colors["NameColor"] = "#F0FFF0";
})(Colors || (Colors = {}));

/***/ }),

/***/ "./src/renderer.ts":
/*!*************************!*\
  !*** ./src/renderer.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Renderer": () => (/* binding */ Renderer)
/* harmony export */ });
/* harmony import */ var _enums_colors_enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enums/colors.enum */ "./src/enums/colors.enum.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var Renderer = /*#__PURE__*/function () {
  function Renderer() {
    _classCallCheck(this, Renderer);
  }

  _createClass(Renderer, [{
    key: "init",
    value: function init() {
      this.canvas = document.getElementById('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.canvas.height = window.innerHeight * 0.75;
      this.canvas.width = window.innerWidth * 0.75;
    }
  }, {
    key: "renderGame",
    value: function renderGame(state) {
      this.renderWorld(state);

      var _this$renderPlayer = this.renderPlayer(state),
          playerX = _this$renderPlayer.playerX,
          playerY = _this$renderPlayer.playerY;

      this.renderPlayers(state, playerX, playerY);
      this.renderItems(state, playerX, playerY);
    }
  }, {
    key: "renderWorld",
    value: function renderWorld(state) {
      this.ctx.fillStyle = _enums_colors_enum__WEBPACK_IMPORTED_MODULE_0__.Colors.BgColor;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = _enums_colors_enum__WEBPACK_IMPORTED_MODULE_0__.Colors.FloorColor;
      this.ctx.fillRect(0, 0, state.map.mapWidth * state.gridSize, state.map.mapHeight * state.gridSize);
    }
  }, {
    key: "renderPlayer",
    value: function renderPlayer(state) {
      var player = state.player;
      var gridCanvasWidth = Math.ceil(this.canvas.width / state.gridSize);
      var gridCanvasHeight = Math.ceil(this.canvas.height / state.gridSize);
      var playerX;
      var playerY;

      if (player.pos.x <= gridCanvasWidth / 2) {
        playerX = player.pos.x * state.gridSize;
      } else if (player.pos.x >= state.map.mapWidth - gridCanvasWidth / 2) {
        playerX = this.canvas.width - (state.map.mapWidth - player.pos.x) * state.gridSize;
      } else {
        playerX = this.canvas.width / 2;
      }

      if (player.pos.y <= gridCanvasHeight / 2) {
        playerY = player.pos.y * state.gridSize;
      } else if (player.pos.y >= state.map.mapHeight - gridCanvasHeight / 2) {
        playerY = this.canvas.height - (state.map.mapHeight - player.pos.y) * state.gridSize;
      } else {
        playerY = this.canvas.height / 2;
      } //name


      this.ctx.fillStyle = _enums_colors_enum__WEBPACK_IMPORTED_MODULE_0__.Colors.NameColor;
      this.ctx.font = "25px Arial";
      var textWidth = this.ctx.measureText(player.name).width;
      this.ctx.fillText(player.name, playerX - textWidth / 2 + state.gridSize / 2, playerY - state.gridSize / 2); //character

      this.ctx.fillStyle = _enums_colors_enum__WEBPACK_IMPORTED_MODULE_0__.Colors.PlayerColor;
      this.ctx.fillRect(playerX, playerY, state.gridSize, state.gridSize);
      return {
        playerX: playerX,
        playerY: playerY
      };
    }
  }, {
    key: "renderPlayers",
    value: function renderPlayers(state, playerX, playerY) {
      var _this = this;

      var gridCanvasWidth = Math.ceil(this.canvas.width / state.gridSize);
      var gridCanvasHeight = Math.ceil(this.canvas.height / state.gridSize);
      state.players.forEach(function (player) {
        var xGridDiff = player.pos.x - state.player.pos.x;
        var yGridDiff = player.pos.y - state.player.pos.y;

        if (Math.abs(xGridDiff) < gridCanvasWidth && Math.abs(yGridDiff) < gridCanvasHeight) {
          //name
          _this.ctx.fillStyle = _enums_colors_enum__WEBPACK_IMPORTED_MODULE_0__.Colors.NameColor;
          _this.ctx.font = "25px Arial";

          var textWidth = _this.ctx.measureText(player.name).width;

          _this.ctx.fillText(player.name, playerX + xGridDiff * state.gridSize - textWidth / 2 + state.gridSize / 2, playerY + yGridDiff * state.gridSize - state.gridSize / 2); //character


          _this.ctx.fillStyle = _enums_colors_enum__WEBPACK_IMPORTED_MODULE_0__.Colors.PlayersColor;

          _this.ctx.fillRect(playerX + xGridDiff * state.gridSize, playerY + yGridDiff * state.gridSize, state.gridSize, state.gridSize);
        }
      });
    }
  }, {
    key: "renderItems",
    value: function renderItems(state, playerX, playerY) {
      var _this2 = this;

      state.items.forEach(function (item) {
        _this2.ctx.fillStyle = _enums_colors_enum__WEBPACK_IMPORTED_MODULE_0__.Colors.ItemColor;

        _this2.ctx.fillRect(item.pos.x * state.gridSize, item.pos.y * state.gridSize, state.gridSize, state.gridSize);
      });
    }
  }], [{
    key: "getInstance",
    value: function getInstance() {
      if (!Renderer.instance) {
        Renderer.instance = new Renderer();
      }

      return Renderer.instance;
    }
  }]);

  return Renderer;
}();

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controls */ "./src/controls.ts");
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderer */ "./src/renderer.ts");

 //@ts-ignore

var socket = io('/');
var gameScreen = document.getElementById('game-screen');
var formScreen = document.getElementById('form-screen');
var input = document.getElementById('username-input');
var loginForm = document.getElementById('nickname-form');
loginForm.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  socket.emit('playerInit', "".concat(input.value));
  formScreen.style.display = 'none';
  gameScreen.style.display = 'block';
  new Promise(function (resolve) {
    socket.on('playerAdded', function () {
      return resolve(true);
    });
  }).then(function () {
    return startGame();
  });
}

function startGame() {
  var renderer = _renderer__WEBPACK_IMPORTED_MODULE_1__.Renderer.getInstance();
  var controls = _controls__WEBPACK_IMPORTED_MODULE_0__.Controls.getInstance();
  socket.on('gameState', handleGameState);

  function handleGameState(gameStateDto) {
    var gameState = JSON.parse(gameStateDto);
    requestAnimationFrame(function () {
      return renderer.renderGame(gameState);
    });
  }

  controls.init(socket);
  renderer.init();
}
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map