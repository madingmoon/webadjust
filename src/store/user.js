const user = {
  state:{
    token:""
  },
  mutations:{
    USER_INFO(state,info){
      state.token = info
    }
  },
  actions:{
    saveUserInfo({ commit },data){
      commit('USER_INFO',data)
    }
  }
};
export default user