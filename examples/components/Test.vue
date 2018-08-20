<template>
  <div>
    <div class="form1"
         v-formCheck="rule">
      <div>
        <label class="star">Name:</label>
        <input class='v-check'
               v-checkParam="{
            required:true,
            regex:'^[abcde]*$',
            regTxt:'名字不能为空'}"
               type="text">
      </div>
      <div>
        <label class="star">IP:</label>
        <input class='v-check'
               v-checkParam="{required:true,
            regex:'IpRegex',
            regTxt:'ip不能为空'}"
               type="text">
      </div>
      <div>
        <button class="submit">提交</button>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  name: "Test",
  data() {
    return {
      rule: {
        name: {},
        ip: {}
      }
    };
  },
  methods: {
    submit() {
      console.log(this.err);
      alert("通过校验");
    },
    test() {
      alert("测试按钮");
    }
  }
};
</script>

<style scoped>
input {
  height: 22px;
}

.input-error {
  background-color: red;
}

.star:before {
  content: "*";
  color: red;
}
</style>
