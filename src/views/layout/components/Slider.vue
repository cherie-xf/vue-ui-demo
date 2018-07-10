<template>
    <v-navigation-drawer temporary :value="rightdrawer" right fixed class="right-drawer">
      <div class="user-avatar" @click.stop="toggleRightDrawer">
          <v-badge overlap>
            <span slot="badge">3</span>
            <v-avatar color="purple red--after">
              <img :src="avatar" alt="Oui oui">
            </v-avatar>
          </v-badge>
      </div>
      <v-list class="drawer-container">
        <div class="welcome-info">Welcome {{name}} !</div>
        <v-subheader class="slider-title">System Information </v-subheader>
        <div class="sys-info slide-content">
          <div class="myrow">
            <div class="mytitle">Platform Type</div>
            <div class="mycontent">FAZVM64</div>
          </div>
          <div class="myrow">
            <div class="mytitle">Firmware Version</div>
            <div class="mycontent">
              v6.00-build0162 180612(Interim)
              <span class="setting-icon">
                 <svg-icon :icon-class="`upload`" :class-name="'upload'"></svg-icon>
              </span>
              </div>
          </div>
          <div class="myrow">
            <span class="mytitle">Administrative Domain:</span>
            <i-switch v-model="enableAdom" @on-change="changeEnableAdom" size="small"></i-switch>
          </div>
        </div>
        <v-subheader class="slider-title">Explore</v-subheader>
        <div class="slide-content explore-info"> 
          <div class="myaction">
            <svg-icon :icon-class="'user-o'" :class-name="'sidebar icon-shadow small'"></svg-icon>
            <span class="my-text">Profile</span>
          </div>
          <div class="myaction">
            <svg-icon :icon-class="'edit-o'" :class-name="'sidebar icon-shadow small'"></svg-icon>
            <span class="my-text">Change Password</span>
          </div>
          <div class="myaction">
            <svg-icon :icon-class="'logout-o'" :class-name="'sidebar icon-shadow small'"></svg-icon>
            <span class="my-text" @click="logout">Logout</span>
          </div>
        </div>

        <v-subheader class="slider-title">Message<span class="my-content-number">3</span> </v-subheader>
        <div class="slide-content message-info"> 
          <Alert>515 unregistered device(s)</Alert>
          <Alert type="warning">Analytic is using 0% of allocate disk space</Alert>
          <Alert type="error">License will expert in 5 days</Alert>
        </div>

        <v-subheader class="slider-title">Task Monitor<small>(Latest 3 tasks)</small></v-subheader>
        <div class="slide-content task-info"> 
          <tooltip content="10% completed" placement="top" class="mytooltip">
            <div class="myalert myrunning">
              <small><i>2 housrs ago</i></small>
              <div class="mycontent">Delete devices</div>
              <small>Running at Adom: <b>Corporate</b></small>
            </div>
          </tooltip>
          <div class="myalert mysuccess">
            <small><i>12 housrs ag</i>o</small>
            <div class="mycontent">dvmdb adom FGT_FCT object member</div>
            <small>Success at Adom: <b>FGT_FCT</b></small>
          </div>
          <div class="myalert mydanger">
            <small><i>2 days ag</i>o</small>
            <div class="mycontent">Add/delete unregistered Devices</div>
            <small>Failed at Adom: <b>FOS_QA</b></small>
          </div>
        </div>

        <v-subheader class="slider-title">Themes
          <v-btn fab small class="current-btn">
            <v-jumbotron :gradient="gradient" :height="`100%`"> </v-jumbotron>
          </v-btn>
        </v-subheader>
        <div class="text-xs-center theme-btns">
          <v-btn fab small v-for="theme in themes" :key="theme.text" @click="changeTheme(theme.value)" :title="theme.name">
            <v-jumbotron :gradient="theme.text" :height="`100%`">
            </v-jumbotron>
          </v-btn>
        </div>
      </v-list>
    </v-navigation-drawer>
