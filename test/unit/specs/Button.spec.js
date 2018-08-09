import Vue from "vue";
import Button from "../../../src/components/Button/Button";

describe("Button.vue", () => {
  it("should render correct contents", () => {
    const Constructor = Vue.extend(Button);
    const vm = new Constructor({
      propsData: {
        btnTxt: "取消"
      }
    }).$mount();
    expect(vm.$el.querySelector(".confirm").textContent.trim()).toEqual("取消");
  });
});
