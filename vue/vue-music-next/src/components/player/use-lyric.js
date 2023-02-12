import { getLyric } from "@/service/songs";
import Lyric from "lyric-parser";
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";

export default function useLyric({ songReady, currentTime }) {
  const currentLyric = ref(null);
  const currentLineNum = ref(0);
  const pureMusicLyric = ref(null);
  const playingLyric = ref(null);
  const lyricScrollRef = ref(null);
  const lyricListRef = ref(null);

  const store = useStore();
  const currentSong = computed(() => store.getters.currentSong);

  watch(currentSong, async (newSong) => {
    if (!newSong.url || !newSong.id) {
      return;
    }

    // 来回切歌时歌词乱跳 因为歌曲和歌词获取接口不同步 playLyric不一定是当前歌词
    resetCurrentLyric();

    const lyric = await getLyric(newSong);
    store.commit("setSongLyric", { song: newSong, lyric });

    // 飞快地下一首 只取最新的一首歌
    // 最新一首歌是currentSong 这时候newSong的lyric已经过时
    // currentSong的歌词还没有进行获取
    if (currentSong.value.lyric !== lyric) {
      return;
    }

    currentLyric.value = new Lyric(lyric, handleLyric);

    const hasLyric = currentLyric.value.lines.length;
    if (hasLyric) {
      // 歌曲比歌词加载快
      if (songReady.value) {
        playLyric();
      }
    } else {
      playingLyric.value = pureMusicLyric.value = lyric.replace(
        /\[(\d{2}):(\d{2}):(\d{2})\]/g,
        ""
      );
    }
  });

  function handleLyric({ lineNum, txt }) {
    currentLineNum.value = lineNum;
    playingLyric.value = txt;

    const scrollComp = lyricScrollRef.value;
    const listEl = lyricListRef.value;

    if (!listEl) {
      return;
    }

    if (lineNum > 5) {
      const lineEl = listEl.children[lineNum - 5];
      scrollComp.scroll.scrollToElement(lineEl, 1000);
    } else {
      scrollComp.scroll.scrollTo(0, 0, 1000);
    }
  }

  function playLyric() {
    const currentLyricVal = currentLyric.value;
    if (currentLyricVal) {
      currentLyricVal.seek(currentTime.value * 1000);
    }
  }

  function stopLyric() {
    const currentLyricVal = currentLyric.value;
    if (currentLyricVal) {
      currentLyricVal.stop();
    }
  }

  function resetCurrentLyric() {
    stopLyric();
    currentLyric.value = null;
    currentLineNum.value = null;
    pureMusicLyric.value = null;
    playingLyric.value = null;
  }

  return {
    currentLyric,
    currentLineNum,
    pureMusicLyric,
    playingLyric,
    lyricScrollRef,
    lyricListRef,
    playLyric,
    stopLyric,
  };
}
