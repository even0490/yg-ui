<template>
  <transition name="yg-fade">
    <div class="yg-toast"
         v-show="showFlag">
      <p class="yg-toast__content">{{text}}</p>
    </div>
  </transition>
</template>

<script>
export default {
  name: "yg-toast",
  data() {
    return {
      showFlag: false,
      timeout: null,
      time: 2000,
      text: "",
      defaultOption: {
        time: 2000,
        text: ""
      }
    };
  },
  methods: {
    show({ text = this.defaultOption.text, time = this.defaultOption.time }) {
      this.text = text;
      this.time = time;

      this.showFlag = true;
      clearTimeout(this.timeout);
      return new Promise(resolve => {
        this.timeout = setTimeout(() => {
          this.showFlag = false;
          resolve();
        }, this.time);
      });
    }
  }
};
</script>

<style scoped>
.yg-toast {
  position: fixed;
  top: 188px;
  left: 0;
  width: 100%;
  font-size: 0;
  z-index: 9999;
  text-align: center;
}
.yg-toast__content {
  font-size: 14px;
  border-radius: 5px;
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
  box-shadow: 0 0 5px black;
  max-width: 223px;
  line-height: 20px;
  padding: 12px 25px;
  text-align: left;
  display: inline-block;
}
</style>
