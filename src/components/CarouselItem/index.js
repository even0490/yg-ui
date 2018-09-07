import CarouselItem from "./CarouselItem.vue";

CarouselItem.install = function(Vue, options) {
  Vue.component(CarouselItem.name, CarouselItem);
};

export default CarouselItem;
