/*
 * @Date: 2020-09-12 15:11:53
 * @LastEditors: cyf
 * @LastEditTime: 2020-11-29 16:19:03
 * @FilePath: \cyf-cloud.front\src\cc\markdown.js
 * @Description: What is mind? No matter. What is matter? Nevermind.
 */

var marked = require('marked');

/**
 * @name: SetMarkdownToDiv
 * @description: 将某个markdown url链接内容渲染为html并嵌入div
 * @test: NA
 * @param {
 * md_url：markdown的url链接，获取方式为get，如果为""，则直接将 md_data解析
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
    return md_data
}

function SetRawMarkdownToDiv( md_data, div_id ) {
    if ( md_data == "" ) {
        return
    }
    var md2html = marked(md_data)
    // console.log(md2html)
    document.getElementById(div_id).innerHTML = (md2html)
    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
    })
    // 通过读取cc-reader-index可以获得目录json
    localStorage.setItem("cc-reader-index", "[]")
    $(".c-cc-reader").find("h2,h3,h4,h5,h6").each(function(i,item){
        // 增加锚点位置
        $(item).attr("id","aaa"+i);
        var curI = JSON.parse( localStorage.getItem("cc-reader-index") )
        curI.push({
            "Name":"#aaa"+i,
            "Text":$(this).text(),
            "Class": "ml-"+ ( parseInt( $(item).prop('nodeName')[1] ) - 1 ).toString()
        })
        localStorage.setItem( "cc-reader-index", JSON.stringify(curI) )
        // $("#AnchorContent").append('<li><a href="#wow'+i+'">'+(i+1)+" · "+$(this).text()+'</a></li>');
    });
    $(".c-cc-reader").find("img").each(function(i,item){
        // 增加锚点位置
        $(item).attr("style","width: auto; height: auto; max-width: 100%; max-height: 100%");
        // $("#AnchorContent").append('<li><a href="#wow'+i+'">'+(i+1)+" · "+$(this).text()+'</a></li>');
    });
}


export default {
    SetMarkdownToDiv,
    SetRawMarkdownToDiv
};