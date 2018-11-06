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
  button.yg-button.yg-button-default{
    background:${option.defaultBackground};
    color:${option.defaultText};
  }
  button.yg-button.yg-button-default:active{
    background:${option.defaultActiveBg}
  }
  button.yg-button.yg-button-cancel{
    background:${option.cancelBackground};
    color:${option.cancelText};
  }
  button.yg-button.yg-button-cancel:active{
    background:${option.cancelActiveBg}
  }
  button.yg-button.yg-button-disabled{
    background:${option.disabledBackground};
    color:${option.disabledText};
  }`;
  const styleDom = document.createElement("style");
  styleDom.type = "text/css";
  styleDom.innerHTML = styleTmp;
  document.head.appendChild(styleDom);
}

export default Button;
