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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _misc_util_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../misc/util.jsx */ \"./src/misc/util.jsx\");\n\n\n\nvar DateRange = function DateRange(_ref) {\n  var currentTicker = _ref.currentTicker,\n      currentDateRange = _ref.currentDateRange,\n      currentLookBackRange = _ref.currentLookBackRange,\n      setDateRange = _ref.setDateRange,\n      searchPrimaryData = _ref.searchPrimaryData,\n      searchSecondaryData = _ref.searchSecondaryData;\n\n  var renderBtnDateRange = function renderBtnDateRange() {\n    return Object.keys(_misc_util_jsx__WEBPACK_IMPORTED_MODULE_1__[\"dateRangeMapping\"]).map(function (range) {\n      var currentValue = _misc_util_jsx__WEBPACK_IMPORTED_MODULE_1__[\"dateRangeMapping\"][range];\n      var style = {\n        backgroundColor: currentValue === currentDateRange ? \"yellow\" : \"\"\n      };\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n        style: style,\n        key: range,\n        value: currentValue\n      }, range);\n    });\n  };\n\n  var handleClick = function handleClick(e) {\n    var selectedRange = parseInt(e.target.value);\n    searchPrimaryData(currentTicker, selectedRange);\n    searchSecondaryData(currentTicker, selectedRange, currentLookBackRange);\n    setDateRange(selectedRange);\n  };\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    onClick: handleClick\n  }, renderBtnDateRange());\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (DateRange);\n\n//# sourceURL=webpack:///./src/components/DateRange.jsx?");

/***/ }),

/***/ "./src/components/LookBackRange.jsx":
/*!******************************************!*\
  !*** ./src/components/LookBackRange.jsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _misc_util_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../misc/util.jsx */ \"./src/misc/util.jsx\");\n\n\n\nvar LookBackRange = function LookBackRange(_ref) {\n  var currentTicker = _ref.currentTicker,\n      currentDateRange = _ref.currentDateRange,\n      currentLookBackRange = _ref.currentLookBackRange,\n      setLookBackRange = _ref.setLookBackRange,\n      searchSecondaryData = _ref.searchSecondaryData;\n\n  var renderBtnLookBackRange = function renderBtnLookBackRange() {\n    return Object.keys(_misc_util_jsx__WEBPACK_IMPORTED_MODULE_1__[\"lookBackRangeMapping\"]).map(function (range) {\n      var currentValue = _misc_util_jsx__WEBPACK_IMPORTED_MODULE_1__[\"lookBackRangeMapping\"][range];\n      var style = {\n        backgroundColor: currentValue === currentLookBackRange ? \"yellow\" : \"\"\n      };\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n        style: style,\n        key: range,\n        value: _misc_util_jsx__WEBPACK_IMPORTED_MODULE_1__[\"lookBackRangeMapping\"][range]\n      }, range);\n    });\n  };\n\n  var handleClick = function handleClick(e) {\n    var selectedRange = parseInt(e.target.value);\n    searchSecondaryData(currentTicker, currentDateRange, selectedRange);\n    setLookBackRange(selectedRange);\n  };\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    onClick: handleClick\n  }, renderBtnLookBackRange());\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (LookBackRange);\n\n//# sourceURL=webpack:///./src/components/LookBackRange.jsx?");

/***/ }),

