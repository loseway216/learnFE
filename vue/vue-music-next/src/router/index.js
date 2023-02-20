import { createRouter, createWebHashHistory } from "vue-router";

const Recommend = () =>
  import("@/views/recommend.vue" /* webpackChunkName: "recommend" */);
const Album = () => import("@/views/album.vue" /* webpackChunkName: "album" */);
const Search = () =>
  import("@/views/search.vue" /* webpackChunkName: "search" */);
const Singer = () =>
  import("@/views/singer.vue" /* webpackChunkName: "singer" */);
const singerDetail = () =>
  import("@/views/singer-detail.vue" /* webpackChunkName: "singer-detail" */);
const TopDetail = () =>
  import("@/views/top-detail.vue" /* webpackChunkName: "top-detail" */);
const TopList = () =>
  import("@/views/top-list.vue" /* webpackChunkName: "top-list" */);
const UserCenter = () =>
  import("@/views/user-center.vue" /* webpackChunkName: "user-center" */);

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
  {
    path: "/search",
    component: Search,
    children: [
      {
        path: ":id",
        component: singerDetail,
      },
    ],
  },
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
  {
    path: "/user",
    components: {
      user: UserCenter,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
