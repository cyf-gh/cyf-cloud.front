import VueRouter from 'vue-router'
import ccHome from "./components/home/Home";

import ccMcWebmap from "./components/minecraft/Webmap"
import ccMcHome from "./components/minecraft/Home"
import ccMcSkin from "./components/minecraft/Skin"

import ccCyfBlog from "./components/cyf/Blog"
import ccCyfDonate from "./components/cyf/Donate"

import ccMusic from "./components/music/Music"
import ccMusicUpload from "./components/music/Upload"

import Vue from "vue";


const routes = [
    { path: '/mc/skin', component: ccMcSkin },
    { path: '/home', component: ccHome },
    { path: '/mc', component: ccMcHome },
    { path: '/mc/map', component: ccMcWebmap },
    { path: '/music', component: ccMusic },
    { path: '/music/upload', component: ccMusicUpload },
    { path: '/donate', component: ccCyfDonate },
    { path: '/blog', component: ccCyfBlog },
    { path: '*', redirect: '/home' }
]

const router = new VueRouter({
    mode: 'hash',
    routes
})

Vue.use(VueRouter)

export default router