/*
 * @Date: 2020-09-13 15:49:07
 * @LastEditors: cyf
 * @LastEditTime: 2020-10-14 20:54:07
 * @FilePath: \cyf-cloud.front\src\cc\v1x1\Identity.js
 * @Description: What is mind? No matter. What is matter? Nevermind.
 */

import rd from "../random"
import apiAddr from "../../server"
import theme from "./Theme"

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
        ForceRefreshAccountInfo( axios )
    }
}

function ForceRefreshAccountInfo( axios ) {
    axios.get(apiAddr+"/v1x1/account/private/info", { withCredentials: true })
    .then(res => {
        console.log(res.data)
        localStorage.setItem( "cc_account_info", res.data.Data )
    })
    .catch(err => {
        console.error(err);
    })
}

function ClearAccountInfo() {
    localStorage.setItem("cc_account_info","")
}

function IsLogin() {
    return GetAtk() != "0"
}

function Logout() {
    theme.ReloadBgUrl()
    localStorage.clear()
    cke.delete('atk')
}

function LogoutIfSession() {
    var atk = cke.get("atk")
    if( atk != null ) {
        if ( atk.indexOf("$session$") != -1 ) {
            Logout()
        }
    }
}

export default {
    InitCookie,
    GenerateBasicIds,
    GetCid,
    GetAtk,
    IsLogin,
    Logout,
    RefreshAccountInfo,
    ForceRefreshAccountInfo,
    ClearAccountInfo,
    LogoutIfSession
}