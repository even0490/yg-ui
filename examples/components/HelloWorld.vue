<template>
  <div class="hello">
    <yg-input type="text"
              v-model="mobile"
              inputType="mobile"
              placeholder="这是手机号" />
    <yg-input type="password"
              v-model="pwd"
              inputType="pwd"
              placeholder="这是测试" />
    <yg-input type="text"
              v-model="email"
              inputType="email"
              placeholder="这是email" />
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
    <router-link to="/slid">slid</router-link>
  </div>
</template>

<script>
import logo from "../assets/logo.png";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      mobile: "",
      pwd: "",
      email: ""
    };
  },
  components: {},
  computed: {
    errors() {
      return this.$vuerify.$errors; // 错误信息会在 $vuerify.$errors 内体现
    },
    logo() {
      console.log(logo);
      return logo;
    }
  },
  vuerify: {
    mobile: {
      test: /^(13[0-9]|147|15[0-3]|15[5-9]|170|173|17[6-8]|18[0-9])\d{8}$/, // 自定义规则，可以是函数，正则或者全局注册的规则（填字符串）
      message: "您输入的手机号码格式有误，请重新输入"
    },
    pwd: {
      test: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/, // 自定义规则，可以是函数，正则或者全局注册的规则（填字符串）
      message: "请输入6—16位包括数字和字母的密码"
    },
    checkCode: {
      test: /^\d{6}$/,
      message: "请输入6位短信验证码"
    },
    email: "email"
  },
  methods: {
    handleClick() {
      console.log(this.mobile);
      console.log(this.errors);
      this.$confirm("123");
    },
    handleClick2() {
      this.$alert("123");
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
</style>r
