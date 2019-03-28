// pages/cart/cart.js
let util=require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[]
  },


  submit:function(e){

  },
  onLoad: function (options) {

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
    //如果缓存数据丢失则从数据库加载
    if (!wx.getStorageSync('cart')){
      console.log('缓存购物车数据丢失，从数据库加载')
      wx.cloud.callFunction({
        name:'getcart'
      }).then(res=>{
        let cart=res.result.data[0].cart
        console.log('数据库的用户购物车',cart)
        //恢复缓存
        wx.setStorageSync('cart', cart)
        this.setData({
          goods:cart
        })
      })
    }
    //否则直接缓存加载
    else{
      let cart=wx.getStorageSync('cart')
      this.setData({goods:cart})
    }

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