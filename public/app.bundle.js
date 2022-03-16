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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_Main_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Main.jsx */ \"./src/components/Main.jsx\");\n\n\n\n\nvar App = function App() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Main_jsx__WEBPACK_IMPORTED_MODULE_2__[\"default\"], null));\n};\n\nreact_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(App, null), document.getElementById(\"root\"));\n\n//# sourceURL=webpack:///./src/App.jsx?");

/***/ }),

/***/ "./src/components/DateRange.jsx":
/*!**************************************!*\
  !*** ./src/components/DateRange.jsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _misc_util_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../misc/util.jsx */ \"./src/misc/util.jsx\");\n\n\n\nvar DateRange = function DateRange(_ref) {\n  var currentTitle = _ref.currentTitle,\n      onClick = _ref.onClick;\n\n  var renderBtnDateRange = function renderBtnDateRange() {\n    return Object.keys(_misc_util_jsx__WEBPACK_IMPORTED_MODULE_1__[\"dateRangeMapping\"]).map(function (range) {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n        key: range,\n        value: _misc_util_jsx__WEBPACK_IMPORTED_MODULE_1__[\"dateRangeMapping\"][range]\n      }, range);\n    });\n  };\n\n  var handleClick = function handleClick(e) {\n    var selectedRange = e.target.value;\n    onClick(currentTitle, selectedRange);\n  };\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    onClick: handleClick\n  }, renderBtnDateRange());\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (DateRange);\n\n//# sourceURL=webpack:///./src/components/DateRange.jsx?");

/***/ }),

/***/ "./src/components/Main.jsx":
/*!*********************************!*\
  !*** ./src/components/Main.jsx ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _hooks_useQuery_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../hooks/useQuery.jsx */ \"./src/hooks/useQuery.jsx\");\n/* harmony import */ var _SearchBar_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SearchBar.jsx */ \"./src/components/SearchBar.jsx\");\n/* harmony import */ var _DateRange_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DateRange.jsx */ \"./src/components/DateRange.jsx\");\n/* harmony import */ var _StockChart_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./StockChart.jsx */ \"./src/components/StockChart.jsx\");\n\n\n\n\n\n\n\nvar Main = function Main() {\n  var _useQuery = Object(_hooks_useQuery_jsx__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\"601990 CH Equity\"),\n      _useQuery2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useQuery, 2),\n      _useQuery2$ = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useQuery2[0], 2),\n      displayTitle = _useQuery2$[0],\n      displayData = _useQuery2$[1],\n      searchData = _useQuery2[1];\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_SearchBar_jsx__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    onFormSubmit: searchData\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_DateRange_jsx__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n    currentTitle: displayTitle,\n    onClick: searchData\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_StockChart_jsx__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n    displayTitle: displayTitle,\n    displayData: displayData\n  }));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Main);\n\n//# sourceURL=webpack:///./src/components/Main.jsx?");

/***/ }),

/***/ "./src/components/SearchBar.jsx":
/*!**************************************!*\
  !*** ./src/components/SearchBar.jsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nvar SearchBar = function SearchBar(_ref) {\n  var onFormSubmit = _ref.onFormSubmit;\n\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useState\"])(\"\"),\n      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),\n      term = _useState2[0],\n      setTerm = _useState2[1];\n\n  var handleSubmit = function handleSubmit(e) {\n    e.preventDefault();\n    onFormSubmit(term);\n  };\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"form\", {\n    onSubmit: handleSubmit\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"label\", null, \"Search \"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"input\", {\n    onChange: function onChange(event) {\n      return setTerm(event.target.value);\n    }\n  }));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (SearchBar);\n\n//# sourceURL=webpack:///./src/components/SearchBar.jsx?");

/***/ }),

/***/ "./src/components/StockChart.jsx":
/*!***************************************!*\
  !*** ./src/components/StockChart.jsx ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_google_charts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-google-charts */ \"./node_modules/react-google-charts/dist/index.js\");\n/* harmony import */ var _misc_config_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../misc/config.jsx */ \"./src/misc/config.jsx\");\n\n\n\n\nvar StockChart = function StockChart(_ref) {\n  var displayTitle = _ref.displayTitle,\n      displayData = _ref.displayData;\n\n  var checkUpslope = function checkUpslope() {\n    if (displayData.length === 0) return false;\n    var leftBound = displayData[1][1];\n    var rightBound = displayData[displayData.length - 1][1];\n    return rightBound - leftBound > 0;\n  };\n\n  var config = {\n    title: displayTitle,\n    darkTheme: false,\n    upslope: checkUpslope()\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_google_charts__WEBPACK_IMPORTED_MODULE_1__[\"Chart\"], {\n    chartType: \"AreaChart\",\n    width: \"100%\",\n    height: \"400px\",\n    data: displayData,\n    options: Object(_misc_config_jsx__WEBPACK_IMPORTED_MODULE_2__[\"generateOptions\"])(config)\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (StockChart);\n\n//# sourceURL=webpack:///./src/components/StockChart.jsx?");

