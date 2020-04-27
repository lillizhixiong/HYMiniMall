import regeneratorRuntime from '../../lib/runtime/runtime';
import { getGoodDetail } from '../../network/goods_detail.js';

//1 点击轮播图预览大图功能
// 1.1 点击轮播图,指定点击事件
// 调用小程序的接口previewImage
// 2. 点击加入购物车
// 2.1 先绑定事件,
// 2.2 获取缓存中的购物车数据 数组格式
// 2.3 先判断当前商品是否存在 于购物车
// 2.4 已存在对该条数据进行 将商品数量进行 ++, 重新将购物车数据加入缓存中
// 2.5 弹出提示
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObject: {}
  },
  // 保存该条商品的数据
  GoodInfo:{},
  // =================发送网络请求==================================
  async __getGoodDetail(goods_id) {


    // 对象中有 22 个属性, 用不到这么多, 需要优化
    let goodsObject = await getGoodDetail({ goods_id });

    this.GoodInfo = goodsObject;

    this.setData({
      goodsObject: {
        pics: goodsObject.pics,
        pics_mid: goodsObject.pics_mid,
        goods_price: goodsObject.goods_price,
        goods_name: goodsObject.goods_name,
        // iphone 部分手机不支持 webp格式的图片格式
        //   最好找后台让他修改
        //  临时自己改   确保后台存在.jpg .png格式的图片
        goods_introduce: goodsObject.goods_introduce.replace(/\.webp/, '.jpg')
      }
    });

  },

  // 监听事件
  handlePreviewImageClick(e) {

    let urls = this.data.goodsObject.pics.map(el => el.pics_mid);
    // 点击预览大图片
    // 1. 当前显示图片的路径
    let current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    });
  },
  // 点击加入购物车
  handleInsertCartClick() {

    // 1. 先获取缓存中的购物车数据
    let cart = wx.getStorageSync("cart") || [];

    // 2. 判断商品对象是否存在于购物车对象中
    let index = cart.findIndex(el => el.goods_id == this.GoodInfo.goods_id);
    if(index === -1) {
      // 1.该条商品数据不存在购物车数组中
      this.GoodInfo.num = 1;
      this.GoodInfo.checked = true;
      cart.push(this.GoodInfo);
    }else {
      // 2. 该条数据已经存在数组中, 则对商品数量进行++, 然后更新缓存
      cart[index].num++;
    }
    // 更新缓存
    wx.setStorageSync("cart", cart);

    // 添加成功弹出 加入成功!
    wx.showToast({
      title: '加入成功',
      icon: "success",
      mask: true
    });

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1. 获取商品详情
    this.__getGoodDetail(options.goods_id)
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