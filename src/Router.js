/*
 * @Date: 2020-08-13 20:58:42
 * @LastEditors: cyf
 * @LastEditTime: 2021-08-05 18:49:17
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

// import ccMusic from "./components/music/Music"
// import ccMusicUpload from "./components/music/Upload"

import ccAccountSignin from './components/account/Signin.vue'
import ccAccountLogin from  './components/account/Login.vue'
import ccAccountInfo from './components/account/Info.vue'
import ccAccountFav from './components/account/Fav.vue'
import ccAccountHome from './components/account/Home.vue'

import ccPostEditor from './components/post/Editor.vue'
import ccPostReader from './components/post/Reader.vue'

import ccPostBBS from './components/post/BBS.vue'
import ccPostHome from './components/post/Home.vue'

import ccPostUserHome from './components/post/UserHome.vue'

import ccSearch from './components/search/Search.vue'
import ccSearchPost from './components/search/Post.vue'
import ccSearchUser from './components/search/User.vue'


const routes = [
    { path: '/home', component: ccHome },
    
    { path: '/mc', component: ccMcHome },
    // { path: '/mc/map', component: ccMcWebmap },
    // { path: '/mc/skin', component: ccMcSkin },
    // { path: '/mc/about', component: ccMcAbout },
    
    // { path: '/music', component: ccMusic },
    // { path: '/music/upload', component: ccMusicUpload },
    { path: '/donate', component: ccCyfDonate },
    { path: '/donate/rank', component: ccCyfDonateRank },
    { path: '/blog', component: ccCyfBlog },
    
    { path: '/cloudApp/vt', component: () => import('./components/vt/VtHome') },
    { path: '/cloudApp/util/mcdrPlg', component: () =>import('./components/mcdrPlg/mcdrPlgHome') },

    { path: '/info/about', component: ccCyfInfo },
    { path: '/account/signin', component: ccAccountSignin },
    { path: '/account/login', component: ccAccountLogin },
    { path: '/account/info', component: ccAccountInfo },
    { path: '/account/fav',  component: ccAccountFav },
    { path: '/user/home',  component: ccAccountHome },
    { path: '/post/editor', component: ccPostEditor },
    { path: '/posts', component: ccPostBBS },
    { path: '/post/home', component: ccPostHome },
    { path: '/post/reader', component: ccPostReader },
    { path: '/user', component: ccPostUserHome },
    { path: '/home/nl', component: ccHomeNL },
    { path: '/search', component: ccSearch},
    { path: '/search/post', component: ccSearchPost},
    { path: '/search/user', component: ccSearchUser}, 

    // { path: '/dm1/home', component: () => import('./components/dm_1/Home.vue' ) },

    // { path: '/vp/home', component: () => import("./components/vp/home" )},
    // { path: '/vp/editor', component: () => import("./components/vp/editor" )},
    { path: '/info/api/ref', component: () => import("./components/v1x1/meta_ref.vue") },
    
    { path: '*', redirect: '/home' },
]

const router = new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior: (to, from, savedPosition) => {
        if (to.hash) {
            console.log(to)
            return {selector: to.hash} 
        } else {
            return { x: 0, y: 0 }
        }
    }
})

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch( error=> error)
}
Vue.use(VueRouter)

export default router