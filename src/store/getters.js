const getters = {
    sidebar: state => state.app.sidebar,
    leftdrawer: state => state.app.leftdrawer,
    rightdrawer: state => state.app.rightdrawer,
    gradient: state => {
      return `${state.app.gradient.from} 0%, ${state.app.gradient.to} 100%`;
    },
    topBgColor: state => {
      return `${state.app.gradient.from} 0%, ${state.app.gradient.from} 100%`;
    },
    device: state => state.app.device,
    layouts: state => state.app.layouts, 
    adom: state => state.app.adom, 
    currentAdom:state=> state.app.adom.current,
    token: state => state.user.token,
    avatarid: state => state.user.avatarid,
    name: state => state.user.name,
    roles: state => state.user.roles,
    cachedViews: state => state.tagsView.cachedViews,
    visitedViews: state => state.tagsView.visitedViews
  }
  export default getters