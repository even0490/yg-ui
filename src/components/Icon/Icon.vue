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
    <svg v-else-if="type==='loading'"
         viewBox="0 0 64 64"
         :fill="color">
      <g>
        <circle r="5"
                cx="24"
                cy="0"
                transform="translate(32,32)"
                stroke-width="0">
          <animate attributeName="fill-opacity"
                   dur="750ms"
                   values="1;.9;.85;.7;.4;.3;.3;.3;1"
                   repeatCount="indefinite"></animate>
        </circle>
        <circle r="5"
                cx="16.970562748477143"
                cy="16.97056274847714"
                transform="translate(32,32)"
                stroke-width="0">
          <animate attributeName="fill-opacity"
                   dur="750ms"
                   values=".3;1;.9;.85;.7;.4;.3;.3;.3"
                   repeatCount="indefinite"></animate>
        </circle>
        <circle r="5"
                cx="1.4695761589768238e-15"
                cy="24"
                transform="translate(32,32)"
                stroke-width="0">
          <animate attributeName="fill-opacity"
                   dur="750ms"
                   values=".3;.3;1;.9;.85;.7;.4;.3;.3"
                   repeatCount="indefinite"></animate>
        </circle>
        <circle r="5"
                cx="-16.97056274847714"
                cy="16.970562748477143"
                transform="translate(32,32)"
                stroke-width="0">
          <animate attributeName="fill-opacity"
                   dur="750ms"
                   values=".3;.3;.3;1;.9;.85;.7;.4;.3"
                   repeatCount="indefinite"></animate>
        </circle>
        <circle r="5"
                cx="-24"
                cy="2.9391523179536475e-15"
                transform="translate(32,32)"
                stroke-width="0">
          <animate attributeName="fill-opacity"
                   dur="750ms"
                   values=".4;.3;.3;.3;1;.9;.85;.7;.4"
                   repeatCount="indefinite"></animate>
        </circle>
        <circle r="5"
                cx="-16.970562748477143"
                cy="-16.97056274847714"
                transform="translate(32,32)"
                stroke-width="0">
          <animate attributeName="fill-opacity"
                   dur="750ms"
                   values=".7;.4;.3;.3;.3;1;.9;.85;.7"
                   repeatCount="indefinite"></animate>
        </circle>
        <circle r="5"
                cx="-4.408728476930472e-15"
                cy="-24"
                transform="translate(32,32)"
                stroke-width="0">
          <animate attributeName="fill-opacity"
                   dur="750ms"
                   values=".85;.7;.4;.3;.3;.3;1;.9;.85"
                   repeatCount="indefinite"></animate>
        </circle>
        <circle r="5"
                cx="16.970562748477136"
                cy="-16.970562748477143"
                transform="translate(32,32)"
                stroke-width="0">
          <animate attributeName="fill-opacity"
                   dur="750ms"
                   values=".9;.85;.7;.4;.3;.3;.3;1;.9"
                   repeatCount="indefinite"></animate>
        </circle>
      </g>
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
import clear from "../../assets/clear.png";

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
        case "clear":
          return clear;
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
    color: {
      type: String,
      default: "#bfbfbf"
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
