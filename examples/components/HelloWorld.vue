<template>
  <div class="hello">
    <yg-form ref="formDate"
             :rule="rule">
      <yg-input id="phone"
                prop="phone"
                type="test"
                format="bankCard"
                v-model="mobile"
                placeholder="这是测试">
      </yg-input>
      <yg-input id="code"
                type="test"
                prop="code"
                :closeBtn="true"
                v-model="email"
                placeholder="这是email">
      </yg-input>
      <yg-input :iconPwd="true"
                :closeBtn="true"
                prop="passWord"
                id="passWord"
                type="password"
                v-model="pwd"
                placeholder="这是密码">
      </yg-input>
    </yg-form>
    <yg-button @click="checkForm"
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
    <router-link to="/slid">slid</router-link>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      mobile: "12341234",
      pwd: "",
      email: "",
      rule: {
        phone: [{ regex: /^[abcde]+$/, regTxt: "名字有误" }],
        code: [{ regex: /^[0-9]$/, regTxt: "只能是数字" }],
        passWord: [
          {
            regex: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
            regTxt: "密码有误"
          }
        ]
      }
    };
  },
  components: {},
  computed: {},
  methods: {
    handleClick() {},
    handleClick2() {
      this.$toast(Math.random() + "");
      this.$refs.btn2.cancel();
    },
    checkForm() {
      this.$refs.formDate
        .checkForm()
        .then(data => {
          console.log("success");
        })
        .catch(err => {
          console.log(err);
        });
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
.openEye img {
  width: 17px;
  height: 17px;
}
</style>
