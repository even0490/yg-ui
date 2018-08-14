<template>
  <div class="mobTxt onePixel">
    <template v-if="type !== 'checkCode'">
      <!-- input 图标 -->
      <slot name="icon">
        <i class="input__icon"
           :class="['icon-' + icon,onIconClick ? 'is-clickable' : '']"
           v-if="icon"
           @click="handleIconClick">
        </i>
      </slot>
      <input class="el-input__inner"
             :type="type"
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
             :value="currentValue"
             ref="input"
             @input="handleInput"
             @focus="handleFocus"
             @blur="handleBlur">
    </template>

    <template v-if="type === 'checkCode'">
      <div class="codeInput formItem">
        <input type="tel"
               v-model="code"
               class=""
               :maxlength="maxCode"
               :placeholder="placeholder"
               @input="inputHandler"/>
      </div>
      <div class="codeBtn formItem">
        <span @click="getCode" class="">
          <slot></slot>
        </span>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: "yg-input",

  data() {
    return {
      currentValue: this.value,
      textareaCalcStyle: {},
      code: ""
    };
  },
  inject:['foo'],
  props: {
    styleType: String,
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
    },
    onIconClick: Function
  },

  methods: {
    handleBlur(event) {
      this.$emit("handleBlur", this.$refs.input.value);
      // this[this.inputType]=this.$refs.input.value
    },
    handleFocus(event) {
      this.$emit("handleFocus", event);
      this[this.inputType] = this.$refs.input.value;
    },
    handleInput(event) {
      this.$emit("input", event.target.value);
    },
    inputHandler(e) {
      this.$emit("input", e.target.value);
    },
    handleIconClick(event) {
      this.$emit("click", event);
    },
    getCode() {}
  },
  render (h) {
    return null
  },

  created() {
    console.log(this.foo)
    // this.foo = '改变input的值'
    /*var vm = this
    vm.check(function (checkItem) {

    })*/
  },

  mounted() {}
};
</script>
<style scope>
  .mobTxt .input-error {
    background-color: red;
  }
.mobTxt {
  height: 0.88rem;
  background-color: #ffffff;
  position: relative;
  margin-bottom: 0.3rem;
  border-radius: 0.1rem;
}

.mobTxt.onePixel::after {
  border-width: 1px;
  border-radius: 0.2rem;
}

.mobTxt input {
  padding-left: 0.3rem;
  width: 5.5rem;
  font-size: 0.32rem;
  line-height: 0.45rem;
  color: #555555;
  float: left;
  height: 0.88rem;
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
  height: 0.88rem;
  width: 3.9rem;
}

.formItem input {
  display: block;
  border: none;
  width: 100%;
  height: 100%;
  padding: 0 0.3rem;
  font-size: 0.3rem;
  background: transparent;
}
.codeBtn span {
  display: block;
  position: relative;
  border-radius: 0.06rem;
  font-size: 0.3rem;
  line-height: 0.88rem;
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
