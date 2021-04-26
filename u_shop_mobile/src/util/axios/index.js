//这个模块用于封装所有的接口
import http from './axios'

//封装登录接口
export function Login(data){
    console.log(data,'入参');
    return http.post('api/login',data)
}

//封装注册接口
export function Register(data){
    return http.post('api/register',data)
}

//封装一个轮播图
// export function getBanner(){
//     return http.get('api/getbanner')
// }
export async function getBanner(){
    let res = await http.get('/api/getbanner')
    return res.list
}

// export function getBanner1(){
//     return http({
//         url:'',
//         params:{}
//     })
// }

//修改
// export async function getBanner(){
//    let res   =   await http.get('/api/getbanner')
//    //res 代表 所有的响应结果
//    //return res.list  
//     console.log(res,'响应结果11111');
//    return res 
// }

//调用首页的商品信息
// export function getIndexGoods(){
//     return http.get('/api/getindexgoods')
// }
export async function getIndexGoods(){
    let res = await http.get('/api/getindexgoods')
    return res.list
}
//分类树结构
export async function getCateTree(){
    let res = await http.get('/api/getcatetree')
    return res.list
}

//分类树商品列表
export async function getCateGoods(params){
    let res = await http.get('/api/getgoods',{
        params
    })
    return res.list
}

//商品详情
export async function getGoodsDetail(params){
    let res = await http.get('/api/getgoodsinfo',{
        params
    })
    return res.list
}
//购物车列表
export async function getCartList(params){
    let res = await http.get('/api/cartlist',{
        params
    })
    res.list = res.list ? res.list: []
    return res.list
}
//购物车添加
export async function getCartAdd(data){
    let res = await http.post('/api/cartadd',data)
    return res
}
//购物车编辑
export async function getCartEdit(data){
    let res = await http.post('/api/cartedit',data)
    return res.list
}
//购物车删除
export async function getCartDelete(data){
    let res = await http.post('/api/cartdelete',data)
    return res.list
}