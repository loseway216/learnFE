<template>
  <m-header></m-header>
  <tab></tab>
  <router-view :style="viewStyle" v-slot="{ Component }">
    <transition>
      <keep-alive>
        <Component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
  <router-view name="user" :style="viewStyle" v-slot="{ Component }">
    <transition name="slide" appear>
      <keep-alive>
        <Component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
  <player></player>
</template>

<script>
import Header from "@/components/header/header.vue";
import Player from "@/components/player/player.vue";
import Tab from "@/components/tab/tab.vue";
import { mapState } from "vuex";

export default {
  components: {
    MHeader: Header,
    Tab,
    Player,
  },
  computed: {
    viewStyle() {
      const bottom = this.playlist.length ? "60px" : "0";
      return {
        bottom,
      };
    },
    ...mapState(["playlist"]),
  },
};
</script>
