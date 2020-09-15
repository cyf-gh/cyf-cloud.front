/*
 * @Date: 2020-09-13 15:49:07
 * @LastEditors: cyf
 * @LastEditTime: 2020-09-15 15:12:53
 * @FilePath: \cyf-cloud.front\src\cc\v1x1\Identity.js
 * @Description: What is mind? No matter. What is matter? Nevermind.
 */

import rd from "../random"

var cke
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
    try {
        return cke.get("cid") != null ? cke.get("cid") : "0";
    } catch (error) {
        console.error(error)
        return "0"
    }
}

function GetAtk() {
    try {
        return cke.get("atk") != null ? cke.get("atk") : "0";
    } catch (error) {
        console.error(error)
        return "0"
    }
}

function IsLogin() {
    return GetAtk() != "0"
}

function Logout() {
    cke.delete('atk')
}

export default {
    InitCookie,
    GenerateBasicIds,
    GetCid,
    GetAtk,
    IsLogin,
    Logout
}