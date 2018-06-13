import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
    leftdrawer: false,
    rightdrawer: false,
    gradient: {
      from: '#ffffff',
      to:'#ffffff',
    },
    device: 'desktop'
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
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    TOGGLE_LEFT: (state) => {
      state.leftdrawer = !state.leftdrawer
      console.log('left ', state.leftdrawer);
    },
    TOGGLE_RIGHT: (state) => {
      state.rightdrawer = !state.rightdrawer
      console.log('right ', state.rightdrawer);
    },
    UPDATE_GRADIENT:(state,args)=>{
      state.gradient.from = args.from;
      state.gradient.to = args.to;
    },
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    CloseSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    ToggleLeft({commit}) {
      commit('TOGGLE_LEFT')
    },
    ToggleRight({commit}) {
      commit('TOGGLE_RIGHT')
    },
    UpdateGradient({commit}, args) {
      commit('UPDATE_GRADIENT', args)
    }
  }
}

export default app
