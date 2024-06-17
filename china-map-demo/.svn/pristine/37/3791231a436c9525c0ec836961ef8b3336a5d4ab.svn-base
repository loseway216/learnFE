<template>
  <img :src="src" class="points" />
</template>

<script setup>
import { ref } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import png from "../assets/images/points-1.png";
// import svg from "../assets/svg/1.svg";

const { params } = useRoute();

const src = ref(png);

onBeforeRouteUpdate((to, from) => {
  if (to.params.id !== from.params.id) {
    if (to.params.id == "上海一厂") {
      src.value = png;
    } else {
      src.value = png;
    }
  }
});
</script>

<style scoped>
.points {
  width: 100%;
  height: 100%;
}
</style>
