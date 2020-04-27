import { getSwiperList, getCateList, getFloorList } from "../../network/home.js";
// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperLists: [], // 轮播图
    cates: [], // 导航分类
    floorList: [] // 楼层数据
  },
  // ================= 事件监听函数 =========================
  __getSwiperList() {
    getSwiperList().then((res) => {
      let swiperLists = res;
      this.setData({
        swiperLists
      });
    });
  },
  __getCateLists() {
    getCateList().then(res => {
      let cates = res;
      this.setData({
        cates
      });
    })
  },

  __getFloorList() {
    getFloorList().then((res) => {
      let floorList = res;
      this.setData({
        floorList
      });
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1. 获取轮播图数据
    this.__getSwiperList();
    // 2. 获取导航分类数据
    this.__getCateLists();
    // 3. 获取楼层数据
    this.__getFloorList();
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