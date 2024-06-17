import * as echarts from 'echarts';
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import autoLogin from "./utils/login";


// autoLogin().then((res) => {
//   console.log('login fetch result', res);

const app = createApp(App);

app.config.globalProperties.$echarts = echarts;

app.use(createPinia());
app.use(router);
app.use(ElementPlus);
app.mount("#app");
// })


function getCookie(sName) {
  const aCookie = document.cookie.split('; ');
  for (let i = 0; i < aCookie.length; i++) {
    const aCrumb = aCookie[i].split('=');
    if (sName === aCrumb[0]) {
      return (aCrumb[1]);
    }
  }
}

function inIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}
console.log('is in iframe', inIframe());


