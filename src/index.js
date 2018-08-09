import Button from "./components/Button";
import Input from "./components/Input";
import Toast from "./components/Toast/index.js";

const components = {
  Button,
  Input,
  Toast
};

const install = function(Vue, options) {
  Object.keys(components).forEach(key => {
    Vue.use(components[key], options);
  });
};

export default {
  install
};
