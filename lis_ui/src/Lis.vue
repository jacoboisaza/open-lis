<template>
  <v-app>
    <!-- <lis-snackbar /> -->
    <!-- <lis-navbars /> -->
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "Lis",
  data: () => ({})
};
</script>

<style>
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
