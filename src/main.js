import Vue from 'vue'
import { BootstrapVue, BootstrapVueIcons}from 'bootstrap-vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import  router from './Router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs'

Vue.prototype.axios = axios
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

Vue.use(qs)
Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App),
})




