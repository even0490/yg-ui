import Loading from "./Loading";

Loading.install = function(Vue, options) {
  Vue.component(Loading.name, Loading);
};

export default Loading;
