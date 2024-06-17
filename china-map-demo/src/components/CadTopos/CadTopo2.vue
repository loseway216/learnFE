<template>
  <div class="canvas-box" ref="canvasBox">
    <canvas ref="canvas">当前浏览器无法使用canvas，请更新浏览器版本</canvas>
  </div>
</template>

<script setup>
import { useAssetStore } from "@/stores/asset";
import { useTopoStore } from "@/stores/topo";
import { onBeforeUnmount, onMounted, ref } from "vue";

const canvas = ref(null);
const canvasBox = ref(null);

const topoStore = useTopoStore();
const assetStore = useAssetStore();

onMounted(async () => {
  // 初始化topo图数据
  await topoStore.getData({ topo_id: 5 });
  const data = topoStore.topoData;
  const remark = topoStore.remark;
  console.log("topoData", data);
  console.log("remark", remark);
  initCanvas(data, remark);
});

onBeforeUnmount(() => {});

async function initCanvas(data, remark) {
  let stage;
  if (stage) {
    stage.clear();
  }

  canvas.value.width = remark.width || canvasBox.value.offsetWidth;
  canvas.value.height = remark.height || canvasBox.value.offsetHeight;

  const topoInstance = JTopo.deSeriailzeByJSON(data, canvas.value);
  stage = topoInstance.stage;
  stage.mode = "normal";

  // 查询ip在线状态
  await assetStore.getAssetStatus();
  const ip_list = assetStore.assetStatus.ip_list;
  console.log("ip_list", ip_list);

  const statusGreen = "51,204,153";
  const statusRed = "255,51,85";

  const scene = stage.childs[0];
  const allNodes = scene.getDisplayedNodes();
  allNodes.forEach((node) => {
    // console.log(node);
    if (node.eleData?.assetIP) {
      const statusIcon = new JTopo.Node();
      statusIcon.setSize(10, 10);
      statusIcon.x = node.x;
      statusIcon.y = node.y - 10;
      statusIcon.borderRadius = 5;

      const status = ip_list?.find((e) => `${e.ip},` == node.eleData.assetIP);
      // console.log(node.eleData.assetIP);
      if (!!status?.is_online) {
        statusIcon.fillColor = statusGreen;
      } else {
        statusIcon.fillColor = statusRed;
      }

      scene.add(statusIcon);
    }
  });
}
</script>

<style scoped>
.canvas-box {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  /* padding-top: 10px; */
}
</style>
