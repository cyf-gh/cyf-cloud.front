"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/*
 * @Date: 2020-09-13 13:17:39
 * @LastEditors: cyf
 * @LastEditTime: 2021-04-17 14:09:57
 * @FilePath: \cyf-cloud.front\src\cc\bvUtil.js
 * @Description: What is mind? No matter. What is matter? Nevermind.
 */
var vToast = null;

function InitToast(toast) {
  vToast = toast;
}

function Msg(title, msg) {
  var v = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "default";
  vToast.toast(msg, {
    title: title,
    autoHideDelay: 3000,
    appendToast: false,
    variant: v
  });
}

function Err(msg) {
  Msg("错误", msg, "danger");
}

function Warn(msg) {
  Msg("警告", msg, "warning");
}

function Ok(msg) {
  Msg("成功", msg, "success");
}

var _default = {
  InitToast: InitToast,
  Msg: Msg,
  Err: Err,
  Ok: Ok,
  Warn: Warn
};
exports["default"] = _default;