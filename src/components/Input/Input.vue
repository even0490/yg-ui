<template>
  <div class="mobTxt onePixel">
    <div :class="iconLeft=='left'?'icon-left':''">
      <slot name="iconLeft">
      </slot>
    </div>
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
             :inputType="inputType"
             :min="min"
             :max="max"
             :step="step"
             :form="form"
             v-model="currentValue"
             ref="input"
             @blur="handleBlur"
             @input="handleInput">
    </div>


    <div v-show="closeBtn" :class="iconClose =='close'?'icon-close':''">
      <slot name="iconClose">

      </slot>
    </div>
    <div :class="iconPwd?'icon-pwd':''" @click="changeEye">
      <slot name="iconPwd">

      </slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "yg-input",

  data() {
    return {
      currentValue: this.value,
      textareaCalcStyle: {},
      code: "",
      isOpenEye: false,
      types: this.type,
      closeBtn: false
    };
  },
  inject: ["checkForm"],
  props: {
    id: String,
    iconClose: String,
    iconPwd: String,
    rule: {
      type: [String, Object]
    },
    iconLeft: String,
    inputType: String,
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
    maxCode: {},
    name: String,
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    rows: {
      type: Number,
      default: 2
    },
    autoComplete: {
      type: String,
      default: "off"
    },
    form: String,
    maxlength: Number,
    minlength: Number,
    max: {},
    min: {},
    step: {},
    validateEvent: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    changeEye() {
      if (this.isOpenEye == true) {
        this.types = "text";
      } else {
        this.types = "password";
      }
      this.isOpenEye = !this.isOpenEye;
    },
    handleInput(event) {
      event.target.value != ""
        ? (this.closeBtn = true)
        : (this.closeBtn = false);
      this.$emit("input", event.target.value);
    },
    handleIconClick(event) {
      this.$emit("click", event);
    },
    handleBlur(e) {
      var vm = this;
      this.checkForm(vm);
    }
  },

  mounted() {}
};
</script>
<style scope>
.icon-pwd {
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
  zoom: 1;
  margin-right: 10px;
}

.icon-left {
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
  zoom: 1;
  margin-left: 10px;
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
  width: 4.53333vw;
  height: 4.53333vw;
}

.icon-left img {
  width: 4.53333vw;
  height: 4.53333vw;
}

.mobTxt {
  display: flex;
  height: 44px;
  background-color: #ffffff;
  position: relative;
  margin-bottom: 15px;
  border-radius: 5px;
}

.mobTxt.onePixel::after {
  border-width: 1px;
  border-radius: 10px;
}

.input-content {
  margin-left: 5px;
  font-size: 4.26667vw;
  flex: 1;
}

.mobTxt input {
  width: 100%;
  height: 11.73333vw;
  line-height: 6vw;
  color: #555555;
  position: relative;
  border-radius: 0;
  border: none;
  background: none;
  -webkit-tap-highlight-color: rgba(255, 0, 0, 0);
  outline: none;
  -webkit-appearance: none;
}

.onePixel::after {
  content: "";
  width: 200%;
  height: 200%;
  position: absolute;
  top: 0;
  left: 0;
  border-color: #dedede;
  border-style: solid;
  transform-origin: 0 0;
  -ms-transform-origin: 0 0;
  -webkit-transform-origin: 0 0;
  transform: scale(0.5);
  -ms-transform: scale(0.5);
  -moz-transform: scale(0.5);
  -webkit-transform: scale(0.5);
  -o-transform: scale(0.5);
  box-sizing: border-box;
  pointer-events: none;
}

.small {
  margin: 0 auto;
}

.codeInput {
  float: left;
  height: 44px;
  width: 3.9rem;
}

.formItem input {
  display: block;
  border: none;
  width: 100%;
  height: 100%;
  padding: 0 15px;
  font-size: 15px;
  background: transparent;
}

.codeBtn span {
  display: block;
  position: relative;
  border-radius: 3px;
  font-size: 15px;
  line-height: 44px;
  text-align: center;
  font-weight: bold;
  background: rgb(245, 130, 94);
  border: none;
  color: rgb(255, 255, 255);
}

.codeBtn {
  width: 2.3rem;
  float: right;
}

.formItem::after {
  content: " ";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
</style>
