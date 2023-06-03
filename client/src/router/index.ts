import { createRouter, createWebHistory } from "vue-router";
import Home from "../Novelas/Home.vue";
import Capitulos from "../Capitulos/Capitulos.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/capitulos/:id",
    name: "Capitulos",
    component: Capitulos,
  },
];
const history = createWebHistory();
const router = createRouter({
  history,
  routes,
});

export default router;
