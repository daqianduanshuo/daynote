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
/******/ 		"index": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + chunkId + ".main.js"
/******/ 	}
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
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
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
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
/******/ 	deferredModules.push(["./source/index.js","vendors~index"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/_css-loader@4.3.0@css-loader/dist/cjs.js!./node_modules/_sass-loader@10.1.0@sass-loader/dist/cjs.js!./source/styles.scss":
/*!***********************************************************************************************************************************************!*\
  !*** ./node_modules/_css-loader@4.3.0@css-loader/dist/cjs.js!./node_modules/_sass-loader@10.1.0@sass-loader/dist/cjs.js!./source/styles.scss ***!
  \***********************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_css_loader_4_3_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/_css-loader@4.3.0@css-loader/dist/runtime/api.js */ \"./node_modules/_css-loader@4.3.0@css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_4_3_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_4_3_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_4_3_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(false);\n// Module\n___CSS_LOADER_EXPORT___.push([module.i, \"body {\\n  background-color: aqua;\\n}\", \"\"]);\n// Exports\n/* harmony default export */ __webpack_exports__[\"default\"] = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack:///./source/styles.scss?./node_modules/_css-loader@4.3.0@css-loader/dist/cjs.js!./node_modules/_sass-loader@10.1.0@sass-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/_css-loader@4.3.0@css-loader/dist/cjs.js!./source/styles.css":
/*!***********************************************************************************!*\
  !*** ./node_modules/_css-loader@4.3.0@css-loader/dist/cjs.js!./source/styles.css ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_css_loader_4_3_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/_css-loader@4.3.0@css-loader/dist/runtime/api.js */ \"./node_modules/_css-loader@4.3.0@css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_4_3_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_4_3_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_4_3_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(false);\n// Module\n___CSS_LOADER_EXPORT___.push([module.i, \"h1 { \\n    color: blue;\\n}\", \"\"]);\n// Exports\n/* harmony default export */ __webpack_exports__[\"default\"] = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack:///./source/styles.css?./node_modules/_css-loader@4.3.0@css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/_moment@2.29.1@moment/locale sync recursive ^\\.\\/.*$":
/*!*****************************************************************!*\
  !*** ./node_modules/_moment@2.29.1@moment/locale sync ^\.\/.*$ ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./af\": \"./node_modules/_moment@2.29.1@moment/locale/af.js\",\n\t\"./af.js\": \"./node_modules/_moment@2.29.1@moment/locale/af.js\",\n\t\"./ar\": \"./node_modules/_moment@2.29.1@moment/locale/ar.js\",\n\t\"./ar-dz\": \"./node_modules/_moment@2.29.1@moment/locale/ar-dz.js\",\n\t\"./ar-dz.js\": \"./node_modules/_moment@2.29.1@moment/locale/ar-dz.js\",\n\t\"./ar-kw\": \"./node_modules/_moment@2.29.1@moment/locale/ar-kw.js\",\n\t\"./ar-kw.js\": \"./node_modules/_moment@2.29.1@moment/locale/ar-kw.js\",\n\t\"./ar-ly\": \"./node_modules/_moment@2.29.1@moment/locale/ar-ly.js\",\n\t\"./ar-ly.js\": \"./node_modules/_moment@2.29.1@moment/locale/ar-ly.js\",\n\t\"./ar-ma\": \"./node_modules/_moment@2.29.1@moment/locale/ar-ma.js\",\n\t\"./ar-ma.js\": \"./node_modules/_moment@2.29.1@moment/locale/ar-ma.js\",\n\t\"./ar-sa\": \"./node_modules/_moment@2.29.1@moment/locale/ar-sa.js\",\n\t\"./ar-sa.js\": \"./node_modules/_moment@2.29.1@moment/locale/ar-sa.js\",\n\t\"./ar-tn\": \"./node_modules/_moment@2.29.1@moment/locale/ar-tn.js\",\n\t\"./ar-tn.js\": \"./node_modules/_moment@2.29.1@moment/locale/ar-tn.js\",\n\t\"./ar.js\": \"./node_modules/_moment@2.29.1@moment/locale/ar.js\",\n\t\"./az\": \"./node_modules/_moment@2.29.1@moment/locale/az.js\",\n\t\"./az.js\": \"./node_modules/_moment@2.29.1@moment/locale/az.js\",\n\t\"./be\": \"./node_modules/_moment@2.29.1@moment/locale/be.js\",\n\t\"./be.js\": \"./node_modules/_moment@2.29.1@moment/locale/be.js\",\n\t\"./bg\": \"./node_modules/_moment@2.29.1@moment/locale/bg.js\",\n\t\"./bg.js\": \"./node_modules/_moment@2.29.1@moment/locale/bg.js\",\n\t\"./bm\": \"./node_modules/_moment@2.29.1@moment/locale/bm.js\",\n\t\"./bm.js\": \"./node_modules/_moment@2.29.1@moment/locale/bm.js\",\n\t\"./bn\": \"./node_modules/_moment@2.29.1@moment/locale/bn.js\",\n\t\"./bn-bd\": \"./node_modules/_moment@2.29.1@moment/locale/bn-bd.js\",\n\t\"./bn-bd.js\": \"./node_modules/_moment@2.29.1@moment/locale/bn-bd.js\",\n\t\"./bn.js\": \"./node_modules/_moment@2.29.1@moment/locale/bn.js\",\n\t\"./bo\": \"./node_modules/_moment@2.29.1@moment/locale/bo.js\",\n\t\"./bo.js\": \"./node_modules/_moment@2.29.1@moment/locale/bo.js\",\n\t\"./br\": \"./node_modules/_moment@2.29.1@moment/locale/br.js\",\n\t\"./br.js\": \"./node_modules/_moment@2.29.1@moment/locale/br.js\",\n\t\"./bs\": \"./node_modules/_moment@2.29.1@moment/locale/bs.js\",\n\t\"./bs.js\": \"./node_modules/_moment@2.29.1@moment/locale/bs.js\",\n\t\"./ca\": \"./node_modules/_moment@2.29.1@moment/locale/ca.js\",\n\t\"./ca.js\": \"./node_modules/_moment@2.29.1@moment/locale/ca.js\",\n\t\"./cs\": \"./node_modules/_moment@2.29.1@moment/locale/cs.js\",\n\t\"./cs.js\": \"./node_modules/_moment@2.29.1@moment/locale/cs.js\",\n\t\"./cv\": \"./node_modules/_moment@2.29.1@moment/locale/cv.js\",\n\t\"./cv.js\": \"./node_modules/_moment@2.29.1@moment/locale/cv.js\",\n\t\"./cy\": \"./node_modules/_moment@2.29.1@moment/locale/cy.js\",\n\t\"./cy.js\": \"./node_modules/_moment@2.29.1@moment/locale/cy.js\",\n\t\"./da\": \"./node_modules/_moment@2.29.1@moment/locale/da.js\",\n\t\"./da.js\": \"./node_modules/_moment@2.29.1@moment/locale/da.js\",\n\t\"./de\": \"./node_modules/_moment@2.29.1@moment/locale/de.js\",\n\t\"./de-at\": \"./node_modules/_moment@2.29.1@moment/locale/de-at.js\",\n\t\"./de-at.js\": \"./node_modules/_moment@2.29.1@moment/locale/de-at.js\",\n\t\"./de-ch\": \"./node_modules/_moment@2.29.1@moment/locale/de-ch.js\",\n\t\"./de-ch.js\": \"./node_modules/_moment@2.29.1@moment/locale/de-ch.js\",\n\t\"./de.js\": \"./node_modules/_moment@2.29.1@moment/locale/de.js\",\n\t\"./dv\": \"./node_modules/_moment@2.29.1@moment/locale/dv.js\",\n\t\"./dv.js\": \"./node_modules/_moment@2.29.1@moment/locale/dv.js\",\n\t\"./el\": \"./node_modules/_moment@2.29.1@moment/locale/el.js\",\n\t\"./el.js\": \"./node_modules/_moment@2.29.1@moment/locale/el.js\",\n\t\"./en-au\": \"./node_modules/_moment@2.29.1@moment/locale/en-au.js\",\n\t\"./en-au.js\": \"./node_modules/_moment@2.29.1@moment/locale/en-au.js\",\n\t\"./en-ca\": \"./node_modules/_moment@2.29.1@moment/locale/en-ca.js\",\n\t\"./en-ca.js\": \"./node_modules/_moment@2.29.1@moment/locale/en-ca.js\",\n\t\"./en-gb\": \"./node_modules/_moment@2.29.1@moment/locale/en-gb.js\",\n\t\"./en-gb.js\": \"./node_modules/_moment@2.29.1@moment/locale/en-gb.js\",\n\t\"./en-ie\": \"./node_modules/_moment@2.29.1@moment/locale/en-ie.js\",\n\t\"./en-ie.js\": \"./node_modules/_moment@2.29.1@moment/locale/en-ie.js\",\n\t\"./en-il\": \"./node_modules/_moment@2.29.1@moment/locale/en-il.js\",\n\t\"./en-il.js\": \"./node_modules/_moment@2.29.1@moment/locale/en-il.js\",\n\t\"./en-in\": \"./node_modules/_moment@2.29.1@moment/locale/en-in.js\",\n\t\"./en-in.js\": \"./node_modules/_moment@2.29.1@moment/locale/en-in.js\",\n\t\"./en-nz\": \"./node_modules/_moment@2.29.1@moment/locale/en-nz.js\",\n\t\"./en-nz.js\": \"./node_modules/_moment@2.29.1@moment/locale/en-nz.js\",\n\t\"./en-sg\": \"./node_modules/_moment@2.29.1@moment/locale/en-sg.js\",\n\t\"./en-sg.js\": \"./node_modules/_moment@2.29.1@moment/locale/en-sg.js\",\n\t\"./eo\": \"./node_modules/_moment@2.29.1@moment/locale/eo.js\",\n\t\"./eo.js\": \"./node_modules/_moment@2.29.1@moment/locale/eo.js\",\n\t\"./es\": \"./node_modules/_moment@2.29.1@moment/locale/es.js\",\n\t\"./es-do\": \"./node_modules/_moment@2.29.1@moment/locale/es-do.js\",\n\t\"./es-do.js\": \"./node_modules/_moment@2.29.1@moment/locale/es-do.js\",\n\t\"./es-mx\": \"./node_modules/_moment@2.29.1@moment/locale/es-mx.js\",\n\t\"./es-mx.js\": \"./node_modules/_moment@2.29.1@moment/locale/es-mx.js\",\n\t\"./es-us\": \"./node_modules/_moment@2.29.1@moment/locale/es-us.js\",\n\t\"./es-us.js\": \"./node_modules/_moment@2.29.1@moment/locale/es-us.js\",\n\t\"./es.js\": \"./node_modules/_moment@2.29.1@moment/locale/es.js\",\n\t\"./et\": \"./node_modules/_moment@2.29.1@moment/locale/et.js\",\n\t\"./et.js\": \"./node_modules/_moment@2.29.1@moment/locale/et.js\",\n\t\"./eu\": \"./node_modules/_moment@2.29.1@moment/locale/eu.js\",\n\t\"./eu.js\": \"./node_modules/_moment@2.29.1@moment/locale/eu.js\",\n\t\"./fa\": \"./node_modules/_moment@2.29.1@moment/locale/fa.js\",\n\t\"./fa.js\": \"./node_modules/_moment@2.29.1@moment/locale/fa.js\",\n\t\"./fi\": \"./node_modules/_moment@2.29.1@moment/locale/fi.js\",\n\t\"./fi.js\": \"./node_modules/_moment@2.29.1@moment/locale/fi.js\",\n\t\"./fil\": \"./node_modules/_moment@2.29.1@moment/locale/fil.js\",\n\t\"./fil.js\": \"./node_modules/_moment@2.29.1@moment/locale/fil.js\",\n\t\"./fo\": \"./node_modules/_moment@2.29.1@moment/locale/fo.js\",\n\t\"./fo.js\": \"./node_modules/_moment@2.29.1@moment/locale/fo.js\",\n\t\"./fr\": \"./node_modules/_moment@2.29.1@moment/locale/fr.js\",\n\t\"./fr-ca\": \"./node_modules/_moment@2.29.1@moment/locale/fr-ca.js\",\n\t\"./fr-ca.js\": \"./node_modules/_moment@2.29.1@moment/locale/fr-ca.js\",\n\t\"./fr-ch\": \"./node_modules/_moment@2.29.1@moment/locale/fr-ch.js\",\n\t\"./fr-ch.js\": \"./node_modules/_moment@2.29.1@moment/locale/fr-ch.js\",\n\t\"./fr.js\": \"./node_modules/_moment@2.29.1@moment/locale/fr.js\",\n\t\"./fy\": \"./node_modules/_moment@2.29.1@moment/locale/fy.js\",\n\t\"./fy.js\": \"./node_modules/_moment@2.29.1@moment/locale/fy.js\",\n\t\"./ga\": \"./node_modules/_moment@2.29.1@moment/locale/ga.js\",\n\t\"./ga.js\": \"./node_modules/_moment@2.29.1@moment/locale/ga.js\",\n\t\"./gd\": \"./node_modules/_moment@2.29.1@moment/locale/gd.js\",\n\t\"./gd.js\": \"./node_modules/_moment@2.29.1@moment/locale/gd.js\",\n\t\"./gl\": \"./node_modules/_moment@2.29.1@moment/locale/gl.js\",\n\t\"./gl.js\": \"./node_modules/_moment@2.29.1@moment/locale/gl.js\",\n\t\"./gom-deva\": \"./node_modules/_moment@2.29.1@moment/locale/gom-deva.js\",\n\t\"./gom-deva.js\": \"./node_modules/_moment@2.29.1@moment/locale/gom-deva.js\",\n\t\"./gom-latn\": \"./node_modules/_moment@2.29.1@moment/locale/gom-latn.js\",\n\t\"./gom-latn.js\": \"./node_modules/_moment@2.29.1@moment/locale/gom-latn.js\",\n\t\"./gu\": \"./node_modules/_moment@2.29.1@moment/locale/gu.js\",\n\t\"./gu.js\": \"./node_modules/_moment@2.29.1@moment/locale/gu.js\",\n\t\"./he\": \"./node_modules/_moment@2.29.1@moment/locale/he.js\",\n\t\"./he.js\": \"./node_modules/_moment@2.29.1@moment/locale/he.js\",\n\t\"./hi\": \"./node_modules/_moment@2.29.1@moment/locale/hi.js\",\n\t\"./hi.js\": \"./node_modules/_moment@2.29.1@moment/locale/hi.js\",\n\t\"./hr\": \"./node_modules/_moment@2.29.1@moment/locale/hr.js\",\n\t\"./hr.js\": \"./node_modules/_moment@2.29.1@moment/locale/hr.js\",\n\t\"./hu\": \"./node_modules/_moment@2.29.1@moment/locale/hu.js\",\n\t\"./hu.js\": \"./node_modules/_moment@2.29.1@moment/locale/hu.js\",\n\t\"./hy-am\": \"./node_modules/_moment@2.29.1@moment/locale/hy-am.js\",\n\t\"./hy-am.js\": \"./node_modules/_moment@2.29.1@moment/locale/hy-am.js\",\n\t\"./id\": \"./node_modules/_moment@2.29.1@moment/locale/id.js\",\n\t\"./id.js\": \"./node_modules/_moment@2.29.1@moment/locale/id.js\",\n\t\"./is\": \"./node_modules/_moment@2.29.1@moment/locale/is.js\",\n\t\"./is.js\": \"./node_modules/_moment@2.29.1@moment/locale/is.js\",\n\t\"./it\": \"./node_modules/_moment@2.29.1@moment/locale/it.js\",\n\t\"./it-ch\": \"./node_modules/_moment@2.29.1@moment/locale/it-ch.js\",\n\t\"./it-ch.js\": \"./node_modules/_moment@2.29.1@moment/locale/it-ch.js\",\n\t\"./it.js\": \"./node_modules/_moment@2.29.1@moment/locale/it.js\",\n\t\"./ja\": \"./node_modules/_moment@2.29.1@moment/locale/ja.js\",\n\t\"./ja.js\": \"./node_modules/_moment@2.29.1@moment/locale/ja.js\",\n\t\"./jv\": \"./node_modules/_moment@2.29.1@moment/locale/jv.js\",\n\t\"./jv.js\": \"./node_modules/_moment@2.29.1@moment/locale/jv.js\",\n\t\"./ka\": \"./node_modules/_moment@2.29.1@moment/locale/ka.js\",\n\t\"./ka.js\": \"./node_modules/_moment@2.29.1@moment/locale/ka.js\",\n\t\"./kk\": \"./node_modules/_moment@2.29.1@moment/locale/kk.js\",\n\t\"./kk.js\": \"./node_modules/_moment@2.29.1@moment/locale/kk.js\",\n\t\"./km\": \"./node_modules/_moment@2.29.1@moment/locale/km.js\",\n\t\"./km.js\": \"./node_modules/_moment@2.29.1@moment/locale/km.js\",\n\t\"./kn\": \"./node_modules/_moment@2.29.1@moment/locale/kn.js\",\n\t\"./kn.js\": \"./node_modules/_moment@2.29.1@moment/locale/kn.js\",\n\t\"./ko\": \"./node_modules/_moment@2.29.1@moment/locale/ko.js\",\n\t\"./ko.js\": \"./node_modules/_moment@2.29.1@moment/locale/ko.js\",\n\t\"./ku\": \"./node_modules/_moment@2.29.1@moment/locale/ku.js\",\n\t\"./ku.js\": \"./node_modules/_moment@2.29.1@moment/locale/ku.js\",\n\t\"./ky\": \"./node_modules/_moment@2.29.1@moment/locale/ky.js\",\n\t\"./ky.js\": \"./node_modules/_moment@2.29.1@moment/locale/ky.js\",\n\t\"./lb\": \"./node_modules/_moment@2.29.1@moment/locale/lb.js\",\n\t\"./lb.js\": \"./node_modules/_moment@2.29.1@moment/locale/lb.js\",\n\t\"./lo\": \"./node_modules/_moment@2.29.1@moment/locale/lo.js\",\n\t\"./lo.js\": \"./node_modules/_moment@2.29.1@moment/locale/lo.js\",\n\t\"./lt\": \"./node_modules/_moment@2.29.1@moment/locale/lt.js\",\n\t\"./lt.js\": \"./node_modules/_moment@2.29.1@moment/locale/lt.js\",\n\t\"./lv\": \"./node_modules/_moment@2.29.1@moment/locale/lv.js\",\n\t\"./lv.js\": \"./node_modules/_moment@2.29.1@moment/locale/lv.js\",\n\t\"./me\": \"./node_modules/_moment@2.29.1@moment/locale/me.js\",\n\t\"./me.js\": \"./node_modules/_moment@2.29.1@moment/locale/me.js\",\n\t\"./mi\": \"./node_modules/_moment@2.29.1@moment/locale/mi.js\",\n\t\"./mi.js\": \"./node_modules/_moment@2.29.1@moment/locale/mi.js\",\n\t\"./mk\": \"./node_modules/_moment@2.29.1@moment/locale/mk.js\",\n\t\"./mk.js\": \"./node_modules/_moment@2.29.1@moment/locale/mk.js\",\n\t\"./ml\": \"./node_modules/_moment@2.29.1@moment/locale/ml.js\",\n\t\"./ml.js\": \"./node_modules/_moment@2.29.1@moment/locale/ml.js\",\n\t\"./mn\": \"./node_modules/_moment@2.29.1@moment/locale/mn.js\",\n\t\"./mn.js\": \"./node_modules/_moment@2.29.1@moment/locale/mn.js\",\n\t\"./mr\": \"./node_modules/_moment@2.29.1@moment/locale/mr.js\",\n\t\"./mr.js\": \"./node_modules/_moment@2.29.1@moment/locale/mr.js\",\n\t\"./ms\": \"./node_modules/_moment@2.29.1@moment/locale/ms.js\",\n\t\"./ms-my\": \"./node_modules/_moment@2.29.1@moment/locale/ms-my.js\",\n\t\"./ms-my.js\": \"./node_modules/_moment@2.29.1@moment/locale/ms-my.js\",\n\t\"./ms.js\": \"./node_modules/_moment@2.29.1@moment/locale/ms.js\",\n\t\"./mt\": \"./node_modules/_moment@2.29.1@moment/locale/mt.js\",\n\t\"./mt.js\": \"./node_modules/_moment@2.29.1@moment/locale/mt.js\",\n\t\"./my\": \"./node_modules/_moment@2.29.1@moment/locale/my.js\",\n\t\"./my.js\": \"./node_modules/_moment@2.29.1@moment/locale/my.js\",\n\t\"./nb\": \"./node_modules/_moment@2.29.1@moment/locale/nb.js\",\n\t\"./nb.js\": \"./node_modules/_moment@2.29.1@moment/locale/nb.js\",\n\t\"./ne\": \"./node_modules/_moment@2.29.1@moment/locale/ne.js\",\n\t\"./ne.js\": \"./node_modules/_moment@2.29.1@moment/locale/ne.js\",\n\t\"./nl\": \"./node_modules/_moment@2.29.1@moment/locale/nl.js\",\n\t\"./nl-be\": \"./node_modules/_moment@2.29.1@moment/locale/nl-be.js\",\n\t\"./nl-be.js\": \"./node_modules/_moment@2.29.1@moment/locale/nl-be.js\",\n\t\"./nl.js\": \"./node_modules/_moment@2.29.1@moment/locale/nl.js\",\n\t\"./nn\": \"./node_modules/_moment@2.29.1@moment/locale/nn.js\",\n\t\"./nn.js\": \"./node_modules/_moment@2.29.1@moment/locale/nn.js\",\n\t\"./oc-lnc\": \"./node_modules/_moment@2.29.1@moment/locale/oc-lnc.js\",\n\t\"./oc-lnc.js\": \"./node_modules/_moment@2.29.1@moment/locale/oc-lnc.js\",\n\t\"./pa-in\": \"./node_modules/_moment@2.29.1@moment/locale/pa-in.js\",\n\t\"./pa-in.js\": \"./node_modules/_moment@2.29.1@moment/locale/pa-in.js\",\n\t\"./pl\": \"./node_modules/_moment@2.29.1@moment/locale/pl.js\",\n\t\"./pl.js\": \"./node_modules/_moment@2.29.1@moment/locale/pl.js\",\n\t\"./pt\": \"./node_modules/_moment@2.29.1@moment/locale/pt.js\",\n\t\"./pt-br\": \"./node_modules/_moment@2.29.1@moment/locale/pt-br.js\",\n\t\"./pt-br.js\": \"./node_modules/_moment@2.29.1@moment/locale/pt-br.js\",\n\t\"./pt.js\": \"./node_modules/_moment@2.29.1@moment/locale/pt.js\",\n\t\"./ro\": \"./node_modules/_moment@2.29.1@moment/locale/ro.js\",\n\t\"./ro.js\": \"./node_modules/_moment@2.29.1@moment/locale/ro.js\",\n\t\"./ru\": \"./node_modules/_moment@2.29.1@moment/locale/ru.js\",\n\t\"./ru.js\": \"./node_modules/_moment@2.29.1@moment/locale/ru.js\",\n\t\"./sd\": \"./node_modules/_moment@2.29.1@moment/locale/sd.js\",\n\t\"./sd.js\": \"./node_modules/_moment@2.29.1@moment/locale/sd.js\",\n\t\"./se\": \"./node_modules/_moment@2.29.1@moment/locale/se.js\",\n\t\"./se.js\": \"./node_modules/_moment@2.29.1@moment/locale/se.js\",\n\t\"./si\": \"./node_modules/_moment@2.29.1@moment/locale/si.js\",\n\t\"./si.js\": \"./node_modules/_moment@2.29.1@moment/locale/si.js\",\n\t\"./sk\": \"./node_modules/_moment@2.29.1@moment/locale/sk.js\",\n\t\"./sk.js\": \"./node_modules/_moment@2.29.1@moment/locale/sk.js\",\n\t\"./sl\": \"./node_modules/_moment@2.29.1@moment/locale/sl.js\",\n\t\"./sl.js\": \"./node_modules/_moment@2.29.1@moment/locale/sl.js\",\n\t\"./sq\": \"./node_modules/_moment@2.29.1@moment/locale/sq.js\",\n\t\"./sq.js\": \"./node_modules/_moment@2.29.1@moment/locale/sq.js\",\n\t\"./sr\": \"./node_modules/_moment@2.29.1@moment/locale/sr.js\",\n\t\"./sr-cyrl\": \"./node_modules/_moment@2.29.1@moment/locale/sr-cyrl.js\",\n\t\"./sr-cyrl.js\": \"./node_modules/_moment@2.29.1@moment/locale/sr-cyrl.js\",\n\t\"./sr.js\": \"./node_modules/_moment@2.29.1@moment/locale/sr.js\",\n\t\"./ss\": \"./node_modules/_moment@2.29.1@moment/locale/ss.js\",\n\t\"./ss.js\": \"./node_modules/_moment@2.29.1@moment/locale/ss.js\",\n\t\"./sv\": \"./node_modules/_moment@2.29.1@moment/locale/sv.js\",\n\t\"./sv.js\": \"./node_modules/_moment@2.29.1@moment/locale/sv.js\",\n\t\"./sw\": \"./node_modules/_moment@2.29.1@moment/locale/sw.js\",\n\t\"./sw.js\": \"./node_modules/_moment@2.29.1@moment/locale/sw.js\",\n\t\"./ta\": \"./node_modules/_moment@2.29.1@moment/locale/ta.js\",\n\t\"./ta.js\": \"./node_modules/_moment@2.29.1@moment/locale/ta.js\",\n\t\"./te\": \"./node_modules/_moment@2.29.1@moment/locale/te.js\",\n\t\"./te.js\": \"./node_modules/_moment@2.29.1@moment/locale/te.js\",\n\t\"./tet\": \"./node_modules/_moment@2.29.1@moment/locale/tet.js\",\n\t\"./tet.js\": \"./node_modules/_moment@2.29.1@moment/locale/tet.js\",\n\t\"./tg\": \"./node_modules/_moment@2.29.1@moment/locale/tg.js\",\n\t\"./tg.js\": \"./node_modules/_moment@2.29.1@moment/locale/tg.js\",\n\t\"./th\": \"./node_modules/_moment@2.29.1@moment/locale/th.js\",\n\t\"./th.js\": \"./node_modules/_moment@2.29.1@moment/locale/th.js\",\n\t\"./tk\": \"./node_modules/_moment@2.29.1@moment/locale/tk.js\",\n\t\"./tk.js\": \"./node_modules/_moment@2.29.1@moment/locale/tk.js\",\n\t\"./tl-ph\": \"./node_modules/_moment@2.29.1@moment/locale/tl-ph.js\",\n\t\"./tl-ph.js\": \"./node_modules/_moment@2.29.1@moment/locale/tl-ph.js\",\n\t\"./tlh\": \"./node_modules/_moment@2.29.1@moment/locale/tlh.js\",\n\t\"./tlh.js\": \"./node_modules/_moment@2.29.1@moment/locale/tlh.js\",\n\t\"./tr\": \"./node_modules/_moment@2.29.1@moment/locale/tr.js\",\n\t\"./tr.js\": \"./node_modules/_moment@2.29.1@moment/locale/tr.js\",\n\t\"./tzl\": \"./node_modules/_moment@2.29.1@moment/locale/tzl.js\",\n\t\"./tzl.js\": \"./node_modules/_moment@2.29.1@moment/locale/tzl.js\",\n\t\"./tzm\": \"./node_modules/_moment@2.29.1@moment/locale/tzm.js\",\n\t\"./tzm-latn\": \"./node_modules/_moment@2.29.1@moment/locale/tzm-latn.js\",\n\t\"./tzm-latn.js\": \"./node_modules/_moment@2.29.1@moment/locale/tzm-latn.js\",\n\t\"./tzm.js\": \"./node_modules/_moment@2.29.1@moment/locale/tzm.js\",\n\t\"./ug-cn\": \"./node_modules/_moment@2.29.1@moment/locale/ug-cn.js\",\n\t\"./ug-cn.js\": \"./node_modules/_moment@2.29.1@moment/locale/ug-cn.js\",\n\t\"./uk\": \"./node_modules/_moment@2.29.1@moment/locale/uk.js\",\n\t\"./uk.js\": \"./node_modules/_moment@2.29.1@moment/locale/uk.js\",\n\t\"./ur\": \"./node_modules/_moment@2.29.1@moment/locale/ur.js\",\n\t\"./ur.js\": \"./node_modules/_moment@2.29.1@moment/locale/ur.js\",\n\t\"./uz\": \"./node_modules/_moment@2.29.1@moment/locale/uz.js\",\n\t\"./uz-latn\": \"./node_modules/_moment@2.29.1@moment/locale/uz-latn.js\",\n\t\"./uz-latn.js\": \"./node_modules/_moment@2.29.1@moment/locale/uz-latn.js\",\n\t\"./uz.js\": \"./node_modules/_moment@2.29.1@moment/locale/uz.js\",\n\t\"./vi\": \"./node_modules/_moment@2.29.1@moment/locale/vi.js\",\n\t\"./vi.js\": \"./node_modules/_moment@2.29.1@moment/locale/vi.js\",\n\t\"./x-pseudo\": \"./node_modules/_moment@2.29.1@moment/locale/x-pseudo.js\",\n\t\"./x-pseudo.js\": \"./node_modules/_moment@2.29.1@moment/locale/x-pseudo.js\",\n\t\"./yo\": \"./node_modules/_moment@2.29.1@moment/locale/yo.js\",\n\t\"./yo.js\": \"./node_modules/_moment@2.29.1@moment/locale/yo.js\",\n\t\"./zh-cn\": \"./node_modules/_moment@2.29.1@moment/locale/zh-cn.js\",\n\t\"./zh-cn.js\": \"./node_modules/_moment@2.29.1@moment/locale/zh-cn.js\",\n\t\"./zh-hk\": \"./node_modules/_moment@2.29.1@moment/locale/zh-hk.js\",\n\t\"./zh-hk.js\": \"./node_modules/_moment@2.29.1@moment/locale/zh-hk.js\",\n\t\"./zh-mo\": \"./node_modules/_moment@2.29.1@moment/locale/zh-mo.js\",\n\t\"./zh-mo.js\": \"./node_modules/_moment@2.29.1@moment/locale/zh-mo.js\",\n\t\"./zh-tw\": \"./node_modules/_moment@2.29.1@moment/locale/zh-tw.js\",\n\t\"./zh-tw.js\": \"./node_modules/_moment@2.29.1@moment/locale/zh-tw.js\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./node_modules/_moment@2.29.1@moment/locale sync recursive ^\\\\.\\\\/.*$\";\n\n//# sourceURL=webpack:///./node_modules/_moment@2.29.1@moment/locale_sync_^\\.\\/.*$?");

/***/ }),

