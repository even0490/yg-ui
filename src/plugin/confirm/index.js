import ConfirmComponent from "../../components/Notification/Notification.vue";
let $vm;

const plugin = {
  install(vue, pluginOptions = {}) {
    const Confirm = vue.extend(ConfirmComponent);

    if (!$vm) {
      $vm = new Confirm({
        el: document.createElement("div"),
        data: pluginOptions,
        propsData: {
          closeIcon: false
        }
      });
      document.body.appendChild($vm.$el);
    }

    const confirm = function(options = {}) {
      if (typeof options === "string") {
        options = { text: options };
      }
      return $vm.show(options);
    };

    vue.prototype.$confirm = confirm;
  }
};

export default plugin;
export const install = plugin.install;
