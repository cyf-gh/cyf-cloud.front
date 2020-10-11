/*
 * @Date: 2020-10-11 00:36:00
 * @LastEditors: cyf
 * @LastEditTime: 2020-10-11 21:22:32
 * @FilePath: \cyf-cloud.front\src\components\post\Draft.js
 * @Description: What is mind? No matter. What is matter? Nevermind.
 */

const draftHeader = "cc_post_draft?"

import vld from "../../cc/validate";

function SaveDraft( post ) {
    localStorage.setItem( draftHeader + post.Title, JSON.stringify( post ) )
}

function GetDraftByTitle( title ) {
    return JSON.parse( localStorage.getItem( draftHeader + title ) )
}

function GetAllDrafts() {
    var storage = window.localStorage
    var drafts = []
    for (var i=0, len = storage.length; i < len; i++) {
        var key = storage.key(i);
        var value = storage.getItem(key);
        if ( vld.ValidateStr( "cc_post_draft\\?"+"*", key ) ) {
            drafts.push(
                JSON.parse( value )
            )
        }
    }
    return drafts
}

function DeleteDraftByTitle( title ) {
    localStorage.removeItem( draftHeader + title )
}

export default {
    SaveDraft,
    GetAllDrafts,
    GetDraftByTitle,
    DeleteDraftByTitle
}