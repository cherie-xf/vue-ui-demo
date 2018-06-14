<template>
    <v-navigation-drawer temporary :value="rightdrawer" right fixed class="right-drawer">
      <div class="user-avatar" @click.stop="toggleRightDrawer">
          <v-badge overlap>
            <span slot="badge">3</span>
            <v-avatar color="purple red--after">
              <img src="https://vuetifyjs.com/static/doc-images/lists/3.jpg" alt="Oui oui">
            </v-avatar>
          </v-badge>
      </div>
      <v-list>
        <v-subheader class="title">Themes</v-subheader>
        <div class="text-xs-center theme-btns">
          <v-btn fab small v-for="theme in themes" :key="theme" @click="changeTheme(theme.value)">
            <v-jumbotron :gradient="theme.text" :height="`100%`">
            </v-jumbotron>
          </v-btn>
        </div>
      </v-list>
    </v-navigation-drawer>
</template>
<script>
import { mapGetters } from 'vuex'
const Themes = [{
  value: {from: '#ffecd2', to: '#fcb69f'},
  text: '#ffecd2 0%, #fcb69f 100%'
},
{
  value: {from:'#fed6e3', to:'#a8edea'},
  text: '#fed6e3 0%, #a8edea 100%'
},
{
  value: {from:'#e2ebf0', to:'#cfd9df'},
  text: '#e2ebf0 0%, #cfd9df 100%'
},
{
  value: {from:'#fdfbfb', to:'#ebedee'},
  text: '#fdfbfb 0%, #ebedee 100%'
},
{
  value: {from:'#f6f3ff', to:'#cd9cf2'},
  text: '#f6f3ff 0%, #cd9cf2 100%'
},
{
  value: {from:'#fff1eb', to:'#ace0f9'},
  text: '#fff1eb 0%, #ace0f9 100%'
},
]
export default {
  data(){
    return{
      themes: Themes,

    }
  },
  computed: {
    ...mapGetters([
      'rightdrawer',
    ]),
  },
  methods: {
    toggleRightDrawer() {
      this.$store.dispatch('ToggleRight')
    },
    changeTheme(value){
      this.$store.dispatch('UpdateGradient', value)
    }
  },
  mounted(){
    console.log(this.themes[0])

  }
}
</script>
<style lang="less" scoped>
  .theme-btns{
    button{
      border-radius: 100%;
      overflow: hidden;

    }
  }
  .right-drawer{
    overflow: initial;
  }
  .user-avatar {
    cursor: pointer;
    background-color: rgba(204, 204, 204, 0.8);
    position: absolute;
    top: 15px;
    left: -100px;
    width:100px;
    height: 50px;
    display: flex;
    align-content: center;
    border-bottom-left-radius: 30px; 
    border-top-left-radius: 30px;
  }
</style>
