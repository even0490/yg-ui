import Layout from "./layout/Layout.vue";

Layout.install = function(Vue) {
  Vue.component(Layout.name, Layout);
};

export { Layout as default, Layout };
