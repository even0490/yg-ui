<template>
  <div class="yg-toast">
    <div v-show="isShowMask && showFlag"></div>
    <transition name="yg-fade">
      <div class="yg-toast-box"
           v-show="showFlag">
        <p class="yg-toast__content">{{text}}</p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "yg-toast",
  data() {
    return {
      showFlag: false,
      timeout: null,
      time: 2000,
      isShowMask: false,
      text: "",
      defaultOption: {
        time: 2000,
        isShowMask: false,
        text: ""
      }
    };
  },
  methods: {
    show({
      text = this.defaultOption.text,
      isShowMask = this.defaultOption.isShowMask,
      time = this.defaultOption.time
    }) {
      this.text = text;
      this.time = time;
      this.isShowMask = isShowMask;
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
.yg-toast-box {
  position: fixed;
  top: 50%;
  left: 50%;
  box-sizing: border-box;
  max-width: 80%;
  height: 10.6667vw;
  line-height: 5.3333vw;
  padding: 2.6667vw 5.3333vw;
  transform: translate3d(-50%, -50%, 0);
  text-align: center;
  font-size: 0;
  z-index: 9999;
  color: #fff;
  border-radius: 1.3333vw;
  background: rgba(0, 0, 0, 0.7);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.yg-toast__content {
  font-size: 3.7333vw;
}
</style>
