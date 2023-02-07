import "@/assets/scss/index.scss";
import loadingDirective from "@/components/base/loading/directive";
import noResultDirective from "@/components/base/no-result/directive";
import { createApp } from "vue";
import lazyPlugin from "vue3-lazy";
import App from "./App.vue";
import router from "./router";
import store from "./store";

createApp(App)
  .use(store)
  .use(router)
  .use(lazyPlugin, {
    loading: require("@/assets/images/default.png"),
  })
  .directive("loading", loadingDirective)
  .directive("no-result", noResultDirective)
  .mount("#app");
