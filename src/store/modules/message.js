export default {
  namespaced: true,
  state: {
    message: { error: "" }
  },
  mutations: {
    setMessage({ message }, payload) {
      message.error = payload.err;
    }
  },
  actions: {
    create({ commit }, payload) {
      commit("setMessage", payload);
    }
  }
};
