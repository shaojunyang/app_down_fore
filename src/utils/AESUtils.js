import CryptoJS from 'crypto-js/crypto-js'

// 默认的 KEY 与 iv 如果没有给
const KEY = CryptoJS.enc.Utf8.parse("1234567890123456");
const IV = CryptoJS.enc.Utf8.parse('1234567890123456');

/**
 * AES加密 ：字符串 key iv  返回base64
 */
export function Encrypt(word, keyStr, ivStr) {
    let key = KEY
    let iv = IV

    if (keyStr) {
        key = CryptoJS.enc.Utf8.parse(keyStr);
        iv = CryptoJS.enc.Utf8.parse(ivStr);
    }

    let srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    });
    // console.log("-=-=-=-", encrypted.ciphertext)
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);

}

/**
 * AES 解密 ：字符串 key iv  返回base64
 *
 */
export function Decrypt(word, keyStr, ivStr) {
    let key = KEY
    let iv = IV

    if (keyStr) {
        key = CryptoJS.enc.Utf8.parse(keyStr);
        iv = CryptoJS.enc.Utf8.parse(ivStr);
    }

    let base64 = CryptoJS.enc.Base64.parse(word);
    let src = CryptoJS.enc.Base64.stringify(base64);

    var decrypt = CryptoJS.AES.decrypt(src, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    });


    var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    // var decryptedStr = decrypt.toString();
    return decryptedStr.toString();
    // return decryptedStr
}

// str = "cU14bWphTmRCSGRObEM3RWludFUvbkJPcDF5RjFkdFBsZVoyL2dGRm4wcnpFZnVBYVNOYnFmOEZNV0JsQzZZT2IvaVNqMEJBcGoxczRtd05XUHNwY1lOdmRJQkdSWktMdmVpODBkY0Y1NkJDOFdHcEV4QVF2d1JTSTRjSTVxVmdrK0JyeGRhYkJKUDBmejJ0c0RYdkQ3SFNqUXBMNWV5elhUazNCdUgwOHU3R2tGZ0FhaEkvYkV4ZXMvNHlEcHk3azRHVXBMM3lPdkI1bUhLWnZWNTJpZVJpWTRPRUI3WGpNZ1BHRlJwRmNyYnZOLzYrbGo4a1E2ZVpWODZZOWJFRQ=="
// a = Decrypt(str)
// console.log("s:" , s);