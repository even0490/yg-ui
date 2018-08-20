import Transition from "./Transition";

Transition.install = function(Vue, options) {
  Vue.component(Transition.name, Transition);
};

export default Transition;
