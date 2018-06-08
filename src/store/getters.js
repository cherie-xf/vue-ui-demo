const getters = {
    sidebar: state => state.app.sidebar,
    leftdrawer: state => state.app.leftdrawer,
    rightdrawer: state => state.app.rightdrawer,
    device: state => state.app.device,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    roles: state => state.user.roles
  }
  export default getters