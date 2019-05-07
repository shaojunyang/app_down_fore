import axios from 'axios'
import qs from 'qs';


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        this.$axios.get("/api" + url, {
            params: params
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    });
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */


export function post1(url, data = {}) {
    return new Promise((resolve, reject) => {
        this.$axios.post("/api" + url, this.$qs.stringify(data))
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    });
}

export function axios_download(url, data = {}) {
    return new Promise((resolve, reject) => {
        this.$axios.post("/api" + url, {
            responseType: "blob"
        }).then(response => {
            resolve(response.data);
        }, err => {
            reject(err)
        })
    });
}


export function jqueryPost(url, data) {
    return new Promise((resolve, reject) => {
        // console.log(this.$jquery);

        this.$jquery.ajax({
            type: "POST",
            url: "/api" + url,
            data: JSON.stringify(data),//将对象序列化成JSON字符串
            dataType: "json",
            contentType: 'application/json;charset=utf-8', //设置请求头信息
            success: function (response) {
                resolve(response);
            },
            error: function (err) {
                reject(err)
            }
        });
        // this.$axios.get("/api" + url, {
        //     params: params
        // })
        //     .then(response => {
        //         resolve(response.data);
        //     })
        //     .catch(err => {
        //         reject(err)
        //     })
    });
}


export function jqueryDownloadFile(url, data) {
    return new Promise((resolve, reject) => {
        // console.log(this.$jquery);
        this.$jquery.ajax({
            type: "POST",
            url: "/api" + url,
            data: JSON.stringify(data),//将对象序列化成JSON字符串
            dataType: 'arraybuffer', // 表明返回服务器返回的数据类型arraybuffer or blob
            success: function (response) {
                resolve(response);
            },
            error: function (err) {
                reject(err)
            }
        });
    });
}


// export {get, post}

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

// export function fetch(url, params = {}) {
//     return new Promise((resolve, reject) => {
//         axios.get(url, {
//             params: params
//         })
//             .then(response => {
//                 resolve(response.data);
//             })
//             .catch(err => {
//                 reject(err)
//             })
//     })
// }


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
 * post方式携带数组参数 到后台 ，后台使用数组接收参数
 * @param apiPath
 * @param params
 * @param successCallback
 * @param errorCallback
 */
export function postRequest(apiPath, params, successCallback, errorCallback) {
    let url = apiPath
    console.log("url:", url);
    console.log("axios:", axios);
    let req = axios.post(url, qs.stringify(params, {indices: false}))
    thenResponse(req, successCallback, errorCallback)
}

/**
 *
 * @param apiPath
 * @param params
 * @returns {AxiosPromise}
 */
export function printTagRequest(apiPath, params) {
    return axios({
        method: 'post',
        url: apiPath,
        responseType: 'arraybuffer',
        // 此处为data
        data: qs.stringify(params, {indices: false})
    })
    // axios.post(url, qs.stringify(params, {indices: false}))

}

/**
 * 下载文件请求
 * @param apiPath
 * @returns {AxiosPromise}
 */
export function downloadFileRequest(apiPath) {
    return axios({
        method: 'get',
        url: apiPath,
        responseType: 'arraybuffer'
    })
}


/**
 * 请求结果处理
 * @param axiosRequest
 * @param successCallback
 * @param errorCallback
 */
function thenResponse(axiosRequest, successCallback, errorCallback) {
    axiosRequest.then((res) => {
        if (res.status === 200) {
            res = res.data
            if (res.status === 0) {
                if (successCallback) successCallback(res)
            } else {
                if (errorCallback) errorCallback(res.code, res.msg, res)
            }
        }
    }).catch((error) => {
        console.log("error:", error);
        if (errorCallback) errorCallback(-1, error.message)
    })
}

