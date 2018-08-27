<template>
  <div class="hello">
    <yg-form ref="formDate"
             :rule="rule">
      <yg-input id="phone"
                class="we"
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
               type="cancel"
               ref="btn"></yg-button>
    <yg-button @click="handleClick2"
               :disabled="true"
               btnTxt="取消"
               bgColor="#fff"
               txtHeight="1.2rem"
               txtWeight="bold"
               txtColor="#f5825e"
               ref="btn2"></yg-button>

    <div class="select"
         @click="showPicker(0)"
         ref="select0">{{ selectedText[0] }}</div>
    <yg-picker @select="handleSelect(0,arguments)"
               :selected-index="selectedIndex[0]"
               ref="picker0"
               title="请选择银行卡"
               cancelTxt="取消"
               confirmTxt="确认"></yg-picker>

    <div class="select"
         @click="showPicker(0)"
         ref="select0">{{ selectedText[0] }}</div>
    <yg-picker @select="handleSelect(0,arguments)"
               :selected-index="selectedIndex[0]"
               ref="picker0"
               title="请选择"
               cancelTxt="取消"
               confirmTxt="确认"></yg-picker>

    <router-link to="/slid">slid</router-link>
  </div>
</template>

<script>
let data1 = [
  {
    text: "剧毒",
    value: 1
  },
  {
    text: "蚂蚁",
    value: 2
  },
  {
    text: "幽鬼",
    value: 3
  },
  {
    text: "主宰",
    value: 4
  },
  {
    text: "卡尔",
    value: 5
  },
  {
    text: "宙斯",
    value: 6
  },
  {
    text: "巫医",
    value: 7
  },
  {
    text: "巫妖",
    value: 8
  },
  {
    text: "神谕者",
    value: 9
  },
  {
    text: "撼地神牛",
    value: 10
  },
  {
    text: "蓝胖子",
    value: 11
  },
  {
    text: "水晶室女",
    value: 12
  },
  {
    text: "莉娜",
    value: 13
  },
  {
    text: "斯拉克",
    value: 14
  },
  {
    text: "斯拉达",
    value: 15
  }
];

export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      mobile: "",
      pwd: "",
      email: "",
      checkDefault: {
        phone: "手机号不能为空",
        passWord: "密码不能为空",
        code: "验证码不能为空"
      },
      rule: {
        phone: [{ required: true, regex: /^[abcde]*$/, regTxt: "名字有误1" }],
        code: [
          { required: true, fn: () => true, regTxt: "只能是数字1" },
          { required: true, regex: /^[0-9]*$/, regTxt: "只能是数字2" }
        ],
        passWord: [
          {
            promise: () => Promise.resolve(),
            regTxt: "密码有误1"
          },
          {
            promise: () => Promise.resolve(),
            regTxt: "密码有误2"
          }
        ]
      },
      show: false,
      selectedIndex: [[0], [1, 0], [0, 1, 2], [0, 0, 0]],
      selectedText: ["One column picker demo ..."]
    };
  },
  mounted() {
    this.$refs.picker0.setData([data1]);
    this.$refs.picker0.setSelectedIndex([0]);
  },
  methods: {
    showPicker(index) {
      let picker = this.$refs.picker0;
      picker.show();
    },

    handleSelect(index, args) {
      this.selectedText.splice(index, 1, args[2].join("，"));
    },
    handleClick() {
      this.show = true;
    },
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
    },

    close() {
      this.show = false;
    },
    confirmFn(val) {
      this.show = false;
      console.log(val);
      this.defaultData = [val.select1];
    },
    toShow() {
      this.show = true;
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
