let myfun=require('../../myfun/myfun.js')
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
    lbimg:null,
    detimg:null,
    tags:['自制商品','新品','当天发送']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  getfilelist(count,name,gs) {
    let that=this
    wx.chooseImage({
      count:count,
      success: function(res) {
        let list=[]
        for(let i=0;i<res.tempFilePaths.length;i++){
          let obj={};
          obj.path=name+'/'+myfun.vcode(new Date())+i+gs;
          obj.file=res.tempFilePaths[i];
          list.push(obj)
        }
        that.setData({[name]:JSON.stringify(list)})
      },
    })
  },

  comfirm: function(e) {
    let pro= e.detail.value
    for(let item in pro){
      if(!pro[item]){
        wx.showModal({
          title: '提示',
          content: '请输入'+item,
          showCancel:false
        })
        return;
      }
    }
    wx.showLoading({
      title: '正在上传新商品',
    })
    pro.cid = this.data.nav[e.detail.value.cid].cid
    pro.lbimg=this.data.lbimg;
    pro.detimg=this.data.detimg;
    console.log(pro)
    wx.cloud.callFunction({
      name:'addpro',
      data:{pro:pro}
    }).then(res=>{
        console.log(res.result);
        wx.hideLoading();
        wx.showToast({
          title: '成功上传新商品',
        })
      }).catch(err=>{
      console.log(err);
      wx.hideLoading()
      wx.showToast({
        title: '上传失败',
        image:'../../images/icons/fail.png'
      })
    })
  },

  navChange:function(e){
    let i=e.detail.value;
    this.setData({cssname:this.data.nav[i].text})
  },

  getmainimg:function(){
    this.getfilelist(1,'mainimg','.gif')
  },

  getlbimg:function(){
    this.getfilelist(5, 'lbimg', '.png')
  },

  getdetimg:function(){
    this.getfilelist(40,'detimg','.png')
  },

  upImg:function(e){
    let id=e.currentTarget.dataset.id
    let list,name;
    switch(id){
      case '0':
      name='mainimg'
      list=JSON.parse(this.data.mainimg)
      break
      case '1':
      name='lbimg'
      list=JSON.parse(this.data.lbimg)
      break
      case '2':
      name='detimg'
      list=JSON.parse(this.data.detimg)
      break
    }

    myfun.uploadImg(list,res=>{
      wx.hideLoading();
      wx.showToast({
        title: '上传成功',
      })
      this.setData({[name]:res})
    })
  }
})