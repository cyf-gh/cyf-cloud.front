"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _vue = _interopRequireDefault(require("vue"));

var _Home = _interopRequireDefault(require("./components/home/Home"));

var _HomeNoLogin = _interopRequireDefault(require("./components/home/HomeNoLogin"));

var _Webmap = _interopRequireDefault(require("./components/minecraft/Webmap"));

var _Home2 = _interopRequireDefault(require("./components/minecraft/Home"));

var _Skin = _interopRequireDefault(require("./components/minecraft/Skin"));

var _About = _interopRequireDefault(require("./components/minecraft/About"));

var _Blog = _interopRequireDefault(require("./components/cyf/Blog"));

var _Donate = _interopRequireDefault(require("./components/cyf/Donate"));

var _DonateRank = _interopRequireDefault(require("./components/cyf/DonateRank"));

var _My = _interopRequireDefault(require("./components/cyf/My.vue"));

var _Signin = _interopRequireDefault(require("./components/account/Signin.vue"));

var _Login = _interopRequireDefault(require("./components/account/Login.vue"));

var _Info = _interopRequireDefault(require("./components/account/Info.vue"));

var _Fav = _interopRequireDefault(require("./components/account/Fav.vue"));

var _Home3 = _interopRequireDefault(require("./components/account/Home.vue"));

var _Editor = _interopRequireDefault(require("./components/post/Editor.vue"));

var _Reader = _interopRequireDefault(require("./components/post/Reader.vue"));

var _BBS = _interopRequireDefault(require("./components/post/BBS.vue"));

var _Home4 = _interopRequireDefault(require("./components/post/Home.vue"));

var _UserHome = _interopRequireDefault(require("./components/post/UserHome.vue"));

var _Search = _interopRequireDefault(require("./components/search/Search.vue"));

var _Post = _interopRequireDefault(require("./components/search/Post.vue"));

var _User = _interopRequireDefault(require("./components/search/User.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
}, // { path: '/music', component: ccMusic },
// { path: '/music/upload', component: ccMusicUpload },
{
  path: '/donate',
  component: _Donate["default"]
}, {
  path: '/donate/rank',
  component: _DonateRank["default"]
}, {
  path: '/blog',
  component: _Blog["default"]
}, {
  path: '/cloudApp/vt',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('./components/vt/VtHome'));
    });
  }
}, {
  path: '/cloudApp/util/mcdrPlg',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('./components/mcdrPlg/mcdrPlgHome'));
    });
  }
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
  path: '/user/home',
  component: _Home3["default"]
}, {
  path: '/post/editor',
  component: _Editor["default"]
}, {
  path: '/posts',
  component: _BBS["default"]
}, {
  path: '/post/home',
  component: _Home4["default"]
}, {
  path: '/post/reader',
  component: _Reader["default"]
}, {
  path: '/user',
  component: _UserHome["default"]
}, {
  path: '/home/nl',
  component: _HomeNoLogin["default"]
}, {
  path: '/search',
  component: _Search["default"]
}, {
  path: '/search/post',
  component: _Post["default"]
}, {
  path: '/search/user',
  component: _User["default"]
}, {
  path: '/dm1/home',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('./components/dm_1/Home.vue'));
    });
  }
}, {
  path: '/vp/home',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("./components/vp/home"));
    });
  }
}, {
  path: '/vp/editor',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("./components/vp/editor"));
    });
  }
}, {
  path: '/info/api/ref',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("./components/v1x1/meta_ref.vue"));
    });
  }
}, {
  path: '*',
  redirect: '/home'
}];
var router = new _vueRouter["default"]({
  routes: routes,
  mode: 'history',
  scrollBehavior: function scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      console.log(to);
      return {
        selector: to.hash
      };
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  }
});
var originalPush = _vueRouter["default"].prototype.push;

_vueRouter["default"].prototype.push = function push(location) {
  return originalPush.call(this, location); //.catch(err => err)
};

_vue["default"].use(_vueRouter["default"]);

var _default = router;
exports["default"] = _default;