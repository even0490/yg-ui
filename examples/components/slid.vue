<template>
  <div class="slid">
    <yg-carousel ref="carousel"
                 :items="items"
                 :autoPlay="false"
                 :interval="60"
                 :loop="false"
                 @click.native="clickHanadler">
      <yg-carousel-item class="carousel-item"
                        v-for="(item,index) in items"
                        :key="index">
        <a v-if="item.adLinkUrl"
           :href="item.adLinkUrl"></a>
        <img :src="item.picUrl" />
      </yg-carousel-item>
    </yg-carousel>
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
        }
      ]
    };
  },
  methods: {
    clickHanadler(e) {
      console.log(e);
    }
  },
  mounted() {
    setTimeout(() => {
      this.$refs.carousel.goToPage(2);
    }, 1000);
  }
};
</script>


<style scoped>
.slid {
  width: 100%;
  height: 400px;
  background: yellowgreen;
}
.carousel-item img {
  display: block;
  width: 100%;
}
.carousel-item a {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
