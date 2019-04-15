let myfun=require('../../myfun/myfun.js')
let db=wx.cloud.database()
Page({


  data: {
    nav: [{
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
    pro:null,
    cssname: '选择分类',
    index:null,
    mainimg: null,
    lbimg: null,
  },


  onLoad: function(options) {
    if(!!options.pid){
      this.getproinfo(options.pid)
    }
  },

  getfilelist(count, name, gs) {
    let that = this
    wx.chooseImage({
      count: count,
      success: function (res) {
        let list = []
        for (let i = 0; i < res.tempFilePaths.length; i++) {
          let obj = {};
          obj.path = name + '/' + myfun.vcode(new Date()) + i + gs;
          obj.file = res.tempFilePaths[i];
          list.push(obj)
        }
        that.setData({ [name]: JSON.stringify(list) })
      },
    })
  },

  getmainimg: function () {
    this.getfilelist(1, 'mainimg', '.gif')
  },


  getlbimg: function () {
    this.getfilelist(5, 'lbimg', '.png')
  },

  //渲染商品原数据
  getproinfo(pid){
    db.collection('product').where({PID:pid}).get().then(res=>{
      let pro=res.data[0];
      let index
      let nav=this.data.nav;
      //分类项渲染
      for(let i=0;i<nav.length;i++){
        if(nav[i].cid==pro.cid){
          index=i;
          break;
        }
      }
      //tags规格渲染
      this.setData({pro:pro,index:index,mainimg:pro.mainImg,lbimg:pro.pic})
      console.log(this.data.pro)
    })
  },
  //分类的picker选择器
  navChange: function (e) {
    let index = e.detail.value;
    this.setData({index:index})
  },

  upImg: function (e) {
    let id = e.currentTarget.dataset.id
    let list, name;
    switch (id) {
      case '0':
        name = 'mainimg'
        list = JSON.parse(this.data.mainimg)
        break
      case '1':
        name = 'lbimg'
        list = JSON.parse(this.data.lbimg)
        break
      case '2':
        name = 'detimg'
        list = JSON.parse(this.data.detimg)
        break
    }

    myfun.uploadImg(list, res => {
      wx.hideLoading();
      wx.showToast({
        title: '上传成功',
      })
      this.setData({ [name]: res })
    })
  },

  comfirm: function (e) {
    let pro = e.detail.value;
    for (let item in pro) {
      if (!pro[item]) {
        wx.showModal({
          title: '提示',
          content: '请输入' + item,
          showCancel: false
        })
        return;
      }
    }
    wx.showLoading({
      title: '正在更新新商品',
    })
    let bq={}
    for(let i=0;i<pro.tags.length;i++){
      bq[pro.tags[i]]=true
    }
    console.log(bq)
    let newPro={
      cid:this.data.nav[pro.cid].cid,
      colors: pro.colors.split(','),
      pic:pro.lbimg.split(','),
      mainImg:pro.mainimg,
      PID:pro.pid,
      title:pro.pname,
      tags:bq,
      price:Number(pro.price)
    }
    console.log(newPro)
    wx.cloud.callFunction({
      name: 'updatepro',
      data: { pro: newPro }
    }).then(res => {
      console.log(res.result);
      wx.hideLoading();
      wx.showToast({
        title: '成功更新商品',
      })
    }).catch(err => {
      console.log(err);
      wx.hideLoading()
      wx.showToast({
        title: '更新失败',
        image: '../../images/icons/fail.png'
      })
    })
  },
})