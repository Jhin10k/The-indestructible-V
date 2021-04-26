import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入全局清除默认样式
import './assets/css/reset.css'

//引入UI框架
import ElementUI from 'element-ui'
Vue.use(ElementUI)
import 'element-ui/lib/theme-chalk/index.css'

//引入全局组件
import gCom from './common'
for(let i in gCom){
  Vue.component(i,gCom[i])
}

import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

//创建服务器地址并挂载到vue实例上
Vue.prototype.$imgUrl = 'http://localhost:3000/'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
