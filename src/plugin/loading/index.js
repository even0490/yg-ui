import LoadingComponent from "../../components/Loading/Loading.vue";
let $vm;

const plugin = {
  install(vue, pluginOptions = {}) {
    const Loading = vue.extend(LoadingComponent);

    if (!$vm) {
      $vm = new Loading({
        el: document.createElement("div"),
        data: pluginOptions
      });
      document.body.appendChild($vm.$el);
    }

    const loading = {
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

    vue.prototype.$loading = loading;
  }
};

export default plugin;
export const install = plugin.install;
