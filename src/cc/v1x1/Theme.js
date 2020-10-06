/*
 * @Date: 2020-10-06 17:06:01
 * @LastEditors: cyf
 * @LastEditTime: 2020-10-06 17:34:07
 * @FilePath: \cyf-cloud.front\src\cc\v1x1\Theme.js
 * @Description: What is mind? No matter. What is matter? Nevermind.
 */
function ChangeBgUrl( bgurl ) {
    document.body.style.backgroundImage = "url('"+bgurl+"')";
    console.log(document.body.style)
}

function ReloadBgUrl( ){
    try {
        ChangeBgUrl( localStorage.getItem('bgurl') )
    } catch {
        localStorage.setItem('bgurl', '#')
    }
}

export default {
    ChangeBgUrl,
    ReloadBgUrl
}