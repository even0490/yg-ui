import Toast from "./Toast";

Toast.install = function(Vue, options) {
  Vue.component(Toast.name, Toast);
};

export default Toast;
