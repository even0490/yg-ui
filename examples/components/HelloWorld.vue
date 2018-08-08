<template>
  <div class="main">
    <Layout></Layout>
    <!--<h1>{{ msg }}</h1>-->
    <!--<h2>Essential Links</h2>
    <ul>
      <li>
        <a href="https://vuejs.org"
           target="_blank">
          Core Docs
        </a>
      </li>
      <li>
        <a href="https://forum.vuejs.org"
           target="_blank">
          Forum
        </a>
      </li>
      <li>
        <a href="https://chat.vuejs.org"
           target="_blank">
          Community Chat
        </a>
      </li>
      <li>
        <a href="https://twitter.com/vuejs"
           target="_blank">
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a href="http://vuejs-templates.github.io/webpack/"
           target="_blank">
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a href="http://router.vuejs.org/"
           target="_blank">
          vue-router
        </a>
      </li>
      <li>
        <a href="http://vuex.vuejs.org/"
           target="_blank">
          vuex
        </a>
      </li>
      <li>
        <a href="http://vue-loader.vuejs.org/"
           target="_blank">
          vue-loader
        </a>
      </li>
      <li>
        <a href="https://github.com/vuejs/awesome-vue"
           target="_blank">
          awesome-vue
        </a>
      </li>
    </ul>--><!--<h2>Essential Links</h2>
    <ul>
      <li>
        <a href="https://vuejs.org"
           target="_blank">
          Core Docs
        </a>
      </li>
      <li>
        <a href="https://forum.vuejs.org"
           target="_blank">
          Forum
        </a>
      </li>
      <li>
        <a href="https://chat.vuejs.org"
           target="_blank">
          Community Chat
        </a>
      </li>
      <li>
        <a href="https://twitter.com/vuejs"
           target="_blank">
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a href="http://vuejs-templates.github.io/webpack/"
           target="_blank">
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a href="http://router.vuejs.org/"
           target="_blank">
          vue-router
        </a>
      </li>
      <li>
        <a href="http://vuex.vuejs.org/"
           target="_blank">
          vuex
        </a>
      </li>
      <li>
        <a href="http://vue-loader.vuejs.org/"
           target="_blank">
          vue-loader
        </a>
      </li>
      <li>
        <a href="https://github.com/vuejs/awesome-vue"
           target="_blank">
          awesome-vue
        </a>
      </li>
    </ul>-->

    <Input type="text" v-model="mobile" inputType="mobile" placeholder="这是手机号"></Input>
    <Input type="password" v-model="pwd" inputType="pwd" placeholder="这是测试"></Input>
    <Input type="text" v-model="email" inputType="email" placeholder="这是email"></Input>

    <btn @handleClick="handleClick" bgColor="#f5825e" txtWeight="bold" txtColor="#fff" ref="btn"></btn>
    <btn @handleClick="handleClick2" btnTxt="取消" bgColor="#fff" txtHeight="1.2rem" txtWeight="bold" txtColor="#f5825e"
         ref="btn2"></btn>

  </div>
</template>

<script>
  import Layout from "@/layout/Layout";
  import Input from "@/components/Input/Input";
  import btn from "@/components/Button/Button";

  export default {
    name: "HelloWorld",
    data() {
      return {
        msg: "Welcome to Your Vue.js App",
        mobile: '',
        pwd: '',
        email: '',
      };
    },
    components: {
      Layout,
      Input,
      btn
    },
    computed: {
      errors() {
        return this.$vuerify.$errors; // 错误信息会在 $vuerify.$errors 内体现
      },
    },
    vuerify: {
      mobile: {
        test: /^(13[0-9]|147|15[0-3]|15[5-9]|170|173|17[6-8]|18[0-9])\d{8}$/,  // 自定义规则，可以是函数，正则或者全局注册的规则（填字符串）
        message: '您输入的手机号码格式有误，请重新输入'
      },
      pwd: {
        test: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,  // 自定义规则，可以是函数，正则或者全局注册的规则（填字符串）
        message: '请输入6—16位包括数字和字母的密码'
      },
      checkCode: {
        test: /^\d{6}$/,
        message: '请输入6位短信验证码'
      },
      email: 'email',
    },
    methods: {
      handleClick() {
        console.log(this.mobile);
        console.log(this.errors)
      },
      handleClick2() {
        this.$toast("已取消", {type: 'center'});
        this.$refs.btn2.cancel()
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
</style>
