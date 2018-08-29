let config = {
  Button: {
    defaultBackground: "#c3ab69",
    defaultText: "white",
    disabledBackground: "#cccccc",
    disabledText: "white",
    cancelBackground: "white",
    cancelText: "#999999"
  },
  Input: {
    background: "white",
    borderColor: "#e8e8e8"
  },
  CheckBox: {
    borderColor: "#c3ab69",
    unCheckBg: "white",
    checkBg: "white",
    checkColor: "#c3ab69"
  },

  Confirm: {
    color: "#AD935D"
  },
  Cancel: {
    color: "#AD935D"
  }
};

export default config;

export const setOptions = (options, componentName) => {
  if (componentName) {
    Object.assign(config[componentName], options && options[componentName]);
  } else {
    Object.keys(config).forEach(key => {
      Object.assign(config[key], options);
    });
  }
};
