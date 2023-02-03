import Recommend from "@/views/recommend.vue";
import Search from "@/views/search.vue";
import Singer from "@/views/singer.vue";
import TopList from "@/views/top-list.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: "/", redirect: "/recommend" },
  { path: "/recommend", component: Recommend },
  { path: "/singer", component: Singer },
  { path: "/search", component: Search },
  { path: "/top-list", component: TopList },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
