/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/front-end/consts/config.const.ts":
/*!**********************************************!*\
  !*** ./src/front-end/consts/config.const.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Config\": () => (/* binding */ Config)\n/* harmony export */ });\nvar Config = {\n  worldHeight: 600,\n  worldWidth: 600\n};\n\n//# sourceURL=webpack://browser-game/./src/front-end/consts/config.const.ts?");

/***/ }),

/***/ "./src/front-end/controller.ts":
/*!*************************************!*\
  !*** ./src/front-end/controller.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Controller\": () => (/* binding */ Controller)\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Controller = /*#__PURE__*/function () {\n  function Controller() {\n    _classCallCheck(this, Controller);\n  }\n\n  _createClass(Controller, [{\n    key: \"init\",\n    value: function init() {\n      document.addEventListener('keydown', this.keyDown);\n      document.addEventListener('keyup', this.keyUp);\n    }\n  }, {\n    key: \"keyDown\",\n    value: function keyDown($event) {\n      console.log($event.keyCode, 'down');\n    }\n  }, {\n    key: \"keyUp\",\n    value: function keyUp($event) {\n      console.log($event.keyCode, 'up');\n    }\n  }], [{\n    key: \"getInstance\",\n    value: function getInstance() {\n      if (!Controller.instance) {\n        Controller.instance = new Controller();\n      }\n\n      return Controller.instance;\n    }\n  }]);\n\n  return Controller;\n}();\n\n//# sourceURL=webpack://browser-game/./src/front-end/controller.ts?");

/***/ }),

/***/ "./src/front-end/enums/colors.enum.ts":
/*!********************************************!*\
  !*** ./src/front-end/enums/colors.enum.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Colors\": () => (/* binding */ Colors)\n/* harmony export */ });\nvar Colors;\n\n(function (Colors) {\n  Colors[\"BgColor\"] = \"#231f20\";\n  Colors[\"PlayerColor\"] = \"#c2c2c2\";\n  Colors[\"ItemColor\"] = \"#e66916\";\n})(Colors || (Colors = {}));\n\n//# sourceURL=webpack://browser-game/./src/front-end/enums/colors.enum.ts?");

/***/ }),

/***/ "./src/front-end/index.ts":
/*!********************************!*\
  !*** ./src/front-end/index.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller */ \"./src/front-end/controller.ts\");\n/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderer */ \"./src/front-end/renderer.ts\");\n/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state */ \"./src/front-end/state.ts\");\n// import { Colors } from \"./enums/colors.enum\";\n// import { GameStateDto } from \"./models/game-state-dto.model\";\n\n\n // const gameScreen = document.getElementById('game-screen');\n\nvar renderer = _renderer__WEBPACK_IMPORTED_MODULE_1__.Renderer.getInstance();\nvar controller = _controller__WEBPACK_IMPORTED_MODULE_0__.Controller.getInstance();\nvar state = _state__WEBPACK_IMPORTED_MODULE_2__.State.getInstance();\nstate.init();\nrenderer.init();\ncontroller.init();\nrenderer.renderGame(state.getState()); //@ts-ignore\n\nvar socket = io('/');\nsocket.on('init', handleInit);\n\nfunction handleInit(msg) {\n  console.log(msg);\n}\n\n//# sourceURL=webpack://browser-game/./src/front-end/index.ts?");

/***/ }),

/***/ "./src/front-end/renderer.ts":
/*!***********************************!*\
  !*** ./src/front-end/renderer.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Renderer\": () => (/* binding */ Renderer)\n/* harmony export */ });\n/* harmony import */ var _enums_colors_enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enums/colors.enum */ \"./src/front-end/enums/colors.enum.ts\");\n/* harmony import */ var _consts_config_const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./consts/config.const */ \"./src/front-end/consts/config.const.ts\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar Renderer = /*#__PURE__*/function () {\n  function Renderer() {\n    _classCallCheck(this, Renderer);\n  }\n\n  _createClass(Renderer, [{\n    key: \"init\",\n    value: function init() {\n      this.canvas = document.getElementById('canvas');\n      this.ctx = this.canvas.getContext('2d');\n      this.canvas.height = _consts_config_const__WEBPACK_IMPORTED_MODULE_1__.Config.worldHeight;\n      this.canvas.width = _consts_config_const__WEBPACK_IMPORTED_MODULE_1__.Config.worldWidth;\n    }\n  }, {\n    key: \"renderGame\",\n    value: function renderGame(state) {\n      this.renderWorld(state);\n      this.renderFood(state);\n      this.renderPlayer(state);\n    }\n  }, {\n    key: \"renderWorld\",\n    value: function renderWorld(state) {\n      this.ctx.fillStyle = _enums_colors_enum__WEBPACK_IMPORTED_MODULE_0__.Colors.BgColor;\n      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);\n      this.ctx.fillStyle = _enums_colors_enum__WEBPACK_IMPORTED_MODULE_0__.Colors.BgColor;\n      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);\n    }\n  }, {\n    key: \"renderFood\",\n    value: function renderFood(state) {\n      var food = state.food[0];\n      var sizeW = this.canvas.width / state.gridSize;\n      var sizeH = this.canvas.height / state.gridSize;\n      this.ctx.fillStyle = _enums_colors_enum__WEBPACK_IMPORTED_MODULE_0__.Colors.ItemColor;\n      this.ctx.fillRect(food.x * sizeW, food.y * sizeH, sizeW, sizeH);\n    }\n  }, {\n    key: \"renderPlayer\",\n    value: function renderPlayer(state) {\n      var player = state.player;\n      var sizeW = this.canvas.width / state.gridSize;\n      var sizeH = this.canvas.height / state.gridSize;\n      this.ctx.fillStyle = _enums_colors_enum__WEBPACK_IMPORTED_MODULE_0__.Colors.PlayerColor;\n      this.ctx.fillRect(player.pos.x * sizeW, player.pos.y * sizeH, sizeW, sizeH);\n    }\n  }], [{\n    key: \"getInstance\",\n    value: function getInstance() {\n      if (!Renderer.instance) {\n        Renderer.instance = new Renderer();\n      }\n\n      return Renderer.instance;\n    }\n  }]);\n\n  return Renderer;\n}();\n\n//# sourceURL=webpack://browser-game/./src/front-end/renderer.ts?");

/***/ }),

/***/ "./src/front-end/state.ts":
/*!********************************!*\
  !*** ./src/front-end/state.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"State\": () => (/* binding */ State)\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar State = /*#__PURE__*/function () {\n  function State() {\n    _classCallCheck(this, State);\n  }\n\n  _createClass(State, [{\n    key: \"init\",\n    value: function init() {\n      this.state = {\n        player: {\n          pos: {\n            x: 5,\n            y: 10\n          },\n          vel: {\n            x: 0,\n            y: 0\n          }\n        },\n        food: [{\n          x: 7,\n          y: 7\n        }],\n        gridSize: 20\n      };\n    }\n  }, {\n    key: \"getState\",\n    value: function getState() {\n      return this.state;\n    }\n  }], [{\n    key: \"getInstance\",\n    value: function getInstance() {\n      if (!State.instance) {\n        State.instance = new State();\n      }\n\n      return State.instance;\n    }\n  }]);\n\n  return State;\n}();\n\n//# sourceURL=webpack://browser-game/./src/front-end/state.ts?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/front-end/index.ts");
/******/ 	
/******/ })()
;