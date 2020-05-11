<template>
  <div>
    <!-- Full Sidebar -->
    <v-navigation-drawer
      v-model="sideBar"
      app
      clipped
      :mini-variant="$vuetify.breakpoint.lgAndUp && sideBarMini"
    >
      <!-- Toggle Menu -->
      <v-list v-show="$vuetify.breakpoint.mdAndDown" dense>
        <v-list-item @click.stop="toggleSidebar()">
          <v-list-item-action>
            <v-icon>mdi-chevron-left</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <!-- Main Menu -->
      <v-divider v-if="mainNav.length > 0"></v-divider>
      <v-list dense>
        <v-list-item
          v-for="route in mainNav"
          :key="route.name"
          :to="{ name: route.name }"
          @click.stop
        >
          <v-list-item-action>
            <v-icon :color="route.meta.iconColor">{{ route.meta.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ route.meta.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <!-- Admin Menu -->
      <v-divider v-if="adminNav.length > 0" class="my-3"></v-divider>
      <v-list dense>
        <v-list-item
          v-for="route in adminNav"
          :key="route.name"
          :to="{ name: route.name }"
          @click.stop
        >
          <v-list-item-action>
            <v-icon :color="route.meta.iconColor">{{ route.meta.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ route.meta.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <!-- Account Menu -->
      <v-divider v-if="accountNav.length > 0" class="my-3"></v-divider>
      <v-list dense>
        <v-list-item
          v-for="route in accountNav"
          :key="route.name"
          :to="{ name: route.name }"
          @click.stop
        >
          <v-list-item-action>
            <v-icon>{{ route.meta.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ route.meta.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Top navbar -->
    <v-app-bar
      app
      clipped-left
      dense
      :color="$route.meta.iconColor + ' lighten-5'"
    >
      <!-- Toggle sidebar -->
      <v-app-bar-nav-icon @click.stop="toggleSidebar()"></v-app-bar-nav-icon>

      <!-- Breadcrumb -->
      <v-icon v-show="$vuetify.breakpoint.mdAndDown" class="mx-3">{{
        $route.meta.icon
      }}</v-icon>
      <v-toolbar-title class="mr-5 align-center">
        <span class="title">{{
          $vuetify.breakpoint.mdAndDown
            ? $route.meta.title
            : $route.meta.description
        }}</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Search pending samples -->
      <v-layout
        v-if="
          [
            'lab-incoming',
            'lab-receive',
            'client-patients',
            'client-samples'
          ].indexOf($route.name) >= 0
        "
        row
        align-center
        style="max-width: 650px"
      >
        <v-text-field
          v-model="query"
          placeholder="Search..."
          single-line
          append-icon="mdi-magnify"
          hide-details
          @click:append="searchPending(query)"
        ></v-text-field>
      </v-layout>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "LisNavBar",

  props: {
    userRoles: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    query: "",
    sideBar: null,
    sideBarMini: true
  }),
  computed: {
    // build menus filtered by userRoles
    userMenus() {
      var that = this;
      return this.$router.options.routes.filter(route => {
        return (
          route.meta &&
          route.meta.roles.filter(routeRole => {
            return that.userRoles.some(userRole => {
              return userRole === routeRole;
            });
          }).length > 0
        );
      });
    },
    mainNav() {
      return this.userMenus.filter(route => {
        return route.meta.menu === "main-nav";
      });
    },
    accountNav() {
      return this.userMenus.filter(route => {
        return route.meta.menu === "account-nav";
      });
    },
    adminNav() {
      return this.userMenus.filter(route => {
        return route.meta.menu === "admin-nav";
      });
    }
  },
  methods: {
    searchPending(query) {
      query = "";
      this.$router.push({
        name: "lab-pending",
        params: { query: query }
      });
    },
    toggleSidebar() {
      if (this.$vuetify.breakpoint.lgAndUp) {
        this.sideBarMini = !this.sideBarMini;
      } else {
        this.sideBar = !this.sideBar;
      }
    }
  }
};
</script>
