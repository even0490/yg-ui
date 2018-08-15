<template>
  <div class="mobTxt onePixel">
      <!-- input 图标 -->
      <img class="icon" v-if="icon" :src="'../assets/'+icon+'.png'" alt="">
      <input :id="id"
             :rule="rule"
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
             @blur="handleBlur"
             @input="handleInput">
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
  inject: ["checkForm"],
  props: {
    id: String,
    rule: {
      type: [String, Object]
    },
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
    handleInput(event) {
      /*console.log(this.$refs);
        console.log(this.rule);*/
      // console.log(this.checkForm)
      this.$emit("input", event.target.value);
    },
    inputHandler(e) {
      this.$emit("input", e.target.value);
    },
    handleIconClick(event) {
      this.$emit("click", event);
    },
    handleBlur(e) {
      var vm = this;
      // console.log(this.$refs.input.value);
      this.checkForm(vm);
    }
  },
  render(h) {
    return null;
  },

  created() {},

  mounted() {}
};
</script>
<style scope>
.mobTxt .input-error {
  background-color: red;
}
.icon {
  display: block;
  float: left;
  width: 17px;
  height: 17px;
  line-height: 100%;
  /*padding: 16px 8px 0 11px;*/
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
