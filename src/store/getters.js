const getters = {
    sidebar: state => state.app.sidebar,
    leftdrawer: state => state.app.leftdrawer,
    rightdrawer: state => state.app.rightdrawer,
    gradient: state => {
      return `${state.theme.gradient.from} 0%, ${state.theme.gradient.to} 100%`;
    },
    topBgColor: state => {
      return `${state.theme.gradient.from} 0%, ${state.theme.gradient.from} 100%`;
    },
    themes: state => state.theme.opts,
    colors: state => state.theme.colors,
    chartTheme: state => state.theme.chartTheme,
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