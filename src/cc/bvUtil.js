/*
 * @Date: 2020-09-13 13:17:39
 * @LastEditors: cyf
 * @LastEditTime: 2020-09-28 16:34:25
 * @FilePath: \ccfront\src\cc\bvUtil.js
 * @Description: What is mind? No matter. What is matter? Nevermind.
 */

var vToast = null;
function InitToast( toast ) {
    vToast = toast
}

function Msg(title, msg, v = "default") {
    vToast.toast(msg, {
      title: title,
      autoHideDelay: 3000,
      appendToast: false,
      variant: v,
    });
}

export default {
    InitToast,
    Msg
}