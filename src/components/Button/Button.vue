<template>
  <button class="yg-button"
          @click="handleClick"
          type="button"
          :class="className"
          :disabled="disabled">
    <slot>submit</slot>
  </button>
</template>
<script>
import config from "../../config.js";
export default {
  name: "yg-button",
  data() {
    return {
      text: this.text,
      state: false
    };
  },
  computed: {
    bgColor() {
      return config.Button[
        (this.disabled ? "disabled" : this.type) + "Background"
      ];
    },
    txtColor() {
      return config.Button[(this.disabled ? "disabled" : this.type) + "Text"];
    },
    btnClass() {
      return "yg-button-" + (this.disabled ? "disabled" : this.type);
    },
    className() {
      let sizeClass = "";
      let typeClass = "yg-button-" + (this.disabled ? "disabled" : this.type);
      switch (this.size) {
        case "mini":
          sizeClass = "yg-button-mini";
          break;
        case "small":
          sizeClass = "yg-button-small";
          break;
        case "medium":
          sizeClass = "yg-button-medium";
          break;
        default:
          break;
      }
      return `${sizeClass} ${typeClass}`;
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "default"
    },
    size: {
      type: String,
      validator: function(value) {
        return ["mini", "small", "medium"].indexOf(value) !== -1;
      }
    },
    txtWeight: {
      type: String,
      default: "normal"
    },
    txtHeight: {
      type: String,
      default: "1rem"
    }
  },
  methods: {
    handleClick(evt) {
      this.text += "...";
      this.state = true;
      this.$emit("click", evt);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../static/border.scss";
.yg-button {
  border: none;
  color: #fff;
  font-size: 16px;
  height: 50px;
  width: 100%;
  text-align: center;
  border-radius: 4px;
  outline: none;
}
.yg-button.yg-button-mini {
  height: 30px;
  font-size: 14px;
}
.yg-button.yg-button-small {
  height: 40px;
}
.yg-button.yg-button-medium {
  height: 44px;
}
.yg-button .yg-button-cancel {
  @include border(1px, #e8e8e8, solid, 4px);
}
</style>
