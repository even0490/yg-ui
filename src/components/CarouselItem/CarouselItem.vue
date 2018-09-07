<template>
  <div class="yg-carousel-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "yg-carousel-item",
  inject: ["registerItem"],
  mounted() {
    this.registerItem(this);
  }
};
</script>

<style lang="scss" scoped>
.yg-carousel-item {
  position: relative;
  height: 100%;
  flex: 1;
}
</style>
