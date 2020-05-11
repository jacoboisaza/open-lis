import Vue from "vue";
import axios from "axios";

var apiClient = axios.create({
  baseURL: Vue.prototype.$configs.lisAuthBaseUrl,
  withCredentials: false, // TODO: Implement JWT
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  login(user) {
    // TODO: Implement POST for the real LIS API
    return apiClient.get("users/" + user.id);
  }
};
