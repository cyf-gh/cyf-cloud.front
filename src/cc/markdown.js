/*
 * @Date: 2020-09-12 15:11:53
 * @LastEditors: cyf
 * @LastEditTime: 2020-09-12 18:31:33
 * @FilePath: \cyf-cloud.front\src\cc\markdown.js
 * @Description: What is mind? No matter. What is matter? Nevermind.
 */

var marked = require('marked');

/**
 * @name: SetMarkdownToDiv
 * @description: 将某个markdown url链接内容渲染为html并嵌入div
 * @test: NA
 * @param {
 * md_url：markdown的url链接，获取方式为get
 * md_data：markdown数据（非html）
 * div_id：要渲染的div的id
 * axios：axios实例（this.axios）
 * is_cc_server：是否为cc服务器上的资源，如果为是，则md_url可直接填写文件名
 * } 
 * @note: 异常不抛出，输出至控制台
 */
async function SetMarkdownToDiv( md_url, md_data, div_id, axios, is_cc_server = false) {
    if ( is_cc_server ) {
        md_url = "https://se.cyf-cloud.cn:2346/v1x1/raw?d=" + md_url
    }
    await new Promise(() => {
        axios.get( md_url )
        .then(res => {
            md_data = is_cc_server ? res.data.Data : res.data
            document.getElementById(div_id).innerHTML = (marked(md_data))
        })
        .catch(err => {
            console.error(err);
        })
        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false
        });
    })
    return md_data
}

export default {
    SetMarkdownToDiv
};