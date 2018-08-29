import ConfirmComponent from "../../components/Notification/Notification.vue";
let $vm;

function initVm(vue) {
  return new vue({
    el: document.createElement("div"),
    name: "yg-dialogplugin",
    data() {
      return {
        text: "",
        visible: false,
        title: "提示",
        submitTxt: "确定",
        cancelTxt: "取消"
      };
    },
    components: {
      "yg-confirm": ConfirmComponent
    },
    methods: {
      editVisible(vl) {
        this.visible = vl;
      },
      show({
        title = "提示",
        submitTxt = "确定",
        cancelTxt = "取消",
        text = ""
      }) {
        this.visible = true;
        this.title = title;
        this.submitTxt = submitTxt;
        this.cancelTxt = cancelTxt;
        this.text = text;
        return new Promise((resolve, reject) => {
          this.$refs.confirm.$once("submit", () => {
            resolve();
            this.visible = false;
          });
          this.$refs.confirm.$once("cancel", () => {
            reject();
            this.visible = false;
          });
        });
      }
    },
    render: function(h) {
      return (
        <yg-confirm
          ref="confirm"
          visible={this.visible}
          closeIcon={false}
          title={this.title}
          submitTxt={this.submitTxt}
          cancelTxt={this.cancelTxt}
          {...{ on: { "update:visible": this.editVisible } }}
        >
          {this.text}
        </yg-confirm>
      );
    }
  });
}

const plugin = {
  install(vue, pluginOptions = {}) {
    const confirm = (options = {}) => {
      if (typeof options === "string") {
        options = { text: options };
      }
      if (!$vm) {
        $vm = initVm(vue);
        document.body.appendChild($vm.$el);
      }

      return $vm.show(options);
    };

    vue.prototype.$confirm = confirm;
  }
};

export default plugin;
export const install = plugin.install;
