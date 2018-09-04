<template>
  <div ref="wrapper" class="list-wrapper">
    <div class="scroll-content">
      <div ref="listWrapper">
        <slot>
          <div v-if="way=='indexList'" class="index-list-content" ref="content">
            <div class="index-list-title" v-if="title" ref="title">
              {{title}}
            </div>
            <ul ref="groups">
              <li v-for="(group,index) in data" :key="index" ref="listGroup">
                <h2 class="index-list-anchor">{{group.name}}</h2>
                <ul>
                  <li
                    class="index-list-item border-bottom-1px"
                    v-for="(item,index) in group.items" :key="index">
                    {{item.name}}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </slot>
      </div>
      <slot name="pullup"
            :pullUpLoad="pullUpLoad"
            :isPullUpLoad="isPullUpLoad"
      >
        <div class="pullup-wrapper" v-if="pullUpLoad">
          <div class="before-trigger" v-if="!isPullUpLoad">
            <span>{{pullUpTxt}}</span>
          </div>
          <div class="after-trigger" v-else>
            <!--<loading></loading>-->
            <i><span class="cri2"></span>上滑加载更多…</i>
          </div>
        </div>
      </slot>
    </div>
    <slot name="pulldown"
          :pullDownRefresh="pullDownRefresh"
          :pullDownStyle="pullDownStyle"
          :beforePullDown="beforePullDown"
          :isPullingDown="isPullingDown"
          :bubbleY="bubbleY"
    >
      <div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
        <div class="before-trigger" v-if="beforePullDown">
          <!--<bubble :y="bubbleY"></bubble>-->
          <span class="pullDownIcon"></span>
          <span>{{tipTxt}}</span>
          <p>与其记账省钱，不如一贯赚钱！</p>
        </div>
        <div class="after-trigger" v-else>
          <div v-if="isPullingDown" class="loading">
            <!--<loading></loading>-->
            <!--<span>加载中</span>-->
            <span class="pullDownIcon"></span>
            <span>小贯努力刷新中...</span>
            <p>与其记账省钱，不如一贯赚钱！</p>
          </div>
          <!--刷新成功之后提示-->
          <!--<div v-else><span>{{refreshTxt}}</span></div>-->
        </div>
      </div>
    </slot>

    <div class="index-list-fixed" ref="fixed" v-show="fixedTitle">
      {{fixedTitle}}
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
import BScroll from "better-scroll";

const DIRECTION_H = "horizontal";
const DIRECTION_V = "vertical";

const TITLE_HEIGHT = 50; //标题高度
const SUBTITLE_HEIGHT = 40;
export default {
  name: "yg-scroll",
  props: {
    way: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },
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
      type: null,
      default: false
    },
    pullUpLoad: {
      type: null,
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
    beforePullDownTxt: {
      type: String,
      default: "下拉刷新"
    },
    beforePullDownOverTxt: {
      type: String,
      default: "释放刷新"
    }
  },
  data() {
    return {
      beforePullDown: true,
      isRebounding: false,
      isPullingDown: false,
      isPullUpLoad: false,
      pullUpDirty: true,
      pullDownStyle: "",
      bubbleY: 0,
      currentIndex: 0,
      scrollY: -1,
      diff: -1,
      listHeight: [],
      tipTxt: ""
    };
  },
  //监听滚动
  computed: {
    //悬浮标题
    fixedTitle() {
      if (this.scrollY > -TITLE_HEIGHT) {
        return "";
      }
      return this.data[this.currentIndex]
        ? this.data[this.currentIndex].name
        : "";
    },

    pullUpTxt() {
      const moreTxt =
        (this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.more) ||
        "加载更多";
      const noMoreTxt =
        (this.pullUpLoad &&
          this.pullUpLoad.txt &&
          this.pullUpLoad.txt.noMore) ||
        "没有更多数据了";
      return this.pullUpDirty ? moreTxt : noMoreTxt;
    },
    refreshTxt() {
      return (this.pullDownRefresh && this.pullDownRefresh.txt) || "刷新成功";
    }
  },
  created() {
    this.pullDownInitTop = 2000;
  },
  mounted() {
    setTimeout(() => {
      this.initScroll();

      this._calculateHeight();
    }, 20);
  },
  destroyed() {
    this.$refs.scroll && this.$refs.scroll.destroy();
  },
  watch: {
    data() {
      setTimeout(() => {
        this.forceUpdate(true);
      }, this.refreshDelay);
      setTimeout(() => {
        this._calculateHeight();
      }, 20);
    },
    diff(newVal) {
      let fixedTop =
        newVal > 0 && newVal < SUBTITLE_HEIGHT ? newVal - SUBTITLE_HEIGHT : 0;
      if (this.fixedTop === fixedTop) {
        return;
      }
      this.fixedTop = fixedTop;
      //切换标题动画
      //this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
    },
    scrollY(newY, oldY) {
      // 当滚动到顶部，newY>0
      newY > 100
        ? (this.tipTxt = this.beforePullDownOverTxt)
        : (this.tipTxt = this.beforePullDownTxt);

      if (newY > -TITLE_HEIGHT) {
        this.currentIndex = 0;
        return;
      }
      // 在中间部分滚动
      for (let i = 0; i < this.listHeight.length - 1; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i;
          this.diff = height2 + newY;
          return;
        }
      }
      // 当滚动到底部，且-newY大于最后一个元素的上限
      this.currentIndex = this.listHeight.length - 2;
    }
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
      }
      let options = {
        probeType: this.probeType,
        click: this.click,
        scrollY: this.freeScroll || this.direction === DIRECTION_V,
        scrollX: this.freeScroll || this.direction === DIRECTION_H,
        scrollbar: this.scrollbar,
        pullDownRefresh: this.pullDownRefresh,
        pullUpLoad: this.pullUpLoad,
        startY: this.startY,
        freeScroll: this.freeScroll,
        mouseWheel: this.mouseWheel,
        bounce: this.bounce,
        zoom: this.zoom
      };
      this.scroll = new BScroll(this.$refs.wrapper, options);
      if (this.listenScroll) {
        this.scroll.on("scroll", pos => {
          this.scrollY = pos.y;
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
    disable() {
      this.scroll && this.scroll.disable();
    },
    enable() {
      this.scroll && this.scroll.enable();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
      // this.$refs.indexList.refresh()
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    },
    clickItem(e, item) {
      console.log(e);
      this.$emit("click", item);
    },
    destroy() {
      this.scroll.destroy();
    },
    forceUpdate(dirty) {
      if (this.pullDownRefresh && this.isPullingDown) {
        this.isPullingDown = false;
        this._reboundPullDown().then(() => {
          this._afterPullDown();
        });
      } else if (this.pullUpLoad && this.isPullUpLoad) {
        this.isPullUpLoad = false;
        this.scroll.finishPullUp();
        this.pullUpDirty = dirty;
        this.refresh();
      } else {
        this.refresh();
      }
    },
    _initPullDownRefresh() {
      this.scroll.on("pullingDown", () => {
        this.beforePullDown = false;
        this.isPullingDown = true;
        this.$emit("pullingDown");
      });
      this.scroll.on("scroll", pos => {
        if (!this.pullDownRefresh) {
          return;
        }
        if (this.beforePullDown) {
          this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop);
          this.pullDownStyle = `top:${Math.min(
            pos.y + this.pullDownInitTop,
            10
          )}px`;
        } else {
          this.bubbleY = 0;
        }
        if (this.isRebounding) {
          this.pullDownStyle = `top:${10 -
            (this.pullDownRefresh.stop - pos.y)}px`;
        }
      });
    },
    _initPullUpLoad() {
      this.scroll.on("pullingUp", () => {
        this.isPullUpLoad = true;
        this.$emit("pullingUp");
      });
    },
    _reboundPullDown() {
      const { stopTime = 600 } = this.pullDownRefresh;
      return new Promise(resolve => {
        setTimeout(() => {
          this.isRebounding = true;
          this.scroll.finishPullDown();
          resolve();
        }, stopTime);
      });
    },
    _afterPullDown() {
      setTimeout(() => {
        this.pullDownStyle = `top:${this.pullDownInitTop}px`;
        this.beforePullDown = true;
        this.isRebounding = false;
        this.refresh();
      }, this.scroll.options.bounceTime);
    },
    //监听高度变化
    _calculateHeight() {
      const list = this.$refs.listGroup;
      if (!list) {
        return;
      }
      this.listHeight = [];
      let height = TITLE_HEIGHT;
      this.listHeight.push(height);
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    }
  },

  components: {
    // Loading
  }
};
</script>

