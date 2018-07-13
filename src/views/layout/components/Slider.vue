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
        <div class="welcome-info">
          <span>Welcome {{name}} !</span>
          <Icon type="log-out"  @click="logout" :size="40" :color="colors.level2.value" class="logout"/>
        </div>
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
          <v-btn fab small v-for="(theme, index) in themes" :key="index" @click="changeTheme(theme.value, index)" :title="theme.name">
            <v-jumbotron :gradient="theme.text" :height="`100%`">
            </v-jumbotron>
          </v-btn>
        </div>
      </v-list>
    </v-navigation-drawer>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data(){
    return{
      enableAdom: true,
    }
  },
  computed: {
    ...mapGetters([
      'rightdrawer',
      'gradient',
      'avatarid',
      'themes',
      'name',
      'colors'
    ]),
    avatar(){
      return "static/images/avatar/avatar-"+ this.avatarid+".jpg"
    }
  },
  methods: {
    toggleRightDrawer() {
      this.$store.dispatch('ToggleRight')
    },
    changeTheme(value, index){
      this.$store.dispatch('UpdateTheme', {value: value, index: index})
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
    console.log('themes', this.themes)

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
    padding: 0 16px;
    font-size: 1.3em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logout{
      cursor: pointer;
    }
  }
</style>
