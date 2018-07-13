<template>
    <div class="spinner-container" v-show="visiable">
        <div class="loader loader1">
            <div class="spinner-inner"></div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Spinner',
    props: ['show'],
    mounted(){
        $(this.$el).find('.loader1').children('.spinner-inner').css('border-color',  `${this.colors.level2.value} ${this.colors.level4.value}`);
    },
    computed:{
        ...mapGetters([
        'colors'
        ]),
        visiable(){
            return this.show
        }
    }
}
</script>

<style lang="css">
@keyframes load1{
  50%{
    transform:rotatez(180deg) scale(1.5);
    border-style:dotted;
  }
  100%{
    transform:rotatez(360deg) scale(0.9);
  }
}
.spinner-container{
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display:flex;
  align-items:center;
  justify-content:center;
}
  .spinner-inner{
    color:white;
    height:40px;
    width:40px;
    background:transparent;
    border-radius:50%;
    border:8px solid blue;
    border-color:#1565C0 #26C6DA;
    animation:load1 2s infinite;
    }
</style>

