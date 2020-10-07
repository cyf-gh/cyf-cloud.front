/*
 * @Date: 2020-09-13 15:49:07
 * @LastEditors: cyf
 * @LastEditTime: 2020-10-07 17:26:12
 * @FilePath: \cyf-cloud.front\src\cc\v1x1\Identity.js
 * @Description: What is mind? No matter. What is matter? Nevermind.
 */

import rd from "../random"
import apiAddr from "../../server"

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

/*
    Name string
    Email string
    Phone string
    Avatar string
    Info string
    Level string
    BgUrl string
*/
function RefreshAccountInfo( axios ) {
    var infoData = localStorage.getItem("cc_account_info")
    if ( infoData == "" || infoData == null ) {
        axios.get(apiAddr+"/v1x1/account/private/info", { withCredentials: true })
        .then(res => {
            console.log(res.data)
            localStorage.setItem( "cc_account_info", res.data.Data )
        })
        .catch(err => {
            console.error(err);
        })
    }
}

function ClearAccountInfo() {
    localStorage.setItem("cc_account_info","")
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
    Logout,
    RefreshAccountInfo,
    ClearAccountInfo
}