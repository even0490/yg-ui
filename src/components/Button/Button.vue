<template>

  <div class="container">

    <button @click="handleClick"
            class="confirm"
            :style="{background:bgColor,
                    color: txtColor,
                    fontWeight: txtWeight}">
      {{btnTxt}}
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
      return config.Button[this.type + "Background"];
    },
    txtColor() {
      return config.Button[this.type + "Text"];
    }
  },
  props: {
    type: {
      type: String,
      default: "default"
    },
    btnTxt: {
      type: String,
      default: "确认"
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
      this.$emit("handleClick", evt);
    },
    cancel() {
      console.log("退出");
    }
  }
};
</script>
<style scoped>
.container {
  border: none;
  color: #fff;
  font-size: 1.6rem;
  text-align: center;
}

.container button {
  display: block;
  width: 100%;
  height: 88px;
  text-align: center;
  border: none;
  border-radius: 4px;
  margin: 15px auto 0;
  outline: none;
}
</style>
