/*
 * @Date: 2020-09-29 17:42:00
 * @LastEditors: cyf
 * @LastEditTime: 2020-09-30 20:44:39
 * @FilePath: \cyf-cloud.front\src\cc\Image.js
 * @Description: What is mind? No matter. What is matter? Nevermind.
 */

 // object file to base64
 const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const blobMaxSize = 750*1334

function CompressBase64(
    base64,        // 源图片
    w, h,          // 目标图片的长宽
    callback       // 回调
) {
    //处理缩放，转格式
    var _img = new Image();
    _img.src = base64;
    _img.onload = function() {
        var _canvas = document.createElement("canvas");
        _canvas.setAttribute("width", w);
        _canvas.setAttribute("height", h);
        _canvas.getContext("2d").drawImage(this, 0, 0, w, h);
        var base64 = _canvas.toDataURL("image/jpeg");
        _canvas.toBlob( function(blob) {
            // 递归压缩
            if(blob.size > blobMaxSize){
                CompressBase64(base64, w, h, callback);
            }else{
                callback(base64);
            }
        }, "image/jpeg");
    }
    return base64
}

export default {
    toBase64,
    CompressBase64
}