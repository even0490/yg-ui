import Carousel from "./Carousel";

Carousel.install = function(Vue, options) {
  Vue.component(Carousel.name, Carousel);
};

export default Carousel;
