import axios from 'axios'
import {Message} from 'element-ui'
import store from '@/store'
import {getToken} from '@/utils/auth'
import {getTokenKey} from "./auth";
import {decrypt, Decrypt, Encrypt} from "./AESUtils";

// create an axios instance
const service = axios.create({
    baseURL: process.env.BASE_API, // api 的 base_url
    timeout: 5000 // request timeout
})


// let _that = this

// request interceptor
service.interceptors.request.use(
    config => {

        // console.log("解密 test:");
        // let a =Encrypt('11')
        // console.log("a:" , a);
        // let b = Decrypt(a)
        // console.log("b:" , b);

        // console.log("config:", config);
        // 加密参数
        // if (!config.url.includes('login') && config.method === 'post') {
        //     console.log("加密参数:");
        // let cloneObj = Object.defineProperties({}, Object.getOwnPropertyDescriptors(JSON.stringify(config.params)));
        // let new_param = Encrypt(JSON.stringify(config.params))
        // config.params = new_param
        // }
        //
        console.log("config:", config);
        // Do something before request is sent
        // if (store.getters.token) {
        // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
        // config.headers['X-Token'] = getToken()
        // }
        // 发送请求之前做一些处理
        //在登录的时候，后台会将token和loginId传递过来，拿到值以后，用localStorage.setItem("jwt",JSON.stringify(data));存起来
        // let storageData = localStorage.getItem("jwt");
        // let storageData = getTokenKey("jwt")
        // let storageData = getToken()
        // if (storageData) {
        //     storageData = JSON.parse(storageData);
        //     let token = storageData.token
        //     let mobile = storageData.mobile;
        //     config.headers['X-Token'] = token;
        //     config.headers['X-LoginId'] = mobile;
        // }
        return config
    },
    error => {
        // Do something with request error
        console.log(error) // for debug
        Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        console.log("拦截器1:", response);
        // if (response.data.status === 10) {
        //     MessageBox({
        //         title: '提示',
        //         message: '登录状态过期,请重新登录',
        //         callback: action => {
        //             location.href = "/#/login"
        //         }
        //     })
        //     return response;
        // }

        // 解析后台返回的加密数据
        // l已废弃 因为解密后台数据总是报错
        // if (typeof(response.data) === 'string') {
        //     let s = Decrypt(response.data)
        //     console.log("s:", s);
        // }


        console.log(":response.config.url ", response.config.url);
        // 如果请求的url 不是 api 接口，就放行
        if (response.config.url.includes('login/login') || response.config.url.includes('/user/info')) {
            console.log("'返回 response:");
            return response;
        }
        let res = response.data

        if (res.status === 0) {
            if (res.msg) {
                Message({
                    message: res.msg,
                    type: 'success',
                    duration: 5 * 1000
                })
            }

            return response
        }

        if (res.status === 1) {

            if (res.msg) {
                Message({
                    message: res.msg || "请求失败,请稍后重试",
                    type: 'error',
                    duration: 5 * 1000
                })
            }
            // console.log("re:");
            // return Promise.reject('errcior')

            return Promise.reject("返回值-1")
        }

        if (res.status === 30) {

            if (res.msg) {
                Message({
                    message: "认证不通过,请重新登录",
                    type: 'error',
                    duration: 3 * 1000,
                    showClose: true,
                    // callback: action => {
                    // }
                })
                // 退回登录页面
                store.dispatch('LogOut').then(() => {
                    location.reload()// In order to re-instantiate the vue-router object to avoid bugs
                })
            }

            // console.log("re:");
            // return Promise.reject('errcior')

            return Promise.reject("返回值-1")
        }
    },
    /**
     * 下面的注释为通过在response里，自定义code来标示请求状态
     * 当code返回如下情况则说明权限有问题，登出并返回到登录页
     * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
     * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
     */
    response => {
        console.log("拦截器2:", response);

        const res = response.data
        console.log("res:", res);
        if (res.status !== 0) {
            Message({
                message: res.msg,
                type: 'error',
                duration: 5 * 1000
            })
            // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
            // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
            //     // 请自行在引入 MessageBox
            //     // import { Message, MessageBox } from 'element-ui'
            //     MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
            //         confirmButtonText: '重新登录',
            //         cancelButtonText: '取消',
            //         type: 'warning'
            //     }).then(() => {
            //         store.dispatch('FedLogOut').then(() => {
            //             location.reload() // 为了重新实例化vue-router对象 避免bug
            //         })
            //     })
            // }
            return Promise.reject('error')
        } else {
            return response.data
        }
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.msg,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
