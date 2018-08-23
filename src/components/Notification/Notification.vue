<template>
  <yg-dialog ref="dialogBox"
             :maskHide="false">
    <div class="yg-notification-box">
      <div class="yg-notification-header">
        <yg-icon class="yg-notification-close"
                 v-show="closeIcon"
                 type="close"
                 @click.native="btnHandler('cancel')"></yg-icon>
        <p class="yg-notification-title">{{title}}</p>
      </div>
      <div class="yg-notification-content">{{text}}</div>
      <div class="yg-notification-btns">
        <yg-button type="cancel"
                   size="mini"
                   v-show="cancelBtn"
                   @click="btnHandler('cancel')">{{cancelTxt}}</yg-button>
        <yg-button size="mini"
                   @click="btnHandler('submit')">{{submitTxt}}</yg-button>
      </div>
    </div>
  </yg-dialog>
</template>

<script>
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
export default {
  name: "yg-notification",
  components: {
    "yg-button": Button,
    "yg-icon": Icon
  },
  data() {
    return {
      title: "提示",
      text: "",
      submitTxt: "确定",
      cancelTxt: "取消",
      defaultOption: {
        title: "提示",
        text: "",
        submitTxt: "确定",
        cancelTxt: "取消"
      }
    };
  },
  props: {
    closeIcon: {
      type: Boolean,
      default: true
    },
    cancelBtn: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    show() {
      this.$refs.dialogBox.show({});
      return new Promise((resolve, reject) => {
        this.$once("close", flag => {
          if (flag === "submit") {
            resolve();
          } else {
            reject();
          }
        });
      });
    },
    hide() {
      this.$refs.dialogBox.hide();
    },
    btnHandler(flag) {
      this.hide();
      this.$emit("close", flag);
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
  font-size: 17px;
  color: rgb(85, 85, 85);
}
.yg-notification-close {
  position: absolute;
  width: 20px;
  height: 20px;
  padding: 15px;
  left: 0;
  top: 0;
  cursor: pointer;
}
.yg-notification-content {
  padding: 15px 15px 20px;
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
