/*
 * @Date: 2020-06-29 10:44:45
 * @LastEditors: cyf
 * @LastEditTime: 2021-04-17 16:07:00
 * @FilePath: \cyf-cloud.front\src\main.js
 * @Description: What is mind? No matter. What is matter? Nevermind.
 */
import Vue from 'vue'
import { BootstrapVue }from 'bootstrap-vue'
import App from './App.vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './Router'
import qs from 'qs'
import axios from 'axios'
import VueAxios from 'vue-axios'
import cookie from 'vue-cookie'
import VueMeta from 'vue-meta'
/*
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'https://se.cyf-cloud.cn:2344/v1';
*/
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// CDN
// Vue.use(window['vue-cropper'])

Vue.use(VueMeta)
Vue.use(VueAxios,axios)
// Vue.use(VueCropper)
Vue.use(qs)
Vue.use(BootstrapVue)
// Vue.use(BootstrapVueIcons)
Vue.config.productionTip = false
Vue.prototype.$cookie = cookie;

new Vue({
  el: '#app',
  router,
  render: h => h(App),
})