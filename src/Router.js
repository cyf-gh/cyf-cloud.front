/*
 * @Date: 2020-08-13 20:58:42
 * @LastEditors: cyf
 * @LastEditTime: 2021-08-05 18:49:17
 * @FilePath: \cyf-cloud.front\src\Router.js
 * @Description: What is mind? No matter. What is matter? Nevermin
 */
import VueRouter from 'vue-router'

import ccHome from "./components/home/Home";
import ccHomeNL from "./components/home/HomeNoLogin";

import ccAccountSignin from './components/account/Signin.vue'
import ccAccountLogin from  './components/account/Login.vue'
import ccAccountInfo from './components/account/Info.vue'
import ccAccountFav from './components/account/Fav.vue'
import ccAccountHome from './components/account/Home.vue'

import ccPosts from './components/post/BBS.vue'
import ccPostReader from './components/post/Reader.vue'
import ccPostHome from './components/post/Home.vue'

import ccSearch from './components/search/Search.vue'
import ccSearchPost from './components/search/Post.vue'
import ccSearchUser from './components/search/User.vue'


const routes = [
    { path: '/home', component: ccHome },
    
    { path: '/donate', component: () => import("./components/cyf/Donate") },
    { path: '/donate/rank', component: () => import('./components/cyf/DonateRank') },
    { path: '/blog', component: () => import('./components/cyf/Blog') },
    
    { path: '/cloudApp/vt', component: () => import('./components/vt/VtHome') },
    { path: '/cloudApp/util/mcdrPlg', component: () =>import('./components/mcdrPlg/mcdrPlgHome') },

    { path: '/info/about', component: () => import('./components/cyf/My.vue') },
    { path: '/account/signin', component: ccAccountSignin },
    { path: '/account/login', component: ccAccountLogin },
    { path: '/account/info', component: ccAccountInfo },
    { path: '/account/fav',  component: ccAccountFav },
    { path: '/user/home',  component: ccAccountHome },
    { path: '/posts', component: ccPosts },
    { path: '/post/editor', component: () => import('./components/post/Editor.vue') },
    { path: '/post/home', component: ccPostHome },
    { path: '/post/reader', component: ccPostReader },
    { path: '/user', component: () => import('./components/post/Editor.vue') },
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
// Vue.use(VueRouter)

export default router