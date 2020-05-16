<template>
  <v-container>
    <h1>This is the "{{ $route.name }}" view</h1>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Home",
  data: () => ({}),
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  created() {
    // Redirection to user's Home
    var userRole = this.user.roles.filter(role => {
        return role != "admin";
      })[0],
      userHome = this.$router.resolve({
        name: userRole
      }).resolved;
    this.$router.push({
      name: userHome.name
    });
  }
};
</script>
