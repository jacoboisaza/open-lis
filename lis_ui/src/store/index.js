import Vue from "vue";
import Vuex from "vuex";
import * as user from "@/store/modules/user.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user
  },
  strict: process.env.NODE_ENV !== "production"
});
