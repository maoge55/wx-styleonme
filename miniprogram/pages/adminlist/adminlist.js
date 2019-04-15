let db = wx.cloud.database()
let _ = db.command
Page({

  data: {
    list: null,
    pid:null,
    nav: [{
        cid: '0000',
        text: '全部商品',
        classname: 'all'
      },
      {
        cid: '002',
        text: '新品95折',
        classname: 'newitems'
      },
      {
        cid: '003',
        text: 'louisAngel',
        classname: 'louisangel'
      },
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
      },
      {
        cid: '0130',
        text: '当天商品',
        classname: 'category'
      },
    ],
    order:0,
    curcid: '0000',
    curpage: 0,
    maxpage: null,
    pagearr:null
  },

  onLoad: function(options) {
    let that=this;

    //异步操作先获取页数再获取产品
    new Promise(function(resolve,reject){
      that.getmaxpage(resolve);
    }).then(function(){that.getdata()})
  },
//获取当前类的最大页数
  getmaxpage(resolve){
    let curcid=this.data.curcid;
    let con = { cid: curcid,del:0}
    if (curcid == '0000') {
      con = { cid: _.neq('0000'),del:0}
    }
    db.collection('product').where(con).count().then(res=>{
      this.setData({maxpage:Math.ceil(res.total/10)})
      this.createpagearr(this.data.maxpage);
      if (resolve != null) {
        resolve('ok')
      }
    })
  },
//获取商品列表
  getdata() {
    console.log('共'+this.data.maxpage+'页')
    var {
      curcid,
      curpage,
      order
    } = this.data;
    let px=(order==0)?'asc':'desc'
    let con = { cid: curcid,del: 0}
    if(curcid=='0000'){
      con={cid:_.gt('0000'),del:0}
    }
    db.collection('product').where(con).orderBy('price',px).skip(curpage * 10).limit(10).field({
      PID: true,
      title: true,
      price: true
    }).get().then(res => {
      let data = res.data;
      curpage++;
      this.setData({
        list: data,
      })
      wx.hideLoading()
      if (this.data.curpage == this.data.maxpage - 1) {
        wx.showToast({
          title: '已经是最后一页',
        })
      }
    })
  },

//构造页数选择器数组
  createpagearr(maxpage){
    let pagearr=[];
    for(let i=0;i<maxpage;i++){
      pagearr.push('第'+(i+1)+'页')
    }
    this.setData({pagearr:pagearr})
  },

//分类选择
  choosecss: function(e) {
    let that=this;
    let index=e.detail.id;
    let nav=this.data.nav;
    this.setData({
      curcid:nav[index].cid,
      curpage:0
    })
  //异步操作先获取页数再获取产品
    wx.showLoading({
      title: '正在加载',
    })
    new Promise(function (resolve, reject) {
      that.getmaxpage(resolve);
    }).then(function () { that.getdata();wx.hideLoading()})

  },

// 下一页
  tonext:function(){
    if(this.data.curpage+1>=this.data.maxpage){return;}
    wx.showLoading({
      title: '正在加载',
    })
    this.setData({curpage:++this.data.curpage})
    console.log('curpage:'+this.data.curpage)
    this.getdata()
  },

//上一页
  tolast:function(){
    if(this.data.curpage==0){return;}
    wx.showLoading({
      title: '正在加载',
    })
    this.setData({curpage:--this.data.curpage});
    console.log('curpage:' + this.data.curpage)
    this.getdata()
  },

//picker选择页数
  pageChange:function(e){
    wx.showLoading({
      title: '正在加载',
    })
    let curpage=e.detail.value;
    this.setData({curpage:curpage})
    console.log('curpage:' + this.data.curpage)
    console.log('maxpage：'+this.data.maxpage)
    this.getdata()
  },

//根据PID查找商品
  searchbypid:function(e){
    console.log(e.detail.value);
    let pid=e.detail.value||this.data.pid
    if(pid.length<5){
      wx.showModal({
        title: '提示',
        content: '请输入5位数的PID',
        showCancel:false,
      })
      return;
    }
    db.collection('product').where({PID:pid,del:0}).get().then(res=>{
        this.setData({
          list:res.data,
          maxpage:1,
          curpage:0
        })
    })
  },
//价格排序
  changepx:function(){
    let order=this.data.order;
    this.setData({order:(order==0)?1:0})
    this.getdata()
  },
//搜索框商品id
  getpid:function(e){
    let pid=e.detail.value;
    this.setData({pid:pid})
  },
//删除商品
  onDel:function(e){
    let list=this.data.list;
    let pid=e.currentTarget.dataset.pid;
    let index=e.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: '确认删除商品'+pid,
      success:e=>{
        if(e.cancel){return;}
        if(e.confirm){
          wx.showLoading({
            title: '正在删除商品'+pid,
          })
          wx.cloud.callFunction({
            name:'preDelete',
            data:{pid:pid}
          }).then(res=>{
            list.splice(index,1)
            this.setData({
              list:list
            })
            wx.hideLoading();
            wx.showToast({
              title: '删除成功',
            })
          }).catch(err=>{
            console.log(err);
            wx.hideLoading()
            wx.showToast({
              title: '删除失败',
              images:'../../images/icons/fail.png'
            })
          })
        }
      }
    })
  },
//添加商品
  goAdd:function(){
    wx.showLoading({
      title: '',
    })
    wx.navigateTo({
      url: '../adminadd/adminadd',
      success:e=>wx.hideLoading()
    })
  },
//返回Home
  tohome:function(){
    wx.showLoading({
      title: '正在返回Home',
    })
    wx.reLaunch({
      url: '../home/home',
      success:e=>wx.hideLoading()
    })
  },

//商品修改
  onUpdate:function(e){
    let pid=e.currentTarget.dataset.pid;
    console.log(pid)
    wx.showLoading({
      title: '',
    })
    wx.navigateTo({
      url: '../adminupdate/adminupdate?pid='+pid,
      success:e=>wx.hideLoading()
    })
  }
})