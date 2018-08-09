import { setOptions } from "../../config";
import Input from "./Input";

Input.install = function(Vue, options) {
  Vue.component(Input.name, Input);
  setOptions(options, "Input");
};

export default Input;
