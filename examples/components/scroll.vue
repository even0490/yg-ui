<template>
  <div class="scroll">
    <!--<yg-scroll ref="scroll"
            :data="items"
            :scrollbar="scrollbarObj"
            :pullDownRefresh="pullDownRefreshObj"
            :pullUpLoad="pullUpLoadObj"
            :startY="parseInt(startY)"
            @pullingDown="onPullingDown"
            @pullingUp="onPullingUp"
            @click="clickItem"
    >-->
    <yg-scroll ref="scroll"
               way="indexList"
               :data="data"
               :scrollbar="scrollbar"
               :pullDownRefresh="pullDownRefreshObj"
               :pullUpLoad="pullUpLoadObj"
               :listenScroll="listenScroll"
               :probeType="probeType"
               :beforePullDownTxt="beforePullDownTxt"
               :beforePullDownOverTxt="beforePullDownOverTxt"
               @pullingDown="onPullingDown"
               @pullingUp="onPullingUp"
               @click="clickItem"
    >

      <!--<ul class="list-content">
        <li @click="clickItem($event,item)" class="list-item" v-for="(item,index) in items" :key="index">{{item}}</li>
      </ul>-->
    </yg-scroll>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        scrollbar: false, //这个配置可以开启滚动条，默认为 false。当设置为 true 或者是一个 Object 的时候，都会开启滚动条，默认是会 fade 的
        scrollbarFade: true,
        pullDownRefresh: true,//个配置用于做下拉刷新功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启下拉刷新，
        pullDownRefreshObj:{
          threshold: 50,//可以配置顶部下拉的距离（threshold）来决定刷新时机
          stop:60//以及回弹停留的距离（stop）
        },
        beforePullDownTxt:`下拉刷新`,//下拉提示文字
        beforePullDownOverTxt:`释放刷新...`,//下拉临界点提示
        pullUpLoad: true,//这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载，
        pullUpLoadObj:{
          threshold: 90,//离底部距离阈值（threshold）来决定开始加载的时机
          txt:{more:'加载更多',noMorn: '没有更多数据了'}//提示文字
        },
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt: '没有更多数据了',
        startY: 0, //纵轴方向初始化位置
        scrollToX: 0,
        scrollToY: -100,
        scrollToTime: 300,
        scrollToEasing: 'bounce', //缓动动画
        scrollToEasingOptions: ['bounce', 'swipe', 'swipeBounce'],
        items: [],
        itemIndex: 0,
        title:'默认标题',
        cityData: [
          {
            "name": "★热门城市",
            "cities": [
              {
                "name": "北京市",
                "tags": "BEIJING,北京市",
                "cityid": 1
              },
              {
                "name": "上海市",
                "tags": "SHANGHAI,上海市",
                "cityid": 2
              }
            ]
          },
          {
            "name": "A",
            "cities": [
              {
                "name": "鞍山市",
                "tags": "ANSHAN,鞍山市",
                "cityid": 3
              },
              {
                "name": "安庆市",
                "tags": "ANQING,安庆市",
                "cityid": 4
              }
            ]
          },
          {
            "name": "B",
            "cities": [
              {
                "name": "北京市",
                "tags": "BEIJING,北京市",
                "cityid": 1
              },
              {
                "name": "巴音郭楞州",
                "tags": "BAYINGUOLENGZHOU,巴音郭楞州",
                "cityid": 5
              },
              {
                "name": "博尔塔拉州",
                "tags": "BOERTALAZHOU,博尔塔拉州",
                "cityid": 6
              }
            ]
          },
          {
            "name": "C",
            "cities": [
              {
                "name": "成都市",
                "tags": "CHENGDU,成都市",
                "cityid": 7
              }
            ]
          },
          {
            "name": "E",
            "cities": [
              {
                "name": "鄂尔多斯市",
                "tags": "EERDUOSI,鄂尔多斯市",
                "cityid": 8
              },
              {
                "name": "鄂州市",
                "tags": "EZHOU,鄂州市",
                "cityid": 9
              },
              {
                "name": "恩施州",
                "tags": "ENSHIZHOU,恩施州",
                "cityid": 10
              }
            ]
          },
          {
            "name": "F",
            "cities": [
              {
                "name": "福州市",
                "tags": "FUZHOU,福州市",
                "cityid": 11
              },
              {
                "name": "佛山市",
                "tags": "FOSHAN,佛山市",
                "cityid": 12
              },
              {
                "name": "防城港市",
                "tags": "FANGCHENGGANG,防城港市",
                "cityid": 13
              }
            ]
          },
          {
            "name": "G",
            "cities": [
              {
                "name": "广州市",
                "tags": "GUANGZHOU,广州市",
                "cityid": 14
              },
              {
                "name": "贵阳市",
                "tags": "GUIYANG,贵阳市",
                "cityid": 15
              }
            ]
          },
          {
            "name": "H",
            "cities": [
              {
                "name": "杭州市",
                "tags": "HANGZHOU,杭州市",
                "cityid": 16
              },
              {
                "name": "和田地区",
                "tags": "HETIANDIQU,和田地区",
                "cityid": 17
              }
            ]
          },
          {
            "name": "Z",
            "cities": [
              {
                "name": "郑州市",
                "tags": "ZHENGZHOU,郑州市",
                "cityid": 18
              },
              {
                "name": "张家口市",
                "tags": "ZHANGJIAKOU,张家口市",
                "cityid": 19
              },
              {
                "name": "张家界市",
                "tags": "ZHANGJIAJIE,张家界市",
                "cityid": 20
              },
              {
                "name": "珠海市",
                "tags": "ZHUHAI,珠海市",
                "cityid": 21
              },
              {
                "name": "中山市",
                "tags": "ZHONGSHAN,中山市",
                "cityid": 22
              },
              {
                "name": "自贡市",
                "tags": "ZIGONG,自贡市",
                "cityid": 23
              },
              {
                "name": "资阳市",
                "tags": "ZIYANG,资阳市",
                "cityid": 24
              },
              {
                "name": "枣庄市",
                "tags": "ZHAOZHUANG,枣庄市",
                "cityid": 25
              },
              {
                "name": "舟山",
                "tags": "ZHOUSHAN,舟山",
                "cityid": 26
              },
              {
                "name": "遵义市",
                "tags": "ZUNYI,遵义市",
                "cityid": 27
              },
              {
                "name": "淄博市",
                "tags": "ZIBO,淄博市",
                "cityid": 28
              },
              {
                "name": "株洲市",
                "tags": "ZHUZHOU,株洲市",
                "cityid": 29
              },
              {
                "name": "中卫市",
                "tags": "ZHONGWEI,中卫市",
                "cityid": 30
              }
            ]
          }
        ],
        newData:[
          {
          "name": "A",
          "cities": [
            {
              "name": "鞍山市",
              "tags": "ANSHAN,鞍山市",
              "cityid": 3
            },
            {
              "name": "安庆市",
              "tags": "ANQING,安庆市",
              "cityid": 4
            }
          ]
        },
          {
            "name": "B",
            "cities": [
              {
                "name": "北京市",
                "tags": "BEIJING,北京市",
                "cityid": 1
              },
              {
                "name": "巴音郭楞州",
                "tags": "BAYINGUOLENGZHOU,巴音郭楞州",
                "cityid": 5
              },
              {
                "name": "博尔塔拉州",
                "tags": "BOERTALAZHOU,博尔塔拉州",
                "cityid": 6
              }
            ]
          },]
      }
    },
    //初始化滑动数据
    computed: {
      data() {
        let ret = []
        this.cityData.forEach((cityGroup) => {
          let group = {}
          group.name = cityGroup.name
          group.items = []
          cityGroup.cities.forEach((city) => {
            let item = {}
            item.name = city.name
            item.value = city.cityid
            group.items.push(item)
          })
          ret.push(group)
        })
        console.log(ret)
        return ret
      }
    },
    methods: {
      clickItem(e, item) {
        console.log(e)
        this.$emit('click', item)
      },
      scrollTo() {
        this.$refs.scroll.scrollTo(this.scrollToX, this.scrollToY, this.scrollToTime, ease[this.scrollToEasing])
      },
      //下拉加载新数据
      onPullingDown() {
        // 模拟更新数据
        console.log('pulling down and load data')
        setTimeout(() => {
          if (this._isDestroyed) {
            return
          }
          if (Math.random() > 0.1) {
            // 如果有新数据
            // this.items.unshift('我是新数据: ' + +new Date())
            this.cityData.push.apply(this.cityData,this.newData)
          } else {
            // 如果没有新数据
            this.$refs.scroll.forceUpdate()
          }
        }, 2000)
      },
      //上拉加载
      onPullingUp() {
        // 更新数据
        console.log('pulling up and load data')
        setTimeout(() => {
          if (this._isDestroyed) {
            return
          }
          if (Math.random() > 0.5) {
            /*// 如果有新数据
            let newPage = []
            for (let i = 0; i < 10; i++) {
              newPage.push('我是第' + ++this.itemIndex + '  行')
            }

            this.items = this.items.concat(newPage)*/
            this.cityData = this.cityData.concat(this.newData)
          } else {
            // 如果没有新数据
            this.$refs.scroll.forceUpdate()
          }
        }, 1500)
      },
      clickItem() {
        this.$router.back()
      },
      rebuildScroll() {
        Vue.nextTick(() => {
          this.$refs.scroll.destroy()
          this.$refs.scroll.initScroll()
        })
      }
    },
    created() {

      /*for (let i = 0; i < 2; i++) {
        this.items.push('这是' + ++this.itemIndex + '数据')
      }*/
      this.probeType = 3
      this.listenScroll = true
      this.listHeight = []
      this.touch = {}
    },
  }
</script>
<style scoped>
  .scroll {
    width: 80%;
    margin: 0 auto;
    height: 400px;
    border: 1px solid #dddddd;
  }
  .list-content {
    position: relative;
    z-index: 10;
    background: #fff;
  }

  .list-item {
    height: 60px;
    line-height: 60px;
    font-size: 18px;
    padding-left: 20px;
    border-bottom: 1px solid #e5e5e5;
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
</style>
