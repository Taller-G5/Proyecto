import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Products from "./views/Products";
import About from "./views/About";
import Contactos from "./views/Contactos";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/products",
      name: "products",
      component: Products
    },
    {
      path: "/contactos",
      name: "contactos",
      component: Contactos
    }
  ]
});
