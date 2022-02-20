import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("@/views/index.vue"),
    children: [
      {
        path: "",
        redirect: "/home",
      },
      {
        path: "/home",
        name: "Home",
        component: () => import("@/views/Home.vue"),
      },
      {
        path: "/order",
        name: "order",
        component: () => import("@/views/Order.vue"),
      },
      {
        path: "/me",
        name: "me",
        component: () => import("@/views/Me.vue"),
      },
      {
        path: "/address",
        name: "address",
        component: () => import("@/views/Address.vue"),
      },
      {
        path: "/city",
        name: "city",
        component: () => import("@/views/City.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  linkActiveClass: "active",
  routes,
});

export default router;
