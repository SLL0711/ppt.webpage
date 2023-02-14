import Vue from 'vue'
import App from './App.vue'
import router from './router'
import request from './common/axios/request'
import { getLocalStorageToken } from './common/util'
import { appConfig } from './common/const'
import { Pagination,Tag,Carousel,CarouselItem,Upload,Button,Input,Form } from 'element-ui';
//TODO: 1、Vuex需要时引入 2、Carousel 走马灯

Vue.use(Pagination)
Vue.use(Tag)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Upload)
Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
// Vue.use(Message)


Vue.prototype.axios = request;

Vue.config.productionTip = false

if (appConfig.enableGuardRoute) {
  router.beforeEach((to, from, next) => {
    const token = getLocalStorageToken();
    if (!token) {
      if (to.fullPath !== '/login') {
        next('/login');
      }
      return;
    }

    //登入状态下禁止返回登入页面
    if (to.fullPath === '/login') {
      next(false);
      return;
    }

    next();
  })
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
