<template>
  <div class="singer-detail">
    <music-list
      :songs="songs"
      :pic="pic"
      :title="title"
      :loading="loading"
    ></music-list>
  </div>
</template>

<script>
import { SINGER_KEY } from "@/assets/js/constant";
import MusicList from "@/components/music-list/music-list.vue";
import { getSingerDetail } from "@/service/singer";
import { processSongs } from "@/service/songs";
import storage from "good-storage";

export default {
  name: "singer-detail",
  components: { MusicList },
  data() {
    return {
      songs: [],
      loading: true,
    };
  },
  props: {
    singer: Object,
  },
  computed: {
    computedSinger() {
      let result = null;
      const singer = this.singer;
      if (singer) {
        result = singer;
      } else {
        const cachedSinger = storage.get(SINGER_KEY);
        // 将点过来的singer和当前路由的singer作比较
        // 以防随便改一个id
        if (cachedSinger && cachedSinger.mid === this.$route.params.id) {
          result = cachedSinger;
        }
      }
      return result;
    },
    pic() {
      return this.computedSinger?.pic;
    },
    title() {
      return this.computedSinger?.name;
    },
  },
  async created() {
    if (!this.computedSinger) {
      // 退到一级路由
      const path = this.$route.matched[0].path;
      this.$router.push({
        path,
      });
      return;
    }
    const result = await getSingerDetail(this.computedSinger);
    this.songs = await processSongs(result.songs);
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
.singer-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>