/***/ "./src/components/Main.jsx":
/*!*********************************!*\
  !*** ./src/components/Main.jsx ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _SearchBar_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SearchBar.jsx */ \"./src/components/SearchBar.jsx\");\n/* harmony import */ var _PrimaryHeader_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PrimaryHeader.jsx */ \"./src/components/PrimaryHeader.jsx\");\n/* harmony import */ var _DateRange_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DateRange.jsx */ \"./src/components/DateRange.jsx\");\n/* harmony import */ var _PrimaryChart_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PrimaryChart.jsx */ \"./src/components/PrimaryChart.jsx\");\n/* harmony import */ var _LookBackRange_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./LookBackRange.jsx */ \"./src/components/LookBackRange.jsx\");\n/* harmony import */ var _SecondaryChart_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SecondaryChart.jsx */ \"./src/components/SecondaryChart.jsx\");\n/* harmony import */ var _hooks_usePrimaryData_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../hooks/usePrimaryData.jsx */ \"./src/hooks/usePrimaryData.jsx\");\n/* harmony import */ var _hooks_useSecondaryData_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../hooks/useSecondaryData.jsx */ \"./src/hooks/useSecondaryData.jsx\");\n/* harmony import */ var _misc_util_jsx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../misc/util.jsx */ \"./src/misc/util.jsx\");\n\n\n\n\n\n\n\n\n\n\n\n\nvar Main = function Main() {\n  var _usePrimaryData = Object(_hooks_usePrimaryData_jsx__WEBPACK_IMPORTED_MODULE_8__[\"default\"])(\"000070 KS Equity\"),\n      _usePrimaryData2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_usePrimaryData, 2),\n      primaryData = _usePrimaryData2[0],\n      searchPrimaryData = _usePrimaryData2[1];\n\n  var _useSecondaryData = Object(_hooks_useSecondaryData_jsx__WEBPACK_IMPORTED_MODULE_9__[\"default\"])(\"000070 KS Equity\"),\n      _useSecondaryData2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useSecondaryData, 2),\n      secondaryData = _useSecondaryData2[0],\n      searchSecondaryData = _useSecondaryData2[1];\n\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useState\"])(100000),\n      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),\n      dateRange = _useState2[0],\n      setDateRange = _useState2[1];\n\n  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useState\"])(90),\n      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState3, 2),\n      lookBackRange = _useState4[0],\n      setLookBackRange = _useState4[1];\n\n  var ticker = primaryData.ticker,\n      primaryChartData = primaryData.primaryChartData;\n  var primaryHeaderData = Object(_misc_util_jsx__WEBPACK_IMPORTED_MODULE_10__[\"generatePrimaryHeaderData\"])(primaryData);\n  var secondaryChartData = secondaryData.secondaryChartData;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_SearchBar_jsx__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    currentDateRange: dateRange,\n    currentLookBackRange: lookBackRange,\n    searchPrimaryData: searchPrimaryData,\n    searchSecondaryData: searchSecondaryData\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_PrimaryHeader_jsx__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    primaryHeaderData: primaryHeaderData\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_DateRange_jsx__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n    currentTicker: ticker,\n    currentDateRange: dateRange,\n    currentLookBackRange: lookBackRange,\n    setDateRange: setDateRange,\n    searchPrimaryData: searchPrimaryData,\n    searchSecondaryData: searchSecondaryData\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_PrimaryChart_jsx__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n    primaryHeaderData: primaryHeaderData,\n    primaryChartData: primaryChartData\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_LookBackRange_jsx__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n    currentTicker: ticker,\n    currentDateRange: dateRange,\n    currentLookBackRange: lookBackRange,\n    setLookBackRange: setLookBackRange,\n    searchSecondaryData: searchSecondaryData\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_SecondaryChart_jsx__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n    secondaryChartData: secondaryChartData\n  }));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Main);\n\n//# sourceURL=webpack:///./src/components/Main.jsx?");

/***/ }),

/***/ "./src/components/PrimaryChart.jsx":
/*!*****************************************!*\
  !*** ./src/components/PrimaryChart.jsx ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_google_charts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-google-charts */ \"./node_modules/react-google-charts/dist/index.js\");\n/* harmony import */ var _misc_config_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../misc/config.jsx */ \"./src/misc/config.jsx\");\n\n\n\n\nvar PrimaryChart = function PrimaryChart(_ref) {\n  var primaryHeaderData = _ref.primaryHeaderData,\n      primaryChartData = _ref.primaryChartData;\n  var differenceAbs = primaryHeaderData.differenceAbs;\n  var config = {\n    darkTheme: false,\n    upslope: differenceAbs > 0\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_google_charts__WEBPACK_IMPORTED_MODULE_1__[\"Chart\"], {\n    chartType: \"AreaChart\",\n    data: !primaryChartData ? [] : primaryChartData,\n    options: Object(_misc_config_jsx__WEBPACK_IMPORTED_MODULE_2__[\"generatePrimaryChartOptions\"])(config)\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (PrimaryChart);\n\n//# sourceURL=webpack:///./src/components/PrimaryChart.jsx?");

