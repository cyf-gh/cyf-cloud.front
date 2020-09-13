/*
 * @Date: 2020-09-13 15:49:07
 * @LastEditors: cyf
 * @LastEditTime: 2020-09-13 21:18:40
 * @FilePath: \cyf-cloud.front\src\cc\v1x1\Identity.js
 * @Description: What is mind? No matter. What is matter? Nevermind.
 */

import rd from "../random"

var cke = null
function InitCookie( cookie ) {
    cke = cookie
}

function GenerateBasicIds() {
    // 创建cid
    if(cke.get("cid") == null){
        cke.set("cid", rd.CreateUuid(), 30)
        console.log("set cid")
    }
}

function GetCid() {
    GenerateBasicIds()
    return cke.get("cid") != null ? cke.get("cid") : "0";
}

export default {
    InitCookie,
    GenerateBasicIds,
    GetCid
}