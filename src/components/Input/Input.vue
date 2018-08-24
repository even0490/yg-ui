<template>
  <div class="yg-input"
       :style="styles">
    <slot name="iconLeft"></slot>
    <div class="input-content">
      <input :id="id"
             :rule="rule"
             :type="types"
             :name="name"
             :placeholder="placeholder"
             :disabled="disabled"
             :readonly="readonly"
             :maxlength="maxlength"
             :minlength="minlength"
             :autocomplete="autoComplete"
             :autofocus="autofocus"
             :form="form"
             ref="input"
             v-model="currentValue"
             @blur="handleBlur"
             @input="handleInput">
    </div>
    <transition name="yg-fade">
      <div v-show="closeBtn&&value"
           @click="clearVal"
           class="icon-close">
        <img src="../../assets/clear.png" />
      </div>
    </transition>
    <div class="icon-pwd"
         v-show="iconPwd"
         @click="changeEye">
      <img :src="types==='password'?closeeye:openeye" />
    </div>
    <slot name="iconRight"></slot>
  </div>
</template>
<script>
import closeeye from "../../assets/closeeye.png";
import openeye from "../../assets/openeye.png";
import config from "../../config.js";
export default {
  name: "yg-input",
  data() {
    return {
      currentValue: this.value,
      textareaCalcStyle: {},
      code: "",
      types: this.type,
      closeeye,
      openeye
    };
  },
  computed: {
    styles() {
      return {
        background: config.Input.background,
        borderColor: config.Input.borderColor
      };
    }
  },
  inject: ["inputRegister"],
  props: {
    id: String,
    prop: {
      type: String,
      default: function() {
        return this.id;
      }
    },
    closeBtn: {
      type: Boolean,
      default: false
    },
    iconPwd: {
      type: Boolean,
      default: false
    },
    rule: {
      type: [String, Object]
    },
    value: [String, Number],
    placeholder: String,
    size: String,
    resize: String,
    readonly: Boolean,
    autofocus: Boolean,
    icon: String,
    disabled: Boolean,
    type: {
      type: String,
      default: "text"
    },
    name: String,
    autoComplete: {
      type: String,
      default: "off"
    },
    form: String,
    maxlength: Number,
    minlength: Number,
    format: {
      type: String
    }
  },
  methods: {
    changeEye() {
      if (this.types == "password") {
        this.types = "text";
      } else {
        this.types = "password";
      }
    },
    clearVal() {
      this.currentValue = "";
      this.$emit("input", "");
    },
    handleInput(event) {
      let pos = this.$refs.input.selectionEnd;
      let originalVal = "";
      let inputVal = event.target ? event.target.value : event;

      switch (this.format) {
        case "bankCard":
          originalVal = inputVal.replace(/\s/g, "");
          this.currentValue = this.bankCardFilter(originalVal);
          break;

        default:
          originalVal = this.currentValue = inputVal;
          break;
      }
      if (this.currentValue.length > inputVal.length) {
        pos += this.currentValue.length - inputVal.length;
      }
      this.$nextTick(() => {
        this.$refs.input.setSelectionRange(pos, pos);
      });
      this.$emit("input", originalVal);
    },
    handleIconClick(event) {
      this.$emit("click", event);
    },
    handleBlur(e) {
      this.$emit("blur", e);
    },
    bankCardFilter(value) {
      if (!value) return "";
      return value.replace(/(\d{4})(?!\s)(?!$)/g, "$1 ");
    }
  },
  mounted() {
    this.inputRegister(this, this.prop);
    this.handleInput(this.value);
  }
};
</script>
<style lang="scss" scope>
@import "../../../static/border.scss";
.icon-pwd {
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
  zoom: 1;
  margin-right: 10px;
}
.icon-pwd img {
  width: 18px;
}

.icon-close {
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
  zoom: 1;
  margin-right: 10px;
}

.icon-close img {
  width: 18px;
  height: 18px;
}

.yg-input {
  display: flex;
  height: 44px;
  background-color: #ffffff;
  position: relative;
  border-radius: 5px;
  @include border(1px, inherit, solid, 4px);
}

.yg-input img {
  width: 18px;
}

.input-content {
  margin-left: 10px;
  flex: 1;
}

.yg-input input {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 0;
  border: none;
  background: none;
  -webkit-tap-highlight-color: rgba(255, 0, 0, 0);
  outline: none;
  -webkit-appearance: none;
}
</style>
