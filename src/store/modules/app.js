import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
    device: 'desktop',
    leftdrawer:{
      opened: false,
    },
    rightdrawer: {
      opened: false,
    }
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
      console.log('toggle sidebar');
    },
    TOGGLE_LEFTDRAWER: state => {
      state.leftdrawer.opened = !state.leftdrawer.opened
      console.log('toggle left');
    },
    TOGGLE_RIGHTDRAWER: state => {
      state.rightdrawer.opened = !state.rightdrawer.opened
      console.log('toggle right');
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    ToggleLeftDrawer: ({ commit }) => {
      commit('TOGGLE_LEFTDRAWER')
    },
    ToggleRightDrawer: ({ commit }) => {
      commit('TOGGLE_RIGHTDRAWER')
    },
    CloseSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    }
  }
}

export default app
