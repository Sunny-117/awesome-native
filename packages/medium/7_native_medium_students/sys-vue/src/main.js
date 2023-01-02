import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import API from './api'
import cookie from './tools/cookie'
import toast from './components/toast'

Vue.prototype.Cookie = cookie
Vue.prototype.$api = API
Vue.prototype.$toast = toast

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
