<template>
    <div class="logo-container">
        <div class="row">
            <div class="block left-top"></div>
            <div class="block"></div>
            <div class="block right-top" ></div>
        </div>
        <div class="row">
            <div class="block"></div>
            <div class="block"></div>
        </div>
        <div class="row">
            <div class="block left-bottom"></div>
            <div class="block"></div>
            <div class="block right-bottom"></div>
        </div>
    </div>
</template>
<script>


export default {
    name:'logo',
    props:['color'],
    mounted(){
        if(this.color){
            console.log(this.color);
            $(this.$el).find('.block').css('background-color', this.color);
        }
    }
}
</script>
<style lang="less" scoped>
@log-color: red;
.flex-center{
    display: flex;
    align-items: center;
    justify-content: center;
}
.logo-container {
    width: 100%;
    height: 100%;
    .row {
        width: 100%;
        height: 30%;
        .flex-center;
        justify-content: space-between;
        .block{
            width: 25%;
            height: 80%;
            background-color: @log-color;
            &.left-top{
                border-top-left-radius: 70%;
            }
            &.left-bottom{
                border-bottom-left-radius: 70%;
            }
            &.right-top{
                border-top-right-radius: 70%;
            }
            &.right-bottom{
                border-bottom-right-radius: 70%;
            }
        }
    }
}

</style>

/*
 * Created Date: Friday, June 22nd 2018, 2:35:02 pm
 * Author: cheriefu
 * 
 * Copyright (c) 2018 Your Company
 */



