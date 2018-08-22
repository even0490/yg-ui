<template>
  <div class="slid">
    <yg-carousel :items="items"
                 :autoPlay="true"
                 :interval="60"
                 @click.native="clickHanadler"></yg-carousel>
    <router-link to="/">back</router-link>
  </div>
</template>

<script>
import carouselImg1 from "../assets/1.jpg";
import carouselImg2 from "../assets/2.jpg";
import carouselImg3 from "../assets/3.jpg";
import carouselImg4 from "../assets/4.jpg";

export default {
  data() {
    return {
      items: [
        {
          adLinkUrl: "http://y.qq.com/w/album.html?albummid=001tftZs2RX1Qz",
          picUrl: carouselImg1
        },
        {
          adLinkUrl: "https://y.qq.com/msa/218/0_4085.html",
          picUrl: carouselImg2
        },
        {
          adLinkUrl:
            "https://y.qq.com/m/digitalbum/gold/index.html?_video=true&id=2195876&g_f=shoujijiaodian",
          picUrl: carouselImg3
        }
      ]
    };
  },
  methods: {
    clickHanadler(e) {
      console.log(e);
    }
  }
};
</script>


<style scoped>
.slid {
  width: 100%;
  height: 400px;
  background: yellowgreen;
}
</style>
