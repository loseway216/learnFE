import "@/assets/scss/index.scss";
import { createApp } from "vue";
import lazyPlugin from "vue3-lazy";
import App from "./App.vue";
import loadingDirective from "./components/base/loading/directive";
import router from "./router";
import store from "./store";

createApp(App)
  .use(store)
  .use(router)
  .use(lazyPlugin, {
    loading: require("@/assets/images/default.png"),
  })
  .directive("loading", loadingDirective)
  .mount("#app");
