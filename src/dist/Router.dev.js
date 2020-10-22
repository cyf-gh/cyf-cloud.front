"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _vue = _interopRequireDefault(require("vue"));

var _Home = _interopRequireDefault(require("./components/home/Home"));

var _Webmap = _interopRequireDefault(require("./components/minecraft/Webmap"));

var _Home2 = _interopRequireDefault(require("./components/minecraft/Home"));

var _Skin = _interopRequireDefault(require("./components/minecraft/Skin"));

var _About = _interopRequireDefault(require("./components/minecraft/About"));

var _Blog = _interopRequireDefault(require("./components/cyf/Blog"));

var _Donate = _interopRequireDefault(require("./components/cyf/Donate"));

var _DonateRank = _interopRequireDefault(require("./components/cyf/DonateRank"));

var _My = _interopRequireDefault(require("./components/cyf/My.vue"));

var _Music = _interopRequireDefault(require("./components/music/Music"));

var _Upload = _interopRequireDefault(require("./components/music/Upload"));

var _VtHome = _interopRequireDefault(require("./components/vt/VtHome"));

var _mcdrPlgHome = _interopRequireDefault(require("./components/mcdrPlg/mcdrPlgHome"));

var _Signin = _interopRequireDefault(require("./components/account/Signin.vue"));

var _Login = _interopRequireDefault(require("./components/account/Login.vue"));

var _Info = _interopRequireDefault(require("./components/account/Info.vue"));

var _Fav = _interopRequireDefault(require("./components/account/Fav.vue"));

var _Editor = _interopRequireDefault(require("./components/post/Editor.vue"));

var _Reader = _interopRequireDefault(require("./components/post/Reader.vue"));

var _BBS = _interopRequireDefault(require("./components/post/BBS.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
 * @Date: 2020-08-13 20:58:42
 * @LastEditors: cyf
 * @LastEditTime: 2020-10-22 17:18:42
 * @FilePath: \cyf-cloud.front\src\Router.js
 * @Description: What is mind? No matter. What is matter? Nevermin
 */
var routes = [{
  path: '/home',
  component: _Home["default"]
}, {
  path: '/mc',
  component: _Home2["default"]
}, {
  path: '/mc/map',
  component: _Webmap["default"]
}, {
  path: '/mc/skin',
  component: _Skin["default"]
}, {
  path: '/mc/about',
  component: _About["default"]
}, {
  path: '/music',
  component: _Music["default"]
}, {
  path: '/music/upload',
  component: _Upload["default"]
}, {
  path: '/donate',
  component: _Donate["default"]
}, {
  path: '/donate/rank',
  component: _DonateRank["default"]
}, {
  path: '/blog',
  component: _Blog["default"]
}, {
  path: '/vt',
  component: _VtHome["default"]
}, {
  path: '/util/mcdrPlg',
  component: _mcdrPlgHome["default"]
}, {
  path: '/info/about',
  component: _My["default"]
}, {
  path: '/account/signin',
  component: _Signin["default"]
}, {
  path: '/account/login',
  component: _Login["default"]
}, {
  path: '/account/info',
  component: _Info["default"]
}, {
  path: '/account/fav',
  component: _Fav["default"]
}, {
  path: '/post/editor',
  component: _Editor["default"]
}, {
  path: '/post/bbs',
  component: _BBS["default"]
}, {
  path: '/post/reader',
  component: _Reader["default"]
}, {
  path: '*',
  redirect: '/home'
}];
var router = new _vueRouter["default"]({
  mode: 'history',
  routes: routes
});

_vue["default"].use(_vueRouter["default"]);

var _default = router;
exports["default"] = _default;