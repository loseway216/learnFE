import BScroll from "@better-scroll/core";
import Slide from "@better-scroll/slide";
import {
  computed,
  nextTick,
  onActivated,
  onDeactivated,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from "vue";
import { useStore } from "vuex";

BScroll.use(Slide);

export default function useMiniSlider() {
  const sliderWrapperRef = ref(null);
  const slider = ref(null);

  const store = useStore();
  const fullScreen = computed(() => store.state.fullScreen);
  const playlist = computed(() => store.state.playlist);
  const currentIndex = computed(() => store.state.currentIndex);

  const sliderShow = computed(() => {
    return !fullScreen.value && !!playlist.value;
  });

  onMounted(() => {
    let sliderVal;

    watch(sliderShow, async (newSliderShow) => {
      if (newSliderShow) {
        await nextTick();
        if (!sliderVal) {
          sliderVal = slider.value = new BScroll(sliderWrapperRef.value, {
            click: true,
            scrollX: true,
            scrollY: false,
            momentum: false,
            bounce: false,
            probeType: 2,
            slide: {
              autoplay: false,
              loop: true,
            },
          });

          // 左右滑动/播放列表切歌/删除歌曲都会触发 需要自动播放
          sliderVal.on("slidePageChanged", ({ pageX }) => {
            store.commit("setCurrentIndex", pageX);
          });
        } else {
          sliderVal.refresh();
        }

        sliderVal.goToPage(currentIndex.value, 0, 0);
      }
    });

    watch(currentIndex, (newIndex) => {
      // 切歌的前提是显示
      if (sliderVal && sliderShow.value) {
        sliderVal.goToPage(newIndex, 0, 0);
      }
    });

    // 播放列表增删歌曲后 slider需要刷新dom
    watch(playlist, async (newList) => {
      if (sliderVal && sliderShow.value && newList.length) {
        await nextTick();
        sliderVal.refresh();
      }
    });
  });

  onUnmounted(() => {
    if (slider.value) {
      slider.value.destroy();
    }
  });

  onActivated(() => {
    slider.value.enable();
    slider.value.refresh();
  });

  onDeactivated(() => {
    slider.value.disable();
  });

  return {
    slider,
    sliderWrapperRef,
  };
}
