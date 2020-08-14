import Vue from 'vue'
import { BootstrapVue, BootstrapVueIcons }from 'bootstrap-vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import  router from './Router'
import qs from 'qs'
import axios from 'axios'
import VueAxios from 'vue-axios'

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