/***/ "./source/index.js":
/*!*************************!*\
  !*** ./source/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ \"./source/styles.css\");\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.scss */ \"./source/styles.scss\");\n/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_scss__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ \"./node_modules/_moment@2.29.1@moment/moment.js\");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);\n\n\n // import { fetchTodos } from './api';\n\nvar getTodos = function getTodos() {\n  return __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ./api */ \"./source/api.js\"));\n};\n\nconsole.log('Im from source!');\n\nvar func = function func() {\n  return console.log('this is a function');\n};\n\nfunc();\nvar btn = document.getElementById('btn');\nbtn.addEventListener('click', function () {\n  getTodos().then(function (_ref) {\n    var fetchTodos = _ref.fetchTodos;\n    fetchTodos().then(function (resp) {\n      return console.log(resp);\n    });\n  });\n});\n\n//# sourceURL=webpack:///./source/index.js?");

/***/ }),

/***/ "./source/styles.css":
/*!***************************!*\
  !*** ./source/styles.css ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var api = __webpack_require__(/*! ../node_modules/_style-loader@1.3.0@style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/_style-loader@1.3.0@style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !../node_modules/_css-loader@4.3.0@css-loader/dist/cjs.js!./styles.css */ \"./node_modules/_css-loader@4.3.0@css-loader/dist/cjs.js!./source/styles.css\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.i, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(content, options);\n\n\n\nmodule.exports = content.locals || {};\n\n//# sourceURL=webpack:///./source/styles.css?");

/***/ }),

/***/ "./source/styles.scss":
/*!****************************!*\
  !*** ./source/styles.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var api = __webpack_require__(/*! ../node_modules/_style-loader@1.3.0@style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/_style-loader@1.3.0@style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !../node_modules/_css-loader@4.3.0@css-loader/dist/cjs.js!../node_modules/_sass-loader@10.1.0@sass-loader/dist/cjs.js!./styles.scss */ \"./node_modules/_css-loader@4.3.0@css-loader/dist/cjs.js!./node_modules/_sass-loader@10.1.0@sass-loader/dist/cjs.js!./source/styles.scss\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.i, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(content, options);\n\n\n\nmodule.exports = content.locals || {};\n\n//# sourceURL=webpack:///./source/styles.scss?");

/***/ })

/******/ });