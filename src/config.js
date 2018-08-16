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
    defaultBackground: "red",
    defaultBorder: "yellow"
  },
  CheckBox: {
    borderColor: "#c3ab69",
    unCheckBg: "white",
    checkBg: "white",
    checkColor: "#c3ab69"
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
