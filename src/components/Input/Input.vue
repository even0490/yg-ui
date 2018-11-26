<template>
  <div class="yg-input yg-input-border">
    <slot name="iconLeft"></slot>
    <div class="input-content">
      <input :id="id"
             :filter="filter"
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
             @focus="handleFocus">
    </div>
    <transition name="yg-fade">
      <div v-show="clearBtn&&value"
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

export default {
  name: "yg-input",
  data() {
    return {
      textareaCalcStyle: {},
      code: "",
      types: this.type,
      closeeye,
      openeye
    };
  },
  inject: {
    inputRegister: {
      default: () => {}
    }
  },
  props: {
    id: String,
    prop: {
      type: String,
      default: function() {
        return this.id;
      }
    },
    clearBtn: {
      type: Boolean,
      default: false
    },
    iconPwd: {
      type: Boolean,
      default: false
    },
    filter: {
      type: Function
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
    minlength: Number
  },
  computed: {
    currentValue: {
      get: function() {
        return this.value;
      },
      set: function(v) {
        if (this.filter) {
          v = this.filter(v);
          this.$refs.input.value = v;
        }
        this.$emit("input", v);
      }
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
      console.log(event);
    },
    handleBlur(e) {
      this.$emit("blur", e);
    },
    handleFocus(e) {
      this.$emit("focus", e);
    }
  },
  mounted() {
    this.inputRegister && this.inputRegister(this, this.prop);
  },
  watch: {
    type(val) {
      this.types = val;
    }
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
  @include border(1px, inherit, solid, 5px);
}

.yg-input img {
  width: 18px;
}

.input-content {
  margin-left: 10px;
  flex: 1;
  display: flex;
  align-items: center;
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
