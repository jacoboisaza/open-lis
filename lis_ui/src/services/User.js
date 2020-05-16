import axios from "axios";

var apiClient = axios.create({
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
    return apiClient.get("users/" + credentials.id);
  },
  logout(user) {
    return apiClient.get("users/" + user.id);
  }
};
