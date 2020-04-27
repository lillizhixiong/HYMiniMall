import regeneratorRuntime from '../../lib/runtime/runtime';
import {getGoodsList} from '../../network/goods_list.js';
// pages/goods_list/goods_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    goodList: []
  },
  // 接口需要的参数
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },

  // 总页数
  totlePages: 1,


  //============事件监听==============================================
  handleTabsItemsClick(e) {
    let { tabs } = this.data;
    let { index } = e.detail;
    tabs.forEach((el, i) => {
      index == i ? el.isActive = true : el.isActive = false;
    });

    this.setData({
      tabs
    });
  },

  // ===========发送网络请求============================================
  async __getGoodsList() {
    
    let res = await getGoodsList(this.QueryParams);

    // 获取总条数
    let total = res.total;
    // 获取数据的总页数
    this.totlePages = Math.ceil(total / this.QueryParams.pagesize)
    this.setData({
      goodList: [...this.data.goodList,...res.goods]
    });

    wx.stopPullDownRefresh();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid;
    
    this.__getGoodsList();
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
    this.setData({
      goodList: []
    });
    this.QueryParams.pagenum = 1;
    this.__getGoodsList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.QueryParams.pagenum >= this.totlePages) {
     wx.showToast({
       title: '已到达底线了',
       icon: 'none'
     });
       
    }else {
      this.QueryParams.pagenum++;
      this.__getGoodsList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})