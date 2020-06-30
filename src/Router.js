import VueRouter from 'vue-router'
import Vue from "vue";

const routes = [
    { path: '/mc/skin', component: resolve => require( ["./components/minecraft/Skin"], resolve ) },
    { path: '/home', component: resolve => require( [ "./components/home/Home"], resolve ) },
    { path: '/mc', component: resolve => require( ["./components/minecraft/Home"], resolve ) },
    { path: '/mc/map', component: resolve => require( ["./components/minecraft/Webmap"], resolve ) },
    { path: '/music', component: resolve => require( ["./components/music/Music"], resolve )},
    { path: '/music/upload', component: resolve => require( ["./components/music/Upload"], resolve ) },
    { path: '/donate', component: resolve => require( ["./components/cyf/Donate"], resolve ) },
    { path: '/blog', component: resolve => require( [ "./components/cyf/Blog"], resolve ) },
    { path: '*', redirect: '/home' }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

Vue.use(VueRouter)

export default router