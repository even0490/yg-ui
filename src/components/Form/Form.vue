<template>
  <div class="formCheck" :checkDefault="checkDefault">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "yg-form",
  data: function() {
    return {
      checkDate: {}
    };
  },
  props: {
    checkDefault: {
      type: [Object, Array],
      default: function() {
        return {}; //或者是return {}
      }
    }
  },
  provide: function() {
    return {
      checkForm: this.checkForm
    };
  },

  mounted: function() {
    this.checkDate = this.checkDefault;
  },
  methods: {
    checkForm: function(el) {
      let reg = el.rule.regex;
      if (!reg.test(el.$refs.input.value)) {
        this.checkDate[el.id] = el.rule.regTxt;
      } else {
        delete this.checkDate[el.id];
      }
    }
  }
};
</script>
