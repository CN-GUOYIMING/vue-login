import Vue from "vue";
import Vuex from "vuex";

import auth from "@/store/modules/auth";
import http from "@/store/modules/http";
import message from "@/store/modules/message";

Vue.use(Vuex);

export default new Vuex.Store({
  // 模块化，modules 中的一個子模块都是一個完整的vuex對象
  /**
   * 模块中的數據的調用方式：
   * computed: {
   *  ...mapState('模块的命名空間', ['state 的屬性名']);
   * }
   */
  modules: {
    auth,
    http,
    message
  }
});
