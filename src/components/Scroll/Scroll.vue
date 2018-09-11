<template>
  <div ref="wrapper"
       class="yg-scroll">
    <div class="yg-scroll-content">
      <div ref="listWrapper">
        <slot></slot>
        <div v-show="pullUpLoad"
             ref="pullup"
             class="yg-scroll-pullupbottom">
          <slot name="pullup"
                :pullUpLoad="pullUpLoad"
                :isPullUpLoad="isPullUpLoad">
            <div class="pullup-wrapper">
              <Icon class="pullUp-loading"
                    :src="circle"></Icon>
              <p>上滑加载更多...</p>
            </div>
          </slot>
        </div>
      </div>
    </div>
    <div v-if="pullDownRefresh"
         class="yg-scroll-pulldonwntop"
         ref="pulldown"
         :style="pulldownStyle">
      <slot name="pulldown"
            :pullDownStyle="pullDownStyle"
            :beforePullDown="beforePullDown"
            :isPullingDown="isPullingDown">
        <div class="pulldown-wrapper">
          <p>{{pullDwonTxt}}</p>
          <p>与其记账省钱,不如一贯赚钱！</p>
          <Icon class="pulldown-loading"
                v-show="this.isPullingDown"
                color="#c3ab69"
                type="loading"></Icon>
        </div>
      </slot>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
import BScroll from "better-scroll";
import Icon from "../Icon/Icon.vue";
import circle from "../../assets/circle.png";

const DIRECTION_H = "horizontal";
const DIRECTION_V = "vertical";

export default {
  name: "yg-scroll",
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    listenBeforeScroll: {
      type: Boolean,
      default: false
    },
    listenScrollEnd: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: DIRECTION_V
    },
    scrollbar: {
      type: null,
      default: false
    },
    pullDownRefresh: {
      type: Boolean,
      default: false
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    },
    startY: {
      type: Number,
      default: 0
    },
    refreshDelay: {
      type: Number,
      default: 20
    },
    freeScroll: {
      type: Boolean,
      default: false
    },
    mouseWheel: {
      type: Boolean,
      default: false
    },
    bounce: {
      default: true
    },
    zoom: {
      default: false
    },
    preventDefault: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      pullDownHeight: 0,
      pullUpHeight: 0,
      beforePullDown: true,
      isPullingDown: false,
      isPullUpLoad: false,
      pullDownStyle: "",
      scrollY: -1,
      circle
    };
  },
  //监听滚动
  computed: {
    pulldownStyle() {
      if (this.scrollY > 0) {
        return `visibility: visible;
                top:-${this.pullDownHeight}px;
                transform: translate(0px, ${this.scrollY}px);`;
      } else {
        return `visibility: hidden;
                top:-${this.pullDownHeight}px;`;
      }
    },
    pullDwonTxt() {
      if (this.isPullingDown) {
        return "小贯努力刷新中...";
      } else if (this.scrollY > this.pullDownHeight) {
        return "释放刷新...";
      } else if (this.beforePullDown) {
        return "下拉刷新...";
      }
    }
  },
  components: {
    Icon
  },
  created() {
    this.pullDownInitTop = 2000;
  },
  mounted() {
    this.$nextTick(() => {
      this.initScroll();
    });
  },
  destroyed() {
    this.$refs.scroll && this.$refs.scroll.destroy();
  },
  methods: {
    getRect(el) {
      if (el instanceof window.SVGElement) {
        let rect = el.getBoundingClientRect();
        return {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height
        };
      } else {
        return {
          top: el.offsetTop,
          left: el.offsetLeft,
          width: el.offsetWidth,
          height: el.offsetHeight
        };
      }
    },
    initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }
      if (this.$refs.listWrapper && (this.pullDownRefresh || this.pullUpLoad)) {
        this.$refs.listWrapper.style.minHeight = `${this.getRect(
          this.$refs.wrapper
        ).height + 1}px`;
        this.pullDownHeight = this.getRect(this.$refs.pulldown).height;
        this.pullUpHeight = this.getRect(this.$refs.pullup).height;
      }
      let options = {
        probeType: this.probeType,
        click: this.click,
        scrollY: this.freeScroll || this.direction === DIRECTION_V,
        scrollX: this.freeScroll || this.direction === DIRECTION_H,
        scrollbar: this.scrollbar,
        preventDefault: this.preventDefault,
        pullDownRefresh: this.pullDownRefresh && {
          threshold: this.pullDownHeight,
          stop: this.pullDownHeight
        },
        pullUpLoad: this.pullUpLoad && {
          threshold: 0
        },
        startY: this.startY,
        freeScroll: this.freeScroll,
        mouseWheel: this.mouseWheel,
        bounce: this.bounce,
        zoom: this.zoom
      };
      this.scroll = new BScroll(this.$refs.wrapper, options);
      if (this.listenScroll) {
        this.scroll.on("scroll", pos => {
          this.$emit("scroll", pos);
        });
      }
      if (this.listenScrollEnd) {
        this.scroll.on("scrollEnd", pos => {
          this.$emit("scroll-end", pos);
        });
      }
      if (this.listenBeforeScroll) {
        this.scroll.on("beforeScrollStart", () => {
          this.$emit("beforeScrollStart");
        });
        this.scroll.on("scrollStart", () => {
          this.$emit("scroll-start");
        });
      }
      if (this.pullDownRefresh) {
        this._initPullDownRefresh();
      }
      if (this.pullUpLoad) {
        this._initPullUpLoad();
      }
    },
    forceUpdate(dirty) {
      this.$nextTick(() => {
        if (this.pullDownRefresh) {
          this.beforePullDown = true;
          this.isPullingDown = false;
          this.$refs.listWrapper.style.minHeight = `${this.getRect(
            this.$refs.wrapper
          ).height + 1}px`;
          this.scroll.finishPullDown();
        }
        if (this.pullUpLoad) {
          this.isPullUpLoad = false;
          this.$refs.listWrapper.style.minHeight = `${this.getRect(
            this.$refs.wrapper
          ).height + 1}px`;
          this.scroll.finishPullUp();
        }
        this.refresh();
      });
    },
    disable() {
      this.scroll && this.scroll.disable();
    },
    enable() {
      this.scroll && this.scroll.enable();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    },
    destroy() {
      this.scroll.destroy();
    },
    _initPullDownRefresh() {
      this.scroll.on("scroll", pos => {
        this.scrollY = pos.y;
      });
      this.scroll.on("pullingDown", () => {
        this.beforePullDown = false;
        this.isPullingDown = true;
        this.$emit("pullingDown");
      });
    },
    _initPullUpLoad() {
      this.scroll.on("pullingUp", () => {
        this.isPullUpLoad = true;
        this.$emit("pullingUp");
      });
    }
  }
};
</script>

<style scope>
.yg-scroll {
  position: relative;
  height: 100%;
  overflow: hidden;
}

.yg-scroll-content {
  position: relative;
  z-index: 1;
  min-height: 100%;
  display: flex;
}
.yg-scroll-content > div {
  flex: 1;
}

.yg-scroll-pulldonwntop {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
}
.yg-scroll-pullupbottom {
  text-align: center;
}
.pulldown-wrapper {
  height: 44px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  line-height: 21px;
  color: #999999;
}
.pulldown-loading {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-116px, -50%);
}
.pullup-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  height: 30px;
  color: rgb(176, 176, 176);
}
.pullUp-loading {
  width: 17px;
  padding: 6px;
  animation: rotate 1s linear infinite;
}
@keyframes rotate {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
