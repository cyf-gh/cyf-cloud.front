/*
 * @Date: 2020-06-29 10:44:45
 * @LastEditors: cyf
 * @LastEditTime: 2020-09-12 15:03:51
 * @FilePath: \cyf-cloud.front\src\main.js
 * @Description: What is mind? No matter. What is matter? Nevermind.
 */
import Vue from 'vue'
import { BootstrapVue, BootstrapVueIcons }from 'bootstrap-vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import  router from './Router'
import qs from 'qs'
import axios from 'axios'
import VueAxios from 'vue-axios'

// import VueMarkdown from 'vue-simple-markdown'
/*
Vue.prototype.$axios = axios
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.baseURL = 'https://se.cyf-cloud.cn:2344/v1';
*/
Vue.use(VueAxios,axios)
Vue.use(qs)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App),
})




