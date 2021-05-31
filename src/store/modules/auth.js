/**
 * token を管理
 */
export default {
  namespaced: true,
  state: {
    tenant: "",
    userId: "",
    token: ""
  },
  // 用來改變數據，目的是每次的數據改變都可以被追踪到
  /**
   * mutations: {
   *  myFunction(state, payload){
   *    // state 表示當前模块的數據
   *    // payload 表示參數
   *  }
   * }
   */
  /**
   * 調用方式：
   * methods: {...mapMutations('命名空間', ['mutations 中的方法名']), xxx() {
   *  this.方法名(數據)
   * }}
   */
  mutations: {
    create(state, data) {
      state.tenant = "";
      state.token = data.token;
      state.userId = data.user_id;
    },
    destroy(state) {
      state.tenant = "";
      state.userId = "";
      state.token = "";
    }
  },
  /** Action 中的函数接受一个与 store 实例具有相同方法和属性的 context 对象
   * （即可通过 context.state 和 context.getters 来获取 state 和 getters。）
   *
   * 放入所有的異步操作
   *
   * 因爲改變不會被追踪到，所以不要在 Action 的函數中直接修改 state
   * */
  /**
   * actions: {
   *  myFunctionAsync(context, payload){
   *    // context 表示當前模块的數據
   *    // payload 表示參數
   *    // context.commit('mutation 名', payload)
   *  }
   * }
   */
  actions: {
    create({ commit, dispatch }, data) {
      dispatch(
        "http/post",
        { url: "/auth", data, error: "message.unauthorized" },
        // 使用 root: true 可允許調用其他 vuex 模块的内容
        { root: true }
      )
        .then(res => commit("create", res.data))
        .catch(err => err);
    },
    destroy({ commit, dispatch }, data) {
      dispatch("http/delete", { url: "/auth", data }, { root: true })
        .then(res => commit("create", res.data))
        .catch(err => err)
        // logout anyway ...
        .finally(res => commit("destroy"));
    }
  }
};
