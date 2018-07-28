import Cookies from 'js-cookie'
const  defaultLayouts = {
      threat: {
        list:[
          {"x":0,"y":0,"w":12,"h":3,"i":"0", type:'barline'},
          {"x":0,"y":4,"w":12,"h":9,"i":"1", type:'list_table'},
        ],
        dd:[
          {"x":0,"y":0,"w":6,"h":3,"i":"0", type:'barline'},
          {"x":6,"y":0,"w":6,"h":3,"i":"1", type:'list_table'},
          {"x":0,"y":4,"w":12,"h":9,"i":"2", type:'drilldown_table'},
        ],
        log:[
          {"x":0,"y":0,"w":6,"h":3,"i":"0", type:'list_table'},
          {"x":6,"y":0,"w":6,"h":3,"i":"1", type:'drilldown_table'},
          {"x":0,"y":4,"w":12,"h":9,"i":"3", type:'logview_table'},
        ],
        detail:[
          {"x":0,"y":0,"w":6,"h":3,"i":"0", type:'list_table'},
          {"x":6,"y":0,"w":6,"h":3,"i":"1", type:'drilldown_table'},
          {"x":0,"y":4,"w":8,"h":9,"i":"3", type:'logview_table'},
          {"x":8,"y":4,"w":4,"h":9,"i":"4", type:'logview_detail'},
        ],
      }

};
const defaultAdom ={
      current: 'root',
      recent: ['root','csf'],
    }

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
    leftdrawer: false,
    rightdrawer: false,
    gradient: {
      from: '#fffeff',
      to:'#d7fffe',
    },
    layouts: Cookies.get('layouts') ? JSON.parse(Cookies.get('layouts')) : defaultLayouts,
    //layouts: defaultLayouts,
    adom:Cookies.get('adom') ? JSON.parse(Cookies.get('adom')) : defaultAdom,
    device: 'desktop',
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
    },
    TOGGLE_RIGHT: (state) => {
      state.rightdrawer = !state.rightdrawer
    },
    UPDATE_GRADIENT:(state,args)=>{
      state.gradient.from = args.from;
      state.gradient.to = args.to;
    },
    UPDATE_LAYOUT:(state, args)=>{
      state.layouts[args.viewname][args.level] = args.layout;
      Cookies.set('layouts', JSON.stringify(state.layouts))
    },
    RESET_LAYOUT:(state)=>{
      state.layouts = defaultLayouts;
      Cookies.set('layouts', JSON.stringify(state.layouts))
    },
    SELECT_ADOM:(state, args)=>{
      state.adom.current = args.adom
      state.adom.recent = state.adom.recent.slice(0, 3)
      if(state.adom.recent.indexOf(args.adom)<0){
        state.adom.recent.unshift(args.adom)
      }
      Cookies.set('adom', JSON.stringify(state.adom))
    }
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
    },
    UpdateLayout({commit}, args) {
      commit('UPDATE_LAYOUT', args)
    },
    ResetLayout: ({ commit }) => {
      commit('RESET_LAYOUT')
    },
    SelectAdom({commit}, args){
      commit('SELECT_ADOM', args)
    }
  }
}

export default app
