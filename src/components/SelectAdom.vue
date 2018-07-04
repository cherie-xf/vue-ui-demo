<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <div class="dialog-container">
            <v-btn :color="color.in" fab small @click="adomSelect" class="back-btn">
                <svg-icon :icon-class="`goback`" :class-name="`goback small`"></svg-icon>
            </v-btn>

        </div>
    </v-dialog>
</template>
<script>
const barColor = {
    'in': 'teal lighten-2',
    'out': 'teal lighten-4',
}
export default {
    name: 'SelectAdom',
    props: ['showAdom'],
    data(){
        return {
            color: barColor,

        }
    },
    computed:{
        dialog(){
            return this.showAdom
        }
    },
    methods:{
        adomSelect(){
            this.$emit('adomselect', {adom: 'test'})
        }
    }
}
</script>
<style lang="less" scoped>
    .dialog-container{
        background-color: white;
        height: 100%
    }


</style>


