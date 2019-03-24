let util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cid:null,
    bestpro:[],
    classpro:[],
    classname:null,
    title:null,
    grid:'2',
    ordid:'0',
    len:0,
    flag:false
  },

  getlistdata(cid){
    //获取best商品列表
    wx.cloud.callFunction({
      name:'getprolist',
      data:{
        len:0,
        limit:6,
        cid:cid
      }
    }).then(res=>{
      let bestpro=res.result.mydata.data;
      util.listCl(bestpro);
      this.setData({bestpro:bestpro})
    })
  },

  getclasspro(cid){
    //获取分类商品的列表
    var { len, cid } = this.data;
    wx.cloud.callFunction({
      name: 'getprolist',
      data: {
        len: len,
        cid: cid,
        limit: 20
      }
    }).then(res => {
      var newdata = res.result.mydata.data;
      if(newdata.length==0){
        wx.showToast({
          title: '已加载全部数据',
          icon: 'success'
        })
        this.setData({flag:false})
        return;
      }
      util.listCl(newdata)
      this.setData({
        classpro:this.data.classpro.concat(newdata),
        len:len+1,
        flag:false
      })
    })
  },

  getordmeth:function(e){
    var id=e.detail.id;
    var ordid=this.data.ordid;
    if(id==ordid){return;}
    this.setData({ordid:id})
    console.log(id)
  },

  getgrid:function(e){
    this.setData({grid:e.detail.grid})
  },

  loadmore:function(e){
    console.log(e)
    this.setData({flag:true})
    this.getclasspro();

  },
  backlast:function(e){
    console.log(e)
    wx.showLoading({
      title: '正在加载',
    })
    wx.navigateBack({
      delta:1,
      complete:(res)=>{
        wx.hideLoading();
      }
    })

    setTimeout(()=>{
      wx.hideLoading()
      wx.showToast({
        title: '无法返回',
        image:'../../images/icons/fail.png'
      })
      },3000)
  },

  onLoad: function (options) {
    if (options.data == undefined){
      wx.reLaunch({
        url: '../home/home',
      })
    }
    var item=JSON.parse(options.data.replace(/\@/g,'&'))
    this.setData({
      cid:item.cid,
      title:item.title,
      classname:item.classname
    })
    console.log(item)
    this.getlistdata(this.data.cid);
    this.getclasspro(this.data.cid)
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
    wx.hideLoading();
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