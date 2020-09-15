/*
 * @Date: 2020-09-15 15:22:15
 * @LastEditors: cyf
 * @LastEditTime: 2020-09-15 15:35:43
 * @FilePath: \cyf-cloud.front\src\cc\v1x1\User.js
 * @Description: What is mind? No matter. What is matter? Nevermind.
 */

var userApiUrl = /*TODO:添加服务器地址*/ "/v1x1/user/"

// 所有的用户信息获取为url为 /v1x1/user/foo的带cookie形式的get请求
function GetUserFoo( foo, axios ) {
    axios.get( userApiUrl + foo,{withCredentials:true} )
    .then(res => {
        if( res.data.ErrCod == "0" ) {
            return res.data.Data
        } else {
            console.error( res.data.Desc )
        }
    })
    .catch(err => {
        console.error(err);
    })
}

function GetUserInfo( axios ) {
    return GetUserFoo( userApiUrl + "info", axios )
}

function GetUserAvatar( axios ) {
    return GetUserFoo( userApiUrl + "avatar", axios )
}

export default {
    GetUserAvatar,
    GetUserInfo
}