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
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    roles: state => state.user.roles
  }
  export default getters