/***/ }),

/***/ "./src/components/PrimaryHeader.jsx":
/*!******************************************!*\
  !*** ./src/components/PrimaryHeader.jsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n\nvar PrimaryHeader = function PrimaryHeader(_ref) {\n  var primaryHeaderData = _ref.primaryHeaderData;\n  var ric = primaryHeaderData.ric,\n      name = primaryHeaderData.name,\n      mostRecentDate = primaryHeaderData.mostRecentDate,\n      mostRecentPrice = primaryHeaderData.mostRecentPrice,\n      differenceAbs = primaryHeaderData.differenceAbs,\n      differencePercent = primaryHeaderData.differencePercent;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    style: {\n      margin: \"10px 0\"\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, ric), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    style: {\n      display: \"flex\",\n      gap: \"10px\"\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, mostRecentPrice), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, differenceAbs), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, differencePercent, \" %\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, mostRecentDate));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (PrimaryHeader);\n\n//# sourceURL=webpack:///./src/components/PrimaryHeader.jsx?");

/***/ }),

/***/ "./src/components/SearchBar.jsx":
/*!**************************************!*\
  !*** ./src/components/SearchBar.jsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nvar SearchBar = function SearchBar(_ref) {\n  var currentDateRange = _ref.currentDateRange,\n      currentLookBackRange = _ref.currentLookBackRange,\n      searchPrimaryData = _ref.searchPrimaryData,\n      searchSecondaryData = _ref.searchSecondaryData;\n\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useState\"])(\"\"),\n      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),\n      searchQuery = _useState2[0],\n      setSearchQuery = _useState2[1];\n\n  var handleSubmit = function handleSubmit(e) {\n    e.preventDefault();\n    searchPrimaryData(searchQuery, currentDateRange);\n    searchSecondaryData(searchQuery, currentDateRange, currentLookBackRange);\n  };\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"form\", {\n    onSubmit: handleSubmit\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"label\", null, \"Search \"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"input\", {\n    onChange: function onChange(event) {\n      return setSearchQuery(event.target.value);\n    }\n  }));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (SearchBar);\n\n//# sourceURL=webpack:///./src/components/SearchBar.jsx?");

/***/ }),

/***/ "./src/components/SecondaryChart.jsx":
/*!*******************************************!*\
  !*** ./src/components/SecondaryChart.jsx ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_google_charts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-google-charts */ \"./node_modules/react-google-charts/dist/index.js\");\n/* harmony import */ var _misc_config_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../misc/config.jsx */ \"./src/misc/config.jsx\");\n\n\n\n\nvar SecondaryChart = function SecondaryChart(_ref) {\n  var secondaryChartData = _ref.secondaryChartData;\n  var config = {\n    darkTheme: false\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_google_charts__WEBPACK_IMPORTED_MODULE_1__[\"Chart\"], {\n    chartType: \"LineChart\",\n    data: !secondaryChartData ? [] : secondaryChartData,\n    options: Object(_misc_config_jsx__WEBPACK_IMPORTED_MODULE_2__[\"generateSecondaryChartOptions\"])(config)\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (SecondaryChart);\n\n//# sourceURL=webpack:///./src/components/SecondaryChart.jsx?");

/***/ }),

