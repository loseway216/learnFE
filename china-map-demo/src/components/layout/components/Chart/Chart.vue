<template>
    <div class="wrap" id="wrap" ref="wrap">
    </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted, onUpdated, watch } from 'vue';
import { getCurrentInstance } from "vue";

const { proxy } = (getCurrentInstance() as any)

const props = defineProps<{
   option: any   //子组件接收
}>()

//解构赋值
let option = props.option;

option.color = [
    '#c23531',
    '#2f4554',
    '#61a0a8',
    '#d48265',
    '#91c7ae',
    '#749f83',
    '#ca8622',
    '#bda29a',
    '#6e7074',
    '#546570',
    '#c4ccd3'
]

//因为子组件的onMounted在父组件的onMounted之前，必须监听option的变化，确保获得父组件通过异步函数获得的值
watch(() => option, () => {
    myChart.setOption(option);   
}, {
    deep:true
})
const wrap = ref();
let myChart: any;

onMounted(() => {
    myChart = proxy.$echarts.init(wrap.value, 'dark');      
    myChart.setOption(option);
    window.addEventListener("resize", () => myChart.resize());
})

onUpdated(() => {
    myChart.setOption(option);
})

onBeforeUnmount(() => {
    if (myChart) {
        window.removeEventListener("resize", () => myChart.resize());
        myChart.clear();
        myChart.dispose();
    }
});
</script>

<style scoped lang='less'>
.wrap{
    width: 100%;
    height: 100%;
}
</style>