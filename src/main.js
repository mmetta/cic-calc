import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { store } from './store'
import firebase from './firebase'
import vuetify from './plugins/vuetify'

Vue.use(firebase)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  created() {
    this.$store.dispatch('loadVersion')
  },
  render: h => h(App)
}).$mount('#app')
