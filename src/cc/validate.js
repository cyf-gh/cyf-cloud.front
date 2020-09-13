/*
 * @Date: 2020-09-13 13:47:21
 * @LastEditors: cyf
 * @LastEditTime: 2020-09-13 14:02:48
 * @FilePath: \cyf-cloud.front\src\cc\validate.js
 * @Description: What is mind? No matter. What is matter? Nevermind.
 */

function ValidateStr( regex, test_str ) {
    var reg = new RegExp( regex );
    var val = reg.test( test_str );
    return val
}

export default {
    ValidateStr
}