import { setOptions } from "../../config";
import config from "../../config";
import Button from "./Button";

Button.install = function(Vue, options) {
  Vue.component(Button.name, Button);
  setOptions(options, "Button");
  setGlobalStyle(config.Button);
};

function setGlobalStyle(option) {
  let styleTmp = `
  .yg-button-default{
    background:${option.defaultBackground};
    color;${option.defaultText};
  }
  .yg-button-default:active{
    background:${option.defaultActiveBg}
  }
  .yg-button-cancel{
    background:${option.cancelBackground};
    color:${option.cancelText};
  }
  .yg-button-cancel:active{
    background:${option.cancelActiveBg}
  }
  .yg-button-disabled{
    background:${option.disabledBackground};
    color;${option.disabledText};
  }`;
  const styleDom = document.createElement("style");
  styleDom.type = "text/css";
  styleDom.innerHTML = styleTmp;
  document.head.appendChild(styleDom);
}

export default Button;
