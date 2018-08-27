import { setOptions } from "../../config";
import config from "../../config";
import Input from "./Input";

Input.install = function(Vue, options) {
  Vue.component(Input.name, Input);
  setOptions(options, "Input");
  setGlobalStyle(config.Input);
};

function setGlobalStyle(option) {
  let borderRadiusData = option.borderRadius.match(/(\d+)(\w+)/);
  let borderRadiusNum = borderRadiusData[1];
  let borderRadiusUnit = borderRadiusData[2];
  console.log(`${borderRadiusNum}${borderRadiusUnit}`);

  let styleTmp = `
  .yg-input-border.yg-input{
    background:${option.background};
    border-radius:${borderRadiusNum}${borderRadiusUnit};
    border-color:${option.borderColor};
  }
  .yg-input-border.yg-input::after{
    border-width: ${option.borderWidth};
    border-radius:${borderRadiusNum}${borderRadiusUnit};
  }
  @media (max--moz-device-pixel-ratio: 1.49), (-webkit-max-device-pixel-ratio: 1.49), (max-device-pixel-ratio: 1.49), (-webkit-max-device-pixel-ratio: 1.4895833333333333), (max-resolution: 143dpi), (max-resolution: 1.49dppx) {
    .yg-input-border.yg-input::after {
      width: 100%;
      height: 100%;
      border-radius: ${borderRadiusNum}${borderRadiusUnit};
    }
  }
  @media (min--moz-device-pixel-ratio: 1.5) and (max--moz-device-pixel-ratio: 2.49), (-webkit-min-device-pixel-ratio: 1.5) and (-webkit-max-device-pixel-ratio: 2.49), (min-device-pixel-ratio: 1.5) and (max-device-pixel-ratio: 2.49), (-webkit-min-device-pixel-ratio: 1.5) and (-webkit-max-device-pixel-ratio: 2.4895833333333335), (min-resolution: 144dpi) and (max-resolution: 239dpi), (min-resolution: 1.5dppx) and (max-resolution: 2.49dppx) {
    .yg-input-border.yg-input::after {
      width: 200%;
      height: 200%;
      -webkit-transform: scale(0.5);
              transform: scale(0.5);
      border-radius:  ${borderRadiusNum * 2}${borderRadiusUnit};
    }
  }
  @media (min--moz-device-pixel-ratio: 2.5), (-webkit-min-device-pixel-ratio: 2.5), (min-device-pixel-ratio: 2.5), (min-resolution: 240dpi), (min-resolution: 2.5dppx) {
    .yg-input-border.yg-input::after {
      width: 300%;
      height: 300%;
      -webkit-transform: scale(0.33333);
              transform: scale(0.33333);
      border-radius: ${borderRadiusNum * 3}${borderRadiusUnit};
    }
  }`;
  const styleDom = document.createElement("style");
  styleDom.type = "text/css";
  styleDom.innerHTML = styleTmp;
  document.head.appendChild(styleDom);
}

export default Input;