<style scope>
.list-wrapper {
  position: relative;
  height: 100%;
  overflow: hidden;
  background: #fff;
}

.scroll-content {
  position: relative;
  z-index: 1;
}

.list-content {
  position: relative;
  z-index: 10;
}

.list-item {
  height: 60px;
  line-height: 60px;
  font-size: 18px;
  padding-left: 20px;
  border-bottom: 1px solid #e5e5e5;
}

.pulldown-wrapper {
  position: absolute;
  width: 100%;
  left: 0;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all;
  text-align: center;
}

.after-trigger {
  /*margin-top: 10px;*/
}
.after-trigger i {
  position: relative;
}
.pullup-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
}

.index-list {
  position: relative;
  width: 100%;
  height: 100%;
}

.list-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.index-list-content {
  background: #fff;
  border-radius: 2px;
}

.index-list-title {
  padding: 14px 16px;
  font-size: 14px;
  line-height: 1.6;
  color: #333;
}

.index-list-anchor {
  padding: 16px 16px 10px 16px;
  line-height: 1;
  font-size: 14px;
  color: #999;
  background: #f7f7f7;
}

.index-list-item {
  position: relative;
  height: 50px;
  line-height: 50px;
  padding: 0 16px;
  font-size: 14px;
  color: #333;
}

.index-list-item:last-child::before,
.index-list-item:last-child::after {
  display: none;
}

.index-list-item_active {
  background: rgba(0, 0, 0, 0.04);
}

.index-list-fixed {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  padding: 16px 16px 10px 16px;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 1;
  color: #999;
  background: #f7f7f7;
}

.index-list-nav {
  position: absolute;
  z-index: 30;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  font-family: Helvetica;
}

.index-list-nav ul {
  padding: 0;
  margin: 0;
}

.index-list-nav ul li {
  padding: 6px 16px 0 16px;
  line-height: 1;
  text-align: center;
  box-sizing: border-box;
  font-size: 12px;
  color: #666;
}

.index-list-nav ul li.active {
  color: #3b99fc;
}

@media (max-height: 480px) {
  .index-list-nav ul li {
    padding-top: 3px;
  }
}

.pullDownIcon {
  display: block;
  position: absolute;
  left: 15%;
  top: 8px;
  width: 20px;
  height: 20px;
  background: url(../../assets/loading@2x.png) center no-repeat;
  background-size: 100% 100%;
  animation: rotates 1s linear infinite;
}

@keyframes rotates {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.cri2 {
  display: block;
  position: absolute;
  left: -0.4rem;
  top: -0.04rem;
  width: 17px;
  height: 17px;
  background: url(../../assets/cri2@2x.png) center no-repeat;
  background-size: 15px;
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
