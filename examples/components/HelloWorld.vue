<template>
  <div class="hello">
    <yg-form ref="formDate" :checkDefault="checkDefault">

      <yg-input iconLeft="left" iconClose="close" id="phone" :rule="rulePhone" type="test"
                v-model="mobile"
                placeholder="这是测试">
        <img slot="iconLeft" src="../assets/0100.png" alt="">
        <img slot="iconClose" src="../assets/0100.png" alt="">
      </yg-input>
      <yg-input id="code" iconLeft="left" iconClose="close" :rule="ruleCode" type="test"
                v-model="email"
                placeholder="这是email">
        <img slot="iconLeft" src="../assets/0100.png" alt="">
        <img slot="iconClose" src="../assets/0100.png" alt=""></yg-input>
      <yg-input iconLeft="left" iconClose="close" iconPwd="pwd" id="passWord" :rule="rulePassWord" type="password"
                v-model="pwd"
                placeholder="这是密码">
        <img slot="iconLeft" src="../assets/0100.png" alt="">
        <img slot="iconClose" src="../assets/0100.png" alt="">
        <yg-icon slot="iconPwd" type="openeye" class="openEye"></yg-icon>
      </yg-input>
    </yg-form>
    <yg-button
      @click="checkForm"
      bgColor="#f5825e"
      txtWeight="bold"
      txtColor="#fff"
      ref="btn"></yg-button>
    <yg-button @click="handleClick"
               bgColor="#f5825e"
               txtWeight="bold"
               txtColor="#fff"
               ref="btn"></yg-button>
    <yg-button @click="handleClick2"
               btnTxt="取消"
               bgColor="#fff"
               txtHeight="1.2rem"
               txtWeight="bold"
               txtColor="#f5825e"
               ref="btn2"></yg-button>
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
      handleClick(){},
      handleClick2() {
        this.$toast(Math.random() + "");
        this.$refs.btn2.cancel();
      },
      checkForm() {
        console.log(this.$refs.formDate.checkDate)
      }
    },
  }
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
  .openEye img{
    width: 17px;
    height: 17px;
  }
</style>
