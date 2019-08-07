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
    ordid:0,
    len:0,
    flag:false,
    loadover:false
  },
  getlistdata(){
    //获取best商品列表
    let cid=this.data.cid
    wx.cloud.callFunction({
      name:'getprolist',
      data:{
        len:0,
        limit:6,
        cid:cid,
        ordid:1
      }
    }).then(res=>{
      let bestpro=res.result.mydata;
      this.setData({bestpro:bestpro})
    })
  },

  getclasspro(){
    //获取分类商品的列表
    var { len, cid,ordid} = this.data;
    wx.cloud.callFunction({
      name: 'getprolist',
      data: {
        ordid:ordid,
        len: len,
        cid: cid,
        limit: 20
      }
    }).then(res => {
      wx.hideLoading()
      var newdata = res.result.mydata;
      if(newdata.length==0){
        wx.showToast({
          title: '已加载全部数据',
          icon: 'success'
        })
        this.setData({flag:false,loadover:true})
        return;
      }
      console.log(newdata)
      this.setData({
        classpro:this.data.classpro.concat(newdata),
        len:len+1,
        flag:false
      })
      var arr=this.data.classpro;
    })
  },

  getordmeth:function(e){
    wx.showLoading({
      title: '',
    })
    var id=e.detail.id;
    var ordid=this.data.ordid;
    if(id==ordid){return;}
    this.setData({
        ordid:id,
        len:0,
        classpro:[],
        loadover:false
    });
    this.getclasspro()
  },

  getgrid:function(e){
    this.setData({grid:e.detail.grid})
  },

  loadmore:function(e){
    if(this.data.len==0){return;}//避免刚载入页面就触底刷新
    if(this.data.flag){return;}//避免重复触底刷新
    if(this.data.loadover){return;}//加载全部数据完禁止触发刷新
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
    this.getlistdata();
    this.getclasspro();
  },

})