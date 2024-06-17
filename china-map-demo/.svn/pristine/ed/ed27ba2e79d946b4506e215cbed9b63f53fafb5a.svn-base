<script setup>
import LeftDisplay from "./components/layout/Left/LeftDisplay.vue";
</script>

<template>
  <div class="container">
    <LeftDisplay class="leftSide"></LeftDisplay>
    <div class="center">
      <RouterView v-slot="{ Component }">
        <template v-if="Component">
          <Suspense>
            <!-- main content -->
            <component :is="Component"></component>

            <!-- loading state -->
            <template #fallback>
              <div
                style="
                  width: 100%;
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                加载中...
              </div>
            </template>
          </Suspense>
        </template>
      </RouterView>
    </div>
  </div>
</template>

<style>
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  height: 100%;
  width: 100%;
}

body {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", SimSun, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgba(255, 255, 255, 0.85);
  /* background: url(/src/assets/images/background.png) no-repeat; */
  background-color: #09152d;
  height: 100%;
  width: 100%;
  /* min-height: 760px;
  min-width: 1200px; */
}

li {
  list-style: none;
}
.container {
  display: flex;
  height: 100%;
  overflow: hidden;
}

.leftSide {
  max-width: 400px;
  width: 20%;
  height: 100%;
}

.center {
  flex: 1;
  height: 100%;
}
</style>
