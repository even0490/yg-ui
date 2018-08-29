import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "../components/HelloWorld";
import slid from "../components/slid";
import Test from "../components/Test";
import scroll from "../components/scroll";
import indexList from "../components/indexList";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: "/yg-ui/",
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld
    },
    {
      path: "/slid",
      name: "slid",
      component: slid
    },
    {
      path: "/scroll",
      name: "scroll",
      component: scroll
    },
    {
      path: "/test",
      name: "Test",
      component: Test
    },
    {
      path: "/indexList",
      name: "indexList",
      component: indexList
    }
  ]
});
