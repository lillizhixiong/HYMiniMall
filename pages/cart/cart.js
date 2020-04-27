// pages/cart/cart.js
import regeneratorRuntime from '../../lib/runtime/runtime';
import { getSetting, openSetting, chooseAddress, showModal,showToast} from "../../util/tool.js";
import { getStorage, setStorage } from "../../util/set_get_Storage.js";

Page({

  data: {
    address: {},// 存放用户地址
    cart: [],  // 缓存中购物车数据
    allChecked: false,// 缓存中购物车数据是否全选
    totlePrice: 0,  // 勾选商品的总价格
    totleNum: 0   // 勾选商品的总数量
  },
  // ============== 生命周期函数 =======================================
  onShow() {
    // 1. 判断缓存中是否地址缓存数据
    let address = getStorage("address");

    // 2. 获取缓存中购物车数据
    let cart = getStorage("cart") || [];

    // 3. 判断数据中checked是否都为true

    // 注意: 空数组使用every方法就是true
    // let allChecked = cart.length ? cart.every(el => el.checked): false;  // 两次循环效率低
    // let totlePrice = 0;
    // let totleNum = 0;
    // let allChecked = true;
    // cart.forEach(el => {
    //   if (el.checked) {
    //     totlePrice += el.goods_price * el.num;
    //     totleNum += el.num;
    //   } else {
    //     allChecked = false
    //   }
    // });

    // // 当cart 为空数组的时候, 不执行上面代码, 则不合理
    // allChecked = cart.length ? allChecked : false;

    // this.setData({
    //   address,
    //   cart,
    //   allChecked,
    //   totlePrice,
    //   totleNum
    // });

    this.setCart(cart);
    this.setData({
      address
    });
  },


  // 点击获取收货地址
  //  1.绑定点击事件
  //  2. 调用小程序内置 api 获取用户收货地址

  //  2. 获取 用户对小程序 所授予 获取地址的权限状态  scope
  //1  假设 用户 点击获取收货地址的 提示框 确定   authSetting  scope.address: true
  // scope 为 true
  // 2  假设 用户 从来没点击获取收货地址的    authSetting  scope.address: undefined

  // 1和2可以直接获取地址


  // 3  假设 用户 点击获取收货地址的 提示框 取消   authSetting  scope.address: false
  // + 诱导用户自己打开(wx.openSetting)  授权设置页面 当用户重新个 设置 获取地址的时候
  // + 获取收货地址

  // 4. 把获取到地址存到本地存储中 onshow生命周期
  // ====================== 事件监听 =================================================
  async handleGetAddressClick() {
    //  获取用户收货地址
    // 1. 先获取用户授予的地址权限
    // =====================复杂=======================================
    // wx.getSetting({
    //   success: (result) => {
    //     let scopeAddress = result.authSetting['scope.address'];
    //     // 当授权 为true 的时候 , 用户没有设置授权的时候
    //     if (scopeAddress === true || scopeAddress === undefined) {
    //       wx.chooseAddress({
    //         success: (result1) => {
    //           console.log(result1)
    //         }
    //       });
    //     } else {
    //       // 3. 用户曾经拒绝过获取 收货地址的权限
    //       wx.openSetting({
    //         success: (result2)=>{
    //           // 4. 直接获取用户地址
    //           wx.chooseAddress({
    //             success: (result3) => {
    //               console.log(result3)
    //             }
    //           });
    //         }
    //       });
    //     }
    //   }
    // });
    // =================== 使用es7 async await=========================
    // 1. 引入 import regeneratorRuntime from '../../lib/runtime/runtime';和 封装的 wx-api
    // 2. 先获取用户的权限  如果为 true 和undefined 则可以调用 chooseAddress 否则不能
    // 2.1 获取用户权限
    try {
      let res1 = await getSetting();

      let scopeAddress = res1.authSetting['scope.address'];

      if (scopeAddress === false) {
        await openSetting();
      }
      // 调用获取地址
      let address = await chooseAddress();
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      // 将获取的地址存到缓存中 , 方便其他页面使用
      setStorage('address', address)

    } catch (err) {
      console.log(err)
    }




  },
  handleItemChange(e) {

    let { cart } = this.data;

    let goods_id = e.currentTarget.dataset.id;

    let index = cart.findIndex(el => el.goods_id === goods_id)
    cart[index].checked = !cart[index].checked;


    this.setCart(cart)

  },

  // 设置购物车状态重新计算 购物总价数量  全选
  setCart(cart) {
    let totlePrice = 0;
    let totleNum = 0;
    let allChecked = true;
    cart.forEach(el => {
      if (el.checked) {
        totlePrice += el.goods_price * el.num;
        totleNum += el.num;
      } else {
        allChecked = false
      }
    });

    // 当cart 为空数组的时候, 不执行上面代码, 则不合理
    allChecked = cart.length ? allChecked : false;

    this.setData({
      cart,
      totlePrice,
      totleNum,
      allChecked
    })
    setStorage('cart', cart)
  },

  //  全选按钮
  handleCheckBoxAllClick() {

    let { cart, allChecked } = this.data;

    allChecked = !allChecked;

    cart.forEach(el => el.checked = allChecked);

    this.setCart(cart);
  },

  // 点击修改商品数量, 并设置回 data 和缓存中
  async handleItemNumEdit(e) {

    let { id, operation } = e.currentTarget.dataset;

    let { cart } = this.data;

    let index = cart.findIndex(el => el.goods_id == id);


    if (cart[index].num === 1 && operation == -1) {
      let res = await showModal({
        content: "是否要删除该商品?"
      });

      if (res.confirm) {
        cart.splice(index, 1)
      }
    } else {
      cart[index].num += operation;
    }
    this.setCart(cart);
  },

  // 点击结算
  async handlePay() {
    let {address, totleNum} = this.data;

    if(!address.userName) {
      await showToast({
        title: '请选择收货地址'
      });
      return;
    }

    if(totleNum === 0) {
      await showToast({title:"请选择商品"});
      return;
    }

    wx.navigateTo({url: '/pages/pay/pay',});


  }
})