// pages/coupons/coupons.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav:['可使用','已使用/已过期','下载'],
    curnav:0,
    coupon:null,
    canpons:[],
    tabtit:['优惠劵名','使用期限','折扣'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name:'getcoupons'
    }).then(res=>{
      console.log(res.result.data)
      this.getcoupon(res.result.data)
    })
  },

  getcoupon(data){
    let canuse=[],nouse=[];
    for(let i=0;i<data.length;i++){
      let date = data[i].effective
      let dates= date.split('~')
      dates[1] = dates[1].replace(/-/g, '/')
      console.log(dates[1])
      let ndate=new Date(dates[1])
      let nowdate=new Date()
      console.log(nowdate)
      if(nowdate<ndate){
        canuse.push(data[i])
      }
      else{nouse.push(data[i])}
    }
    console.log(nouse,canuse)
    this.setData({
      coupons:[canuse,nouse]
    })
  },

  getcurnav:function(e){
    let id=e.detail.id;
    this.setData({curnav:id})
  },

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