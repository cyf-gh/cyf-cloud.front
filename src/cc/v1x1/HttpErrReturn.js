/*
 * @Date: 2020-09-12 17:16:41
 * @LastEditors: cyf
 * @LastEditTime: 2020-10-07 19:26:23
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

export default {
    Check
}