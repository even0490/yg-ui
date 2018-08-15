import Notification from "./Notification";

Notification.install = function(Vue) {
  Vue.component(Notification.name, Notification);
};

export default Notification;
