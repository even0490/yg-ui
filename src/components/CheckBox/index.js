import { setOptions } from "../../config";
import CheckBox from "./CheckBox";

CheckBox.install = function(Vue, options) {
  Vue.component(CheckBox.name, CheckBox);
  setOptions(options, "CheckBox");
};

export default CheckBox;
