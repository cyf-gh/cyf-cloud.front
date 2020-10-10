/*
 * @Date: 2020-10-06 17:06:01
 * @LastEditors: cyf
 * @LastEditTime: 2020-10-11 02:14:40
 * @FilePath: \cyf-cloud.front\src\cc\v1x1\Theme.js
 * @Description: What is mind? No matter. What is matter? Nevermind.
 */

const bgurl = "cc-bgurl"

function ChangeBgUrl( bgurl ) {
    document.body.style.backgroundImage = "url('"+bgurl+"')";
    console.log(document.body.style)
}

function ReloadBgUrl( ){
    try {
        ChangeBgUrl( localStorage.getItem(bgurl) )
    } catch {
        localStorage.setItem(bgurl, '#')
    }
}

function SetBgUrl(url) {
    localStorage.setItem(bgurl,url)
}

export default {
    ChangeBgUrl,
    ReloadBgUrl,
    SetBgUrl
}