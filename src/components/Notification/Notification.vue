<template>
  <yg-dialog ref="dialogBox"
             :visible="visible"
             @update:visible="editVisible"
             :maskHide="false">
    <div class="yg-notification-header"
         slot="header">
      <yg-icon class="yg-notification-close"
               v-show="closeIcon"
               type="close"
               @click.native="btnHandler('close')"></yg-icon>
      <p class="yg-notification-title">{{title}}</p>
    </div>
    <div class="yg-notification-box">
      <slot></slot>
    </div>
    <div class="yg-notification-btns"
         v-show="footer"
         slot="footer">
      <yg-button type="cancel"
                 size="mini"
                 v-show="cancelBtn"
                 @click="btnHandler('cancel')">{{cancelTxt}}</yg-button>
      <yg-button size="mini"
                 @click="btnHandler('submit')">{{submitTxt}}</yg-button>
    </div>
  </yg-dialog>
</template>

<script>
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import Dialog from "../Dialog";

export default {
  name: "yg-notification",
  components: {
    "yg-button": Button,
    "yg-icon": Icon,
    "yg-dialog": Dialog
  },
  data() {
    return {};
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    closeIcon: {
      type: Boolean,
      default: true
    },
    footer: {
      type: Boolean,
      default: true
    },
    cancelBtn: {
      type: Boolean,
      default: true
    },
    submitTxt: {
      type: String,
      default: "确定"
    },
    cancelTxt: {
      type: String,
      default: "取消"
    },
    title: {
      type: String,
      default: "提示"
    }
  },
  methods: {
    editVisible(vl) {
      this.$emit("update:visible", vl);
    },
    hide() {
      this.$refs.dialogBox.hide();
    },
    btnHandler(flag) {
      flag === "close" && this.hide();
      this.$emit(flag);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../static/border.scss";
.yg-notification-header {
  @include border(0 0 1px);
  text-align: center;
  position: relative;
  line-height: 50px;
  font-size: 16px;
  color: rgb(85, 85, 85);
}
.yg-notification-close {
  position: absolute;
  width: 16px;
  height: 16px;
  padding: 16px;
  left: 0;
  top: 0;
  cursor: pointer;
}
.yg-notification-box {
  font-size: 14px;
  line-height: 20px;
  text-align: center;
}
.yg-notification-btns {
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
}
.yg-notification-btns > .yg-button {
  margin: 0 10px;
  width: 100px;
}
</style>
