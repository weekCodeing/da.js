import {CryptoJS} from '@/utils/aes.js';  //引用AES源码js
const userKey = '30313233343536373839616263646566';
//加密
function Encrypt(data,personKey) {
  if(!personKey){
	personKey=userKey
  }
  var byteKey = CryptoJS.enc.Hex.parse(personKey);
  var byteData = CryptoJS.enc.Hex.parse(data);
  var encrypt = CryptoJS.AES.encrypt(byteData, byteKey, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.NoPadding });
  var encryptedStr = encrypt.ciphertext.toString();
  return encryptedStr;
}
//解密
function Decrypt(data,personKey) {
  if(!personKey){
  	personKey=userKey
  }
  var byteKey = CryptoJS.enc.Hex.parse(personKey);
  var byteData = CryptoJS.enc.Hex.parse(data);
  byteData = CryptoJS.enc.Base64.stringify(byteData);
  var decrypt = CryptoJS.AES.decrypt(byteData, byteKey, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.NoPadding });
  var decryptedStr = decrypt.toString(CryptoJS.enc.Hex);
  return decryptedStr.toString();
}

function hex2int(hex) {
    var len = hex.length, a = new Array(len), code;
    for (var i = 0; i < len; i++) {
        code = hex.charCodeAt(i);
        if (48<=code && code < 58) {
            code -= 48;
        } else {
            code = (code & 0xdf) - 65 + 10;
        }
        a[i] = code;
    }
     
    return a.reduce(function(acc, c) {
        acc = 16 * acc + c;
        return acc;
    }, 0);
}

function str2hexStr(str) {
    if(str === ""){
		return ''
	}
    var hexCharCode = [];
　　for(var i = 0; i < str.length; i++) {
　　　　hexCharCode.push((str.charCodeAt(i)).toString(16));
　　}
　　return hexCharCode.join("");
}
//暴露接口
module.exports.Decrypt = Decrypt;
module.exports.Encrypt= Encrypt;
module.exports.hex2int = hex2int;
module.exports.str2hexStr = str2hexStr;
