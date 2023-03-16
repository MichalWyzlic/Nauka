/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
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
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + chunkId + ".app.js"
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
/******/ 	__webpack_require__.p = "assets/scripts/";
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/App/ProjectItem.js":
/*!********************************!*\
  !*** ./src/App/ProjectItem.js ***!
  \********************************/
/*! exports provided: ProjectItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ProjectItem\", function() { return ProjectItem; });\n/* harmony import */ var _Utility_DOMHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utility/DOMHelper */ \"./src/Utility/DOMHelper.js\");\n// import { Tooltip } from \"./Tooltip\";\r\n\r\n\r\nclass ProjectItem {\r\n\t\r\n  \r\n\tconstructor(id, updateProjectListsFunction, type) {\r\n\t\tthis.hasActiveTooltip = false;\r\n\t\tthis.id = id;\r\n\t\tthis.updateProjectListsHandler = updateProjectListsFunction;\r\n\t\tthis.connectMoreInfoButton();\r\n\t\tthis.connectSwitchButton(type);\r\n\t\tthis.connectDrag();\r\n\t}\r\n  \r\n\tshowMoreInfoHandler() {\r\n\t\tif (this.hasActiveTooltip) {\r\n\t\t\treturn;\r\n\t\t}\r\n\t\tconst projectElement = document.getElementById(this.id);\r\n\t\tconst tooltipText = projectElement.dataset.extraInfo;\r\n\t\t__webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ./Tooltip */ \"./src/App/Tooltip.js\")).then( module =>{\r\n\t\t\tconst tooltip = new module.Tooltip(\r\n\t\t\t\t() => {\r\n\t\t\t\t\tthis.hasActiveTooltip = false;\r\n\t\t\t\t},\r\n\t\t\t\ttooltipText,\r\n\t\t\t\tthis.id\r\n\t\t\t);\r\n\t\t\ttooltip.attach();\r\n\t\t\tthis.hasActiveTooltip = true;\r\n\t\t});\r\n\t\t\r\n\t}\r\n  \r\n\tconnectDrag() {\r\n\t\tconst item = document.getElementById(this.id);\r\n\t\titem.addEventListener('dragstart', event => {\r\n\t\t\tevent.dataTransfer.setData('text/plain', this.id);\r\n\t\t\tevent.dataTransfer.effectAllowed = 'move';\r\n\t\t});\r\n  \r\n\t\titem.addEventListener('dragend', event => {\r\n\t\t\tconsole.log(event);\r\n\t\t});\r\n\t}\r\n  \r\n\tconnectMoreInfoButton() {\r\n\t\tconst projectItemElement = document.getElementById(this.id);\r\n\t\tconst moreInfoBtn = projectItemElement.querySelector(\r\n\t\t\t'button:first-of-type'\r\n\t\t);\r\n\t\tmoreInfoBtn.addEventListener('click', this.showMoreInfoHandler.bind(this));\r\n\t}\r\n  \r\n\tconnectSwitchButton(type) {\r\n\t\tconst projectItemElement = document.getElementById(this.id);\r\n\t\tlet switchBtn = projectItemElement.querySelector('button:last-of-type');\r\n\t\tswitchBtn = _Utility_DOMHelper__WEBPACK_IMPORTED_MODULE_0__[\"DOMHelper\"].clearEventListeners(switchBtn);\r\n\t\tswitchBtn.textContent = type === 'active' ? 'Finish' : 'Activate';\r\n\t\tswitchBtn.addEventListener(\r\n\t\t\t'click',\r\n\t\t\tthis.updateProjectListsHandler.bind(null, this.id)\r\n\t\t);\r\n\t}\r\n  \r\n\tupdate(updateProjectListsFn, type) {\r\n\t\tthis.updateProjectListsHandler = updateProjectListsFn;\r\n\t\tthis.connectSwitchButton(type);\r\n\t}\r\n}\n\n//# sourceURL=webpack:///./src/App/ProjectItem.js?");

/***/ }),

/***/ "./src/App/ProjectList.js":
/*!********************************!*\
  !*** ./src/App/ProjectList.js ***!
  \********************************/
