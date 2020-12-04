/*
 * @Date: 2020-12-04 14:41:42
 * @LastEditors: cyf
 * @LastEditTime: 2020-12-04 20:24:59
 * @FilePath: \cyf-cloud.front\src\cc\SearchHistory.js
 * @Description: What is mind? No matter. What is matter? Nevermind.
 */

function AddSearchHistory( text ) {
    text.replace(",","")
    if (text == null || text == "") {
        return;
    }
    var searchHistoryStr = localStorage.getItem("cc-search-history");
    localStorage.setItem("cc-search-history",  searchHistoryStr == null || searchHistoryStr == "" ? text : searchHistoryStr + "," + text)
}

function GetSearchHistoryList() {
    var searchHistoryStr = localStorage.getItem("cc-search-history");
    return searchHistoryStr == null || searchHistoryStr == "" ? [] : searchHistoryStr.split(",")
}

function ClearSearchHistory() {
    localStorage.setItem("cc-search-history", "" );
}

export default {
    AddSearchHistory,
    GetSearchHistoryList,
    ClearSearchHistory
}