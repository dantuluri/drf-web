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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.easeInOut = easeInOut;
exports.sinEaseInOut = sinEaseInOut;
exports.smallEaseInOut = smallEaseInOut;
exports.slurp = slurp;
exports.experp = experp;
exports.clampedSlurp = clampedSlurp;
exports.clamp = clamp;
exports.divideInterval = divideInterval;
exports.posMod = posMod;
exports.to2dIsometric = to2dIsometric;

var _matrixMultiplication = __webpack_require__(8);

var _matrixMultiplication2 = _interopRequireDefault(_matrixMultiplication);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function easeInOut(t) {
    var amt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

    var tPow = Math.pow(t, amt);
    return tPow / (tPow + Math.pow(1 - t, amt));
}

function sinEaseInOut(t) {
    return 0.5 - 0.5 * Math.cos(Math.PI * t);
}

function smallEaseInOut(t, a, b) {
    // maximum slope, during the constant part
    var m = 1 / (1 - a - b);

    // f0
    if (t < a) {
        return 0;
    }

    // f1
    if (t < b) {
        return m / 2 / (b - a) * (t - a) * (t - a);
    }

    // f2
    if (t < 1 - b) {
        return m * (t - b) + // constant line part
        m / 2 * (b - a); // maximum value of f1
    }

    // use symmetry powers
    return 1 - smallEaseInOut(1 - t, a, b);
}

function slurp(val1, val2, amt) {
    return (val2 - val1) * amt + val1;
}

function experp(val1, val2, amt) {
    return Math.exp(slurp(Math.log(val1), Math.log(val2), amt));
}

function clampedSlurp(val1, val2, amt) {
    if (amt < 0) {
        return val1;
    }
    if (amt > 1) {
        return val2;
    }
    return slurp(val1, val2, amt);
}

function clamp(amt, val1, val2) {
    if (amt < val1) {
        return val1;
    }
    if (amt > val2) {
        return val2;
    }
    return amt;
}

/**
 * Extracts a 0-1 interval from a section of a 0-1 interval
 *
 * For example, if min == 0.3 and max == 0.7, you get:
 *
 *           0.3  0.7
 *     t: 0 --+----+-- 1
 *           /      \
 *          /        \
 *         /          \
 *     -> 0 ---------- 1
 *
 * Useful for making sub animations.
 *
 * Doesn't do any clamping, so you might want to clamp yourself.
 */
function divideInterval(t, min, max) {
    return (t - min) / (max - min);
}

/**
 * Does a positive modulo
 * @param {number} a The thing being modulo'd
 * @param {number} b The divider thing
 * @returns {number} a % b
 */
function posMod(a, b) {
    var out = a % b;
    if (out < 0) {
        out += b;
    }
    return out;
}

// TODO? Redesign so this generates a function?
function to2dIsometric(x, y, z) {
    var xzAngle = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var yAngle = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

    var mul = (0, _matrixMultiplication2.default)()(3);
    // s/o to wikipedia for these rotation matrices
    var xzRotateMatrix = [Math.cos(xzAngle), 0, -Math.sin(xzAngle), 0, 1, 0, Math.sin(xzAngle), 0, Math.cos(xzAngle)];
    var yRotateMatrix = [1, 0, 0, 0, Math.cos(yAngle), Math.sin(yAngle), 0, -Math.sin(yAngle), Math.cos(yAngle)];
    var transformMatrix = mul(yRotateMatrix, xzRotateMatrix);

    var transformed = mul(transformMatrix, [x, y, z]);
    // Just return the x and y
    return { x: transformed[0], y: transformed[1] };
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
    function Controller() {
        _classCallCheck(this, Controller);
    }

    _createClass(Controller, [{
        key: "update",
        value: function update(dt, mousePosition) {
            // nothing.
        }
    }, {
        key: "isOnScreen",
        value: function isOnScreen() {
            return true;
        }
    }, {
        key: "render",
        value: function render() {
            // nothing.
        }
    }]);

    return Controller;
}();

