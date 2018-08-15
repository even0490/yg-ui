import DialogComponent from "../../components/Dialog/Dialog.vue";
let $vm;

const plugin = {
  install(vue, pluginOptions = {}) {
    const Dialog = vue.extend(DialogComponent);

    if (!$vm) {
      $vm = new Dialog({
        el: document.createElement("div"),
        data: pluginOptions
      });
      document.body.appendChild($vm.$el);
    }

    const dialog = {
      show(options = {}) {
        if (typeof options === "string") {
          options = { text: options };
        }
        return $vm.show(options);
      },
      hide() {
        return $vm.hide();
      }
    };

    vue.prototype.$dialog = dialog;
  }
};

export default plugin;
export const install = plugin.install;
