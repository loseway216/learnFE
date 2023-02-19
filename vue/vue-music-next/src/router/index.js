import Album from "@/views/album.vue";
import Recommend from "@/views/recommend.vue";
import Search from "@/views/search.vue";
import singerDetail from "@/views/singer-detail.vue";
import Singer from "@/views/singer.vue";
import TopDetail from "@/views/top-detail.vue";
import TopList from "@/views/top-list.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: "/", redirect: "/recommend" },
  {
    path: "/recommend",
    component: Recommend,
    children: [
      {
        path: ":id",
        component: Album,
      },
    ],
  },
  {
    path: "/singer",
    component: Singer,
    children: [
      {
        path: ":id",
        component: singerDetail,
      },
    ],
  },
  { path: "/search", component: Search },
  {
    path: "/top-list",
    component: TopList,
    children: [
      {
        path: ":id",
        component: TopDetail,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