exports.default = Controller;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _controllerUtil = __webpack_require__(7);

var _controller = __webpack_require__(1);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CanvasController = function (_Controller) {
	_inherits(CanvasController, _Controller);

	function CanvasController(id) {
		var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
		var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

		_classCallCheck(this, CanvasController);

		var _this = _possibleConstructorReturn(this, (CanvasController.__proto__ || Object.getPrototypeOf(CanvasController)).call(this));

		_this.id = id;
		_this.canvas = document.getElementById(id);
		if (width == null) {
			width = _this.canvas.width;
		}
		if (height == null) {
			height = _this.canvas.height;
		}

		/** @type {CanvasRenderingContext2D} */
		_this.context = _this.canvas.getContext('2d');
		_this.width = width;
		_this.height = height;

		return _this;
	}

	_createClass(CanvasController, [{
		key: "changeHeight",
		value: function changeHeight(amt) {
			console.log("super height: ", this.height);
			this.height = amt;
		}
	}, {
		key: "isOnScreen",
		value: function isOnScreen() {
			return (0, _controllerUtil.elementInView)(this.canvas);
		}
	}, {
		key: "getScrollPosition",
		value: function getScrollPosition() {
			return (0, _controllerUtil.getScrollPosition)(this.canvas);
		}
	}, {
		key: "clear",
		value: function clear() {
			// Clear the previous frame
			this.context.resetTransform();
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}
	}]);

	return CanvasController;
}(_controller2.default);

exports.default = CanvasController;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.palette = undefined;
exports.rgb = rgb;
exports.grey = grey;

var _util = __webpack_require__(0);

