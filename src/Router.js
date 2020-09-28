/*
 * @Date: 2020-08-13 20:58:42
 * @LastEditors: cyf
 * @LastEditTime: 2020-09-28 17:38:50
 * @FilePath: \ccfront\src\Router.js
 * @Description: What is mind? No matter. What is matter? Nevermin
 */
import VueRouter from 'vue-router'
import Vue from "vue";

import ccHome from "./components/home/Home";

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

import ccPostEditor from './components/post/Editor.vue'
const routes = [
    { path: '/mc/skin', component: ccMcSkin },
    { path: '/home', component: ccHome },
    { path: '/mc', component: ccMcHome },
    { path: '/mc/map', component: ccMcWebmap },
    { path: '/mc/about', component: ccMcAbout },
    { path: '/music', component: ccMusic },
    { path: '/music/upload', component: ccMusicUpload },
    { path: '/donate', component: ccCyfDonate },
    { path: '/donate/rank', component: ccCyfDonateRank },
    { path: '/blog', component: ccCyfBlog },
    { path: '/vt', component: ccVt },
    { path: '/util/mcdrPlg', component: ccMcdrPlg },
    { path: '/info/about', component: ccCyfInfo },
    { path: '/account/signin', component: ccAccountSignin },
    { path: '/account/login', component: ccAccountLogin },
    { path: '/post/editor', component: ccPostEditor },
    { path: '*', redirect: '/home' }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

Vue.use(VueRouter)

export default router