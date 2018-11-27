<template>
  <label class="yg-checkbox">
    <span class="yg-checkbox-box">
      <span class="yg-checkbox-innerbox"
            :style="boxStyle">
        <img v-show="value"
             v-if="type==='square'"
             key="checked"
             src="../../assets/checked.png">
        <img v-show="!value"
             v-if="type==='square'"
             key="unchecked"
             src="../../assets/unchecked.png">
        <img v-show="value"
             v-if="type==='circle'"
             key="cirChecked"
             src="../../assets/cirChecked.png">
        <img v-show="!value"
             v-if="type==='circle'"
             key="cirUnchecked"
             src="../../assets/cirUnchecked.png">
      </span>
      <input type="checkbox"
             hidden
             :checked="value"
             :disabled="groupDisabled||disabled"
             :name="name"
             @change="change" />
    </span>
    <span class="yg-checkbox-label">
      <slot>{{label}}</slot>
    </span>
  </label>
</template>

<script>
import config from "../../config.js";
let { CheckBox } = config;
export default {
  name: "yg-checkbox",
  data() {
    return {
      groupDisabled: false
    };
  },
  computed: {
    boxStyle() {
      return {
        "border-color": this.borderColor,
        "background-color": this.value ? this.checkBg : this.unCheckBg
      };
    },
    labelTextFix() {
      let userAgent = window.navigator.userAgent;
      return "";
    }
  },
  inject: {
    registerCheckBox: {
      default: () => {}
    }
  },
  props: {
    label: {
      type: String
    },
    value: {
      type: Boolean
    },
    type: {
      type: String,
      default: "square"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    name: String,
    borderColor: {
      default: CheckBox.borderColor,
      type: String
    },
    unCheckBg: {
      default: CheckBox.unCheckBg,
      type: String
    },
    checkBg: {
      default: CheckBox.checkBg,
      type: String
    },
    checkColor: {
      default: CheckBox.checkColor,
      type: String
    }
  },
  methods: {
    change(e) {
      this.$emit("input", e.target.checked);
      this.$emit("change", e.target.checked);
    }
  },
  mounted() {
    this.registerCheckBox && this.registerCheckBox(this, this.label);
  }
};
</script>

<style lang="scss" scoped>
@import "../../../static/border.scss";
.yg-checkbox {
  display: block;
  user-select: none;
  position: relative;
  line-height: 15px;
  font-size: 0;
  display: flex;
}
.yg-checkbox-box {
  display: block;
}
.yg-checkbox-innerbox {
  position: relative;
  display: block;
  box-sizing: border-box;
  width: 15px;
  height: 15px;
  background-color: #fff;
  z-index: 1;
  text-align: center;
  transition: all 0.2s;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
.yg-checkbox-check {
  display: block;
  position: absolute;
  top: 2px;
  left: 2px;
  width: 11px;
  height: 11px;
}
.yg-checkbox-label {
  display: block;
  font-size: 15px;
}
</style>
