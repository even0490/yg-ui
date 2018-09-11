<template>
  <div class="yg-carousel">
    <div class="yg-carousel-wrapper"
         ref="wrapper">
      <div class="yg-carousel-list"
           :style="{width:listWidth}">
        <slot></slot>
      </div>
      <div v-if="showDot"
           class="yg-carousel-dots">
        <span class="yg-carousel-dot"
              :class="{active: currentPageIndex === index }"
              v-for="(item, index) in dots"
              :key="index"></span>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "yg-carousel",
  data() {
    return {
      items: [],
      slide: undefined,
      timer: undefined,
      listWidth: "100%",
      currentPageIndex: 0,
      dots: []
    };
  },
  props: {
    loop: {
      type: Boolean,
      default: false
    },
    threshold: {
      type: Number,
      default: 0.3
    },
    speed: {
      type: Number,
      default: 400
    },
    click: {
      type: Boolean,
      default: true
    },
    showDot: {
      type: Boolean,
      default: false
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  methods: {
    initSlide() {
      let wrapper = this.$refs.wrapper;
      let childLength =
        this.loop && this.items.length > 1
          ? this.items.length + 2
          : this.items.length;
      this.dots = new Array(this.items.length);
      this.listWidth = wrapper.clientWidth * childLength + "px";
      this.$nextTick(() => {
        this.slide = new BScroll(this.$refs.wrapper, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          preventDefault: false,
          snap: {
            loop: this.loop,
            threshold: this.threshold,
            speed: this.speed
          },
          bounce: false,
          stopPropagation: true,
          click: this.click
        });

        this.slide.on("scrollEnd", this.onScrollEnd);

        if (this.autoPlay) {
          this.slide.on("scrollStart", () => {
            clearTimeout(this.timer);
          });
          this.slide.on("touchEnd", () => {
            this.play();
          });
          this.play();
        }
      });
    },
    onScrollEnd() {
      let pageIndex = this.slide.getCurrentPage().pageX;
      this.currentPageIndex = pageIndex;
      if (this.autoPlay) {
        this.play();
      }
    },
    play() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        if (!this.loop && this.currentPageIndex === this.items.length - 1) {
          this.slide.goToPage(0);
        } else {
          this.slide.next();
        }
      }, this.interval);
    },
    update() {
      if (this.slide) {
        this.slide.destroy();
        clearTimeout(this.timer);
      }
      this.$nextTick(() => {
        this.initSlide();
      });
    },
    refresh() {
      let wrapper = this.$refs.wrapper;
      let childLength =
        this.loop && this.items.length > 1
          ? this.items.length + 2
          : this.items.length;
      this.dots = new Array(this.items.length);
      this.listWidth = wrapper.clientWidth * childLength + "px";
      this.slide.refresh();
    },
    prev() {
      this.slide.prev();
    },
    next() {
      this.slide.next();
    },
    goToPage(num) {
      this.slide.goToPage(num);
    },
    registerItem(item) {
      this.items.push(item);
    }
  },
  mounted() {
    this.update();
  },
  beforeDestroy() {
    this.slide.disable();
    clearTimeout(this.timer);
  },
  activated() {
    if (!this.slide) {
      return;
    }
    this.slide.enable();
    let pageIndex = this.slide.getCurrentPage().pageX;
    this.slide.goToPage(pageIndex, 0, 0);
    this.currentPageIndex = pageIndex;
    if (this.autoPlay) {
      this.play();
    }
  },
  deactivated() {
    this.slide.disable();
    clearTimeout(this.timer);
  },
  provide: function() {
    return {
      registerItem: this.registerItem
    };
  },
  watch: {
    loop() {
      this.update();
    },
    autoPlay() {
      this.update();
    },
    speed() {
      this.update();
    },
    threshold() {
      this.update();
    },
    items() {
      if (this.slide) {
        this.update();
      }
    }
  }
};
</script>

<style scoped>
.yg-carousel {
  height: 100%;
}
.yg-carousel-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.yg-carousel-list {
  height: 100%;
  display: flex;
}
.yg-carousel-item {
  position: relative;
  height: 100%;
  flex: 1;
}

.yg-carousel-dots {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 12px;
  transform: translateZ(1px);
  text-align: center;
  font-size: 0;
}
.yg-carousel-dot {
  display: inline-block;
  margin: 0 4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  transition: all 0.2s;
}

.yg-carousel-dot.active {
  width: 16px;
  border-radius: 4px;
  background: #c4ac64;
  opacity: 0.6;
}
</style>
