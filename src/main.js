// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// "@"等同於“/src”
import Vue from "vue";
import axios from "axios";

// Modules
import App from "./App";
import router from "./router";
import store from "@/store";

// 面向開發者的提示 默認爲 false
Vue.config.productionTip = true;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  axios,
  components: { App },
  template: "<App/>"
});
