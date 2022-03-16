/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/App.jsx","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/App.jsx":
/*!*********************!*\
  !*** ./src/App.jsx ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_Main_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Main.jsx */ \"./src/components/Main.jsx\");\n\n\n\n\nvar App = function App() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Main_jsx__WEBPACK_IMPORTED_MODULE_2__[\"StockChart\"], null));\n};\n\nreact_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(App, null), document.getElementById(\"root\"));\n\n//# sourceURL=webpack:///./src/App.jsx?");

/***/ }),

/***/ "./src/components/Main.jsx":
/*!*********************************!*\
  !*** ./src/components/Main.jsx ***!
  \*********************************/
/*! exports provided: StockChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"StockChart\", function() { return StockChart; });\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _hooks_useQuery_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../hooks/useQuery.jsx */ \"./src/hooks/useQuery.jsx\");\n/* harmony import */ var react_google_charts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-google-charts */ \"./node_modules/react-google-charts/dist/index.js\");\n/* harmony import */ var _misc_config_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../misc/config.jsx */ \"./src/misc/config.jsx\");\n\n\n\n\n\nvar StockChart = function StockChart() {\n  var _useQuery = Object(_hooks_useQuery_jsx__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\"RAIN UW Equity\"),\n      _useQuery2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useQuery, 2),\n      _useQuery2$ = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useQuery2[0], 2),\n      displayTitle = _useQuery2$[0],\n      displayData = _useQuery2$[1],\n      searchData = _useQuery2[1];\n\n  var checkUpslope = function checkUpslope() {\n    if (displayData.length === 0) return false;\n    var leftBound = displayData[1][1];\n    var rightBound = displayData[displayData.length - 1][1];\n    return rightBound - leftBound > 0;\n  };\n\n  var config = {\n    title: displayTitle,\n    darkTheme: false,\n    upslope: checkUpslope()\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_google_charts__WEBPACK_IMPORTED_MODULE_3__[\"Chart\"], {\n    chartType: \"AreaChart\",\n    width: \"100%\",\n    height: \"400px\",\n    data: displayData,\n    options: Object(_misc_config_jsx__WEBPACK_IMPORTED_MODULE_4__[\"generateOptions\"])(config)\n  });\n};\n\n//# sourceURL=webpack:///./src/components/Main.jsx?");

/***/ }),

/***/ "./src/hooks/useQuery.jsx":
/*!********************************!*\
  !*** ./src/hooks/useQuery.jsx ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _misc_util_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../misc/util.jsx */ \"./src/misc/util.jsx\");\n\n\n\n\n\n\nvar useQuery = function useQuery(defaultSearchTerm) {\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__[\"useState\"])([\"\", []]),\n      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState, 2),\n      data = _useState2[0],\n      setData = _useState2[1];\n\n  Object(react__WEBPACK_IMPORTED_MODULE_3__[\"useEffect\"])(function () {\n    search(defaultSearchTerm);\n  }, [defaultSearchTerm]);\n\n  var search = /*#__PURE__*/function () {\n    var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee(ticker) {\n      var query, _yield$graphQLFetch, _yield$graphQLFetch$h, date, px_last, px_volume, res;\n\n      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              query = \"query {\\n          historicalData (ticker: \\\"\".concat(ticker, \"\\\") {\\n            ticker date px_last px_volume\\n          }\\n        }\");\n              _context.next = 3;\n              return Object(_misc_util_jsx__WEBPACK_IMPORTED_MODULE_4__[\"graphQLFetch\"])(query);\n\n            case 3:\n              _yield$graphQLFetch = _context.sent;\n              _yield$graphQLFetch$h = _yield$graphQLFetch.historicalData;\n              date = _yield$graphQLFetch$h.date;\n              px_last = _yield$graphQLFetch$h.px_last;\n              px_volume = _yield$graphQLFetch$h.px_volume;\n              res = [[\"Date\", \"Close\"]];\n              date.forEach(function (_, idx) {\n                var currentDate = new Date(date[idx] * 1000);\n                var currentPx = px_last[idx];\n                res.push([currentDate, currentPx]);\n              });\n              setData([ticker, res]);\n\n            case 11:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee);\n    }));\n\n    return function search(_x) {\n      return _ref.apply(this, arguments);\n    };\n  }();\n\n  return [data, search];\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (useQuery);\n\n//# sourceURL=webpack:///./src/hooks/useQuery.jsx?");

/***/ }),

/***/ "./src/misc/config.jsx":
/*!*****************************!*\
  !*** ./src/misc/config.jsx ***!
  \*****************************/