/***/ "./src/hooks/usePrimaryData.jsx":
/*!**************************************!*\
  !*** ./src/hooks/usePrimaryData.jsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _misc_util_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../misc/util.jsx */ \"./src/misc/util.jsx\");\n\n\n\n\n\n\nvar usePrimaryData = function usePrimaryData(defaultSearchTerm) {\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__[\"useState\"])({}),\n      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState, 2),\n      primaryData = _useState2[0],\n      setPrimaryData = _useState2[1];\n\n  Object(react__WEBPACK_IMPORTED_MODULE_3__[\"useEffect\"])(function () {\n    searchPrimaryData(defaultSearchTerm);\n  }, [defaultSearchTerm]);\n\n  var searchPrimaryData = /*#__PURE__*/function () {\n    var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee(searchQuery) {\n      var dateRange,\n          query,\n          _yield$graphQLFetch,\n          primaryData,\n          ticker,\n          ric,\n          name,\n          benchmark_index,\n          date,\n          px_last,\n          px_volume,\n          primaryChartData,\n          res,\n          _args = arguments;\n\n      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              dateRange = _args.length > 1 && _args[1] !== undefined ? _args[1] : 100000;\n              query = \"query {\\n          primaryData (ticker: \\\"\".concat(searchQuery, \"\\\", dateRange: \").concat(dateRange, \") {\\n            ticker ric name benchmark_index date px_last px_volume\\n          }\\n        }\");\n              _context.next = 4;\n              return Object(_misc_util_jsx__WEBPACK_IMPORTED_MODULE_4__[\"graphQLFetch\"])(query);\n\n            case 4:\n              _yield$graphQLFetch = _context.sent;\n              primaryData = _yield$graphQLFetch.primaryData;\n\n              if (primaryData) {\n                _context.next = 8;\n                break;\n              }\n\n              return _context.abrupt(\"return\");\n\n            case 8:\n              ticker = primaryData.ticker, ric = primaryData.ric, name = primaryData.name, benchmark_index = primaryData.benchmark_index, date = primaryData.date, px_last = primaryData.px_last, px_volume = primaryData.px_volume;\n              primaryChartData = [[\"Date\", \"Close\"]];\n              date.forEach(function (_, idx) {\n                var currentDate = new Date(date[idx] * 1000);\n                var currentPx = px_last[idx];\n                primaryChartData.push([currentDate, currentPx]);\n              });\n              res = {\n                ticker: ticker,\n                ric: ric,\n                name: name,\n                benchmark_index: benchmark_index,\n                primaryChartData: primaryChartData\n              };\n              setPrimaryData(res);\n\n            case 13:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee);\n    }));\n\n    return function searchPrimaryData(_x) {\n      return _ref.apply(this, arguments);\n    };\n  }();\n\n  return [primaryData, searchPrimaryData];\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (usePrimaryData);\n\n//# sourceURL=webpack:///./src/hooks/usePrimaryData.jsx?");

/***/ }),

/***/ "./src/hooks/useSecondaryData.jsx":
/*!****************************************!*\
  !*** ./src/hooks/useSecondaryData.jsx ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _misc_util_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../misc/util.jsx */ \"./src/misc/util.jsx\");\n\n\n\n\n\n\nvar useSecondaryData = function useSecondaryData(defaultSearchTerm) {\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__[\"useState\"])({}),\n      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState, 2),\n      secondaryData = _useState2[0],\n      setSecondaryData = _useState2[1];\n\n  Object(react__WEBPACK_IMPORTED_MODULE_3__[\"useEffect\"])(function () {\n    searchSecondaryData(defaultSearchTerm);\n  }, [defaultSearchTerm]);\n\n  var searchSecondaryData = /*#__PURE__*/function () {\n    var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee(searchQuery) {\n      var dateRange,\n          lookBackDuration,\n          query,\n          _yield$graphQLFetch,\n          secondaryData,\n          ticker,\n          benchmark_index,\n          date,\n          pxDelta,\n          pxDeltaVsIdx,\n          secondaryChartData,\n          res,\n          _args = arguments;\n\n      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              dateRange = _args.length > 1 && _args[1] !== undefined ? _args[1] : 100000;\n              lookBackDuration = _args.length > 2 && _args[2] !== undefined ? _args[2] : 90;\n              query = \"query {\\n            secondaryData (ticker: \\\"\".concat(searchQuery, \"\\\", dateRange: \").concat(dateRange, \", lookBackDuration: \").concat(lookBackDuration, \") {\\n                ticker benchmark_index date pxDelta pxDeltaVsIdx\\n            }\\n          }\");\n              _context.next = 5;\n              return Object(_misc_util_jsx__WEBPACK_IMPORTED_MODULE_4__[\"graphQLFetch\"])(query);\n\n            case 5:\n              _yield$graphQLFetch = _context.sent;\n              secondaryData = _yield$graphQLFetch.secondaryData;\n\n              if (secondaryData) {\n                _context.next = 9;\n                break;\n              }\n\n              return _context.abrupt(\"return\");\n\n            case 9:\n              ticker = secondaryData.ticker, benchmark_index = secondaryData.benchmark_index, date = secondaryData.date, pxDelta = secondaryData.pxDelta, pxDeltaVsIdx = secondaryData.pxDeltaVsIdx;\n              secondaryChartData = [[\"Date\", \"pxDelta\", \"pxDeltaVsIdx\"]];\n              date.forEach(function (_, idx) {\n                var currentDate = new Date(date[idx] * 1000);\n                var currentPxDelta = pxDelta[idx];\n                var currentPxDeltaVsIdx = pxDeltaVsIdx[idx];\n                secondaryChartData.push([currentDate, currentPxDelta, currentPxDeltaVsIdx]);\n              });\n              res = {\n                ticker: ticker,\n                benchmark_index: benchmark_index,\n                secondaryChartData: secondaryChartData\n              };\n              setSecondaryData(res);\n\n            case 14:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee);\n    }));\n\n    return function searchSecondaryData(_x) {\n      return _ref.apply(this, arguments);\n    };\n  }();\n\n  return [secondaryData, searchSecondaryData];\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (useSecondaryData);\n\n//# sourceURL=webpack:///./src/hooks/useSecondaryData.jsx?");

