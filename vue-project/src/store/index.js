import { createStore } from 'vuex'

export default new createStore({
  state() {
    return {
      containerAnimation: null
    }
  },
  mutations: {
    setContainerAnimation(state, containerAnimation) {
      state.containerAnimation = containerAnimation
    }
  }
})
