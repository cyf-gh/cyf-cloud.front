/*
 * @Date: 2020-08-13 20:58:42
 * @LastEditors: cyf
 * @LastEditTime: 2020-09-12 15:08:57
 * @FilePath: \cyf-cloud.front\src\Router.js
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
    { path: '/my/info', component: ccCyfInfo },
    { path: '*', redirect: '/home' }
]

const router = new VueRouter({
    mode: 'hash',
    routes
})

Vue.use(VueRouter)

export default router