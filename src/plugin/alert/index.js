import AlertComponent from "../../components/Notification/Notification.vue";
let $vm;

const plugin = {
  install(vue, pluginOptions = {}) {
    const Alert = vue.extend(AlertComponent);

    if (!$vm) {
      $vm = new Alert({
        el: document.createElement("div"),
        data: pluginOptions,
        propsData: {
          cancelBtn: false
        }
      });
      document.body.appendChild($vm.$el);
    }

    const alert = function(options = {}) {
      if (typeof options === "string") {
        options = { text: options };
      }
      return $vm.show(options);
    };

    vue.prototype.$alert = alert;
  }
};

export default plugin;
export const install = plugin.install;