/***/ }),

/***/ "./src/misc/config.jsx":
/*!*****************************!*\
  !*** ./src/misc/config.jsx ***!
  \*****************************/
/*! exports provided: generatePrimaryChartOptions, generateSecondaryChartOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"generatePrimaryChartOptions\", function() { return generatePrimaryChartOptions; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"generateSecondaryChartOptions\", function() { return generateSecondaryChartOptions; });\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);\n\nvar generatePrimaryChartOptions = function generatePrimaryChartOptions(_ref) {\n  var _ref2;\n\n  var darkTheme = _ref.darkTheme,\n      upslope = _ref.upslope;\n  var chartColor = upslope ? \"#37b24d\" : \"#f03e3e\";\n  var backgroundColor = darkTheme ? \"#171a1d\" : \"\";\n  var gridLineColor = darkTheme ? \"#495057\" : \"transparent\";\n  var axisLabelColor = darkTheme ? \"#ced4da\" : \"#495057\";\n  var crossHairColor = darkTheme ? \"#ced4da\" : \"#495057\";\n  return _ref2 = {\n    legend: {\n      position: \"bottom\"\n    },\n    areaOpacity: 0.1,\n    backgroundColor: {\n      fill: backgroundColor\n    },\n    colors: [chartColor],\n    focusTarget: \"category\",\n    crosshair: {\n      trigger: \"focus\",\n      color: crossHairColor,\n      orientation: \"vertical\",\n      opacity: 0.3\n    }\n  }, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref2, \"legend\", {\n    position: \"none\"\n  }), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref2, \"tooltip\", {\n    showColorCode: false\n  }), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref2, \"hAxis\", {\n    gridlines: {\n      color: \"transparent\"\n    },\n    minorGridlines: {\n      color: \"transparent\"\n    },\n    textStyle: {\n      color: axisLabelColor\n    },\n    format: \"MMM dd, y\",\n    showTextEvery: 2\n  }), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref2, \"vAxis\", {\n    gridlines: {\n      color: gridLineColor\n    },\n    minorGridlines: {\n      color: \"transparent\"\n    },\n    textStyle: {\n      color: axisLabelColor\n    }\n  }), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref2, \"width\", \"100%\"), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref2, \"height\", \"200px\"), _ref2;\n};\nvar generateSecondaryChartOptions = function generateSecondaryChartOptions(_ref3) {\n  var darkTheme = _ref3.darkTheme;\n  var backgroundColor = darkTheme ? \"#171a1d\" : \"\";\n  var gridLineColor = darkTheme ? \"#495057\" : \"transparent\";\n  var axisLabelColor = darkTheme ? \"#ced4da\" : \"#495057\";\n  var crossHairColor = darkTheme ? \"#ced4da\" : \"#495057\";\n  return {\n    backgroundColor: {\n      fill: backgroundColor\n    },\n    crosshair: {\n      trigger: \"focus\",\n      color: crossHairColor,\n      orientation: \"vertical\",\n      opacity: 0.3\n    },\n    curveType: \"function\",\n    legend: {\n      position: \"bottom\"\n    },\n    width: \"100%\",\n    height: \"200px\",\n    focusTarget: \"category\",\n    hAxis: {\n      gridlines: {\n        color: \"transparent\"\n      },\n      minorGridlines: {\n        color: \"transparent\"\n      },\n      textStyle: {\n        color: axisLabelColor\n      },\n      format: \"MMM dd, y\",\n      showTextEvery: 2\n    },\n    vAxis: {\n      gridlines: {\n        color: gridLineColor\n      },\n      minorGridlines: {\n        color: \"transparent\"\n      },\n      textStyle: {\n        color: axisLabelColor\n      }\n    }\n  };\n};\n\n//# sourceURL=webpack:///./src/misc/config.jsx?");

/***/ }),

