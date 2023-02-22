import BScroll from "@better-scroll/core";
import ObserveDOM from "@better-scroll/observe-dom";
import { onActivated, onDeactivated, onMounted, onUnmounted, ref } from "vue";

BScroll.use(ObserveDOM);

export default function useScroll(wrapperRef, options, emit) {
  const scroll = ref(null);

  onMounted(() => {
    const scrollVal = (scroll.value = new BScroll(wrapperRef.value, {
      observeDOM: true,
      ...options,
    }));

    if (options.probeType > 0) {
      scrollVal.on("scroll", (position) => {
        emit("scroll", position);
      });
    }
  });

  // keep-alive不会触发
  onUnmounted(() => {
    scroll.value.destroy();
  });

  onActivated(() => {
    scroll.value.enable();
    scroll.value.refresh();
  });

  onDeactivated(() => {
    scroll.value.disable();
  });

  return scroll;
}