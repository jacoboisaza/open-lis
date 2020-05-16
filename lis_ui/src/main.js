import Vue from "vue";
import Lis from "./Lis.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";

// Set global config variables
Vue.config.productionTip = false;
Vue.prototype.$configs = {};
Vue.prototype.$configs.adminMail = "covidopenlis@gmail.com";

new Vue({
  router,
  store,
  vuetify,
  render: h => h(Lis)
}).$mount("#lis");