/***/ "./src/misc/util.jsx":
/*!***************************!*\
  !*** ./src/misc/util.jsx ***!
  \***************************/
/*! exports provided: dateRangeMapping, lookBackRangeMapping, generatePrimaryHeaderData, graphQLFetch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"dateRangeMapping\", function() { return dateRangeMapping; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"lookBackRangeMapping\", function() { return lookBackRangeMapping; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"generatePrimaryHeaderData\", function() { return generatePrimaryHeaderData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"graphQLFetch\", function() { return graphQLFetch; });\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar dateRangeMapping = {\n  \"5D\": 5,\n  \"1M\": 20,\n  \"6M\": 20 * 6,\n  \"1Y\": 261,\n  Max: 100000\n};\nvar lookBackRangeMapping = {\n  \"1D\": 1,\n  \"5D\": 5,\n  \"15D\": 15,\n  \"30D\": 30,\n  \"90D\": 90\n};\nvar generatePrimaryHeaderData = function generatePrimaryHeaderData(primaryData) {\n  var ticker = primaryData.ticker,\n      ric = primaryData.ric,\n      name = primaryData.name,\n      benchmark_index = primaryData.benchmark_index,\n      primaryChartData = primaryData.primaryChartData;\n  if (!ticker) return {};\n  var mostRecentDate = primaryChartData[primaryChartData.length - 1][0].toString();\n  var leftBound = primaryChartData[1][1];\n  var rightBound = primaryChartData[primaryChartData.length - 1][1];\n  var differenceAbs = (rightBound - leftBound).toFixed(2);\n  var differencePercent = (differenceAbs / leftBound * 100).toFixed(2);\n  return {\n    ticker: ticker,\n    ric: ric,\n    name: name,\n    benchmark_index: benchmark_index,\n    mostRecentDate: mostRecentDate,\n    mostRecentPrice: rightBound,\n    differenceAbs: differenceAbs,\n    differencePercent: differencePercent\n  };\n};\nvar graphQLFetch = /*#__PURE__*/function () {\n  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(query) {\n    var variables,\n        response,\n        result,\n        error,\n        details,\n        _args = arguments;\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            variables = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};\n            _context.prev = 1;\n            _context.next = 4;\n            return fetch(\"/graphql\", {\n              method: \"POST\",\n              headers: {\n                \"Content-Type\": \"application/json\"\n              },\n              body: JSON.stringify({\n                query: query,\n                variables: variables\n              })\n            });\n\n          case 4:\n            response = _context.sent;\n            _context.next = 7;\n            return response.json();\n\n          case 7:\n            result = _context.sent;\n\n            if (result.errors) {\n              error = result.errors[0];\n\n              if (error.extensions.code == \"BAD_USER_INPUT\") {\n                details = error.extensions.errors.join(\"\\n \");\n                alert(\"\".concat(error.message, \":\\n \").concat(details));\n              } else {\n                alert(\"\".concat(error.extensions.code, \": \").concat(error.message));\n              }\n            }\n\n            return _context.abrupt(\"return\", result.data);\n\n          case 12:\n            _context.prev = 12;\n            _context.t0 = _context[\"catch\"](1);\n            alert(\"Error in sending data to server: \".concat(_context.t0.message));\n\n          case 15:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[1, 12]]);\n  }));\n\n  return function graphQLFetch(_x) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\n//# sourceURL=webpack:///./src/misc/util.jsx?");

/***/ })

/******/ });