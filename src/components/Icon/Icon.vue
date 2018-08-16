<template>
  <div class="yg-icon">
    <svg v-if="type==='close'"
         viewBox="0 0 1024 1024"
         class="yg-icon-close"
         :width="width"
         :height="height">
      <path d="M806.4 172.8l-633.6 633.6c-12.8 12.8-12.8 32 0 44.8 12.8 12.8 32 12.8 44.8 0l633.6-633.6c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0z"
            fill="#bfbfbf"
            p-id="986"></path>
      <path d="M172.8 172.8c-12.8 12.8-12.8 32 0 44.8l633.6 633.6c12.8 12.8 32 12.8 44.8 0 12.8-12.8 12.8-32 0-44.8L217.6 172.8c-12.8-12.8-32-12.8-44.8 0z"
            fill="#bfbfbf"
            p-id="987"></path>
    </svg>
    <img v-else
         :src="imgSrc"
         alt="icon">
  </div>

</template>

<script>
import right from "../../assets/right.png";
import closeeye from "../../assets/closeeye.png";
import openeye from "../../assets/openeye.png";
export default {
  name: "yg-icon",
  computed: {
    imgSrc() {
      switch (this.type) {
        case "right":
          return right;
          break;
        case "closeeye":
          return closeeye;
          break;
        case "openeye":
          return openeye;
          break;

        default:
          return this.src;
          break;
      }
    }
  },
  props: {
    width: {
      default: 30
    },
    height: {
      default: 30
    },
    type: {
      type: String
    },
    src: {
      default: "",
      type: String
    }
  }
};
</script>

<style scoped>
.yg-icon {
  -webkit-tap-highlight-color: transparent;
}
.yg-icon svg,
.yg-icon img {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
