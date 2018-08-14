<template>
  <div class="yg-dialog">
    <transition name="yg-fade">
      <div class="yg-dialog-mask" v-show="isShowMask&&showFlag"></div>
    </transition>
    <transition name="yg-zoom">
      <div class="yg-dialog-box" :class="className" v-show="showFlag">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "yg-dialog",
  data() {
    return {
      isShowMask: true,
      showFlag: true,
      position: "top"
    };
  },
  computed: {
    className() {
      switch (this.position) {
        case "middle":
          return "yg-dialog-middle-box";
          break;
        case "top":
          return "yg-dialog-top-box";
          break;
        default:
          return "yg-dialog-top-box";
          break;
      }
    }
  },
  methods: {
    show(options = {}) {
      Object.keys(options).forEach(key => {
        this[key] = options[key];
      });
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
  // mounted() {
  //   setInterval(() => {
  //     this.showFlag = !this.showFlag;
  //   }, 1000);
  // }
};
</script>

<style scoped>
@import "../../style/transition.css";
.yg-dialog-mask {
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  font-size: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.7);
  overflow: hidden;
}
.yg-dialog-box {
  position: fixed;
  display: table;
  right: 0px;
  bottom: 0px;
  left: 0px;
  box-sizing: border-box;
  width: 273px;
  padding: 15px;
  text-align: center;
  z-index: 9999;
  border-radius: 5px;
  background: white;
  overflow: hidden;
}
.yg-dialog-middle-box {
  top: 0px;
  margin: auto;
}
.yg-dialog-top-box {
  top: 100px;
  margin: 0 auto;
}
</style>
