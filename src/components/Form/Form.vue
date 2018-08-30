<template>
  <form class="formCheck">
    <slot></slot>
  </form>
</template>

<script>
import Queue from "../../tool/Queue.js";
export default {
  name: "yg-form",
  data: function() {
    return {
      inputsObj: {}
    };
  },
  props: {
    rule: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  provide: function() {
    return {
      inputRegister: this.inputRegister
    };
  },

  mounted: function() {},
  methods: {
    inputRegister(vm, key) {
      key && (this.inputsObj[key] = vm);
    },
    checkForm: function(props) {
      let checkResult;
      if (typeof props === "string") {
        props = [props];
      }
      let checkResultPromisrArr = Object.entries(this.inputsObj).map(
        ([key, vm]) => {
          let rules = this.rule[key];
          if (!rules) {
            return;
          } else if (props !== undefined) {
            if (!props.find(item => item === key)) {
              return;
            }
          }

          const queue = new Queue();
          let checkPromiseArr = rules.map(rule => {
            if (rule.regex !== undefined) {
              return queue.add(() => {
                if (rule.regex.test(vm.value)) {
                  return Promise.resolve();
                } else {
                  return Promise.reject({ [key]: rule.regTxt });
                }
              });
            } else if (rule.fn !== undefined) {
              return queue.add(() => {
                if (rule.fn(vm.value)) {
                  return Promise.resolve();
                } else {
                  return Promise.reject({ [key]: rule.regTxt });
                }
              });
            } else if (rule.promise !== undefined) {
              return queue.add(() => {
                return rule.promise(vm.value).then(
                  () => {
                    return Promise.resolve();
                  },
                  () => {
                    return Promise.reject({ [key]: rule.regTxt });
                  }
                );
              });
            }
          });

          return Promise.all(checkPromiseArr).then(
            () => {
              return Promise.resolve();
            },
            err => {
              return Promise.resolve(err);
            }
          );
        }
      );

      return Promise.all(checkResultPromisrArr).then(err => {
        let result;
        err.forEach(item => {
          if (item !== undefined) {
            result === undefined && (result = {});
            Object.assign(result, item);
          }
        });
        if (result === undefined) {
          return Promise.resolve();
        } else {
          return Promise.reject(result);
        }
      });
    }
  }
};
</script>
