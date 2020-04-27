// pages/authorization/authorization.js
import regeneratorRuntime from '../../lib/runtime/runtime';
import { getSetting, openSetting, chooseAddress, showModal, showToast } from "../../util/tool.js";
import { login } from "../../util/login.js";
import { getToken } from "../../network/authorization.js";
import { getStorage, setStorage } from "../../util/set_get_Storage.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // =============  事件监听 ======================
  // 获取用户信息
  async handleGetUserInfo(e) {
    // 1. 获取用户信息 encryptedData  iv  rawData  signature
    // let { encryptedData, iv, rawData, signature } = e.detail;

    // 2. 获取小程序登录成功后的code  wx-login
  
    let { code } = await login();

    console.log(code)
    return
    let loginParams = { encryptedData, iv, rawData, signature, code };
    
    
    // 3. 发送请求获取用户token (现在没发获取)

    let token = await getToken({data: loginParams, method: "POST"});


  },

})