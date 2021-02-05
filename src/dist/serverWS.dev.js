"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/*
 * @Date: 2021-01-15 14:07:56
 * @LastEditors: cyf
 * @LastEditTime: 2021-02-05 22:11:45
 * @FilePath: \cyf-cloud.front\src\serverWS.js
 * @Description: avoid 'An insecure WebSocket connection may not be initiated from a page loaded over HTTPS.'
 */
var apiServerWS;

var _default = apiServerWS = 'wss://' + process.env.VUE_APP_BACKEND_SERVER_ADDR;

exports["default"] = _default;