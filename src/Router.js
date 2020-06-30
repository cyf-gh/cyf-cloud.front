import VueRouter from 'vue-router'
import Vue from "vue";

const routes = [
    { path: '/mc/skin', component: () => import( "./components/minecraft/Skin") },
    { path: '/home', component: () => import( "./components/home/Home" ) },
    { path: '/mc', component: () => import("./components/minecraft/Home") },
    { path: '/mc/map', component: () => import("./components/minecraft/Webmap") },
    { path: '/music', component: () => import("./components/music/Music")},
    { path: '/music/upload', component: () => import("./components/music/Upload") },
    { path: '/donate', component: () => import("./components/cyf/Donate") },
    { path: '/blog', component: () => import( "./components/cyf/Blog") },
    { path: '*', redirect: '/home' }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

Vue.use(VueRouter)

export default router