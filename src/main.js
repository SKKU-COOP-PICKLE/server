import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import "@/fontAwesomeIcon.js";

// import axios from 'axios' //added
// import vuetify from './plugins/vuetify';
// Vue.prototype.$http = axios // added

Vue.config.productionTip = false

new Vue({
  router,
  // vuetify,
  render: h => h(App)
}).$mount('#app')
