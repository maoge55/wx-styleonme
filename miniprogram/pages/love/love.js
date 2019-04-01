let util=require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    totalprice: null,
    choose: [],
    allchoose: false,
    buynums: [],
    flag: false,
    colors: [],
    sizes: [{
        id: '0',
        text: 'S'
      },
      {
        id: '1',
        text: 'M'
      },
      {
        id: '2',
        text: 'L'
      }
    ],
    len:0,
    max:false,
  },



  onLoad: function(options) {
    this.getlikelist(0);
    this.createNum();

  },

  getlikelist(s){
    wx.cloud.callFunction({
      name:'getlike',
      data:{
        openid:'0'
      }
    }).then(res=>{
      let data=res.result.data;
      let pidlist=[]
      for(let i=0;i<data.length;i++){
        pidlist.push(data[i].pid)
      }
      let db=wx.cloud.database()
      let curlen=this.data.len;
      let curgoodlen=this.data.goods.length;
      let skip=curlen-s*curgoodlen-s*6
      console.log('当前起点',skip)
      let _=db.command;
      db.collection('product').where({
        PID:_.in(pidlist)
      }).limit(6).skip(skip).get().then(res=>{
        wx.hideLoading()
        let likedata=res.data;
        let len=likedata.length;
        if(len==0){
          wx.showToast({
            title: '已经是最后一页',
          })
          this.setData({max:true})
          return;
        }
        console.log('获取长度', len)
        util.listCl(likedata);
        console.log('当前页产品',likedata);
        let progg={color:'',buynum:1,size:''}
        for(let i=0;i<likedata.length;i++){
          likedata[i].progg=progg
          this.getcolors(likedata[i])
        }
        this.setData({
          goods:likedata,
          len:len+skip
        })
        this.totop = this.selectComponent('#motherlove');
        this.totop.toTop()
        console.log('当前终点',this.data.len)
      })
    })
  },
  //从产品获取颜色
  getcolors(data) {
    let color =data.colors;
    let colors = [];
    for (let i = 0; i < color.length; i++) {
      let ys = {};
      ys.id = i.toString();
      ys.text = color[i];
      for (var j = 0; j < color[i].length; j++) {
        if (color[i][j] == '&') {
          var k = j;
          var str1 = color[i].substring(0, k);
          var str3 = '色';
          var str2 = color[i].substr(k + 2, 5);
          str2 = util.hexToText(str2);
          ys.text = str1 + str2 + str3;
          break;
        }
      }
      colors.push(ys);
    }
    data.colors=colors
  },

  //购买数量数组
  createNum() {
    let nums = [];
    for (let i = 0; i < 20; i++) {
      let num = {};
      num.id = i.toString();
      num.text = (i + 1).toString();
      nums.push(num);
    }
    this.setData({
      nums: nums
    })
  },

  onallchoose: function(e) {
    let flag = this.data.allchoose;
    this.setData({
      flag: !flag,
      allchoose: !flag
    })
    if (flag) {
      this.setData({
        choose: []
      })
    } else {
      let choose = []
      for (let i = 0; i < this.data.goods.length; i++) {
        choose.push(i.toString())
      }
      this.setData({
        choose: choose
      })
    }
    console.log(this.data.choose)
  },
  onchoose: function(e) {
    let choose = e.detail.value;
    console.log(choose);
    let goods = this.data.goods;
    this.setData({
      choose: choose
    });
    if (goods.length == choose.length) {
      this.setData({
        allchoose: true
      })
    } else {
      this.setData({
        allchoose: false
      })
    }
  },

  choosedel: function(e) {
    let that = this;
    let choose = this.data.choose;
    choose.sort(function(a, b) {
      return b - a
    })
    let goods = this.data.goods;
    if (choose.length == 0) {
      wx.showModal({
        title: '删除',
        content: '请选择需要删除的商品',
        showCancel: false
      })
      return;
    }
    wx.showModal({
      title: '删除',
      content: '确认删除' + choose.length + '项商品？',
      success(res) {
        if (res.confirm) {
          wx.showLoading()
          //倒序删除，目标元素坐标不会被前置
          var delpid=[]
          for (let i = 0; i < choose.length; i++) {
            let j = parseInt(choose[i]);
            delpid.push(goods[j].PID);
          }
          that.dellike(delpid)
          console.log('当前选择', that.data.choose)
        }
      }
    })
  },

  select: function (e) {
    console.log(e);
    let ss = e.currentTarget.dataset.ss;
    let index=e.currentTarget.dataset.index;
    let value = e.detail.text;
    switch (ss) {
      case '0':
        this.setData({
          ['goods['+index+'].progg.color']: value
        });
        break;
      case '1':
        this.setData({
          ['goods[' + index +'].progg.size']: value
        });
        break;
      case '2':
        this.setData({
          ['goods[' + index +'].progg.buynum']: value
        });
        break;
    }
    console.log('第'+index+'项的规格变为',this.data.goods[index].progg)
  },

  dellike(data){
    let curlen=this.data.len-this.data.goods.length;
    this.setData({len:curlen})
    wx.cloud.callFunction({
      name:'dellike',
      data:{
        pidlist:data
      }
    }).then(res=>{
      this.getlikelist(0)
      wx.hideLoading();
      this.setData({
        flag: false,
        choose: [],
        allchoose: false
      })
      wx.showToast({
        title: res.result.mes,
      })
    })
  },

  tonext:function(){
    wx.showLoading()
    this.getlikelist(0)
  },
  tolast:function(){
    if((this.data.len-6)<=0){
      return;
    }
    wx.showLoading()
    this.getlikelist(1)
    this.setData({max:false})
  },
  onShow: function() {
  },

  onHide: function() {
  },

  submit:function(e){
    console.log(e.detail.value)
    let choose=e.detail.value.choose;
    if(choose.length==0){
      wx.showModal({
        title: '提示',
        content: '至少选择一项',
        showCancel:false
      })
      return;
    }
    let goods=this.data.goods;
    for(let i=0;i<choose.length;i++){
      let j=parseInt(choose[i])
      if(!goods[j].progg.color){
        wx.showModal({
          title: '提示',
          content: '请选第'+j+'项的择产品颜色',
        })
        return;
      }
      if(!goods[j].progg.size){
        wx.showModal({
          title: '提示',
          content: '请选第'+j+'项的择产品尺码',
        })
        return;
      }
    }
  }
})