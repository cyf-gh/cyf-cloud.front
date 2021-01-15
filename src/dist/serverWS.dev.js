"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/*
 * @Date: 2021-01-15 14:07:56
 * @LastEditors: cyf
 * @LastEditTime: 2021-01-15 14:08:04
 * @FilePath: \cyf-cloud.front\src\serverWS.js
 * @Description: What is mind? No matter. What is matter? Nevermind.
 */
var apiServerWS;

var _default = apiServerWS = 'ws://' + process.env.VUE_APP_BACKEND_SERVER_ADDR;

exports["default"] = _default;