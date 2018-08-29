import AlertComponent from "../../components/Notification/Notification.vue";
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
        submitTxt: "确定"
      };
    },
    components: {
      "yg-alert": AlertComponent
    },
    methods: {
      editVisible(vl) {
        this.visible = vl;
      },
      show({ title = "提示", submitTxt = "确定", text = "" }) {
        this.visible = true;
        this.title = title;
        this.submitTxt = submitTxt;
        this.text = text;
        return new Promise((resolve, reject) => {
          this.$refs.alert.$once("submit", () => {
            resolve();
            this.visible = false;
          });
          this.$refs.alert.$once("close", reject);
        });
      }
    },
    render: function(h) {
      return (
        <yg-alert
          ref="alert"
          visible={this.visible}
          cancelBtn={false}
          title={this.title}
          submitTxt={this.submitTxt}
          {...{ on: { "update:visible": this.editVisible } }}
        >
          {this.text}
        </yg-alert>
      );
    }
  });
}

const plugin = {
  install(vue, pluginOptions = {}) {
    const alert = (options = {}) => {
      if (typeof options === "string") {
        options = { text: options };
      }
      if (!$vm) {
        $vm = initVm(vue);
        document.body.appendChild($vm.$el);
      }

      return $vm.show(options);
    };

    vue.prototype.$alert = alert;
  }
};

export default plugin;
export const install = plugin.install;
