<template>
  <v-container v-if="user">
    <v-row>
      <v-col class="text-center">
        <v-card class="pa-4 mx-auto mt-12" max-width="400">
          <v-card-text class="title">
            You are already logged in.
          </v-card-text>
          <v-card-actions>
            <v-btn :to="{ name: homeRoute.name }" text color="success">
              Go home?
              <v-icon>{{ homeRoute.meta.icon }}</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn :to="{ name: 'logout' }" text color="primary">
              Log Out?
              <v-icon>{{ logOutRoute.meta.icon }}</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else>
    <!-- Avatar -->
    <v-row>
      <v-col>
        <v-img
          :src="require('../assets/logo.png')"
          max-width="300px"
          alt="avatar"
          class="d-block mx-auto"
        >
        </v-img>
      </v-col>
    </v-row>
    <!-- Login form -->
    <v-row>
      <v-col>
        <v-card width="400px" class="pa-3 mx-auto mt-5">
          <v-form ref="loginForm" lazy-validation @submit.prevent="tryLogin">
            <v-card-text>
              <v-text-field
                v-model.trim="credentials.id"
                autofocus
                label="User"
                required
                :rules="[formRules.required]"
                :prepend-icon="
                  credentials.type === 'lab' ? 'mdi-test-tube' : 'mdi-doctor'
                "
              />
              <v-text-field
                v-model="credentials.password"
                label="Password"
                :type="showPassword ? 'text' : 'password'"
                :rules="[formRules.required]"
                required
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
              />
              <v-radio-group v-model="credentials.type" :mandatory="false">
                <v-radio label="Im a Client" value="client"></v-radio>
                <v-radio label="Im a Lab Tech" value="lab"></v-radio>
              </v-radio-group>
            </v-card-text>
            <v-card-actions>
              <v-btn block type="submit" color="info"
                >LOG IN
                <v-icon dark right>{{
                  credentials.type === "lab" ? "mdi-test-tube" : "mdi-doctor"
                }}</v-icon>
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
        <!-- Help -->
        <span v-if="help" class="error--text text-center d-block body-2 mt-5">
          Get help at
          <v-icon>mdi-email</v-icon>
          <a :href="'mailto:' + this.$configs.adminMail" target="_blank">
            {{ this.$configs.adminMail }}
          </a>
        </span>
      </v-col>
    </v-row>

    <v-snackbar v-model="loginFailed">
      Sorry, account not found.
      <v-btn text class="display-1" @click="loginFailed = false">🧐</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import UserApi from "@/services/User.js";
import { mapState } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      credentials: {
        id: "",
        password: "",
        type: "client"
      },
      showPassword: false,
      loginFailed: false,
      help: false,
      errorText: "",
      formRules: {
        required(value) {
          return !!value || "Required Field";
        }
      }
    };
  },
  computed: {
    ...mapState(["user"]),
    homeRoute() {
      var userRole = this.user.roles.filter(role => {
        return role != "admin";
      })[0];
      return this.$router.resolve({
        name: userRole
      }).resolved;
    },
    logOutRoute() {
      return this.$router.resolve({
        name: "logout"
      }).resolved;
    }
  },
  methods: {
    tryLogin() {
      // Test form and login
      var data = this;
      data.loginFailed = false;
      if (data.$refs.loginForm.validate()) {
        UserApi.login(data.credentials)
          .then(response => {
            // TODO: Implement vuex to login the user
            data.$router.push({
              name: data.credentials.type
            });
          })
          .catch(error => {
            data.loginFailed = true;
            data.help = true;
            data.errorText = error;
          });
      }
    }
  }
};
</script>
