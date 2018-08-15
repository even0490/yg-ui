import "./style/reset.css";
import Notification from "./components/Notification";
import Button from "./components/Button";
import Dialog from "./components/Dialog";
import Input from "./components/Input";
import Toast from "./components/Toast";
import Loading from "./components/Loading";
import ToastPlugin from "./plugin/toast";
import LoadingPlugin from "./plugin/loading";
import DialogPlugin from "./plugin/dialog";
import AlertPlugin from "./plugin/alert";
import ConfirmPlugin from "./plugin/confirm";

const components = {
  Notification,
  Button,
  Dialog,
  Input,
  Toast,
  Loading
};

const plugin = {
  ToastPlugin,
  LoadingPlugin,
  DialogPlugin,
  AlertPlugin,
  ConfirmPlugin
};

const install = function(Vue, options = {}) {
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
