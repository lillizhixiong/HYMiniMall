// pages/category/category.js
import regeneratorRuntime from '../../lib/runtime/runtime';
import { getCates } from "../../network/category.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [],
    rightContent: [],
    currentIndex: 0,
    scrollTop: 0
  },
  Cates: [],
  //  ==================  发送网络请求  ======================================
  async __getCates() {
    // getCates().then(res => {
    //   this.Cates = res.data.message;

    //   // 将获取回来的数据存进缓存中
    //   wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });


    //   let leftMenuList = this.Cates.map(el => el.cat_name);
    //   let rightContent = this.Cates[0].children;
    //   this.setData({
    //     leftMenuList,
    //     rightContent
    //   });
    // });

    // 1. 使用es7 的 async await 的方法请求数据
    let res = await getCates();
    this.Cates = res;

    // 将获取回来的数据存进缓存中
    wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });


    let leftMenuList = this.Cates.map(el => el.cat_name);
    let rightContent = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    });
  },

  // =====================  事件监听  =========================================
  handleMenuItemClick(e) {

    let currentIndex = e.currentTarget.dataset.index;
    let rightContent = this.Cates[+currentIndex].children;

    this.setData({
      currentIndex,
      rightContent,
      scrollTop: 0
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1. 发送请求之前先判断缓存中有没有旧数据
    //  {time: Date.now(), data:[...]}
    // 2. 没有旧数据,直接发送请求
    // 3. 有旧数据, 同时旧数据也没过期, 就可以使用

    const Cates = wx.getStorageSync("cates");

    if (!Cates) {
      // 1. 获取分类数据, 没有旧数据,请求回来将旧数据放进( 本地存储中 )
      this.__getCates()
    } else {
      // 有旧数据 定义过期时间 10s 改成5分钟
      if (Date.now() - Cates.time > 1000 * 60 * 5) {
        // 过期了
        this.__getCates();
      } else {
        // 可以使用旧数据
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(el => el.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        });
      }
    }


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})