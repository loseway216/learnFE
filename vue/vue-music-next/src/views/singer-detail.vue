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
import MusicList from "@/components/music-list/music-list.vue";
import { getSingerDetail } from "@/service/singer";
import { processSongs } from "@/service/songs";

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
    pic() {
      return this.singer?.pic;
    },
    title() {
      return this.singer?.name;
    },
  },
  async created() {
    const result = await getSingerDetail(this.singer);
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
