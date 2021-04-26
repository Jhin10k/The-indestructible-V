import Vue from 'vue'
import VueRouter from 'vue-router'

//解决多次点击同一路由页面的waring问题
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push (location, onResolve, onReject) {
//   if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//   return originalPush.call(this, location).catch(err => err)
// }

Vue.use(VueRouter)

const routes = [
  {
    path: "/index",
    component: ()=>import("../pages/index"),
    children: [
      {
        path: "/home",
        component: ()=>import("../views/home"),
        name:'首页',
      },
      {
        path: "/sort",
        component: ()=>import("../views/sort"),
        name:"分类"
      },
      {
        path: "/mine",
        component: ()=>import("../views/mine"),
        name:"我的"
      },
      {
        path: "/cart",
        component: ()=>import("../views/cart.vue"),
        name:"购物车"
      },
      {
        path: "",
        redirect: "/home",
      }
    ]
  },
  {
    path: "/login",
    component: ()=>import("../pages/login"),
    name:'登录'
  },
  {
    path: "/register",
    component: ()=>import("../pages/register"),
    name:'注册'
  },
  {
    path: "/detail",
    component: ()=>import("../pages/detail"),
    name:'详情'
  },
  {
    path: "/list",
    component: ()=>import("../pages/list"),
    name:'小U商城'
  },
  {
    path: "/verify",
    component: ()=>import("../pages/verify"),
    name:'订单'
  },
  {
    path: "/WeChat_login",
    component: ()=>import("../pages/WeChat_login"),
    name:'微信登录'
  },
  {
    path: "*",
    redirect: "/index" 
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
