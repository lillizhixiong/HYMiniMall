// pages/cart/cart.js
import regeneratorRuntime from '../../lib/runtime/runtime';
import { getStorage, setStorage } from "../../util/set_get_Storage.js";

/* 1. 页面加载的时候
     1. 先从缓存中获取购物车的数据, 渲染到页面中
        + 这些商品的特点: checked 为true
    2. 微信支付
      1. 哪些人, 哪些账户可以实现微信支付
        1. 企业账号
        2. 企业账号后台中 必须 给开发者添加进白名单
          1. 一个appid 可以绑定多个开发者
          2. 这些开发者就可以共用这个appid 和 它的开发权限了
    3. 支付按钮 
      1. 判断缓存中有没有token
      2. 没有  跳转到授权页面
      3. 有token 直接可以支付
*/
Page({

  data: {
    address: {},// 存放用户地址
    cart: [],  // 缓存中购物车数据
    totlePrice: 0,  // 勾选商品的总价格
    totleNum: 0   // 勾选商品的总数量
  },
  // ============== 生命周期函数 =======================================
  onShow() {
    // 1. 判断缓存中是否地址缓存数据
    let address = getStorage("address");

    // 2. 获取缓存中购物车数据
    let cart = getStorage("cart") || [];

    // 3. 获取购物车数据 checked
    cart = cart.filter(el => el.checked); 

    
    this.setData({address });

    let totlePrice = 0;
    let totleNum = 0;
    cart.forEach(el => {
      if (el.checked) {
        totlePrice += el.goods_price * el.num;
        totleNum += el.num;
      } 
    });


    this.setData({
      cart,
      totlePrice,
      totleNum,
      address
    })


  },
  // ================ 事件监听  ======================================
  handleOrderPay() {
    // 1. 先判断缓存中有没有token值
    let token = getStorage('token');

    //2. 没有token值, 就跳转到授权支付页面
    if(!token) {
      wx.navigateTo({
        url: '/pages/authorization/authorization'  
      });
      return
    }

    // 3. 有token 直接进行下一步操作
  }
})