<template>
    <section class="content">
        <div class="left">
            <div  :data-index="0" @click="selected($event)" :class="[state==='0' ? 'active-icon' : 'icon']"></div>
            <div class="line"></div>
            <div class="icon" :data-index="1" @click="selected($event)" :class="[state==='1' ? 'active-icon' : 'icon']"></div>
        </div>
        <div class="right">
            <div :data-index="0" @click="selected($event)" :class="[state==='0' ? 'active-text' : 'text']">中国</div>
            <div :data-index="1" @click="selected($event)" :class="[state==='1' ? 'active-text' : 'text']">上海</div>
        </div>
    </section>
</template>

<script lang="ts" setup>
    import {ref} from 'vue'
    let state = ref<string>("0")
    
    const emit = defineEmits(['on-click'])
    function selected(ev){
        state.value = ev.target.dataset.index;
        emit('on-click', state.value)
        let flag:boolean = (state.value=='0');
        console.log(flag)   
    }

</script>
<style scoped>


    .content {
        display: flex;
        width: 70px;
    }
    .left{
        padding: 15px 0;
    }
    .right{
        font-size: 16px;
        height: 90px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        color: #fff;
    }
    .text{
        padding: 6px 10px 0;
        cursor: pointer;
        height: 30px;
    }
    .icon{
        height: 7px;
        width: 7px;
        border-radius: 7px;
        border: 1px solid #fff;
        background-color: transparent;
        box-shadow: none;
        cursor: pointer;
    }
    .line {
        border-right: 1px solid #fff;
        height: 50px;
        width: 1px;
        margin-left: 3px;
    }

    .active-icon {
        height: 7px;
        width: 7px;
        border-radius: 7px;
        box-shadow: 0 0 5px 2px #4976ff;
        background-color: #4976ff;
        border: 1px solid #4976ff;
    }
    .active-text{
        padding: 6px 10px 0;
        cursor: pointer;
        height: 30px;
        color: #36f;
    }
</style>