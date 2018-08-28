<template>
  <div class="yg-popup"
       v-if="show">
    <transition name="yg-fade">
      <div class="yg-popup-mask"
           v-show="visible"
           @click.self="hide"></div>
    </transition>
    <transition name="yg-slide">
      <div class="yg-popup-box"
           v-show="visible">
        <div class="yg-popup-top">
          <slot name="top"></slot>
        </div>
        <div class="yg-popup-cont">
          <slot></slot>
        </div>
        <div class="yg-popup-bottom">
          <slot name="bottom"></slot>
        </div>
      </div>
    </transition>
  </div>

</template>

<script>
export default {
  name: "yg-popup",
  data() {
    return {};
  },
  methods: {
    show() {
      this.$emit("update:visible", true);
    },
    hide() {
      this.$emit("update:visible", false);
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.yg-popup-mask {
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
}
.yg-popup-box {
  position: fixed;
  z-index: 1000;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.yg-popup-cont {
  position: relative;
  flex: 1;
}
</style>
