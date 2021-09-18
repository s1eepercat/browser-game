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
  worldHeight: 600,
  worldWidth: 600
};

/***/ }),

/***/ "./src/front-end/controller.ts":
/*!*************************************!*\
  !*** ./src/front-end/controller.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Controller": () => (/* binding */ Controller)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Controller = /*#__PURE__*/function () {
  function Controller() {
    _classCallCheck(this, Controller);
  }

  _createClass(Controller, [{
    key: "init",
    value: function init() {
      document.addEventListener('keydown', this.keyDown);
      document.addEventListener('keyup', this.keyUp);
    }
  }, {
    key: "keyDown",
    value: function keyDown($event) {
      console.log($event.keyCode, 'down');
    }
  }, {
    key: "keyUp",
    value: function keyUp($event) {
      console.log($event.keyCode, 'up');
    }
  }], [{
    key: "getInstance",
    value: function getInstance() {
      if (!Controller.instance) {
        Controller.instance = new Controller();
      }

      return Controller.instance;
    }
  }]);

  return Controller;
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
      this.canvas.height = _consts_config_const__WEBPACK_IMPORTED_MODULE_1__.Config.worldHeight;
      this.canvas.width = _consts_config_const__WEBPACK_IMPORTED_MODULE_1__.Config.worldWidth;
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
      var player = state.player;
      var sizeW = this.canvas.width / state.gridSize;
      var sizeH = this.canvas.height / state.gridSize;
      this.ctx.fillStyle = _enums_colors_enum__WEBPACK_IMPORTED_MODULE_0__.Colors.PlayerColor;
      this.ctx.fillRect(player.pos.x * sizeW, player.pos.y * sizeH, sizeW, sizeH);
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

/***/ }),

/***/ "./src/front-end/state.ts":
/*!********************************!*\
  !*** ./src/front-end/state.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "State": () => (/* binding */ State)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var State = /*#__PURE__*/function () {
  function State() {
    _classCallCheck(this, State);
  }

  _createClass(State, [{
    key: "init",
    value: function init() {
      this.state = {
        player: {
          pos: {
            x: 5,
            y: 10
          },
          vel: {
            x: 0,
            y: 0
          }
        },
        food: [{
          x: 7,
          y: 7
        }],
        gridSize: 20
      };
    }
  }, {
    key: "getState",
    value: function getState() {
      return this.state;
    }
  }], [{
    key: "getInstance",
    value: function getInstance() {
      if (!State.instance) {
        State.instance = new State();
      }

      return State.instance;
    }
  }]);

  return State;
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
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller */ "./src/front-end/controller.ts");
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderer */ "./src/front-end/renderer.ts");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state */ "./src/front-end/state.ts");
// import { Colors } from "./enums/colors.enum";
// import { GameStateDto } from "./models/game-state-dto.model";


 // const gameScreen = document.getElementById('game-screen');

var renderer = _renderer__WEBPACK_IMPORTED_MODULE_1__.Renderer.getInstance();
var controller = _controller__WEBPACK_IMPORTED_MODULE_0__.Controller.getInstance();
var state = _state__WEBPACK_IMPORTED_MODULE_2__.State.getInstance();
state.init();
renderer.init();
controller.init();
renderer.renderGame(state.getState());
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map