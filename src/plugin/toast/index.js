import ToastComponent from "../../components/Toast/Toast.vue";
let $vm;

const plugin = {
  install(vue, pluginOptions = {}) {
    const Toast = vue.extend(ToastComponent);

    if (!$vm) {
      $vm = new Toast({
        el: document.createElement("div"),
        data: pluginOptions
      });
      document.body.appendChild($vm.$el);
    }

    const toast = function(options = {}) {
      if (typeof options === "string") {
        options = { text: options };
      }
      return $vm.show(options);
    };

    vue.prototype.$toast = toast;
  }
};

export default plugin;
export const install = plugin.install;
