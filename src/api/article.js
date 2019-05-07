import request from '@/utils/request'
import {downloadFileRequest} from "../utils/APIPost";

export function fetchList(query) {
    return request({
        url: '/article/list',
        method: 'get',
        params: query
    })
}

// 发送手机验证码
export function sendMobileCodeApi(query) {
    return request({
        url: '/user/send_msg',
        method: 'post',
        params: query
    })
}

// 发送手机验证码
export function userLoginApi(query) {
    return request({
        url: '/admin/login',
        method: 'post',
        params: query
    })
}

// 效验手机验证码
export function validMobileCodeApi(query) {
    return request({
        url: '/user/valid_code',
        method: 'post',
        params: query
    })
}

export function sendNotice(query) {
    return request({
        url: '/send/notice',
        method: 'post',
        params: query
    })
}

export function noticeList(query) {
    return request({
        url: '/send/list',
        method: 'post',
        params: query
    })
}

export function sendNoticeTest(query) {
    return request({
        url: '/send/SendMessage',
        method: 'post',
        params: query
    })
}


export function receiveNoticeTest(query) {
    return request({
        url: '/send/ReceiveMessage',
        method: 'post',
        params: query
    })
}


export function assetList(query) {
    return request({
        url: '/asset/list',
        method: 'post',
        params: query
    })
}

export function exportAssetList(query) {
    return request({
        url: '/export/export_all_asset',
        method: 'post',
        params: query
    })
}

export function logList(query) {
    return request({
        url: '/operation_note/list',
        method: 'post',
        params: query
    })
}


export function deleteAppApi(data) {
    return request({
        url: '/app/del',
        method: 'POST',
        params: data,
        data: data
    })
}


export function updateApp(data) {
    return request({
        url: '/app/update',
        method: 'POST',
        params: data,
        data: data
    })
}

export function addApp(data) {
    return request({
        url: '/app/add',
        method: 'POST',
        params: data,
        data: data
    })
}


export function appList(data) {
    return request({
        url: '/app/list',
        method: 'POST',
        params: data,
        data: data
    })
}

export function companyList(data) {
    return request({
        url: '/company/list',
        method: 'POST',
        params: data,
        data: data
    })
}

export function testAES(query) {
    return request({
        url: '/admin/test',
        method: 'POST',
        params: query
    })
}

export function fetchArticle(id) {
    return request({
        url: '/article/detail',
        method: 'get',
        params: {id}
    })
}

export function fetchPv(pv) {
    return request({
        url: '/article/pv',
        method: 'get',
        params: {pv}
    })
}

export function createArticle(data) {
    return request({
        url: '/article/create',
        method: 'post',
        data
    })
}

export function updateArticle(data) {
    return request({
        url: '/article/update',
        method: 'post',
        data
    })
}

// 启用或者禁用公司
export function startOrDisabledApi(query) {
    return request({
        url: '/company/start_or_disabled',
        method: 'post',
        params: query
    })
}

// 获取公司个数
export function getCompanyCount() {
    return request({
        url: '/company/count',
        method: 'post'
    })
}


// 获取资产个数
export function getAssetCount() {
    return request({
        url: '/asset/count',
        method: 'post'
    })
}

// 获取资产个数
export function getSystemLogCount() {
    return request({
        url: '/operation_note/count',
        method: 'post'
    })
}

// 获取通告个数
export function getSendCount() {
    return request({
        url: '/send/count',
        method: 'post'
    })
}

/**
 * 打印资产列表
 * @param param
 * @returns {*}
 */
export function downloadExcelFileApi(href) {
    return downloadFileRequest(href)
}
