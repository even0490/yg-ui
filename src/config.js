let config = {
  Button: {
    defaultBackground: "red",
    defaultText: "white",
    defaultBorder: "yellow",
    infoBackground: ""
  },
  Input: {
    defaultBackground: "red",
    defaultBorder: "yellow"
  }
};

export default config;

export const setOptions = (options, componentName) => {
  if (componentName) {
    Object.assign(config[componentName], options[componentName]);
  } else {
    Object.keys(config).forEach(key => {
      Object.assign(config[key], options[key]);
    });
  }
};
