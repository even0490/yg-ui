import Button from "./components/Button";
import Input from "./components/Input";
import FormCheck from "./components/FormCheck";
import directive from "./components/Check/index.js";
import Toast from "./components/Toast";
import ToastPlugin from "./plugin/toast";

const components = {
  Button,
  Input,
  Toast,
  FormCheck
};

const plugin = {
  ToastPlugin
};

const install = function(Vue, options) {
  Object.keys(components).forEach(key => {
    Vue.use(components[key], options[key]);
  });

  Object.keys(plugin).forEach(key => {
    Vue.use(plugin[key], options[key]);
  });
};

export default {
  install
};
