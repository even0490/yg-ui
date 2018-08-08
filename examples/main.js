// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import Toast from "@/components/Toast/index";

import Vuerify from "vuerify";
Vue.use(Toast, {});
Vue.use(Vuerify /*, 添加自定义规则，默认提供了 email, required, url 等规则 */);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
