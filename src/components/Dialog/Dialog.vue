<template>
  <div class="yg-dialog">
    <yg-popup :visible="visible"
              :maskHide="maskHide"
              :showMask="showMask"
              @update:visible="editVisible"
              transition="yg-zoom">
      <div class="yg-dialog-box">
        <div class="yg-dialog-header">
          <slot name="header"></slot>
        </div>
        <div class="yg-dialog-content"
             @click="contHide&&hide()">
          <slot></slot>
        </div>
        <div class="yg-dialog-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </yg-popup>
  </div>
</template>

<script>
import Popup from "../Popup";
export default {
  name: "yg-dialog",
  data() {
    return {};
  },
  props: {
    showMask: {
      type: Boolean,
      default: true
    },
    maskHide: {
      type: Boolean,
      default: true
    },
    contHide: {
      type: Boolean,
      default: true
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  components: {
    "yg-popup": Popup
  },
  methods: {
    editVisible(vl) {
      this.$emit("update:visible", vl);
    },
    hide() {
      this.editVisible(false);
    }
  }
};
</script>

<style scoped>
.yg-dialog-box {
  margin: 100px auto 0;
  box-sizing: border-box;
  width: 273px;
  z-index: 9999;
  border-radius: 5px;
  background: white;
  overflow: hidden;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
}

.yg-dialog-content {
  flex: 1;
  padding: 15px 15px 20px;
  color: rgb(102, 102, 102);
  font-size: 14px;
  line-height: 20px;
  text-align: left;
}
</style>
