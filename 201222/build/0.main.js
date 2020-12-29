(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./source/api.js":
/*!***********************!*\
  !*** ./source/api.js ***!
  \***********************/
/*! exports provided: fetchTodos */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchTodos\", function() { return fetchTodos; });\nvar fetchTodos = function fetchTodos() {\n  return fetch('https://jsonplaceholder.typicode.com/posts').then(function (response) {\n    return response.json();\n  }).then(function (json) {\n    return json;\n  });\n};\n\n//# sourceURL=webpack:///./source/api.js?");

/***/ })

}]);