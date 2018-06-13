<template>
    <v-navigation-drawer temporary :value="rightdrawer" right fixed class="right-drawer">
      <div class="user-avatar" @click.stop="toggleRightDrawer">
          <v-badge overlap>
            <span slot="badge">3</span>
            <v-avatar color="purple red--after">
              <img src="https://vuetifyjs.com/static/doc-images/john.jpg" alt="John">
            </v-avatar>
          </v-badge>
      </div>
    </v-navigation-drawer>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'rightdrawer',
    ]),
  },
  methods: {
    toggleRightDrawer() {
      this.$store.dispatch('ToggleRight')
    },
  }
}
</script>
<style lang="less" scoped>
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
