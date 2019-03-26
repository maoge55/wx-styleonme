let util=require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperimg:[],
    swiperimg2:[],
    swiperimg3:[],
    autoplay1:true,
    autoplay2:true,
    grid:'2',
    bestpro:[],
    arrivalpro:[],
    tppro:[],
    picnum:0,
    lenth:0,
    flag1:true,
    flag2:true,
    baanerImg:[
      { id: '0', url:'cloud://envtest-bb8d5d.656e-envtest-bb8d5d/images/品牌图/banner1.jpg'},
      { id: '1', url:'cloud://envtest-bb8d5d.656e-envtest-bb8d5d/images/品牌图/banner2.jpg'},
      { id: '2', url:'cloud://envtest-bb8d5d.656e-envtest-bb8d5d/images/品牌图/banner3.jpg'}
    ]
  },

  getswiperimg(){
    let db=wx.cloud.database()
    let _ = db.command;
    let promise = db.collection('swiperImg').where({
    }).orderBy('lb_classid', 'asc').get().then(res=>{
      this.setData({
        swiperimg:res.data.slice(0,6),
        swiperimg2:res.data.slice(6,8),
        swiperimg3:res.data.slice(8,10)
      })
    })
  },

  getlistdata(){
    let db=wx.cloud.database();
    let pro=db.collection('product');
    let len=this.data.lenth
    pro.limit(6).skip(len*6).get().then(res=>{
      if(res.data.length==0){this.setData({flag1:false});return;}
      var data=res.data.slice(0)
      util.listCl(data);
      this.setData({bestpro:this.data.bestpro.concat(data),flag2:true});
    })

    pro.limit(9).skip(100).get().then(res=>{
      let data=res.data;
      util.listCl(data);
      this.setData({arrivalpro:data})
    })
  },

  smallchange:function(e){
    var task=e.detail.source;
    var id=e.currentTarget.dataset.id;
    if(task=='touch'){
      if (id == '1') {this.setData({ autoplay1: false })}
      if (id == '2') {this.setData({ autoplay2: false })}
    }
  },

  getgrid:function(e){
    var grid=e.detail.grid;
    this.setData({grid:grid})
  },

  changepicnum(){
    var picnum=this.data.picnum;
    if(picnum==0){picnum=1}
    else{picnum=0}
    this.setData({picnum:picnum})
    setTimeout(()=>this.changepicnum(),3000)
  },

  addmorbest:function(){
    var flag2=this.data.flag2;
    if (!flag2) {return;}
    var len=this.data.lenth;
    if(len==14){return;}
    this.setData({
      flag2:false,
      lenth:len+1
    })
    this.getlistdata()
  },
  onLoad: function (options) {
    this.getswiperimg();
    this.getlistdata();
    wx.cloud.callFunction({
      name:'getprolist',
      data:{
        cid:'0110',
        limit:9,
        len:0
      }
    }).then(res=>{
      let arrdata=res.result.mydata;
      util.listCl(arrdata);
      this.setData({tppro:arrdata})
    })

    // wx.cloud.callFunction({
    //   name:'login'
    // }).then(res=>{console.log(res)})
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
    setTimeout(() => this.changepicnum(), 3000);
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