import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  withCredentials: false, // TODO: Implement JWT
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  // TODO: Implement POST for the real LIS APIs
  login(credentials) {
    return apiClient.get("/users?app_id=" + credentials.id);
  },
  logout(user) {
    return apiClient.get("/users/" + user.id);
  },
  edit(user) {
    return apiClient.put("/users/" + user.id, user);
  },
  add(user) {
    user.created = new Date().toISOString();
    return apiClient.post("/users", user);
  },
  delete(user) {
    return apiClient.delete("/users/" + user.id);
  },
  all(filter) {
    var query = "";
    debugger;
    if (filter) {
      const filterName = Object.keys(filter)[0],
        filterKey = filter[filterName];
      query = "?" + filterName + "_like=" + filterKey;
    }
    return apiClient.get("/users" + query);
  }
};
