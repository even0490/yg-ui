import Vue from "vue";
import Button from "../../../src/components/Button/Button";

describe("Button.vue", () => {
  it("should render correct contents", () => {
    const Constructor = Vue.extend(Button);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector("button").textContent.trim()).toEqual("submit");
  });
});
