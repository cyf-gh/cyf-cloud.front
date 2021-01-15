/*
 * @Date: 2020-08-25 01:15:57
 * @LastEditors: cyf
 * @LastEditTime: 2021-01-15 14:08:13
 * @FilePath: \cyf-cloud.front\src\server.js
 * @Description: What is mind? No matter. What is matter? Nevermind.
 */
let apiServer;

/*
    所有的api请求都应该设置为：
    import apiSe from "../../server"

    apiSe + "/foo/foo2"
*/
export default apiServer= process.env.VUE_APP_BACKEND_SERVER_HTTP_TYPE + process.env.VUE_APP_BACKEND_SERVER_ADDR;