/***/ }),

/***/ "./src/hooks/useQuery.jsx":
/*!********************************!*\
  !*** ./src/hooks/useQuery.jsx ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _misc_util_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../misc/util.jsx */ \"./src/misc/util.jsx\");\n\n\n\n\n\n\nvar useQuery = function useQuery(defaultSearchTerm) {\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__[\"useState\"])([\"\", []]),\n      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState, 2),\n      data = _useState2[0],\n      setData = _useState2[1];\n\n  Object(react__WEBPACK_IMPORTED_MODULE_3__[\"useEffect\"])(function () {\n    search(defaultSearchTerm);\n  }, [defaultSearchTerm]);\n\n  var search = /*#__PURE__*/function () {\n    var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee(ticker) {\n      var dateRange,\n          query,\n          _yield$graphQLFetch,\n          historicalData,\n          date,\n          px_last,\n          px_volume,\n          res,\n          _args = arguments;\n\n      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              dateRange = _args.length > 1 && _args[1] !== undefined ? _args[1] : 100000;\n              query = \"query {\\n          historicalData (ticker: \\\"\".concat(ticker, \"\\\", dateRange: \").concat(dateRange, \") {\\n            ticker date px_last px_volume\\n          }\\n        }\");\n              _context.next = 4;\n              return Object(_misc_util_jsx__WEBPACK_IMPORTED_MODULE_4__[\"graphQLFetch\"])(query);\n\n            case 4:\n              _yield$graphQLFetch = _context.sent;\n              historicalData = _yield$graphQLFetch.historicalData;\n\n              if (historicalData) {\n                _context.next = 8;\n                break;\n              }\n\n              return _context.abrupt(\"return\");\n\n            case 8:\n              date = historicalData.date, px_last = historicalData.px_last, px_volume = historicalData.px_volume;\n              res = [[\"Date\", \"Close\"]];\n              date.forEach(function (_, idx) {\n                var currentDate = new Date(date[idx] * 1000);\n                var currentPx = px_last[idx];\n                res.push([currentDate, currentPx]);\n              });\n              setData([ticker, res]);\n\n            case 12:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee);\n    }));\n\n    return function search(_x) {\n      return _ref.apply(this, arguments);\n    };\n  }();\n\n  return [data, search];\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (useQuery);\n\n//# sourceURL=webpack:///./src/hooks/useQuery.jsx?");

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
/*! exports provided: renderDateTime, dateRangeMapping, graphQLFetch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderDateTime\", function() { return renderDateTime; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"dateRangeMapping\", function() { return dateRangeMapping; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"graphQLFetch\", function() { return graphQLFetch; });\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar renderDateTime = function renderDateTime() {\n  var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();\n  var day = \"\".concat(date.getDate()).padStart(2, 0);\n  var month = \"\".concat(date.getMonth() + 1).padStart(2, 0);\n  var year = date.getFullYear();\n  var hour = \"\".concat(date.getHours()).padStart(2, 0);\n  var min = \"\".concat(date.getMinutes()).padStart(2, 0);\n  var displayDate = \"\".concat(day, \"/\").concat(month, \"/\").concat(year, \", \").concat(hour, \":\").concat(min);\n  return displayDate;\n};\nvar dateRangeMapping = {\n  \"5D\": 5,\n  \"1M\": 20,\n  \"6M\": 20 * 6,\n  \"1Y\": 261,\n  Max: 100000\n};\nvar graphQLFetch = /*#__PURE__*/function () {\n  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(query) {\n    var variables,\n        response,\n        result,\n        error,\n        details,\n        _args = arguments;\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            variables = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};\n            _context.prev = 1;\n            _context.next = 4;\n            return fetch(\"/graphql\", {\n              method: \"POST\",\n              headers: {\n                \"Content-Type\": \"application/json\"\n              },\n              body: JSON.stringify({\n                query: query,\n                variables: variables\n              })\n            });\n\n          case 4:\n            response = _context.sent;\n            _context.next = 7;\n            return response.json();\n\n          case 7:\n            result = _context.sent;\n\n            if (result.errors) {\n              error = result.errors[0];\n\n              if (error.extensions.code == \"BAD_USER_INPUT\") {\n                details = error.extensions.errors.join(\"\\n \");\n                alert(\"\".concat(error.message, \":\\n \").concat(details));\n              } else {\n                alert(\"\".concat(error.extensions.code, \": \").concat(error.message));\n              }\n            }\n\n            return _context.abrupt(\"return\", result.data);\n\n          case 12:\n            _context.prev = 12;\n            _context.t0 = _context[\"catch\"](1);\n            alert(\"Error in sending data to server: \".concat(_context.t0.message));\n\n          case 15:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[1, 12]]);\n  }));\n\n  return function graphQLFetch(_x) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\n//# sourceURL=webpack:///./src/misc/util.jsx?");

/***/ })

/******/ });