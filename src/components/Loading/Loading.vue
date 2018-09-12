<template>
  <transition name="yg-fade">
    <div v-show="showFlag"
         class="yg-loading">
      <div class="yg-loading-box">
        <div class="yg-loading-icon">
          <img class="yg-loading-astronaut"
               src="../../assets/astronaut.png"
               alt="astronaut">
        </div>
        <p class="yg-loading-content"
           v-if="text">{{text}}</p>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "yg-loading",
  data() {
    return {
      showFlag: false,
      text: "正在加载",
      defaultOption: {
        text: "正在加载"
      }
    };
  },
  methods: {
    show({ text = this.defaultOption.text }) {
      this.text = text;
      this.showFlag = true;
    },
    hide() {
      this.showFlag = false;
    }
  }
};
</script>

<style scoped>
.yg-loading {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.yg-loading-box {
  position: fixed;
  box-sizing: border-box;
  width: 22.1333vw;
  height: 22.1333vw;
  top: 50%;
  left: 50%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  box-sizing: border-box;
  max-width: 80%;
  padding: 3.2vw 1.7333vw;
  transform: translate3d(-50%, -50%, 0);
  text-align: center;
  font-size: 0;
  z-index: 9999;
  color: #fff;
  border-radius: 1.3333vw;
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
}
.yg-loading-content {
  font-size: 1.6vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.yg-loading-icon {
  position: relative;
  width: 18.6667vw;
  height: 12.2667vw;
  background-image: url(../../assets/loading.png);
  background-size: 280vw 10.1333vw;
  background-repeat: no-repeat;
  background-position: 0 center;
  animation: moonAni 1.6s steps(15) infinite;
}
.yg-loading-astronaut {
  position: absolute;
  width: 4vw;
  height: 4.9333vw;
  left: 14.4vw;
  top: 5.6vw;
  animation: astronaut 1s linear infinite alternate;
}
@keyframes moonAni {
  0% {
    background-position: 0 center;
  }
  100% {
    background-position: -280vw center;
  }
}
@keyframes astronaut {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(1.8667vw);
  }
}
</style>
