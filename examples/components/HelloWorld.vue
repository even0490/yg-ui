<template>
  <div class="hello">

    <yg-formCheck>
      <yg-input placeholder="测试依赖注入"></yg-input>
    </yg-formCheck>
    <yg-formCheck :checkDate="checkDate">
      <yg-input class="v-check"  v-checkParam="{required:true,regex:'^[abcde]*$',regTxt:'名字不能为空'}" type="password"
                v-model="pwd"
                inputType="pwd"
                placeholder="这是测试"/>
      <yg-input class="v-check" v-checkParam="{required:true,regex:'IpRegex',regTxt:'ip不能为空'}" type="text"
                v-model="email"
                inputType="email"
                placeholder="这是email"/>
      <yg-input class="v-check" v-checkParam="{required:true,regex:'IpRegex',regTxt:'ip不能为空'}"  type="text"
                v-model="mobile"
                inputType="mobile"
                placeholder="这是手机号"/>
    </yg-formCheck>
    <yg-button v-formCheck
               bgColor="#f5825e"
               txtWeight="bold"
               txtColor="#fff"
               ref="btn"></yg-button>
    <yg-button @handleClick="handleClick2"
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
        checkDate:{}
      };
    },
    components: {},
    computed: {
    },
    methods: {
      handleClick() {
        console.log(this.errors);
      },
      handleClick2() {
        this.$toast(Math.random() + "");
        this.$refs.btn2.cancel();
      },
      submit() {
        // console.log(this.err);
        alert('通过校验')
      },
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
