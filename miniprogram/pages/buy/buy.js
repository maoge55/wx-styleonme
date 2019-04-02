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
    send: { sdname: '', name:'请选择配送方式',sdprice:''},
    sends:[
      {id:0,name:'普通配送',sdname:'快递',sdprice:'免邮'},
      {id:0,name:'普通配送',sdname:'快递',sdprice:'收运费'},
    ],
    coupons:[],
    coupon:{title:'选择优惠券',dicount:0},
    totalprice:0
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
  onShow:function(){
    this.getcoupons();
    this.getottalprice()
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

  getsendfs:function(e){
    console.log(e.detail.value)
    let i=parseInt(e.detail.value);
    this.setData({send:this.data.sends[i]})
    this.pop=this.selectComponent('#popsend')
    this.pop.hideModal()
  },

  getcoupons(){
    //先读取缓存
    if(!!wx.getStorageSync('coupons')){
      console.log('从缓存读取了优惠券')
      this.setData({coupons:wx.getStorageSync('coupons')})
    }
    //缓存没读取到就往数据库读取
    else{
      wx.cloud.callFunction({
        name:'getcoupons'
      }).then(res=>{
        console.log(res.result.data)
        let coupons=res.result.data;
        this.setData({
          coupons:coupons
        })
        console.log('从数据库读取了优惠券')
        wx.setStorageSync('coupons', coupons)
      })
    }
  },

  getcoupon:function(e){
    let i=parseInt(e.detail.value);
    console.log(i);
    this.setData({coupon:this.data.coupons[i]})
    this.pop = this.selectComponent('#popcoupon')
    this.pop.hideModal()
  },

  getottalprice(){
    let buy=this.data.buy;
    let totalprice=0
    for(let i=0;i<buy.length;i++){
      totalprice+=buy[i].price.priceCNY*buy[i].buynum
    }
    this.setData({totalprice:totalprice})
  },

  toPay:function(e){
    if(!this.data.address){
      wx.showModal({
        title: '提示',
        content: '请选择收货地址',
        showCancel:false,
      })
      return;
    }

    if(!this.data.send.sdname){
      wx.showModal({
        title: '提示',
        content: '请选择配送方式',
        showCancel: false,
      })
      return;
      wx.showLoading({
        title: '正在支付',
      })
      wx.requestPayment({
        timeStamp: Math.round(Date.now()/1000),
        nonceStr: '1234',
        package: 'sss',
        signType: 'MD5',
        paySign: '123',
        success(e){
          console.log(e)
        },
        fail(e){
          console.log(e)
        }
      })
    }
  }
})