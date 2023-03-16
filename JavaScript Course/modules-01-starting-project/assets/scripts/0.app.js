(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./src/App/Component.js":
/*!******************************!*\
  !*** ./src/App/Component.js ***!
  \******************************/
/*! exports provided: Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Component\", function() { return Component; });\nclass Component {\r\n\tconstructor(hostElementId, insertBefore = false) {\r\n\t\tif (hostElementId) {\r\n\t\t\tthis.hostElement = document.getElementById(hostElementId);\r\n\t\t} else {\r\n\t\t\tthis.hostElement = document.body;\r\n\t\t}\r\n\t\tthis.insertBefore = insertBefore;\r\n\t}\r\n  \r\n\tdetach() {\r\n\t\tif (this.element) {\r\n\t\t\tthis.element.remove();\r\n\t\t// this.element.parentElement.removeChild(this.element);\r\n\t\t}\r\n\t}\r\n  \r\n\tattach() {\r\n\t\tthis.hostElement.insertAdjacentElement(\r\n\t\t\tthis.insertBefore ? 'afterbegin' : 'beforeend',\r\n\t\t\tthis.element\r\n\t\t);\r\n\t}\r\n}\n\n//# sourceURL=webpack:///./src/App/Component.js?");

/***/ }),

/***/ "./src/App/Tooltip.js":
/*!****************************!*\
  !*** ./src/App/Tooltip.js ***!
  \****************************/
/*! exports provided: Tooltip */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Tooltip\", function() { return Tooltip; });\n/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ \"./src/App/Component.js\");\n\r\n\r\nclass Tooltip extends _Component__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\r\n\tconstructor(closeNotifierFunction, text, hostElementId) {\r\n\t\tsuper(hostElementId);\r\n\t\tthis.closeNotifier = closeNotifierFunction;\r\n\t\tthis.text = text;\r\n\t\tthis.closeTooltip = () => {\r\n\t\t\tthis.detach();\r\n\t\t\tthis.closeNotifier();\r\n\t\t};\r\n\t\tthis.create();\r\n\t}\r\n  \r\n\r\n  \r\n\tcreate() {\r\n\t\tconst tooltipElement = document.createElement('div');\r\n\t\ttooltipElement.className = 'card';\r\n\t\tconst tooltipTemplate = document.getElementById('tooltip');\r\n\t\tconst tooltipBody = document.importNode(tooltipTemplate.content, true);\r\n\t\ttooltipBody.querySelector('p').textContent = this.text;\r\n\t\ttooltipElement.append(tooltipBody);\r\n  \r\n\t\tconst hostElPosLeft = this.hostElement.offsetLeft;\r\n\t\tconst hostElPosTop = this.hostElement.offsetTop;\r\n\t\tconst hostElHeight = this.hostElement.clientHeight;\r\n\t\tconst parentElementScrolling = this.hostElement.parentElement.scrollTop;\r\n  \r\n\t\tconst x = hostElPosLeft + 20;\r\n\t\tconst y = hostElPosTop + hostElHeight - parentElementScrolling - 10;\r\n  \r\n\t\ttooltipElement.style.position = 'absolute';\r\n\t\ttooltipElement.style.left = x + 'px'; // 500px\r\n\t\ttooltipElement.style.top = y + 'px';\r\n  \r\n\t\ttooltipElement.addEventListener('click', this.closeTooltip);\r\n\t\tthis.element = tooltipElement;\r\n\t}\r\n}\r\n  \n\n//# sourceURL=webpack:///./src/App/Tooltip.js?");

/***/ })

}]);