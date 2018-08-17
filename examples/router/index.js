import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "../components/HelloWorld";
import slid from "../components/slid";

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
    }
  ]
});
