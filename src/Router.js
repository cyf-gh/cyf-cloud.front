/*
 * @Date: 2020-08-13 20:58:42
 * @LastEditors: cyf
 * @LastEditTime: 2020-11-10 21:06:47
 * @FilePath: \cyf-cloud.front\src\Router.js
 * @Description: What is mind? No matter. What is matter? Nevermin
 */
import VueRouter from 'vue-router'
import Vue from "vue";

import ccHome from "./components/home/Home";
import ccHomeNL from "./components/home/HomeNoLogin";

import ccMcWebmap from "./components/minecraft/Webmap"
import ccMcHome from "./components/minecraft/Home"
import ccMcSkin from "./components/minecraft/Skin"
import ccMcAbout from "./components/minecraft/About"

import ccCyfBlog from "./components/cyf/Blog"
import ccCyfDonate from "./components/cyf/Donate"
import ccCyfDonateRank from "./components/cyf/DonateRank"
import ccCyfInfo from "./components/cyf/My.vue"

import ccMusic from "./components/music/Music"
import ccMusicUpload from "./components/music/Upload"

import ccVt from "./components/vt/VtHome"

import ccMcdrPlg from "./components/mcdrPlg/mcdrPlgHome"

import ccAccountSignin from './components/account/Signin.vue'
import ccAccountLogin from  './components/account/Login.vue'
import ccAccountInfo from './components/account/Info.vue'
import ccAccountFav from './components/account/Fav.vue'

import ccPostEditor from './components/post/Editor.vue'
import ccPostReader from './components/post/Reader.vue'

import ccPostBBS from './components/post/BBS.vue'

import ccPostUserHome from './components/post/UserHome.vue'

const routes = [
    { path: '/home', component: ccHome },
    { path: '/mc', component: ccMcHome },
    { path: '/mc/map', component: ccMcWebmap },
    { path: '/mc/skin', component: ccMcSkin },
    { path: '/mc/about', component: ccMcAbout },
    { path: '/music', component: ccMusic },
    { path: '/music/upload', component: ccMusicUpload },
    { path: '/donate', component: ccCyfDonate },
    { path: '/donate/rank', component: ccCyfDonateRank },
    { path: '/blog', component: ccCyfBlog },
    { path: '/cloudApp/vt', component: ccVt },
    { path: '/cloudApp/util/mcdrPlg', component: ccMcdrPlg },
    { path: '/info/about', component: ccCyfInfo },
    { path: '/account/signin', component: ccAccountSignin },
    { path: '/account/login', component: ccAccountLogin },
    { path: '/account/info', component: ccAccountInfo },
    { path: '/account/fav',  component: ccAccountFav },
    { path: '/post/editor', component: ccPostEditor },
    { path: '/post/bbs', component: ccPostBBS },
    { path: '/post/reader', component: ccPostReader },
    { path: '/user', component: ccPostUserHome },
    { path: '/home/nl', component: ccHomeNL },
    // { path: '*', redirect: '/home' }
]

const router = new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior: (to, from, savedPosition) => {
        if (to.hash) {
            return {selector: to.hash}
        } else {
            return { x: 0, y: 0 }
        }
    }
})

Vue.use(VueRouter)

export default router