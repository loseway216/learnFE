import MusicList from "@/components/music-list/music-list.vue";
import { processSongs } from "@/service/songs";
import storage from "good-storage";

export default function createDetailComponent(name, key, fetch) {
  return {
    name,
    components: { MusicList },
    data() {
      return {
        songs: [],
        loading: true,
      };
    },
    props: {
      data: Object,
    },
    computed: {
      computedData() {
        let result = null;
        const data = this.data;
        if (data) {
          result = data;
        } else {
          const cached = storage.get(key);
          // 将点过来的data和当前路由的data作比较
          // 以防随便改一个id
          if (
            cached &&
            (cached.mid || cached.id + "") === this.$route.params.id
          ) {
            result = cached;
          }
        }
        return result;
      },
      pic() {
        return this.computedData?.pic;
      },
      title() {
        const data = this.computedData;
        return data.name || data.title;
      },
    },
    async created() {
      const data = this.computedData;
      if (!data) {
        // 退到一级路由
        const path = this.$route.matched[0].path;
        this.$router.push({
          path,
        });
        return;
      }
      const result = await fetch(data);
      this.songs = await processSongs(result.songs);
      this.loading = false;
    },
  };
}
