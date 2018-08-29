import DialogComponent from "../../components/Dialog/Dialog.vue";
let $vm;

function initVm(vue) {
  return new vue({
    el: document.createElement("div"),
    name: "yg-dialogplugin",
    data() {
      return {
        text: "",
        visible: false,
        showMask: true,
        maskHide: true
      };
    },
    components: {
      "yg-dialog": DialogComponent
    },
    methods: {
      editVisible(vl) {
        this.visible = vl;
      },
      show({ showMask = true, maskHide = true, text = "" }) {
        this.visible = true;
        this.showMask = showMask;
        this.maskHide = maskHide;
        this.text = text;
      }
    },
    render: function(h) {
      return (
        <yg-dialog
          visible={this.visible}
          showMask={this.showMask}
          maskHide={this.maskHide}
          {...{ on: { "update:visible": this.editVisible } }}
        >
          {this.text}
        </yg-dialog>
      );
    }
  });
}

const plugin = {
  install(vue, pluginOptions = {}) {
    const dialog = (options = {}) => {
      if (typeof options === "string") {
        options = { text: options };
      }
      if (!$vm) {
        $vm = initVm(vue);
        document.body.appendChild($vm.$el);
      }

      $vm.show(options);
    };

    vue.prototype.$dialog = dialog;
  }
};

export default plugin;
export const install = plugin.install;
