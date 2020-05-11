<template>
  <v-app v-cloak id="lis">
    <v-content>
      <router-view></router-view>
    </v-content>

    <!-- Navigation and Actions -->
    <template v-if="$route.name != 'login'">
      <LisNavBar />

      <!-- New patient action -->
      <v-btn
        v-if="user.roles.indexOf('client') >= 0"
        bottom
        color="purple"
        dark
        fab
        fixed
        right
        @click="newPatient = !newPatient"
      >
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>
      <v-dialog v-model="newPatient" max-width="1200px">
        <v-card>
          <LisNewPatient />
        </v-card>
      </v-dialog>

      <!-- New test action -->
      <v-btn
        v-if="user.roles.indexOf('lab') >= 0"
        bottom
        color="orange"
        dark
        fab
        fixed
        right
        @click="newTest = !newTest"
      >
        <v-icon>mdi-test-tube</v-icon>
      </v-btn>
      <v-dialog v-model="newTest" max-width="1200px">
        <v-card>
          <LisNewTest />
        </v-card>
      </v-dialog>

      <LisFooter />
    </template>
  </v-app>
</template>

<script>
import LisNavBar from "@/components/LisNavBar.vue";
import LisNewPatient from "@/components/LisNewPatient.vue";
import LisNewTest from "@/components/LisNewTest.vue";
import LisFooter from "@/components/LisFooter.vue";
import { mapState } from "vuex";

export default {
  name: "Lis",
  components: {
    LisNavBar,
    LisNewPatient,
    LisNewTest,
    LisFooter
  },
  data: () => ({
    newPatient: false,
    newTest: false
  }),
  computed: {
    ...mapState(["user"])
  }
};
</script>

<style>
[v-cloak] {
  display: none;
}
/* Google font: roboto 100, 300, regular, 500, 700, 900 - latin */
@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 100;
  src: local("Roboto Thin"), local("Roboto-Thin"),
    url(./assets/fonts/roboto-v20-latin-100.woff2) format("woff2");
}
@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 300;
  src: local("Roboto Light"), local("Roboto-Light"),
    url(./assets/fonts/roboto-v20-latin-300.woff2) format("woff2");
}
@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  src: local("Roboto"), local("Roboto-Regular"),
    url(./assets/fonts/roboto-v20-latin-regular.woff2) format("woff2");
}
@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  src: local("Roboto Medium"), local("Roboto-Medium"),
    url(./assets/fonts/roboto-v20-latin-500.woff2) format("woff2");
}
@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  src: local("Roboto Bold"), local("Roboto-Bold"),
    url(./assets/fonts/roboto-v20-latin-700.woff2) format("woff2");
}
@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 900;
  src: local("Roboto Black"), local("Roboto-Black"),
    url(./assets/fonts/roboto-v20-latin-900.woff2) format("woff2");
}
</style>
