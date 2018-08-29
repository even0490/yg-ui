let config = {
  Button: {
    defaultBackground: "#c3ab69",
    defaultText: "white",
    defaultActiveBg: "#af9b59",
    disabledBackground: "#cccccc",
    disabledText: "white",
    cancelBackground: "white",
    cancelText: "#999999",
    cancelActiveBg: "#ececec"
  },
  Input: {
    background: "white",
    borderColor: "#e8e8e8",
    borderRadius: "4px",
    borderWidth: "1px"
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
    Object.assign(config[componentName], options);
  } else {
    Object.keys(config).forEach(key => {
      Object.assign(config[key], options);
    });
  }
};
