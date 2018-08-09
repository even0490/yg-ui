import { setOptions } from "../../config";
import Button from "./Button";

Button.install = function(Vue, options) {
  Vue.component(Button.name, Button);
  setOptions(options, "Button");
};

export default Button;
