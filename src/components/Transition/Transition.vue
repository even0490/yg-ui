<template>
  <div class="yg-transition">
    <transition :name="transitionName">
      <slot class="yg-transition-child"></slot>
    </transition>
  </div>

</template>

<script>
export default {
  name: "yg-transition",
  data() {
    return {
      transitionName: ""
    };
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      this.transitionName =
        toDepth < fromDepth ? "yg-slide-out" : "yg-slide-in";
    }
  }
};
</script>

<style scoped>
.yg-transition {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

.yg-slide-in-enter {
  transform: translate3d(100%, 0, 0);
}

.yg-slide-in-leave-to {
  transform: translate3d(-100%, 0, 0);
}

.yg-slide-in-enter-active,
.yg-slide-in-leave-active {
  position: absolute;
  width: 100%;
}

.yg-slide-in-enter-active {
  animation: slideInRight 0.2s;
}

.yg-slide-in-leave-active {
  animation: slideOutLeft 0.2s;
}

@keyframes slideInRight {
  from {
    transform: translate3d(100%, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}

@keyframes slideOutLeft {
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    transform: translate3d(-100%, 0, 0);
  }
}

.yg-slide-out-enter {
  transform: translate3d(-100%, 0, 0);
}
.yg-slide-out-enter-to {
  transform: translate3d(100%, 0, 0);
}

.yg-slide-out-leave-to {
  transform: translate3d(0, 0, 0);
}

.yg-slide-out-enter-active,
.yg-slide-out-leave-active {
  position: absolute;
  width: 100%;
}

.yg-slide-out-leave-active {
  z-index: 2;
  animation: slideOutRight 0.2s;
}

.yg-slide-out-enter-active {
  z-index: 1;
  animation: slideInLeft 0.2s;
}

@keyframes slideOutRight {
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    transform: translate3d(100%, 0, 0);
  }
}

@keyframes slideInLeft {
  from {
    transform: translate3d(-100%, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}
</style>
