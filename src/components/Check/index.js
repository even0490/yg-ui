import Vue from "vue";

const IP_REGEX =
  "^(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|[1-9])\\." +
  "(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\." +
  "(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\." +
  "(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)$";

// 注册一个全局自定义指令 `v-checkParam`
Vue.directive("checkParam", {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el, binding, vNode) {
    let that = this;
    var el = el.firstElementChild;
    var err =[];
    el.addEventListener("keyup", function (event) {
      // 首先去除已有样式
      el.className = el.className.replace("input-error", "").trim();
      if (!event.keyCode) {
        // 加上这个判断就是在提交时，才会校验
        // 判断是否是否必填
        let isRequired = binding.value.required;
        if (isRequired) {
          if (!el.value || el.value === "") {
            // el.className = el.className.replace("input-error", "").trim();
            // el.className += " input-error";
            if(err.indexOf(binding.value.regTxt) == -1) {
              err.push(binding.value.regTxt);
            }
          }
        }

        // 判断正则
        let regex = binding.value.regex;
        if (regex === "IpRegex") {
          if (!el.value.match(IP_REGEX)) {

            if(err.indexOf(binding.value.regTxt) == -1) {
              err.push(binding.value.regTxt);
            }
            // el.className = el.className.replace("input-error", "").trim();
            // el.className += " input-error";
          }
        } else if (!el.value.match(regex)) {
          /*el.className = el.className.replace("input-error", "").trim();
          el.className += " input-error";*/

          if(err.indexOf(binding.value.regTxt) == -1) {
            err.push(binding.value.regTxt);
          }
        }
      }
      return err;
    });
  }
});
// 注册一个全局自定义指令 `v-checkSubmit`
Vue.directive("formCheck", {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el, binding, vNode) {
    /*console.log(el.getElementsByTagName('input'));
    for (var i = 0; i < el.getElementsByTagName('input').length; i++) {
      console.log(el.getElementsByTagName('input')[0].getAttribute('rule'))

    }*/
     el.addEventListener("click", function(event) {
       let elements = document.getElementsByClassName("v-check");
       var evObj = document.createEvent("Event");
       evObj.initEvent("keyup", true, true);
       for (let element of elements) {
         element.firstElementChild.dispatchEvent(evObj);
       }
       let errorInputs = document.getElementsByClassName("input-error");
       if (errorInputs.length === 0) {
         vNode.context.submit();
       }
     });
  }
});

/*Vue.component('form-check', {
  provide: function () {
    return {
      check: this.check
    }
  },
  data: function () {
    return {
      checkItem: []
    }
  },
  mounted: function () {
    this.checkItem = new google.maps.Map(this.$el, {
      center: { lat: 0, lng: 0 },
      zoom: 1
    })
  },
  methods: {
    check: function (found) {
      var vm = this
    }
  },
  template: '<div class="check"><slot></slot></div>'
})

Vue.component('google-map-marker', {
  inject: ['getMap'],
  props: ['places'],
  created: function () {
    var vm = this
    vm.getMap(function (map) {
      vm.places.forEach(function (place) {
        new google.maps.Marker({
          position: place.position,
          map: map
        })
      })
    })
  },
  render (h) {
    return null
  }
})*/


