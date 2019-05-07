// import store from '../../store'
import $ from 'jquery'
// export const operator = function () {
//     store.commit("LIST", [1, 2, 3])
// }

// 下划线转换驼峰
export function toHump(name) {
    return name.replace(/\_(\w)/g, function (all, letter) {
        return letter.toUpperCase();
    });
}

// 驼峰转换下划线
export function toLine(name) {
    return name.replace(/([A-Z])/g, "_$1").toLowerCase();
}

export function formatTwoArr(arr) {
}

/**
 *    对象的英文key 转换 为 中文key
 * @param data  {name: 'xm', sex: 'man'}
 * @param keyMap {name: '姓名', sex: '性别'}
 * @returns {{}} { '姓名': 'xm', '性别': 'man' }
 */
export function toChsKeys2(data, keyMap) {
    return Object.keys(data).reduce((newData, key) => {
        let newKey = keyMap[key] || key
        newData[newKey] = data[key]
        return newData
    }, {})
}

// console.log(toChsKeys(data, keyMap))


//
/**
 对象的中文key 转换 为英文key
 //
 * @param data  var data = {姓名: 'xm', 性别: 'man'}
 * @param keyMap var keyMap = {name: '姓名', sex: '性别'}
 * @returns {{}}  {name:"xm","sex":"man"}
 */
export function toChsKeys(data, keyMap) {
    return Object.keys(keyMap).reduce((newData, key) => {
        let newKey = key;
        newData[newKey] = data[keyMap[key]]
        return newData
    }, {})
}

/*
数字自动填充0
num传入的数字，n需要的字符长度
 */
export function PrefixInteger(num, n) {
    return (Array(n).join(0) + num).slice(-n);
}


/**
 * bolb下载 excel 文件
 * @param result
 * @param fileName
 */
export function blobDownloadExcelFile(result, fileName) {
    const content = result.data
    // console.log("document:", document);
    let blob = new Blob([content], {type: "application/vnd.ms-excel"});
    // const fileName = "资产标签_" + new Date().getTime().toString() + ".pdf"
    if ('download' in document.createElement('a')) { // 非IE下载
        const elink = document.createElement('a')
        elink.download = fileName
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href) // 释放URL 对象
        document.body.removeChild(elink)
    } else { // IE10+下载
        navigator.msSaveBlob(blob, fileName)
    }
}

/**
 * 格式化数据
 * @param list 原始数据
 * @param idstr id
 * @param pidstr pid
 * @param childStr subs | childs
 * @returns {Array}
 */
export function transDate(list, idstr, pidstr, childStr) {
//                console.log("list:", list);
    var result = [], temp = {};
    for (var i = 0; i < list.length; i++) {
//                    console.log("对应");
        temp[list[i][idstr]] = list[i];//将nodes数组转成对象类型
    }
    for (var j = 0; j < list.length; j++) {
        var tempVp = temp[list[j][pidstr]]; //获取每一个子对象的父对象
        if (tempVp) {//判断父对象是否存在，如果不存在直接将对象放到第一层
            if (!tempVp[childStr]) tempVp[childStr] = [];//如果父元素的nodes对象不存在，则创建数组
            tempVp[childStr].push(list[j]);//将本对象压入父对象的nodes数组
        } else {
            result.push(list[j]);//将不存在父对象的对象直接放入一级目录
        }
    }
    return result;
}


// 资产状态常量
export const ASSET_STATUS = {
    ALL: 0,
    USE_STATUS: 10,//在用状态
    LEAVE_UNUSED: 20,//闲置状态
    REPAIR: 30,//维修状态
    USE_LESS: 40, // 报废状态
    PENDING: 50, // 待审核状态
    INVENTORY: 60
}

/**
 * 对象 数组深拷贝
 * @param source
 * @returns {*}
 */
export function objDeepCopy(source) {
    var sourceCopy = source instanceof Array ? [] : {};
    for (var item in source) {
        sourceCopy[item] = (typeof source[item] === 'object' && source[item] !== null) ? objDeepCopy(source[item]) : source[item];
    }
    return sourceCopy;
}


/**
 * 创建 a链接并触发下载
 * @param href
 */
export function trigerDownloadFile(href) {
    let link = $('<a href="' + href + '" target="_self"></a>');
    link.get(0).click();
    link.remove();
}

/**
 * 把js中对象置为空
 * @param obj
 */
export function objValueSetNull(obj) {
    for (let key in obj) {
        obj[key] = undefined
    }
}

// 拼接url
export function createURL(url, obj) {
    let prefiix = ""
    $.each(obj, function (i, val) {
        console.log("i:", i);
        console.log("val:", val);
        if (val === undefined) {
            return true
        }
        prefiix += i + "=" + val + "&"
    });
    return url + "?" + prefiix
}
