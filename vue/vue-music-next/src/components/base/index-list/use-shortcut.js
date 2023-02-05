import { computed, ref } from "vue";

export default function useShortcut(props, groupRef) {
  const ANCHOR_HEIGHT = 18;
  const scrollRef = ref(null);

  const shortcutList = computed(() => {
    return props.data.map((group) => group.title);
  });

  const touch = {};

  // 划到相应的字母自动滚动
  function onShortcutTouchStart(e) {
    const anchorIndex = parseInt(e.target.dataset.index);
    touch.y1 = e.touches[0].pageY;
    touch.anchorIndex = anchorIndex;

    scrollTo(anchorIndex);
  }

  // 划到相应的字母自动滚动
  function onShortcutTouchMove(e) {
    touch.y2 = e.touches[0].pageY;
    const delta = ((touch.y2 - touch.y1) / ANCHOR_HEIGHT) | 0; // 相当于Math.floor()
    const anchorIndex = touch.anchorIndex + delta;

    scrollTo(anchorIndex);
  }

  function scrollTo(index) {
    if (isNaN(index)) {
      return;
    }
    // 将index控制在 (0, shortcutList.value.length - 1)
    index = Math.max(0, Math.min(shortcutList.value.length - 1, index));

    const targetEl = groupRef.value.children[index];
    const scroll = scrollRef.value.scroll;

    // better-scroll的手动滚动api
    scroll.scrollToElement(targetEl, 0);
  }

  return {
    scrollRef,
    shortcutList,
    onShortcutTouchStart,
    onShortcutTouchMove,
  };
}
