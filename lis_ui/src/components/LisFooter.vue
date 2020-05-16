<template>
  <v-footer absolute app>
    <a
      href="//github.com/jacoboisaza/open-lis"
      target="_blank"
      rel="noopener noreferrer"
      class="mx-auto version-number"
    >
      <v-img
        :src="require('../assets/github.png')"
        max-width="16px"
        class="d-inline-block"
      ></v-img
      >&nbsp;
      <span>{{ VUE_APP_VERSION }}</span>
    </a>
  </v-footer>
</template>

<script>
export default {
  name: "LisFooter",
  data: () => ({
    VUE_APP_VERSION: require("../../package.json").version
  })
};
</script>

<style lang="css" scoped>
.version-number {
  text-decoration: none !important;
  color: black;
}
</style>
