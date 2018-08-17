<template>
  <div class="yg-checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "yg-checkbox-group",
  data() {
    return {
      childrenBox: {}
    };
  },
  computed: {
    checkArr() {
      return Object.keys(this.childrenBox).filter(key => {
        return this.childrenBox[key].checked === true;
      });
    }
  },
  props: {
    value: {},
    disabled: {
      type: Boolean,
      default: false
    }
  },
  provide: function() {
    return {
      registerCheckBox: this.registerCheckBox
    };
  },
  methods: {
    registerCheckBox(checkBox, value) {
      this.$set(this.childrenBox, value, checkBox);
      checkBox.$on("change", this.childBoxChange);
    },
    childBoxChange() {
      this.$emit("input", this.checkArr);
      this.$emit("change", this.checkArr);
    }
  },
  mounted() {
    this.value.forEach(key => {
      this.childrenBox[key].checked = true;
    });
  }
};
</script>
