/*
 * @Date: 2020-09-12 17:16:41
 * @LastEditors: cyf
 * @LastEditTime: 2020-09-12 17:19:41
 * @FilePath: \cyf-cloud.front\src\cc\v1x1\HttpErrReturn.js
 * @Description: What is mind? No matter. What is matter? Nevermind.
 */
function CheckErr( her ) {
    if ( her.ErrCod != "0" ) {
        console.error( her.Desc )
    }
}

export default {
    CheckErr
}