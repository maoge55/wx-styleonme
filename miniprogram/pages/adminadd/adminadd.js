// pages/set/set.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: [
      {
        cid: '0101',
        text: '连衣裙',
        classname: 'category'
      },
      {
        cid: '0105',
        text: '衬衫',
        classname: 'category'
      },
      {
        cid: '0104',
        text: 'T恤',
        classname: 'category'
      },
      {
        cid: '0103',
        text: '毛衣',
        classname: 'category'
      },
      {
        cid: '0102',
        text: '外套',
        classname: 'category'
      },
      {
        cid: '0106',
        text: '半身裙',
        classname: 'category'
      },
      {
        cid: '0107',
        text: '裤子',
        classname: 'category'
      },
      {
        cid: '0108',
        text: '包&鞋',
        classname: 'category'
      },
      {
        cid: '0110',
        text: '搭配商品',
        classname: 'category'
      }
    ],
    cssname:'选择分类',
    mainimg:null,
    listimg:null,
    detimg:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},
  comfirm: function(e) {
    let pro= e.detail.value
    pro.cid = this.data.nav[e.detail.value.cid]
    console.log(pro)
    wx.cloud.callFunction({
      name:'addpro',
      data:{pro:pro}
    }).then(res=>{console.log(res.result)}).catch(err=>console.log('上传失败'))
  },

  navChange:function(e){
    let i=e.detail.value;
    this.setData({cssname:this.data.nav[i].text})
  },

  getmainimg:function(){
    let that=this
    wx.chooseImage({
      count:1,
      success: function(res) {
        that.setData({mainimg:res.tempFilePaths[0]})
      },
    })
  },

  getlistimg:function(){
    let that=this;
    wx.chooseImage({
      count:5,
      success: function(res) {
        let paths=res.tempFilePaths;
        paths=JSON.stringify(paths);
        that.setData({listimg:paths})
      },
    })
  }
})