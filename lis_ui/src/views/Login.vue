<template>
  <v-container>
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
                v-model.trim="user.id"
                autofocus
                label="User"
                required
                :rules="[formRules.required]"
                :prepend-icon="
                  user.type === 'lab' ? 'mdi-test-tube' : 'mdi-doctor'
                "
              />
              <v-text-field
                v-model="user.password"
                label="Password"
                :type="showPassword ? 'text' : 'password'"
                :rules="[formRules.required]"
                required
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
              />
              <v-radio-group v-model="user.type" :mandatory="false">
                <v-radio label="Im a Client" value="client"></v-radio>
                <v-radio label="Im a Lab Tech" value="lab"></v-radio>
              </v-radio-group>
            </v-card-text>
            <v-card-actions>
              <v-btn block type="submit" color="info"
                >LOG IN
                <v-icon dark right>{{
                  user.type === "lab" ? "mdi-test-tube" : "mdi-doctor"
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
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      user: {
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
      },
      // TODO: Replace this base url creating a global Axios instance
      BaseApiUrl: this.$configs.lisAuthBaseUrl
    };
  },
  methods: {
    tryLogin() {
      // Test form and login
      var data = this;
      data.loginFailed = false;
      if (data.$refs.loginForm.validate()) {
        // Send data to API
        axios
          // TODO: Replace the GET with commented POST when LIS API is ready
          .get(data.BaseApiUrl + "users/" + data.user.id)
          .then(response => {
            data.$router.push({
              name: "home",
              params: { user: response.data }
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
