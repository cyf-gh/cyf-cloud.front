/*
 * @Date: 2020-08-25 01:15:57
 * @LastEditors: cyf
 * @LastEditTime: 2020-10-23 15:24:48
 * @FilePath: \cyf-cloud.front\src\server.js
 * @Description: What is mind? No matter. What is matter? Nevermind.
 */
let apiServer;

/*
    所有的api请求都应该设置为：
    import apiSe from "../../server"

    apiSe + "/foo/foo2"
*/
// export default apiServer='http://192.168.0.210:2344';
export default apiServer=process.env.VUE_APP_BACKEND_SERVER_ADDR;

// export default apiServer='https://se.cyf-cloud.cn:2346';