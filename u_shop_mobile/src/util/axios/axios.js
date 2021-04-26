//专门用于管理axios方法
//引入核心库
import axios from 'axios'

//第二步调用axios中create() 重新创建一个实例因为可以重新对axios的一些属性进行配置
let http = axios.create({
    // baseURL:'',//基础地址
    // timeout:  //超时控制
})

//axios拦截器
//请求拦截器 ——interceptors
http.interceptors.request.use((req)=>{
    /* 
        使用场景：
        一般全局添加请求头！！！
    */
   //添加请求头
//    req.headers.token = 123
 req.headers.authorization = sessionStorage.getItem('user')?JSON.parse(sessionStorage.getItem('user')).token :''
    return req
})

//响应拦截器
http.interceptors.response.use((res)=>{
    //全局拦截统一错误 比如token失效
    //针对返回的结果进行统一设置！！！
    return res.data
})


//导出封装好的新的实例
export default http


/* 
token令牌
token是后端（java/php）产生的概念

*/

/* 
登录逻辑：当点击登录，调取登录接口，传入用户名密码给后端
后端携带用户名密码去数据库检索
登录成功之后，我们会进入不同的页面，这个时候请问需不需要再次验证用户名密码????

实际上后端针对于每一个接口，都要验证用户名密码！！！！但是每验证一次，就要检索一次数据库！！！
太浪费性能！！！
所以这个时候就产生token的概念！！！
你登录成功之后，后端返回给你一个token令牌。你每次调用一个接口都要带着这个令牌，这个令牌就是必传参数！！！，后端只需要验证令牌即可

前端每次调用接口都带着token，太麻烦了。怎么办？？？？把token设置到请求头！！

token也是有时效的！！！，一般是几分钟左右（后端去设置它的时效）
token会失效！！！当token失效的时候，后端会返回给我们一段错误状态码，我们直接判断错误码，然后重新跳转登录
*/