// pages/buy/buy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buy:[],
    tabtit:['图片','商品名','价格','数量','合计'],
    address:null,
    detailInfo:null,
    psfs:'',
    sends:[
      {id:0,name:'普通配送',sdname:'快递',sdprice:'免邮'},
      {id:0,name:'普通配送',sdname:'快递',sdprice:'免邮'},
      ]
  },

  onLoad: function (options) {
    if(!options.buy){
      wx.redirectTo({
        url: '../cart/cart',
      })
      return;
    }
    let buy=JSON.parse(options.buy);
    console.log('正在购买',buy);
    this.setData({
      buy:buy
    })

    if (!!wx.getStorageSync('receAdd'))
    { this.setAdd(wx.getStorageSync('receAdd')) };
  },

  chooseAdd: function () {
    wx.chooseAddress({
      success: (res) => {
        this.setAdd(res);
        wx.setStorageSync('receAdd', res);
      },
    })
  },

  setAdd(add) {
    var info = add.provinceName + add.cityName + ' ' + add.countyName + add.detailInfo;
    this.setData({
      address: add,
      detailInfo: info,
      btnFlag: false
    });
  },



})