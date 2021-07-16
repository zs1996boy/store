import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import '@/assets/minireset.css'
import '@/assets/animate4.1.min.css'
import '@/assets/font-awesome-4.7.0/css/font-awesome.min.css'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
