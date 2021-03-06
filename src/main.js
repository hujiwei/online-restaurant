// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from 'axios'
import App from './App'
import router from './router'
import './assets/scss/common.scss'
import {$$, url, app_id} from './assets/js/common.js';

Vue.use(MintUI)
Vue.prototype.$http = axios
Vue.prototype.$appId = app_id
Vue.prototype.$ajaxurl = url
Vue.prototype.$mobile = $$
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
