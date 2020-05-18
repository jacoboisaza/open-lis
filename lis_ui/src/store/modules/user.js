import userApi from "@/services/User.js";
import axios from "axios";

export const namespaced = true;
export const state = {
  user: null
};
export const mutations = {
  SET_USER(userState, userInfo) {
    localStorage.setItem("user", JSON.stringify(userInfo));
  },
  LOAD_USER(userState) {
    userState.user = JSON.parse(localStorage.getItem("user"));
    if (!!userState.user) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userState.user.token}`;
    }
  },
  CLEAR_USER(userState) {
    localStorage.removeItem("user");
    userState.user = null;
  }
};
export const actions = {
  loadUser(userStore) {
    userStore.commit("LOAD_USER");
  },
  login(userStore, credentials) {
    return userApi.login(credentials).then(response => {
      const user = response.data[0] || response.data;
      userStore.commit("SET_USER", user);
      userStore.commit("LOAD_USER");
    });
  },
  logout(userStore) {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (!!localUser || userStore.state.user) {
      userApi.logout(userStore.state.user);
    }
    userStore.commit("CLEAR_USER");
  }
};
export const getters = {
  loggedIn(userState, getters) {
    return !!userState.user && !!userState.user.roles;
  }
};
