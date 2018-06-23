<template>
<div class="simple-container">

    <div v-if="avatar" class="avatar"></div>
    <div class="list">
        <div class="row" v-for="(val, key) in listData" :key="key">
            <div class="title">{{columns}}[key].label</div>
            <div class="text">val</div>
        </div>
    </div>
    <div class="chart">
        <div class="pie" v-for="data in chartData" :key="data.name"></div>
    </div>
</div>
    
</template>
<script>
export default {
    name: 'simple',
    props:['columns','listData', 'chartData', 'avatar'],
}
</script>
<style lang="less" scoped>
    .simple-container{
        height: 100%;
    }
    .list{
        display: inline-flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

</style>


