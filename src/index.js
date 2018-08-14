import Alert from "./components/Alert";
import Button from "./components/Button";
import Dialog from "./components/Dialog";
import Input from "./components/Input";
import FormCheck from "./components/FormCheck";
import directive from "./components/Check/index.js";
import Toast from "./components/Toast";
import Loading from "./components/Loading";
import ToastPlugin from "./plugin/toast";
import LoadingPlugin from "./plugin/loading";

const components = {
  Alert,
  Button,
  Dialog,
  Input,
  Toast,
  FormCheck,
  Loading
};

const plugin = {
  ToastPlugin,
  LoadingPlugin
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
