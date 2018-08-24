<template>
  <div class="yg-button"
       :class="className">
    <button @click="handleClick"
            :class="btnClass"
            :disabled="disabled">
      <slot>submit</slot>
    </button>
  </div>
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
      let className = "";
      switch (this.size) {
        case "mini":
          className = "yg-button-mini";
          break;
        case "small":
          className = "yg-button-small";
          break;
        case "medium":
          className = "yg-button-medium";
          break;
        default:
          className = "yg-button-medium";
          break;
      }
      return className;
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
  text-align: center;
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
.yg-button button {
  padding: 0 20px;
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
  border: none;
  border-radius: 4px;
  outline: none;
}
.yg-button .yg-button-cancel {
  @include border(1px, #e8e8e8, solid, 4px);
}
</style>
