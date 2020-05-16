<template>
  <v-container>
    <v-row>
      <v-col class="text-center">
        <v-card class="pa-4 mx-auto mt-12" max-width="400">
          <v-card-actions>
            <v-btn :to="{ name: 'login' }" text color="primary">
              Log In?
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Logout",
  created() {
    var that = this;
    that.logout().then(response => {
      that.$router.push({
        name: "login"
      });
    });
  },
  methods: {
    ...mapActions("user", ["logout"])
  }
};
</script>
