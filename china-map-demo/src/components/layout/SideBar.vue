<template>
  <el-menu
    default-active="/"
    :router="true"
    class="menu"
    text-color="#fff"
    background-color="transparent"
  >
    <el-menu-item index="/" class="item">
      <el-icon><View /></el-icon>
      <template #title>全国地图</template>
    </el-menu-item>

    <el-sub-menu index="/topo/上海一厂" class="item">
      <template #title>
        <el-icon><location /></el-icon>
        <span>拓扑图</span>
      </template>

      <el-menu-item index="/topo/上海一厂">
        <template #title>上海一厂</template>
      </el-menu-item>

      <el-menu-item index="/topo/上海二厂">
        <template #title>上海二厂</template>
      </el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="/points/上海一厂" class="item">
      <template #title>
        <el-icon><location /></el-icon>
        <span>点位图</span>
      </template>

      <el-menu-item index="/points/上海一厂">
        <template #title>上海一厂</template>
      </el-menu-item>

      <el-menu-item index="/points/上海二厂">
        <template #title>上海二厂</template>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { Location, View } from "@element-plus/icons-vue";
</script>

<style>
.menu {
  border-right: 1px solid rgba(51, 102, 255, 0.55);
  box-shadow: inset -15px 0 17px -15px rgb(51 102 255 / 55%);
}
.item {
  width: 200px;
}
</style>