/*! exports provided: generateOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"generateOptions\", function() { return generateOptions; });\n// \"#37b24d\"\nvar generateOptions = function generateOptions(_ref) {\n  var title = _ref.title,\n      darkTheme = _ref.darkTheme,\n      upslope = _ref.upslope;\n  var chartColor = upslope ? \"#37b24d\" : \"#f03e3e\";\n  var backgroundColor = darkTheme ? \"#171a1d\" : \"\";\n  var gridLineColor = darkTheme ? \"#495057\" : \"transparent\";\n  var axisLabelColor = darkTheme ? \"#ced4da\" : \"#495057\";\n  var crossHairColor = darkTheme ? \"#ced4da\" : \"#495057\";\n  return {\n    title: title,\n    legend: {\n      position: \"bottom\"\n    },\n    areaOpacity: 0.1,\n    backgroundColor: {\n      fill: backgroundColor\n    },\n    colors: [chartColor],\n    crosshair: {\n      trigger: \"focus\",\n      color: crossHairColor,\n      orientation: \"vertical\",\n      opacity: 0.3\n    },\n    hAxis: {\n      gridlines: {\n        color: \"transparent\"\n      },\n      minorGridlines: {\n        color: \"transparent\"\n      },\n      textStyle: {\n        color: axisLabelColor\n      }\n    },\n    vAxis: {\n      gridlines: {\n        color: gridLineColor\n      },\n      minorGridlines: {\n        color: \"transparent\"\n      },\n      textStyle: {\n        color: axisLabelColor\n      }\n    }\n  };\n};\n\n//# sourceURL=webpack:///./src/misc/config.jsx?");

/***/ }),

/***/ "./src/misc/util.jsx":
/*!***************************!*\
  !*** ./src/misc/util.jsx ***!
  \***************************/
/*! exports provided: renderDateTime, jsonDateReviver, graphQLFetch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderDateTime\", function() { return renderDateTime; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"jsonDateReviver\", function() { return jsonDateReviver; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"graphQLFetch\", function() { return graphQLFetch; });\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar renderDateTime = function renderDateTime() {\n  var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();\n  var day = \"\".concat(date.getDate()).padStart(2, 0);\n  var month = \"\".concat(date.getMonth() + 1).padStart(2, 0);\n  var year = date.getFullYear();\n  var hour = \"\".concat(date.getHours()).padStart(2, 0);\n  var min = \"\".concat(date.getMinutes()).padStart(2, 0);\n  var displayDate = \"\".concat(day, \"/\").concat(month, \"/\").concat(year, \", \").concat(hour, \":\").concat(min);\n  return displayDate;\n};\nvar jsonDateReviver = function jsonDateReviver(key, value) {\n  var dateRegex = new RegExp(\"^\\\\d\\\\d\\\\d\\\\d-\\\\d\\\\d-\\\\d\\\\d\");\n  if (dateRegex.test(value)) return new Date(value);\n  return value;\n};\nvar graphQLFetch = /*#__PURE__*/function () {\n  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(query) {\n    var variables,\n        response,\n        body,\n        result,\n        error,\n        details,\n        _args = arguments;\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            variables = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};\n            _context.prev = 1;\n            _context.next = 4;\n            return fetch(\"/graphql\", {\n              method: \"POST\",\n              headers: {\n                \"Content-Type\": \"application/json\"\n              },\n              body: JSON.stringify({\n                query: query,\n                variables: variables\n              })\n            });\n\n          case 4:\n            response = _context.sent;\n            _context.next = 7;\n            return response.text();\n\n          case 7:\n            body = _context.sent;\n            result = JSON.parse(body, jsonDateReviver);\n\n            if (result.errors) {\n              error = result.errors[0];\n\n              if (error.extensions.code == \"BAD_USER_INPUT\") {\n                details = error.extensions.errors.join(\"\\n \");\n                alert(\"\".concat(error.message, \":\\n \").concat(details));\n              } else {\n                alert(\"\".concat(error.extensions.code, \": \").concat(error.message));\n              }\n            }\n\n            return _context.abrupt(\"return\", result.data);\n\n          case 13:\n            _context.prev = 13;\n            _context.t0 = _context[\"catch\"](1);\n            alert(\"Error in sending data to server: \".concat(_context.t0.message));\n\n          case 16:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[1, 13]]);\n  }));\n\n  return function graphQLFetch(_x) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\n//# sourceURL=webpack:///./src/misc/util.jsx?");

/***/ })

/******/ });