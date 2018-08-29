import Vue from "vue";
import Carousel from "../../../src/components/Carousel/Carousel.vue";

describe("Carousel.vue", () => {
  const Constructor = Vue.extend(Carousel);
  it("create", () => {
    const vm = new Constructor({
      propsData: {
        items: [
          {
            picUrl: ""
          },
          {
            picUrl: ""
          },
          {
            picUrl: ""
          }
        ]
      }
    }).$mount();
    expect(vm.$el.querySelectorAll(".yg-carousel-item").length).toEqual(3);
  });
});
