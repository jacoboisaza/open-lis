import Vue from "vue";
import Lis from "./Lis.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";

Vue.config.productionTip = false;

// Set global config variables
Vue.prototype.$configs = {};
Vue.prototype.$configs.adminMail = "covidopenlis@gmail.com";
if (process.env.NODE_ENV === "production") {
  Vue.prototype.$configs.lisAuthBaseUrl = "http://localhost:3000/";
} else {
  Vue.prototype.$configs.lisAuthBaseUrl = "http://localhost:3000/";
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(Lis)
}).$mount("#lis");
