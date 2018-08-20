<template>
  <div class="formCheck">
    <slot></slot>
  </div>
</template>

<script>
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
    checkForm: function() {
      let checkResult;
      Object.keys(this.inputsObj).forEach(key => {
        let vm = this.inputsObj[key];
        let rules = this.rule[key];
        if (!rules) {
          return;
        }
        rules.find(rule => {
          if (!rule.regex.test(vm.value)) {
            checkResult || (checkResult = {});
            checkResult[key] = rule.regTxt;
            return true;
          }
        });
      });

      return new Promise((resolve, reject) => {
        if (checkResult === undefined) {
          resolve();
        } else {
          reject(checkResult);
        }
      });
    }
  }
};
</script>