function rgb(r, g, b) {
	return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function grey(whiteAmt) {
	whiteAmt = (0, _util.clamp)(whiteAmt, 0, 1);
	var whiteRgb = Math.floor(255 * whiteAmt);
	return rgb(whiteRgb, whiteRgb, whiteRgb);
}

var palette = exports.palette = {
	black: '#333',
	blue: '#4657d7',
	cyan: '#57a7cc',
	pink: '#e91e63',
	orange: '#ed7656'
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _conductor = __webpack_require__(5);

var _conductor2 = _interopRequireDefault(_conductor);

var _skewedSinusoidController = __webpack_require__(6);

var _skewedSinusoidController2 = _interopRequireDefault(_skewedSinusoidController);

var _rangeController = __webpack_require__(14);

var _rangeController2 = _interopRequireDefault(_rangeController);

var _lazyRangeController = __webpack_require__(15);

var _lazyRangeController2 = _interopRequireDefault(_lazyRangeController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var conductor = null;

function init() {

    var controllers = [];

    var sinusoidContinuousSlider = void 0;
    if (hasElement('sinusoid-continuous-slider')) {
        sinusoidContinuousSlider = new _rangeController2.default('sinusoid-continuous-slider');
        controllers.push(sinusoidContinuousSlider);
    }

    var sinusoidContinuousSliderRadius = void 0;
    if (hasElement('sinusoid-continuous-slider')) {
        sinusoidContinuousSliderRadius = new _lazyRangeController2.default('sinusoid-continuous-slider-radius');
        controllers.push(sinusoidContinuousSliderRadius);
    }

    if (hasElement('complex-sinusoid')) {
        var controller = new _skewedSinusoidController2.default('complex-sinusoid');
        if (sinusoidContinuousSlider) {
            sinusoidContinuousSlider.onValueChange.push(function (val) {
                return controller.setAnglePosition(val);
            });
        }
        if (sinusoidContinuousSliderRadius) {
            sinusoidContinuousSliderRadius.onValueChange.push(function (val) {
                return controller.setRadius(val);
            });
        }
        controllers.push(controller);
    }

    conductor = new _conductor2.default(controllers);
    conductor.start();
}

function hasElement(id) {
    return document.getElementById(id) != null;
}

/**
 * Configure the canvases to be able to handle screens with higher dpi.
 * 
 * We can only call this once because after that, the width has changed!
 */
function updateCanvasSizes() {
    var pixelRatio = window.devicePixelRatio || 1;
    var canvases = document.getElementsByTagName("canvas");
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = canvases[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var canvas = _step.value;

            var width = canvas.width;
            var height = canvas.height;
            canvas.width = width * pixelRatio;
            canvas.height = height * pixelRatio;
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}

// updateCanvasSizes();
init();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Conductor = function () {
	function Conductor(controllers) {
		var _this = this;

		_classCallCheck(this, Conductor);

		this.lastTime = Date.now();
		this.mousePosition = null;
		this.controllers = controllers.slice();
		this.updatingControllers = [];

		window.addEventListener('resize', function (evt) {
			return _this.onResize(evt);
		});
	}

	_createClass(Conductor, [{
		key: 'start',
		value: function start() {
			var _this2 = this;

			// Kick off the update loop
			window.requestAnimationFrame(function () {
				return _this2.everyFrame();
			});
		}
	}, {
		key: 'onResize',
		value: function onResize(evt) {
			this.controllers.forEach(function (controller) {
				if (typeof controller.onResize === 'function') {
					controller.onResize();
				}
			});
		}
	}, {
		key: 'everyFrame',
		value: function everyFrame() {
			var _this3 = this;

			this.update();
			this.render();
			requestAnimationFrame(function () {
				return _this3.everyFrame();
			});
		}
	}, {
		key: 'update',
		value: function update() {
			var _this4 = this;

			var curTime = Date.now();
			var dt = (curTime - this.lastTime) / 1000;

			this.updatingControllers = [];

			this.controllers.forEach(function (controller) {
				if (controller.isOnScreen()) {
					controller.update(dt, _this4.mousePosition);
					_this4.updatingControllers.push(controller);
				}
			});

			this.lastTime = curTime;

			var debug = document.getElementById('debug-content');
			if (debug) {
				debug.innerHTML = this.updatingControllers.map(function (c) {
					return c.id;
				}).join('<br>') + '<br>';
			}
		}
	}, {
		key: 'render',
		value: function render() {
			this.controllers.forEach(function (controller) {
				if (controller.isOnScreen()) {
					controller.render();
				}
			});
		}
	}]);

	return Conductor;
}();

exports.default = Conductor;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _canvasController = __webpack_require__(2);

var _canvasController2 = _interopRequireDefault(_canvasController);

var _util = __webpack_require__(0);

var _complexSinusoidController = __webpack_require__(12);

var _complexSinusoidController2 = _interopRequireDefault(_complexSinusoidController);

var _renderCube = __webpack_require__(13);

var _color = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SkewedSinusoidController = function (_CanvasController) {
    _inherits(SkewedSinusoidController, _CanvasController);

    function SkewedSinusoidController(id, width, height) {
        _classCallCheck(this, SkewedSinusoidController);

        var _this = _possibleConstructorReturn(this, (SkewedSinusoidController.__proto__ || Object.getPrototypeOf(SkewedSinusoidController)).call(this, id, width, height));

        _this.id = id;
        _this.width = width;
        _this.height = height;
        _this.xzAngle = Math.PI / 4;
        _this.yAngle = 0;

        _this.sinusoidController = new _complexSinusoidController2.default(id, width, height);
        _this.sinusoidController.xzAngleFn = function () {
            return _this.xzAngle;
        };
        _this.sinusoidController.yAngleFn = function () {
            return _this.yAngle;
        };
        return _this;
    }

    _createClass(SkewedSinusoidController, [{
        key: "update",
        value: function update(dt, mousePosition) {
            this.sinusoidController.update(dt, mousePosition);

            // change from scroll to slider
            var pos = this.pos;
            console.log("scroll pos: ", this.getScrollPosition());

            var spinAmt = Math.PI / 4;
            this.xzAngle = Math.PI / 4 + (0, _util.slurp)(-spinAmt, spinAmt, pos);
        }
    }, {
        key: "setAnglePosition",
        value: function setAnglePosition(amt) {
            this.pos = amt;
        }
    }, {
        key: "setRadius",
        value: function setRadius(amt) {
            var _this2 = this;

            this.radius = amt;
            console.log("radius: ", this.radius);
            // this.sinusoidController.changeHeight(this.radius*500);
            this.sinusoidController = new _complexSinusoidController2.default(this.id, this.width, this.radius * 800);
            this.sinusoidController.xzAngleFn = function () {
                return _this2.xzAngle;
            };
            this.sinusoidController.yAngleFn = function () {
                return _this2.yAngle;
            };
            console.log("controller radius: ", this.sinusoidController.height);
        }
    }, {
        key: "render",
        value: function render() {
            this.clear();
            this.sinusoidController.renderWave();

            // const halfHeight = this.sinusoidController.radius;
            // const halfWidth = .5 * this.sinusoidController.length;
            // const halfDepth = this.sinusoidController.radius;
            this.context.lineWidth = 1;
            this.context.strokeStyle = _color.palette.black;
        }
    }]);

    return SkewedSinusoidController;
}(_canvasController2.default);

exports.default = SkewedSinusoidController;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getScrollPosition = getScrollPosition;
exports.elementInView = elementInView;
function getScrollPosition(elem) {
    var boundingRect = elem.getBoundingClientRect();
    var centerY = (boundingRect.top + boundingRect.bottom) / 2;
    var windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return centerY / windowHeight;
}

function elementInView(elem) {
    // Thanks stack overflow https://stackoverflow.com/a/7557433
    var boundingRect = elem.getBoundingClientRect();

    return boundingRect.bottom >= 0 && boundingRect.top <= (window.innerHeight || document.documentElement.clientHeight) && boundingRect.right >= 0 && boundingRect.left <= (window.innerWidth || document.documentElement.clientWidth);
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var no = __webpack_require__(9);
var staticProps = __webpack_require__(10);

var pkg = __webpack_require__(11);

/**
 * Prepend package name to error message
 */

function msg(str) {
  return pkg.name + ': ' + str;
}

var error = {};

staticProps(error)({
  leftMatrixNotCompatible: msg('Cannot multiply matrix at left side'),
  rightMatrixNotCompatible: msg('Cannot multiply matrix at right side')
});

var matrixToArrayIndex = function matrixToArrayIndex(i, j, numCols) {
  return j + i * numCols;
};

/**
 * Multiply two matrices, row by column.
 *
 * @param {Number} customOperator
 * @param {Function} [customOperator.addition]
 * @param {Function} [customOperator.multiplication]
 *
 * @returns {Function} operator
 */

function matrixMultiplication(customOperator) {
  // operators

  if (no(customOperator)) customOperator = {};

  var add = customOperator.addition;
  var mul = customOperator.multiplication;

  // Default to operators over Reals.
  if (no(add)) add = function add(a, b) {
    return a + b;
  };
  if (no(mul)) mul = function mul(a, b) {
    return a * b;
  };

  /**
   * @param {Number} middle
   *
   * @returns {Function} mul
   */

  return function (middle) {
    /**
     * @param {Array} leftMatrix
     * @param {Array} rightMatrix
     *
     * @returns {Array} matrix
     */

    return function (leftMatrix, rightMatrix) {
      // Compatibilty check.

      var cols = rightMatrix.length / middle; // right num cols
      var rows = leftMatrix.length / middle; // left num rows

      var colsIsNotInteger = Math.floor(cols) !== cols;
      var rowsIsNotInteger = Math.floor(rows) !== rows;

      if (colsIsNotInteger) throw new TypeError(error.rightMatrixNotCompatible);
      if (rowsIsNotInteger) throw new TypeError(error.leftMatrixNotCompatible);

      // Compute result data.

      var data = [];

      for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
          var leftIndex = matrixToArrayIndex(i, 0, middle);
          var rightIndex = matrixToArrayIndex(0, j, cols);

          var rightElement = rightMatrix[rightIndex];
          var leftElement = leftMatrix[leftIndex];

          var element = mul(leftElement, rightElement);

          for (var k = 1; k < middle; k++) {
            leftIndex = matrixToArrayIndex(i, k, middle);
            rightIndex = matrixToArrayIndex(k, j, cols);

            rightElement = rightMatrix[rightIndex];
            leftElement = leftMatrix[leftIndex];

            element = add(element, mul(rightElement, leftElement));
          }

          data.push(element);
        }
      }

      return data;
    };
  };
}

staticProps(matrixMultiplication)({ error: error });

module.exports = matrixMultiplication;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function (x) {
  return x == null || typeof x == 'number' && isNaN(x) || x.length < 1 && typeof x != 'function' || (typeof x === 'undefined' ? 'undefined' : _typeof(x)) == 'object' && Object.keys(x).length < 1;
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @param {Object} obj
 * @returns {Function}
 */
function staticProps(obj) {
  /**
   * @param {Object} props
   * @param {Boolean} [enumerable]
   */
  return function (props, enumerable) {
    var staticProps = {};
    for (var propName in props) {
      var staticProp = {
        configurable: false,
        enumerable: enumerable
      };
      var prop = props[propName];
      if (typeof prop === 'function') {
        staticProp.get = prop;
      } else {
        staticProp.value = prop;
        staticProp.writable = false;
      }
      staticProps[propName] = staticProp;
    }
    Object.defineProperties(obj, staticProps);
  };
}
module.exports = exports.default = staticProps;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = {"_from":"matrix-multiplication","_id":"matrix-multiplication@0.5.2","_inBundle":false,"_integrity":"sha512-rr3Adfxn9cktAn8zYAkYiDbFZFkFflwjm9oSm5drBIQJPjFoqUlT9nq7aMwXpr+Nr4uurQKgxy+9pfk5X2YmYA==","_location":"/matrix-multiplication","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"matrix-multiplication","name":"matrix-multiplication","escapedName":"matrix-multiplication","rawSpec":"","saveSpec":null,"fetchSpec":"latest"},"_requiredBy":["#USER","/"],"_resolved":"https://registry.npmjs.org/matrix-multiplication/-/matrix-multiplication-0.5.2.tgz","_shasum":"3f5fd6eee86dfd592a6a299cc67a75cea17fc9bd","_spec":"matrix-multiplication","_where":"/Users/surya/Documents/fourier","author":{"name":"Gianluca Casati","url":"http://g14n.info"},"bugs":{"url":"https://github.com/fibo/matrix-multiplication/issues"},"bundleDependencies":false,"dependencies":{"not-defined":"^2.0.1","static-props":"^1.1.1"},"deprecated":false,"description":"implements row by column multiplication","devDependencies":{"pre-commit":"^1.2.2","standa":"^1.0.2","tape":"^4.8.0"},"homepage":"http://g14n.info/matrix-multiplication","keywords":["algebra"],"license":"MIT","main":"matrix-multiplication.js","name":"matrix-multiplication","pre-commit":["lint","test","check-deps"],"repository":{"type":"git","url":"git://github.com/fibo/matrix-multiplication.git"},"scripts":{"check-deps":"npm outdated","lint":"standa","postversion":"git push origin v${npm_package_version}; npm publish; git push origin master","test":"NODE_PATH=. tape test.js"},"version":"0.5.2"}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _canvasController = __webpack_require__(2);

var _canvasController2 = _interopRequireDefault(_canvasController);

var _util = __webpack_require__(0);

var _color = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var transitionFactor = 1 / 18;

var ComplexSinusoidController = function (_CanvasController) {
    _inherits(ComplexSinusoidController, _CanvasController);

    function ComplexSinusoidController(id, width, height) {
        _classCallCheck(this, ComplexSinusoidController);

        var _this = _possibleConstructorReturn(this, (ComplexSinusoidController.__proto__ || Object.getPrototypeOf(ComplexSinusoidController)).call(this, id, width, height));

        _this.animAmt = 0;
        // Functions so that they can be overridden elsewhere.
        _this.xzAngleFn = function () {
            return _this.xzAngle;
        };
        _this.yAngleFn = function () {
            return 0;
        };
        _this.radius = 0.2 * _this.height;
        _this.length = 0.7 * _this.width;
        _this.xzAngle = 0;
        return _this;
    }

    _createClass(ComplexSinusoidController, [{
        key: "update",
        value: function update(dt, mousePosition) {
            var period = 7;
            this.animAmt += dt / period;
            this.animAmt %= 1;

            var pos = this.getScrollPosition();
            var desiredAngle = 0;
            if (pos < 0.6) {
                desiredAngle = Math.PI / 2;
            }
            this.xzAngle += transitionFactor * (desiredAngle - this.xzAngle);
        }
    }, {
        key: "render",
        value: function render() {
            this.clear();
            this.renderWave();
        }
    }, {
        key: "renderWave",
        value: function renderWave() {
            this.context.translate(this.context.canvas.width / 2, this.context.canvas.height / 2);
            this.context.beginPath();
            this.context.strokeStyle = _color.palette.blue;
            this.context.lineWidth = 2;

            var xzAngle = this.xzAngleFn(this.animAmt);
            var yAngle = this.yAngleFn(this.animAmt);
            for (var i = 0; i < 100; i++) {
                var amt = i / 99;
                var x = this.length * (amt - 0.5);
                var y = this.radius * Math.sin(2 * Math.PI * (3 * amt - 4 * this.animAmt));
                var z = this.radius * Math.cos(2 * Math.PI * (3 * amt - 4 * this.animAmt));

                var points = (0, _util.to2dIsometric)(x, y, z, xzAngle, yAngle);
                if (amt == 0) {
                    this.context.arc(points.x, points.y, 3, 0, 2 * Math.PI);
                }
                if (i == 0) {
                    this.context.moveTo(points.x, points.y);
                } else {
                    this.context.lineTo(points.x, points.y);
                }
            }

            this.context.stroke();
        }
    }]);

    return ComplexSinusoidController;
}(_canvasController2.default);

exports.default = ComplexSinusoidController;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.renderBoundingCube = renderBoundingCube;

var _util = __webpack_require__(0);

function renderBoundingCube(context, minX, maxX, minY, maxY, minZ, maxZ, xzAngle, yAngle) {
    var xs = [minX, maxX];
    var ys = [minY, maxY];
    var zs = [minZ, maxZ];

    context.beginPath();
    context.globalAlpha = 0.1;

    var permutations = [[0, 0], [0, 1], [1, 0], [1, 1]];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = permutations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _ref = _step.value;

            var _ref2 = _slicedToArray(_ref, 2);

            var p1 = _ref2[0];
            var p2 = _ref2[1];

            // edges along x axis
            line3d(context, xs[0], ys[p1], zs[p2], xs[1], ys[p1], zs[p2], xzAngle, yAngle);
            // along y axis
            line3d(context, xs[p1], ys[0], zs[p2], xs[p1], ys[1], zs[p2], xzAngle, yAngle);
            // along z axis
            line3d(context, xs[p1], ys[p2], zs[0], xs[p1], ys[p2], zs[1], xzAngle, yAngle);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    context.stroke();
    context.globalAlpha = 1;
}

function line3d(context, x1, y1, z1, x2, y2, z2, xzAngle, yAngle) {
    var startPoint = (0, _util.to2dIsometric)(x1, y1, z1, xzAngle, yAngle);
    var endPoint = (0, _util.to2dIsometric)(x2, y2, z2, xzAngle, yAngle);
    context.moveTo(startPoint.x, startPoint.y);
    context.lineTo(endPoint.x, endPoint.y);
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _controller = __webpack_require__(1);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RangeController = function (_Controller) {
    _inherits(RangeController, _Controller);

    function RangeController(id) {
        _classCallCheck(this, RangeController);

        var _this = _possibleConstructorReturn(this, (RangeController.__proto__ || Object.getPrototypeOf(RangeController)).call(this));

        _this.id = id;
        _this.slider = document.getElementById(id);

        _this.onValueChange = [];

        _this.holdValueCount = 0;
        /**
         * How long to pause on the value the person set before continuing
         */
        _this.holdValueLength = 10;
        _this.heldValue = 0;

        _this.resumeCount = 0;
        /**
         * Time to transition back to being controller automatically
         */
        _this.resumeLength = 1;

        _this.animate = true;
        _this.animAmt = 0;
        _this.period = 10;

        _this.slider.oninput = function () {
            return _this.holdValue();
        };
        return _this;
    }

    _createClass(RangeController, [{
        key: "update",
        value: function update(dt, mousePosition) {
            var _this2 = this;

            if (!this.animate) {
                return;
            }
            if (this.holdValueCount > 0) {
                this.holdValueCount -= dt;
                // Just set it back to zero to be clean about it.
                if (this.holdValueCount <= 0) {
                    this.holdValueCount = 0;
                }

                // we're going to return here so we don't mangle the value of the slider
                return;
            } else if (this.resumeCount > 0) {
                this.resumeCount -= dt;
                if (this.resumeCount <= 0) {
                    this.resumeCount = 0;
                }
            }

            // Goes from 0 to 1 as stuff resumes.
            var resumeAmt = 1 - this.resumeCount / this.resumeLength;
            var easedResumeAmt = (0, _util.easeInOut)(resumeAmt, 3);
            // Multiply by the resume amt to slow it down
            this.animAmt += easedResumeAmt * dt / this.period;
            this.animAmt %= 1;

            var sinePos = 0.5 * Math.cos(2 * Math.PI * this.animAmt) + 0.5;
            this.slider.value = sinePos;

            console.log("slide val: ", this.slider.value);
            this.onValueChange.forEach(function (fn) {
                return fn(1 - _this2.slider.value);
            });
        }
    }, {
        key: "holdValue",
        value: function holdValue() {
            var _this3 = this;

            this.holdValueCount = this.holdValueLength;
            this.resumeCount = this.resumeLength;
            this.heldValue = this.slider.value;
            // Calculate what the anim amt should be.

            this.animAmt = Math.acos(2 * this.heldValue - 1) / (2 * Math.PI);

            this.onValueChange.forEach(function (fn) {
                return fn(1 - _this3.slider.value);
            });
        }
    }]);

    return RangeController;
}(_controller2.default);

exports.default = RangeController;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _controller = __webpack_require__(1);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LazyRangeController = function (_Controller) {
  _inherits(LazyRangeController, _Controller);

  function LazyRangeController(id) {
    _classCallCheck(this, LazyRangeController);

    var _this = _possibleConstructorReturn(this, (LazyRangeController.__proto__ || Object.getPrototypeOf(LazyRangeController)).call(this));

    _this.id = id;
    _this.slider = document.getElementById(id);

    _this.onValueChange = [];

    _this.holdValueCount = 0;
    /**
     * How long to pause on the value the person set before continuing
     */
    _this.holdValueLength = 10;
    _this.heldValue = 0;

    _this.resumeCount = 0;
    /**
     * Time to transition back to being controller automatically
     */
    _this.resumeLength = 1;

    _this.animate = true;
    _this.animAmt = 0;
    _this.period = 10;

    _this.slider.oninput = function () {
      return _this.holdValue();
    };
    return _this;
  }

  _createClass(LazyRangeController, [{
    key: "holdValue",
    value: function holdValue() {
      var _this2 = this;

      this.holdValueCount = this.holdValueLength;
      this.resumeCount = this.resumeLength;
      this.heldValue = this.slider.value;
      // Calculate what the anim amt should be.

      this.animAmt = Math.acos(2 * this.heldValue - 1) / (2 * Math.PI);

      this.onValueChange.forEach(function (fn) {
        return fn(_this2.slider.value);
      });
    }
  }]);

  return LazyRangeController;
}(_controller2.default);

exports.default = LazyRangeController;

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map