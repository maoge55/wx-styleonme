let util=require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pro:{},
    index:0,
    navcurrent:0,
    progg:{
      color:null,
      size:null,
      buynum:1
    },
    colors:[],
    sizes:[
      {id:'0',text:'S'},
      {id:'1',text:'M'}
    ],
    nums:[],
    msi:0,
    msimg:[]
  },

  getcolors(){
    let color=this.data.pro.colors;
    let colors=[];
    for(let i=0;i<color.length;i++){
      let ys={};
      ys.id=i.toString();
      ys.text=color[i];
      colors.push(ys);
    }
    this.setData({colors:colors})
  },
  createNum(){
    let nums = [];
    for(let i=0;i<20;i++){
      let num={};
      num.id=i.toString();
      num.text=(i+1).toString();
      nums.push(num);
    }
    this.setData({nums:nums})
  },
  chooseImg:function(e){
    let index=e.currentTarget.dataset.index;
    this.setData({index:index})
  },

  select:function(e){
    console.log(e);
    let ss=e.currentTarget.dataset.ss;
    let value=e.detail.text
    switch(ss){
      case '0':
      this.setData({['progg.color']:value});
      break;
      case '1':
      this.setData({['progg.size']:value});
      break;
      case '2':
      this.setData({['progg.buynum']:value});
      break;
    }

    console.log(this.data.progg)
  },
  onLoad: function (options) {
    let db=wx.cloud.database();
    db.collection('product').where({Id:'1'}).get().then(res=>{
      let data=res.data;
      util.listCl(data);
      this.setData({pro:data[0]})
      console.log(this.data.pro)
      this.getcolors();
    })

    this.createNum()

    db.collection('prodetail').where({ IDS: '48271' }).get().then(res => {
      console.log(res.data)
      let xdata=res.data;
      let i=this.data.msi;
      let pic=xdata[i].imgs.split('|');
      pic.pop();
      this.setData({msimg:pic})
    })
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

  },

  tabss:function(e){
    this.setData({navcurrent:e.detail.id})
  }
})