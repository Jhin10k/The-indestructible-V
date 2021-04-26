import Vue from 'vue'
import VueRouter from 'vue-router'
//引入封装好的仓库模块
import store from "../store";
function hasUrl(url){
  return store.getters.getUserInfo.menus_url.some((item)=> item === url)
}

Vue.use(VueRouter)

//设定一个子路由列表并导出
export const routerChild =[
  {
    path:'/menu',
    component:()=>import('../views/menu/index'),
    name:'菜单管理',
    beforeEnter(to, from, next) {
      hasUrl("/menu") ? next() : next("/home");
    },
  },
  {
    path:'/role',
    component:()=>import('../views/role/role'),
    name:'角色管理',
    beforeEnter(to, from, next) {
      hasUrl("/role") ? next() : next("/home");
    },
  },
  {
    path: "/manger",
    component: () => import("../views/manger/manger"),
    name: "管理员管理",
    beforeEnter(to, from, next) {
      hasUrl("/manger") ? next() : next("/home");
    },
  },
  {
    path:'/goodscate',
    component:()=>import('../views/goodscate/goodscate'),
    name:'商品分类管理',
    beforeEnter(to, from, next) {
      hasUrl("/goodscate") ? next() : next("/home");
    },
  },
  {
    path:'/goodsspecs',
    component:()=>import('../views/goodsspecs/goodsspecs'),
    name:'商品规格管理',
    beforeEnter(to, from, next) {
      hasUrl("/goodsspecs") ? next() : next("/home");
    },
  },
  {
    path:'/goodsmanage',
    component:()=>import('../views/goodsmanage/goodsmanage'),
    name:'商品管理',
    beforeEnter(to, from, next) {
      hasUrl("/goodsmanage") ? next() : next("/home");
    },
  },
  {
    path: "/banner",
    component: () => import("../views/banner/banner"),
    name: "轮播图管理",
    beforeEnter(to, from, next) {
      hasUrl("/banner") ? next() : next("/home");
    },
  },
  {
    path: "/member",
    component: () => import("../views/member/member"),
    name: "会员管理",
    beforeEnter(to, from, next) {
      hasUrl("/member") ? next() : next("/home");
    },
  },
  {
    path:'/seck',
    component:()=>import('../views/seck/seck'),
    name:'秒杀管理',
    beforeEnter(to, from, next) {
      hasUrl("/seck") ? next() : next("/home");
    },
  }
]

const routes = [
  {
    path: '/login',
    component: ()=>import ('../pages/login.vue')
  },
  {
    path: '/index',
    component: ()=>import ('../pages/index.vue'),
    children:[
      {
        path:'/home',
        component:()=>import('../views/home')
      },
      ...routerChild,
      {
        path:'',
        redirect:'/home'
      }
    ]
  },
  {
    path:'*',
    redirect:'/login'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 封装全局登录拦截
router.beforeEach((to,from,next)=>{
  //如果去的是登录就next
  if(to.path=='/login'){
    next()
    return
  }
  //如果有存储状态就next
  if (store.getters.getUserInfo) {
    next();
    return;
  }
  //以上条件都不符合 就强制跳转到登录
  next('/login')
})

export default router
