/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/front-end/consts/config.const.ts":
/*!**********************************************!*\
  !*** ./src/front-end/consts/config.const.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Config": () => (/* binding */ Config)
/* harmony export */ });
var Config = {
  screenHeight: 600,
  screenWidth: 600
};

/***/ }),

/***/ "./src/front-end/controls.ts":
/*!***********************************!*\
  !*** ./src/front-end/controls.ts ***!
  \***********************************/
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

/***/ "./src/front-end/enums/colors.enum.ts":
/*!********************************************!*\
  !*** ./src/front-end/enums/colors.enum.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Colors": () => (/* binding */ Colors)
/* harmony export */ });
var Colors;

(function (Colors) {
  Colors["BgColor"] = "#231f20";
  Colors["PlayerColor"] = "#c2c2c2";
  Colors["ItemColor"] = "#e66916";
})(Colors || (Colors = {}));

/***/ }),

/***/ "./src/front-end/renderer.ts":
/*!***********************************!*\
  !*** ./src/front-end/renderer.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Renderer": () => (/* binding */ Renderer)
/* harmony export */ });
/* harmony import */ var _enums_colors_enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enums/colors.enum */ "./src/front-end/enums/colors.enum.ts");
/* harmony import */ var _consts_config_const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./consts/config.const */ "./src/front-end/consts/config.const.ts");
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
      this.canvas.height = _consts_config_const__WEBPACK_IMPORTED_MODULE_1__.Config.screenHeight;
      this.canvas.width = _consts_config_const__WEBPACK_IMPORTED_MODULE_1__.Config.screenWidth;
    }
  }, {
    key: "renderGame",
    value: function renderGame(state) {
      this.renderWorld(state);
      this.renderFood(state);
      this.renderPlayer(state);
    }
  }, {
    key: "renderWorld",
    value: function renderWorld(state) {
      this.ctx.fillStyle = _enums_colors_enum__WEBPACK_IMPORTED_MODULE_0__.Colors.BgColor;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = _enums_colors_enum__WEBPACK_IMPORTED_MODULE_0__.Colors.BgColor;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }, {
    key: "renderFood",
    value: function renderFood(state) {
      var food = state.food[0];
      var sizeW = this.canvas.width / state.gridSize;
      var sizeH = this.canvas.height / state.gridSize;
      this.ctx.fillStyle = _enums_colors_enum__WEBPACK_IMPORTED_MODULE_0__.Colors.ItemColor;
      this.ctx.fillRect(food.x * sizeW, food.y * sizeH, sizeW, sizeH);
    }
  }, {
    key: "renderPlayer",
    value: function renderPlayer(state) {
      var _this = this;

      var sizeW = this.canvas.width / state.gridSize;
      var sizeH = this.canvas.height / state.gridSize;
      state.players.forEach(function (player) {
        _this.ctx.fillStyle = _enums_colors_enum__WEBPACK_IMPORTED_MODULE_0__.Colors.PlayerColor;

        _this.ctx.fillRect(player.pos.x * sizeW, player.pos.y * sizeH, sizeW, sizeH);
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
/*!********************************!*\
  !*** ./src/front-end/index.ts ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controls */ "./src/front-end/controls.ts");
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderer */ "./src/front-end/renderer.ts");


var renderer = _renderer__WEBPACK_IMPORTED_MODULE_1__.Renderer.getInstance();
var controls = _controls__WEBPACK_IMPORTED_MODULE_0__.Controls.getInstance(); //@ts-ignore

var socket = io('/');
socket.on('nameRequest', nameResponse);

function nameResponse() {
  socket.emit('nameResponse', 'MyNickname');
}

socket.on('gameState', handleGameState);

function handleGameState(gameStateDto) {
  var gameState = JSON.parse(gameStateDto);
  requestAnimationFrame(function () {
    return renderer.renderGame(gameState);
  });
}

controls.init(socket);
renderer.init();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map