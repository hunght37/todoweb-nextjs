"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./src/components/TodoItem.tsx":
/*!*************************************!*\
  !*** ./src/components/TodoItem.tsx ***!
  \*************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ TodoItem; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _barrel_optimize_names_FaCheck_FaEdit_FaTrash_react_icons_fa__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! __barrel_optimize__?names=FaCheck,FaEdit,FaTrash!=!react-icons/fa */ \"(app-pages-browser)/./node_modules/react-icons/fa/index.esm.js\");\n\n\nfunction TodoItem(param) {\n    let { todo, onToggleComplete, onEdit, onDelete } = param;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"group bg-white rounded-lg drive-shadow hover:shadow-md transition-shadow duration-200\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"flex items-center p-4\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                    onClick: onToggleComplete,\n                    className: \"w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center transition-colors duration-200\\n            \".concat(todo.completed ? \"bg-[var(--drive-green)] border-[var(--drive-green)]\" : \"border-[var(--drive-border)] hover:border-[var(--drive-green)]\"),\n                    children: todo.completed && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_FaCheck_FaEdit_FaTrash_react_icons_fa__WEBPACK_IMPORTED_MODULE_1__.FaCheck, {\n                        className: \"w-3 h-3 text-white\"\n                    }, void 0, false, {\n                        fileName: \"T:\\\\New folder\\\\todo-app\\\\src\\\\components\\\\TodoItem.tsx\",\n                        lineNumber: 28,\n                        columnNumber: 30\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"T:\\\\New folder\\\\todo-app\\\\src\\\\components\\\\TodoItem.tsx\",\n                    lineNumber: 20,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"flex-1 min-w-0\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                            className: \"text-base font-medium truncate \".concat(todo.completed ? \"text-gray-400 line-through\" : \"text-[var(--drive-text)]\"),\n                            children: todo.title\n                        }, void 0, false, {\n                            fileName: \"T:\\\\New folder\\\\todo-app\\\\src\\\\components\\\\TodoItem.tsx\",\n                            lineNumber: 32,\n                            columnNumber: 11\n                        }, this),\n                        todo.description && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            className: \"text-sm mt-1 line-clamp-2 \".concat(todo.completed ? \"text-gray-400\" : \"text-gray-600\"),\n                            children: todo.description\n                        }, void 0, false, {\n                            fileName: \"T:\\\\New folder\\\\todo-app\\\\src\\\\components\\\\TodoItem.tsx\",\n                            lineNumber: 40,\n                            columnNumber: 13\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"T:\\\\New folder\\\\todo-app\\\\src\\\\components\\\\TodoItem.tsx\",\n                    lineNumber: 31,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"flex items-center space-x-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            onClick: onEdit,\n                            className: \"p-2 text-gray-600 hover:text-[var(--drive-blue)] hover:bg-[var(--drive-hover)] rounded-full\",\n                            \"aria-label\": \"Edit todo\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_FaCheck_FaEdit_FaTrash_react_icons_fa__WEBPACK_IMPORTED_MODULE_1__.FaEdit, {\n                                className: \"w-4 h-4\"\n                            }, void 0, false, {\n                                fileName: \"T:\\\\New folder\\\\todo-app\\\\src\\\\components\\\\TodoItem.tsx\",\n                                lineNumber: 56,\n                                columnNumber: 13\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"T:\\\\New folder\\\\todo-app\\\\src\\\\components\\\\TodoItem.tsx\",\n                            lineNumber: 51,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            onClick: onDelete,\n                            className: \"p-2 text-gray-600 hover:text-red-600 hover:bg-[var(--drive-hover)] rounded-full\",\n                            \"aria-label\": \"Delete todo\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_FaCheck_FaEdit_FaTrash_react_icons_fa__WEBPACK_IMPORTED_MODULE_1__.FaTrash, {\n                                className: \"w-4 h-4\"\n                            }, void 0, false, {\n                                fileName: \"T:\\\\New folder\\\\todo-app\\\\src\\\\components\\\\TodoItem.tsx\",\n                                lineNumber: 63,\n                                columnNumber: 13\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"T:\\\\New folder\\\\todo-app\\\\src\\\\components\\\\TodoItem.tsx\",\n                            lineNumber: 58,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"T:\\\\New folder\\\\todo-app\\\\src\\\\components\\\\TodoItem.tsx\",\n                    lineNumber: 50,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"T:\\\\New folder\\\\todo-app\\\\src\\\\components\\\\TodoItem.tsx\",\n            lineNumber: 19,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"T:\\\\New folder\\\\todo-app\\\\src\\\\components\\\\TodoItem.tsx\",\n        lineNumber: 18,\n        columnNumber: 5\n    }, this);\n}\n_c = TodoItem;\nvar _c;\n$RefreshReg$(_c, \"TodoItem\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL1RvZG9JdGVtLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQzBEO0FBUzNDLFNBQVNHLFNBQVMsS0FLakI7UUFMaUIsRUFDL0JDLElBQUksRUFDSkMsZ0JBQWdCLEVBQ2hCQyxNQUFNLEVBQ05DLFFBQVEsRUFDTSxHQUxpQjtJQU0vQixxQkFDRSw4REFBQ0M7UUFBSUMsV0FBVTtrQkFDYiw0RUFBQ0Q7WUFBSUMsV0FBVTs7OEJBQ2IsOERBQUNDO29CQUNDQyxTQUFTTjtvQkFDVEksV0FBVyxtSEFJUixPQUhDTCxLQUFLUSxTQUFTLEdBQ1osd0RBQ0E7OEJBR0xSLEtBQUtRLFNBQVMsa0JBQUksOERBQUNWLGlHQUFPQTt3QkFBQ08sV0FBVTs7Ozs7Ozs7Ozs7OEJBR3hDLDhEQUFDRDtvQkFBSUMsV0FBVTs7c0NBQ2IsOERBQUNJOzRCQUNDSixXQUFXLGtDQUVWLE9BRENMLEtBQUtRLFNBQVMsR0FBRywrQkFBK0I7c0NBR2pEUixLQUFLVSxLQUFLOzs7Ozs7d0JBRVpWLEtBQUtXLFdBQVcsa0JBQ2YsOERBQUNDOzRCQUNDUCxXQUFXLDZCQUVWLE9BRENMLEtBQUtRLFNBQVMsR0FBRyxrQkFBa0I7c0NBR3BDUixLQUFLVyxXQUFXOzs7Ozs7Ozs7Ozs7OEJBS3ZCLDhEQUFDUDtvQkFBSUMsV0FBVTs7c0NBQ2IsOERBQUNDOzRCQUNDQyxTQUFTTDs0QkFDVEcsV0FBVTs0QkFDVlEsY0FBVztzQ0FFWCw0RUFBQ2hCLGdHQUFNQTtnQ0FBQ1EsV0FBVTs7Ozs7Ozs7Ozs7c0NBRXBCLDhEQUFDQzs0QkFDQ0MsU0FBU0o7NEJBQ1RFLFdBQVU7NEJBQ1ZRLGNBQVc7c0NBRVgsNEVBQUNqQixpR0FBT0E7Z0NBQUNTLFdBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNL0I7S0ExRHdCTiIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvY29tcG9uZW50cy9Ub2RvSXRlbS50c3g/NTY5YiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUb2RvIH0gZnJvbSAnQC90eXBlcyc7XG5pbXBvcnQgeyBGYVRyYXNoLCBGYUVkaXQsIEZhQ2hlY2sgfSBmcm9tICdyZWFjdC1pY29ucy9mYSc7XG5cbmludGVyZmFjZSBUb2RvSXRlbVByb3BzIHtcbiAgdG9kbzogVG9kbztcbiAgb25Ub2dnbGVDb21wbGV0ZTogKCkgPT4gdm9pZDtcbiAgb25FZGl0OiAoKSA9PiB2b2lkO1xuICBvbkRlbGV0ZTogKCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVG9kb0l0ZW0oe1xuICB0b2RvLFxuICBvblRvZ2dsZUNvbXBsZXRlLFxuICBvbkVkaXQsXG4gIG9uRGVsZXRlLFxufTogVG9kb0l0ZW1Qcm9wcykge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JvdXAgYmctd2hpdGUgcm91bmRlZC1sZyBkcml2ZS1zaGFkb3cgaG92ZXI6c2hhZG93LW1kIHRyYW5zaXRpb24tc2hhZG93IGR1cmF0aW9uLTIwMFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBwLTRcIj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIG9uQ2xpY2s9e29uVG9nZ2xlQ29tcGxldGV9XG4gICAgICAgICAgY2xhc3NOYW1lPXtgdy01IGgtNSByb3VuZGVkLWZ1bGwgYm9yZGVyLTIgbXItNCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0cmFuc2l0aW9uLWNvbG9ycyBkdXJhdGlvbi0yMDBcbiAgICAgICAgICAgICR7dG9kby5jb21wbGV0ZWQgXG4gICAgICAgICAgICAgID8gJ2JnLVt2YXIoLS1kcml2ZS1ncmVlbildIGJvcmRlci1bdmFyKC0tZHJpdmUtZ3JlZW4pXScgXG4gICAgICAgICAgICAgIDogJ2JvcmRlci1bdmFyKC0tZHJpdmUtYm9yZGVyKV0gaG92ZXI6Ym9yZGVyLVt2YXIoLS1kcml2ZS1ncmVlbildJ1xuICAgICAgICAgICAgfWB9XG4gICAgICAgID5cbiAgICAgICAgICB7dG9kby5jb21wbGV0ZWQgJiYgPEZhQ2hlY2sgY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LXdoaXRlXCIgLz59XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICBcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgbWluLXctMFwiPlxuICAgICAgICAgIDxoM1xuICAgICAgICAgICAgY2xhc3NOYW1lPXtgdGV4dC1iYXNlIGZvbnQtbWVkaXVtIHRydW5jYXRlICR7XG4gICAgICAgICAgICAgIHRvZG8uY29tcGxldGVkID8gJ3RleHQtZ3JheS00MDAgbGluZS10aHJvdWdoJyA6ICd0ZXh0LVt2YXIoLS1kcml2ZS10ZXh0KV0nXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dG9kby50aXRsZX1cbiAgICAgICAgICA8L2gzPlxuICAgICAgICAgIHt0b2RvLmRlc2NyaXB0aW9uICYmIChcbiAgICAgICAgICAgIDxwXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHRleHQtc20gbXQtMSBsaW5lLWNsYW1wLTIgJHtcbiAgICAgICAgICAgICAgICB0b2RvLmNvbXBsZXRlZCA/ICd0ZXh0LWdyYXktNDAwJyA6ICd0ZXh0LWdyYXktNjAwJ1xuICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3RvZG8uZGVzY3JpcHRpb259XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTIgbWwtNCBvcGFjaXR5LTAgZ3JvdXAtaG92ZXI6b3BhY2l0eS0xMDAgdHJhbnNpdGlvbi1vcGFjaXR5IGR1cmF0aW9uLTIwMFwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e29uRWRpdH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMiB0ZXh0LWdyYXktNjAwIGhvdmVyOnRleHQtW3ZhcigtLWRyaXZlLWJsdWUpXSBob3ZlcjpiZy1bdmFyKC0tZHJpdmUtaG92ZXIpXSByb3VuZGVkLWZ1bGxcIlxuICAgICAgICAgICAgYXJpYS1sYWJlbD1cIkVkaXQgdG9kb1wiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPEZhRWRpdCBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXtvbkRlbGV0ZX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMiB0ZXh0LWdyYXktNjAwIGhvdmVyOnRleHQtcmVkLTYwMCBob3ZlcjpiZy1bdmFyKC0tZHJpdmUtaG92ZXIpXSByb3VuZGVkLWZ1bGxcIlxuICAgICAgICAgICAgYXJpYS1sYWJlbD1cIkRlbGV0ZSB0b2RvXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8RmFUcmFzaCBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJGYVRyYXNoIiwiRmFFZGl0IiwiRmFDaGVjayIsIlRvZG9JdGVtIiwidG9kbyIsIm9uVG9nZ2xlQ29tcGxldGUiLCJvbkVkaXQiLCJvbkRlbGV0ZSIsImRpdiIsImNsYXNzTmFtZSIsImJ1dHRvbiIsIm9uQ2xpY2siLCJjb21wbGV0ZWQiLCJoMyIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJwIiwiYXJpYS1sYWJlbCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/TodoItem.tsx\n"));

/***/ })

});