/*! exports provided: ProjectList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ProjectList\", function() { return ProjectList; });\n/* harmony import */ var _ProjectItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProjectItem */ \"./src/App/ProjectItem.js\");\n/* harmony import */ var _Utility_DOMHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Utility/DOMHelper */ \"./src/Utility/DOMHelper.js\");\n\r\n\r\n\r\nclass ProjectList {\t\r\n  \r\n\tconstructor(type) {\r\n\t\tthis.projects = [];\r\n\t\tthis.type = type;\r\n\t\tconst prjItems = document.querySelectorAll(`#${type}-projects li`);\r\n\t\tfor (const prjItem of prjItems) {\r\n\t\t\tthis.projects.push(\r\n\t\t\t\tnew _ProjectItem__WEBPACK_IMPORTED_MODULE_0__[\"ProjectItem\"](prjItem.id, this.switchProject.bind(this), this.type)\r\n\t\t\t);\r\n\t\t}\r\n\t\tconsole.log(this.projects);\r\n\t\tthis.connectDroppable();\r\n\t}\r\n  \r\n\tconnectDroppable() {\r\n\t\tconst list = document.querySelector(`#${this.type}-projects ul`);\r\n  \r\n\t\tlist.addEventListener('dragenter', event => {\r\n\t\t\tif (event.dataTransfer.types[0] === 'text/plain') {\r\n\t\t\t\tlist.parentElement.classList.add('droppable');\r\n\t\t\t\tevent.preventDefault();\r\n\t\t\t}\r\n\t\t});\r\n  \r\n\t\tlist.addEventListener('dragover', event => {\r\n\t\t\tif (event.dataTransfer.types[0] === 'text/plain') {\r\n\t\t\t\tevent.preventDefault();\r\n\t\t\t}\r\n\t\t});\r\n  \r\n\t\tlist.addEventListener('dragleave', event => {\r\n\t\t\tif (event.relatedTarget.closest(`#${this.type}-projects ul`) !== list) {\r\n\t\t\t\tlist.parentElement.classList.remove('droppable');\r\n\t\t\t}\r\n\t\t});\r\n  \r\n\t\tlist.addEventListener('drop', event => {\r\n\t\t\tconst prjId = event.dataTransfer.getData('text/plain');\r\n\t\t\tif (this.projects.find(p => p.id === prjId)) {\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\t\t\tdocument\r\n\t\t\t\t.getElementById(prjId)\r\n\t\t\t\t.querySelector('button:last-of-type')\r\n\t\t\t\t.click();\r\n\t\t\tlist.parentElement.classList.remove('droppable');\r\n\t\t\t// event.preventDefault(); // not required\r\n\t\t});\r\n\t}\r\n  \r\n\tsetSwitchHandlerFunction(switchHandlerFunction) {\r\n\t\tthis.switchHandler = switchHandlerFunction;\r\n\t}\r\n  \r\n\taddProject(project) {\r\n\t\tthis.projects.push(project);\r\n\t\t_Utility_DOMHelper__WEBPACK_IMPORTED_MODULE_1__[\"moveElement\"](project.id, `#${this.type}-projects ul`);\r\n\t\tproject.update(this.switchProject.bind(this), this.type);\r\n\t}\r\n  \r\n\tswitchProject(projectId) {\r\n\t\t// const projectIndex = this.projects.findIndex(p => p.id === projectId);\r\n\t\t// this.projects.splice(projectIndex, 1);\r\n\t\tthis.switchHandler(this.projects.find(p => p.id === projectId));\r\n\t\tthis.projects = this.projects.filter(p => p.id !== projectId);\r\n\t}\r\n}\r\n  \n\n//# sourceURL=webpack:///./src/App/ProjectList.js?");

/***/ }),

/***/ "./src/Utility/DOMHelper.js":
/*!**********************************!*\
  !*** ./src/Utility/DOMHelper.js ***!
  \**********************************/
/*! exports provided: DOMHelper, clearEventListeners, moveElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DOMHelper\", function() { return DOMHelper; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"clearEventListeners\", function() { return clearEventListeners; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"moveElement\", function() { return moveElement; });\nclass DOMHelper {\r\n\tstatic clearEventListeners(element) {\r\n\t\tconst clonedElement = element.cloneNode(true);\r\n\t\telement.replaceWith(clonedElement);\r\n\t\treturn clonedElement;\r\n\t}\r\n\r\n\tstatic moveElement(elementId, newDestinationSelector) {\r\n\t\tconst element = document.getElementById(elementId);\r\n\t\tconst destinationElement = document.querySelector(newDestinationSelector);\r\n\t\tdestinationElement.append(element);\r\n\t\telement.scrollIntoView({ behavior: 'smooth' });\r\n\t}\r\n}\r\n\r\nfunction clearEventListeners(element) {\r\n\tconst clonedElement = element.cloneNode(true);\r\n\telement.replaceWith(clonedElement);\r\n\treturn clonedElement;\r\n}\r\n\r\nfunction moveElement(elementId, newDestinationSelector) {\r\n\tconst element = document.getElementById(elementId);\r\n\tconst destinationElement = document.querySelector(newDestinationSelector);\r\n\tdestinationElement.append(element);\r\n\telement.scrollIntoView({ behavior: 'smooth' });\r\n}\n\n//# sourceURL=webpack:///./src/Utility/DOMHelper.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _App_ProjectList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App/ProjectList */ \"./src/App/ProjectList.js\");\n\r\n\r\nclass App {\r\n\tstatic init() {\r\n\t\tconst activeProjectsList = new _App_ProjectList__WEBPACK_IMPORTED_MODULE_0__[\"ProjectList\"]('active');\r\n\t\tconst finishedProjectsList = new _App_ProjectList__WEBPACK_IMPORTED_MODULE_0__[\"ProjectList\"]('finished');\r\n\t\tactiveProjectsList.setSwitchHandlerFunction(\r\n\t\t\tfinishedProjectsList.addProject.bind(finishedProjectsList)\r\n\t\t);\r\n\t\tfinishedProjectsList.setSwitchHandlerFunction(\r\n\t\t\tactiveProjectsList.addProject.bind(activeProjectsList)\r\n\t\t);\r\n\r\n\t\t// const timerId = setTimeout(this.startAnalytics, 3000);\r\n\r\n\t\t// document.getElementById('stop-analytics-btn').addEventListener('click', () => {\r\n\t\t//   clearTimeout(timerId);\r\n\t\t// });\r\n\t}\r\n\r\n\tstatic startAnalytics() {\r\n\t\tconst analyticsScript = document.createElement('script');\r\n\t\tanalyticsScript.src = 'assets/scripts/Utility/analytics.js';\r\n\t\tanalyticsScript.defer = true;\r\n\t\tdocument.head.append(analyticsScript);\r\n\t}\r\n}\r\n\r\nApp.init();\r\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ })

/******/ });