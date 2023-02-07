<template>
  <m-header></m-header>
  <tab></tab>
  <router-view></router-view>
  <player></player>
</template>

<script>
import Header from "@/components/header/header.vue";
import Player from "@/components/player/player.vue";
import Tab from "@/components/tab/tab.vue";

export default {
  components: {
    MHeader: Header,
    Tab,
    Player,
  },
};
</script>
