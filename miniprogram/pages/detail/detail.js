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
      {id:'1',text:'M'},
      {id:'3',text:'L'}
    ],
    nums:[],
    msi:0,
    msimg:[],
    sizeImgs:[
      {
        cid:'0101',
        url:'cloud://envtest-bb8d5d.656e-envtest-bb8d5d/images/sizeImg/dress_size.jpg'
      }
    ],
    sizeImg:null,
    flag:false,
    xdata:[],
    zxnum:0,
    hjnum:0,
    navtitles:['详细信息','商品咨询','商品后记']
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
  getsizeImg(cid){
    let simg=this.data.sizeImgs;
    for(let v of simg){
      if(v.cid==cid){
        this.setData({sizeImg:v.url});
        break;
      }
    }
  },
  getmsimg(){
    let xdata=this.data.xdata;
    let i = this.data.msi;
    let pic = xdata[i].imgs.split('|');
    pic.pop();
    this.setData({ 
      msimg: this.data.msimg.concat(pic),
      msi:i+1,
      flag:false,
    })
  },
  loadmore: function (e) {
    let i=this.data.msi;
    if(i>this.data.xdata.length-1){
        wx.showToast({
          title: '已加载全部数据',
        })
      return;
    }
    this.setData({ flag: true })
    this.getmsimg();
  },
  onLoad: function (options) {
    let db=wx.cloud.database();
    var pid='48162'
    if(options.PID!=undefined){
      pid=options.PID
    }
    db.collection('product').where({PID:pid}).get().then(res=>{
      let data=res.data;
      util.listCl(data);
      this.setData({pro:data[0]})
      console.log(this.data.pro)
      this.getcolors();
      this.getsizeImg(this.data.pro.cid);
    })

    this.createNum();
    db.collection('prodetail').where({ IDS: pid }).get().then(res => {
      let xdata = res.data;
      this.setData({xdata:xdata})
      this.getmsimg();
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  tabss:function(e){
    this.setData({navcurrent:e.detail.id})
  }
})