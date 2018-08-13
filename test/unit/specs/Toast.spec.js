import Vue from "vue";
import Toast from "../../../src/components/Toast/Toast";

describe("Toast.vue", () => {
  jest.useFakeTimers();
  const Constructor = Vue.extend(Toast);
  let toastMsg = "toast msg";
  let toastTime = 1000;
  const vm = new Constructor().$mount();
  vm.show({ text: toastMsg, time: toastTime });

  it("should render toast msg", done => {
    Vue.nextTick(() => {
      expect(
        vm.$el.querySelector(".yg-toast__content").textContent.trim()
      ).toEqual(toastMsg);
      done();
    });
  });

  it("Should be hidden automatically", () => {
    setTimeout.mock.calls[0][0]();
    expect(setTimeout.mock.calls.length).toBe(1);
    expect(vm.showFlag).toBe(false);
    expect(setTimeout.mock.calls[0][1]).toBe(toastTime);
  });
});
