import Button from "./components/Button";
import Input from "./components/Input";

const components = {
  Button,
  Input
};

const install = function(Vue) {
  Object.keys(components).forEach(key => {
    Vue.use(components[key]);
  });
};

export default {
  install
};
