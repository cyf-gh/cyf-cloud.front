"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _random = _interopRequireDefault(require("../random"));

var _server = _interopRequireDefault(require("../../server"));

var _Theme = _interopRequireDefault(require("./Theme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
 * @Date: 2020-09-13 15:49:07
 * @LastEditors: cyf
 * @LastEditTime: 2021-08-09 20:27:13
 * @FilePath: \cyf-cloud.front\src\cc\v1x1\Identity.js
 * @Description: What is mind? No matter. What is matter? Nevermind.
 */
var cke;

function InitCookie(cookie) {
  cke = cookie;
}

function GenerateBasicIds() {
  // 创建cid
  if (cke.get("cid") == null) {
    cke.set("cid", _random["default"].CreateUuid(), 30);
    console.log("set cid");
  }
}

function SetAtk(atk) {
  // 创建cid
  cke.set("atk", atk, 30);
  console.log("set atk");
}

function GetCid() {
  GenerateBasicIds();

  try {
    return cke.get("cid") != null ? cke.get("cid") : "0";
  } catch (error) {
    console.error(error);
    return "0";
  }
}

function GetAtk() {
  try {
    return cke.get("atk") != null ? cke.get("atk") : "0";
  } catch (error) {
    console.error(error);
    return "0";
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


function RefreshAccountInfo(axios) {
  var infoData = localStorage.getItem("cc_account_info");

  if (infoData == "" || infoData == null) {
    ForceRefreshAccountInfo(axios);
  }
}

function ForceRefreshAccountInfo(axios) {
  axios.get(_server["default"] + "/v1x1/account/private/info", {
    withCredentials: true
  }).then(function (res) {
    console.log(res.data);
    localStorage.setItem("cc_account_info", res.data.Data);
  })["catch"](function (err) {
    console.error(err);
  });
}

function ClearAccountInfo() {
  localStorage.setItem("cc_account_info", "");
}

function IsLogin() {
  return GetAtk() != "0";
}

function Logout() {
  localStorage.clear();
  cke["delete"]('atk');

  _Theme["default"].ReloadBgUrl();
}

function LogoutIfSession() {
  var atk = cke.get("atk");

  if (atk != null) {
    if (atk.indexOf("$session$") != -1) {
      Logout();
    }
  }
}

var _default = {
  InitCookie: InitCookie,
  GenerateBasicIds: GenerateBasicIds,
  GetCid: GetCid,
  GetAtk: GetAtk,
  IsLogin: IsLogin,
  Logout: Logout,
  RefreshAccountInfo: RefreshAccountInfo,
  ForceRefreshAccountInfo: ForceRefreshAccountInfo,
  ClearAccountInfo: ClearAccountInfo,
  LogoutIfSession: LogoutIfSession,
  SetAtk: SetAtk
};
exports["default"] = _default;