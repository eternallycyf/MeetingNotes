import CryptoJS from "crypto-js";
import moment from 'moment'

export default class ToolClass {

  static AES_KEY: string = '0000000000000000';
  static CREATE_TIME: string = 'create_time';

  /**
 * 加密
 * @param {String} str 需要加密的字符串
 * @returns {String} 加密的后字符串
 */
  encrypt = (str: string, key: string = ToolClass.AES_KEY) => {
    var key: string = CryptoJS.enc.Utf8.parse(key);
    var srcs = CryptoJS.enc.Utf8.parse(str);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.toString();
  }

  /**
 * 解密
 * @param {String} str 需要解密的字符串
 * @returns {String} 解密的后字符串
 */
  decrypt = (str: string, key: string = ToolClass.AES_KEY) => {
    var key: string = CryptoJS.enc.Utf8.parse(key);
    var decrypt = CryptoJS.AES.decrypt(str, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  }
  /**
   * toDo 优化时间排序
   * @param arr 
   * @param key 
   * @returns 
   */
  sortTime = (arr: Array<any>, key: string = ToolClass.CREATE_TIME) => {
    return arr.sort((a, b) => a?.['create_time'].localeCompare(b?.['create_time']));
  }

  /**
   * 找到对应日期下的所有section
   * @param arr 
   * @param time 
   */
  findList = (arr: Array<any>, time: string) => {
    return arr.filter(item => item?.[ToolClass.CREATE_TIME] === time)
  }
}