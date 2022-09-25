import Vue from 'vue';
import toast from './index.vue';
const Toast = Vue.extend(toast);//相当于webpack.merge 参数合并（toast 参数，提前内置）
// new Vue()

export default function ({ msg, type }, duration = 3000) {
  const app = new Toast({
    el: document.createElement('div'),
    data() {
      return {
        msg,
        type
      }
    }
  });
  if (duration < 2000) {
    duration = 2000;
  }
  document.body.appendChild(app.$el);
  setTimeout(() => {
    app.flag = false;
  }, duration - 500)
  setTimeout(() => {
    document.body.removeChild(app.$el);
  }, duration)
}