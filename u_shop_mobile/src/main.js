import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//全局引入清除默认样式以及rem
import './assets/css/reset.css'
import './assets/js/remScale'
//全局引入阿里矢量图
import './assets/iconfont/iconfont.css'

//引入axios核心库
import axios from 'axios'
Vue.prototype.$axios = axios
//全局引入过渡动画
import 'animate.css/animate.min.css'

//全局引入轮播图的js 和css
import 'swiper/js/swiper.min'
import 'swiper/css/swiper.min.css'

//引入vantUI
import VantUI from 'vant'
Vue.use(VantUI)
import 'vant/lib/index.css'

//引入你封装好的全局模块
import gCom from './common'
//全局注册组件
//循环  for in  循环对象
for(let i  in gCom){
  Vue.component(i,gCom[i])
}

// //创建全局过滤器
// Vue.filter('toPrice',toPrice)
//引入封装好的过滤器模块
import gFilter from './filter'
for(let i in gFilter){
  Vue.filter(i,gFilter[i])
}

//创建图片服务器
Vue.prototype.$imgUrl = 'http://localhost:3000'

Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
