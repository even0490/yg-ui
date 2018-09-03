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
    wrapPromise(rule, val) {
      if (rule.regex !== undefined) {
        return () => {
          if (rule.regex.test(val)) {
            return Promise.resolve();
          } else {
            return Promise.reject(rule.regTxt);
          }
        };
      }
      if (rule.fn !== undefined) {
        return async () => {
          rule.fn(val);
        };
      }
      if (rule.promise !== undefined) {
        return () => {
          return rule.promise(val);
        };
      }
    },
    checkForm: function(props) {
      let checkResult;
      if (typeof props === "string") {
        props = [props];
      }

      const queue = new Queue();
      let checkResultPromisrArr = [];

      Object.keys(this.rule)
        .filter(key => {
          if (props === undefined) {
            return true;
          } else {
            return !!props.find(item => item === key);
          }
        })
        .forEach(key => {
          let vm = this.inputsObj[key];
          let rules = this.rule[key];

          rules.forEach(rule => {
            checkResultPromisrArr.push(
              queue.add(this.wrapPromise(rule, vm.value))
            );
          });
        });

      return Promise.all(checkResultPromisrArr).then(
        () => {
          return Promise.resolve();
        },
        err => {
          return Promise.reject(new Error(err));
        }
      );
    }
  }
};
</script>
