import { addClass, removeClass } from "@/assets/js/dom";
import { createApp } from "vue";

const relativeClass = "g-relative";

export default function createLoadingLikeDirective(Component) {
  return {
    mounted(el, binding) {
      const app = createApp(Component);
      const instance = app.mount(document.createElement("div"));
      // 多个指令绑定到一个元素 防止绑定覆盖
      const name = Component.name;
      if (!el[name]) {
        el[name] = {};
      }
      el[name].instance = instance;

      // 设置标题
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
      const name = Component.name;
      if (typeof title !== "undefined") {
        el[name].instance.setTitle(title);
      }

      if (binding.value !== binding.oldValue) {
        binding.value ? append(el) : remove(el);
      }
    },
  };
  function append(el) {
    const style = getComputedStyle(el);
    const name = Component.name;
    // loading是绝对定位，需要处理父元素的 position
    if (["absolute", "fixed", "relative"].indexOf(style.position) === -1) {
      addClass(el, relativeClass);
    }
    el.appendChild(el[name].instance.$el);
  }

  function remove(el) {
    const name = Component.name;
    removeClass(el, relativeClass);
    el.removeChild(el[name].instance.$el);
  }
}
