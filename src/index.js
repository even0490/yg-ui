import "../static/reset.css";
import "../static/border.scss";
import "../static/transition.css";
import Notification from "./components/Notification";
import Button from "./components/Button";
import Carousel from "./components/Carousel";
import Dialog from "./components/Dialog";
import Input from "./components/Input";
import Form from "./components/Form";
import Icon from "./components/Icon";
import Toast from "./components/Toast";
import Loading from "./components/Loading";
import CheckBox from "./components/CheckBox";
import Transition from "./components/Transition";
import CheckBoxGroup from "./components/CheckBoxGroup";
import Popup from "./components/Popup";

import ToastPlugin from "./plugin/toast";
import LoadingPlugin from "./plugin/loading";
import DialogPlugin from "./plugin/dialog";
import AlertPlugin from "./plugin/alert";
import ConfirmPlugin from "./plugin/confirm";
import Picker from "./components/Picker";

const components = {
  Notification,
  Button,
  Carousel,
  Dialog,
  Input,
  Icon,
  Toast,
  Form,
  Loading,
  CheckBox,
  CheckBoxGroup,
  Picker,
  Popup,
  Transition
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