</template>
<script>
import { mapGetters } from 'vuex'
const Themes = [
{
  value: {from:'#fdfbfb', to:'#ebedee'},
  text: '#fdfbfb 0%, #ebedee 100%',
  name: 'Cloudy Knoxville' 
},
{
  value: {from:'#FFFEFF', to:'#D7FFFE'},
  text: '#FFFEFF 0%, #D7FFFE 100%',
  name: 'Salt Mountain - default' 
},
{
  value: {from:'#f5efef', to:'#feada6'},
  text: '#f5efef 0%, #feada6 100%',
  name: 'Fresh Milk'
},
{
  value: {from:'#e6dee9', to:'#bdc2e8'},
  text: '#e6dee9 0%, #bdc2e8 100%',
  name: 'Frozen Dreams'
},
{
  value: {from: '#ffecd2', to: '#fcb69f'},
  text: '#ffecd2 0%, #fcb69f 100%',
  name: 'Juicy Peach'
},
{
  value: {from: '#FFE6FA', to: '#E3FDF5'},
  text: '#FFE6FA 0%, #E3FDF5 100%',
  name: 'Perfect White'
},
{
  value: {from:'#fed6e3', to:'#a8edea'},
  text: '#fed6e3 0%, #a8edea 100%',
  name: 'Rare Wind'
},
{
  value: {from:'#fff1eb', to:'#ace0f9'},
  text: '#fff1eb 0%, #ace0f9 100%',
  name: 'New York'
},
{
  value: {from:'#e4efe9', to:'#93a5cf'},
  text: '#e4efe9 0%, #93a5cf 100%',
  name: 'Cochiti Lake'
},
{
  value: {from:'#8baaaa', to:'#ae8b9c'},
  text: '#8baaaa 0%, #ae8b9c 100%',
  name: 'Jungle Day',
  dark:true,
},
{
  value: {from:'#517fa4', to:'#243949'},
  text: '#517fa4 0%, #243949 100%',
  name: 'Solid Stone',
  dark:true,
},
{
  value: {from:'#267985', to:'#0f384b'},
  text: '#267985 0%, #0f384b 100%',
  name: "Arielle's Smile",
  dark:true,
},
{
  value: {from:'#282a4a', to:'#05060f'},
  text: '#282a4a 0%, #05060f 100%',
  name: 'Eternal Constanc',
  dark:true,
},
{
  value: {from:'#20282a', to:'#0d0d0d'},
  text: '#20282a 0%, #0d0d0d 100%',
  name: 'night',
  dark:true,
},
]
export default {
  data(){
    return{
      themes: Themes,
      enableAdom: true,
    }
  },
  computed: {
    ...mapGetters([
      'rightdrawer',
      'gradient',
      'avatarid',
      'name',
    ]),
    avatar(){
      return "static/images/avatar/avatar-"+ this.avatarid+".jpg"
    }
  },
  methods: {
    toggleRightDrawer() {
      this.$store.dispatch('ToggleRight')
    },
    changeTheme(value){
      this.$store.dispatch('UpdateGradient', value)
    },
    changeEnableAdom(){
      console.log('change enable adom: ', this.enableAdom);
    },
    logout(){
      this.$store.dispatch('LogOut').then(() => {
        this.$router.push({ path: '/login' })
      })
    }
  },
  mounted(){

  }
}
</script>
<style lang="less" scoped>
.flex-center {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.right-drawer{
  overflow: initial;
  padding: 0px;
  .slider-title{
    //font-size: 0.8em;
  }
  //overflow-y: auto;
  .drawer-container{
    max-height: 100%;
    overflow-y: auto;
    .ivu-tooltip-rel{
      display: block;
    }
  }
  .mytootip{
    .mycontent{
      width: 254px;
    }
  }
}
  .myrow{
    padding-bottom: 10px;
    font-size: 1.1em;
    .mytitle {
      font-weight: 700;
    }
    .mycontent {
      display: flex;
      align-items: center;
    }
  }
  .theme-btns{
    button{
      width: 22px;
      height: 22px;
      border-radius: 100%;
      overflow: hidden;
    }
  }
  .current-btn {
      width: 20px;
      height: 20px;
      border-radius: 100%;
      overflow: hidden;
  }
  .user-avatar {
    cursor: pointer;
    background-color: rgba(204, 204, 204, 0.8);
    position: absolute;
    top: 10px;
    left: -80px;
    width: 80px;
    height: 50px;
    display: flex;
    align-content: center;
    border-bottom-left-radius: 30px; 
    border-top-left-radius: 30px;
  }
  .slide-content{
    padding: 0 30px;
  }
  .myalert{
    color: white;
    padding: 5px;
    background-color: rgba(0, 0, 0, 0.6);
    margin: 4px 0px;
    &.myrunning{
      width:238px;
      border-left-width: 25px;
      border-top-width: 0px;
      border-bottom-width: 0px;
      border-right-width: 0px;
      border-style: solid;
      border-color: #4caf50;
    }
    &.mysuccess{
      background-color: #4caf50;
    }
    &.mywarning{
      background-color: #e67e22;
    }
    &.mydanger{
      background-color: #e74c3c;
    }
  }
  .my-content-number:extend(.flex-center){
    font-size: 0.8em;
    width: 22px;
    height: 22px;
    background-color: #1976d2;
    color:white;
    //border: 1px solid @sbarFontColor;
    border-radius: 50%;
    box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12);
  }
  .myaction{
    margin-bottom: 8px;
    cursor: pointer;
    &:hover{
      background-color: #ccc;
    }
    .my-text{
      margin-left: 15px;
      color: #1976d2
    }
  }
  .welcome-info{
    padding-left: 16px;
  }
</style>
