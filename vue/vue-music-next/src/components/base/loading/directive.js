import { addClass, removeClass } from "@/assets/js/dom";
import { createApp } from "vue";
import Loading from "./loading.vue";

const relativeClass = "g-relative";

const loadingDirective = {
  mounted(el, binding) {
    const app = createApp(Loading);
    const instance = app.mount(document.createElement("div"));
    el.instance = instance;

    // 设置loading的标题
    const title = binding.arg;
    if (typeof title !== "undefined") {
      instance.setTitle(title);
    }

    if (binding.value) {
      append(el);
    }
  },
  updated(el, binding) {
    const title = binding.arg;
    if (typeof title !== "undefined") {
      el.instance.setTitle(title);
    }

    if (binding.value !== binding.oldValue) {
      binding.value ? append(el) : remove(el);
    }
  },
};

function append(el) {
  const style = getComputedStyle(el);
  // loading是绝对定位，需要处理父元素的 position
  if (["absolute", "fixed", "relative"].indexOf(style.position) === -1) {
    addClass(el, relativeClass);
  }
  el.appendChild(el.instance.$el);
}

function remove(el) {
  removeClass(el, relativeClass);
  el.removeChild(el.instance.$el);
}

export default loadingDirective;
