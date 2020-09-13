/*
 * @Date: 2020-09-13 13:10:22
 * @LastEditors: cyf
 * @LastEditTime: 2020-09-13 16:43:33
 * @FilePath: \cyf-cloud.front\src\cc\random.js
 * @Description: What is mind? No matter. What is matter? Nevermind.
 */
function noncestr(randomFlag, min, max) {
    var str = "",
      range = min,
      arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    // 随机产生
    if (randomFlag) {
      range = Math.round(Math.random() * (max - min)) + min;
    }
    for (var i = 0; i < range; i++) {
      var pos = Math.round(Math.random() * (arr.length - 1));
      str += arr[pos];
    }
    return str;
}

function CreateUuid() {
  var d = Date.now();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
    d += performance.now(); //use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

export default {
    noncestr,
    CreateUuid
}