//专门用于管理axios方法
//引入核心库
import axios from 'axios'
//引入路由文件
import router from '../../router'
import store from "../../store"

//第二步调用axios中create() 重新创建一个实例因为可以重新对axios的一些属性进行配置
let http = axios.create({
     baseURL:'',//基础地址
    // timeout:  //超时控制
})

// axios拦截器
// 请求拦截器 ——interceptors
http.interceptors.request.use((req)=>{
    // //除了登录，其他接口访问数据均需设置请求头 token
    // req.headers.authorization = sessionStorage.getItem('userinfo') ? JSON.parse(sessionStorage.getItem('userinfo')).token : ''
    if (req.url != "/api/userlogin") {
        req.headers.authorization = store.getters.getUserInfo.token;
      }
    return req
})

//响应拦截器
http.interceptors.response.use((res)=>{
    if(res.data.code==403){
        alert(res.data.msg)
        //token 过期 跳转到登录
        router.push('/login')
    }
    return res.data
})


//导出封装好的新的实例
export default http
