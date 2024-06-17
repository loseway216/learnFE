<template>
  <div class="charts-container">
    <div class="top">
      <TopVue></TopVue>
    </div>
    <div class="center">
      <CenterVue></CenterVue>
    </div>
    <div class="bottom">
      <BottomVue></BottomVue>
    </div>
  </div>
</template>

<script setup>
import BottomVue from "./Bottom.vue";
import CenterVue from "./Center.vue";
import TopVue from "./Top.vue";
</script>
<style scoped lang="less">
.charts-container {
  display: flex;
  flex-direction: column;
}
.top {
  flex: 1;
  min-height: 240px;
}
.center {
  flex: 1;
}
.bottom {
  flex: 1;
  max-height: 240px;
}
</style>
