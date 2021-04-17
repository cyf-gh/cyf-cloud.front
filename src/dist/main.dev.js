"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _bootstrapVue = require("bootstrap-vue");

var _App = _interopRequireDefault(require("./App.vue"));

var _Router = _interopRequireDefault(require("./Router"));

var _qs = _interopRequireDefault(require("qs"));

var _axios = _interopRequireDefault(require("axios"));

var _vueAxios = _interopRequireDefault(require("vue-axios"));

var _vueCookie = _interopRequireDefault(require("vue-cookie"));

var _vueMeta = _interopRequireDefault(require("vue-meta"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
 * @Date: 2020-06-29 10:44:45
 * @LastEditors: cyf
 * @LastEditTime: 2021-04-17 15:57:28
 * @FilePath: \cyf-cloud.front\src\main.js
 * @Description: What is mind? No matter. What is matter? Nevermind.
 */
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

/*
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'https://se.cyf-cloud.cn:2344/v1';
*/
_axios["default"].defaults.headers.common['Access-Control-Allow-Origin'] = '*'; // CDN
// Vue.use(window['vue-cropper'])

_vue["default"].use(_vueMeta["default"]);

_vue["default"].use(_vueAxios["default"], _axios["default"]); // Vue.use(VueCropper)


_vue["default"].use(_qs["default"]);

_vue["default"].use(_bootstrapVue.BootstrapVue);

_vue["default"].use(_bootstrapVue.BootstrapVueIcons);

_vue["default"].config.productionTip = false;
_vue["default"].prototype.$cookie = _vueCookie["default"];
new _vue["default"]({
  el: '#app',
  router: _Router["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
});
var routerPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location)["catch"](function (error) {
    return error;
  });
};

_vue["default"].use(VueRouter);