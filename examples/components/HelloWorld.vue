<template>
  <div class="hello">

    <yg-form ref="formDate" :checkDefault="checkDefault">

      <yg-input id="phone" icon="0102" class="v-check" :rule="rulePhone" type="password"
                v-model="pwd"
                inputType="pwd"
                placeholder="这是测试">
      </yg-input>
      <yg-input id="code" class="v-check" :rule="ruleCode" type="text"
                v-model="email"
                inputType="email"
                placeholder="这是email"></yg-input>
      <yg-input id="passWord" class="v-check" :rule="rulePassWord" type="text"
                v-model="mobile"
                inputType="mobile"
                placeholder="这是手机号"></yg-input>
    </yg-form>
    <yg-button
      @handleClick="checkForm"
      bgColor="#f5825e"
      txtWeight="bold"
      txtColor="#fff"
      ref="btn"></yg-button>
    <!--<yg-button @handleClick="handleClick2"
               btnTxt="取消"
               bgColor="#fff"
               txtHeight="1.2rem"
               txtWeight="bold"
               txtColor="#f5825e"
               ref="btn2"></yg-button>-->
  </div>
</template>

<script>

  export default {
    name: "HelloWorld",
    data() {
      return {
        msg: "Welcome to Your Vue.js App",
        mobile: "",
        pwd: "",
        email: "",
        checkDefault: {
          phone: '手机号不能为空',
          passWord: '密码不能为空',
          code: '验证码不能为空',
        },
        rulePhone: {required: true, regex: /^[abcde]*$/, regTxt: '名字有误'},
        ruleCode: {required: true, regex: /^[0-9]$/, regTxt: '只能是数字'},
        rulePassWord: {required: true, regex: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/, regTxt: '密码有误'},
      };
    },
    components: {},
    computed: {},
    methods: {
      handleClick() {
        console.log(this.errors);
      },
      handleClick2() {
        this.$toast(Math.random() + "");
        this.$refs.btn2.cancel();
      },
      checkForm() {
        // console.log(this.$refs.formDate.checkDate);
      }
    }
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .main {
    padding: 0 0.4rem;
  }

  .input-error {
    background-color: red;
  }
</style>
