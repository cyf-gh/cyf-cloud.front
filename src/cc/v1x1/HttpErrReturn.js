/*
 * @Date: 2020-09-12 17:16:41
 * @LastEditors: cyf
 * @LastEditTime: 2021-01-10 14:46:58
 * @FilePath: \cyf-cloud.front\src\cc\v1x1\HttpErrReturn.js
 * @Description: What is mind? No matter. What is matter? Nevermind.
 */

// true for ok
function Check( her ) {
    if ( her.ErrCod != "0" ) {
        console.error( her.Desc )
        return false
    }
    return true
}

function IsOk( res_data ) {
    return Check( res_data )
}

export default {
    Check, IsOk
}