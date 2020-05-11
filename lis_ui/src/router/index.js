import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    meta: {
      roles: ["guest"]
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/lab/QC",
    name: "lab-qc",
    meta: {
      roles: ["admin"],
      menu: "admin-nav",
      title: "QC",
      description: "Lab QC",
      icon: "mdi-chart-bell-curve",
      iconColor: "indigo"
    },
    component: () =>
      import(/* webpackChunkName: "lab-qc" */ "../views/lab/QC.vue")
  },
  {
    path: "/admin",
    name: "admin",
    meta: {
      roles: ["admin"],
      menu: "admin-nav",
      title: "Admin",
      description: "Admin",
      icon: "mdi-database-edit"
    },
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/Admin.vue")
  },
  {
    path: "/logout",
    name: "logout",
    meta: {
      roles: ["lab", "client"],
      menu: "account-nav",
      title: "Logout",
      description: "Logout",
      icon: "mdi-logout"
    },
    component: () =>
      import(/* webpackChunkName: "logout" */ "../views/Logout.vue")
  },
  {
    // Home page for Lab's users
    path: "/lab",
    name: "lab",
    redirect: { name: "lab-pending" }
  },
  {
    path: "/lab/pending",
    name: "lab-pending",
    meta: {
      roles: ["lab"],
      menu: "main-nav",
      title: "Pending",
      description: "Pending Samples",
      icon: "mdi-clock",
      iconColor: "pink"
    },
    component: () =>
      import(/* webpackChunkName: "lab-pending" */ "../views/lab/Pending.vue")
  },
  {
    path: "/lab/receive",
    name: "lab-receive",
    meta: {
      roles: ["lab"],
      menu: "main-nav",
      title: "Receive",
      description: "Receive Samples",
      icon: "mdi-test-tube",
      iconColor: "orange"
    },
    component: () =>
      import(/* webpackChunkName: "lab-receive" */ "../views/lab/Receive.vue")
  },
  {
    path: "/lab/incoming",
    name: "lab-incoming",
    meta: {
      roles: ["lab"],
      menu: "main-nav",
      title: "Incoming",
      description: "Incoming Samples",
      icon: "mdi-ambulance",
      iconColor: "teal"
    },
    component: () =>
      import(/* webpackChunkName: "lab-incoming" */ "../views/lab/Incoming.vue")
  },
  {
    // Home page for Client's users
    path: "/client",
    name: "client",
    redirect: { name: "client-patients" }
  },
  {
    path: "/client/patients",
    name: "client-patients",
    meta: {
      roles: ["client"],
      menu: "main-nav",
      title: "Patients",
      description: "Patients",
      icon: "mdi-account-multiple",
      iconColor: "pink"
    },
    component: () =>
      import(
        /* webpackChunkName: "client-patients" */ "../views/client/Patients.vue"
      )
  },
  {
    path: "/client/samples",
    name: "client-samples",
    meta: {
      roles: ["client"],
      menu: "main-nav",
      title: "Samples",
      description: "Samples",
      icon: "mdi-test-tube-empty",
      iconColor: "orange"
    },
    component: () =>
      import(
        /* webpackChunkName: "client-samples" */ "../views/client/Samples.vue"
      )
  },
  {
    path: "/client/reports",
    name: "client-reports",
    meta: {
      roles: ["client"],
      menu: "main-nav",
      title: "Reports",
      description: "Reports",
      icon: "mdi-chart-bar-stacked",
      iconColor: "indigo"
    },
    component: () =>
      import(
        /* webpackChunkName: "client-reports" */ "../views/client/Reports.vue"
      )
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
