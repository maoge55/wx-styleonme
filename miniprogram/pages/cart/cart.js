// pages/cart/cart.js
let util=require('../../utils/util.js')
Page({

  data: {
    goods:[],
    totalprice:null,
    choose:[],
    allchoose:false,
    buynums:[],
    flag:false
  },


  submit:function(e){
    let choose=e.detail.value.choose;
    if(choose.length==0){
      wx.showModal({
        title: '购买',
        content: '请选择需要购买的商品',
        showCancel: false
      })
      return;
    }
    let choosebuy=[];
    let goods=this.data.goods
    for(let i=0;i<choose.length;i++){
      let j=parseInt(choose[i]);
      choosebuy.push(goods[j])
    }
    console.log(choosebuy)
    let temp=JSON.stringify(choosebuy)
    wx.showLoading();
    wx.navigateTo({
      url: '../buy/buy?buy='+temp+'',
      success:e=>{wx.hideLoading()}
    })
  },
  allbuy:function(e){
    let allbuy=this.data.goods;
    console.log(allbuy);
    let temp = JSON.stringify(allbuy)
    wx.showLoading();
    wx.navigateTo({
      url: '../buy/buy?buy=' + temp + '',
      success: e => { wx.hideLoading() }
    })
  },
  onLoad: function (options) {
  },


  onShow: function () {
    //如果缓存数据丢失则从数据库加载
    let timestamps=Date.parse(new Date)
    if(wx.getStorageSync('cart_expiration')<timestamps){
      wx.removeStorageSync('cart')
    }
    else{console.log('购物车缓存时间',(wx.getStorageSync('cart_expiration')-timestamps)/1000,'秒')}
    if (!wx.getStorageSync('cart')){
      console.log('缓存购物车数据丢失，从数据库加载')
      wx.cloud.callFunction({
        name:'getcart'
      }).then(res=>{
        let cart=res.result.data[0].cart
        console.log('数据库的用户购物车',cart)
        //恢复缓存
        wx.setStorageSync('cart', cart)
        let timestamps2 = Date.parse(new Date())
        wx.setStorageSync('cart_expiration', timestamps2 + 7200000)
        this.setData({
          goods:cart
        })
      })
    }
    //否则直接缓存加载
    else{
      console.log('从缓存加载');
      let cart=wx.getStorageSync('cart')
      this.setData({goods:cart})
    }
    this.getTotalprice();
  },

  upbuynum:function(e){
    let i=parseInt(e.currentTarget.dataset.index);
    let num=e.detail.num;
    this.setData({
      ['goods['+i+'].buynum']:num
    })
    console.log('更新了第'+i+'个产品数量为',this.data.goods[i].buynum)
    this.getTotalprice();
  },

  onchoose:function(e){
    let choose=e.detail.value;
    console.log(choose);
    let goods=this.data.goods;
    this.setData({choose:choose});
    if(goods.length==choose.length){
      this.setData({allchoose:true})
    }
    else{this.setData({allchoose:false})}
  },

  onallchoose:function(e){
    let flag=this.data.allchoose;
    this.setData({flag:!flag,allchoose:!flag})
    if(flag){this.setData({choose:[]})}
    else{
      let choose=[]
      for(let i=0;i<this.data.goods.length;i++){
        choose.push(i.toString())
      }
      this.setData({choose:choose})
    }
    console.log(this.data.choose)
  },

  
  getTotalprice(){
    let totalprice=0;
    let goods=this.data.goods;
    for(let i=0;i<goods.length;i++){
      totalprice+=goods[i].buynum*goods[i].price
    }
    this.setData({totalprice:totalprice.toFixed(2)})
  },

  //选择产品删除
  choosedel:function(e){
    let that=this;
    let choose=this.data.choose;
    choose.sort(function(a,b){return b-a})
    let goods=this.data.goods;
    if(choose.length==0){
      wx.showModal({
        title: '删除',
        content:'请选择需要删除的商品',
        showCancel:false
      })
      return;
    }
    wx.showModal({
      title: '删除',
      content: '确认删除'+choose.length+'项商品？',
      success(res){
        if(res.confirm){
          //倒序删除，目标元素坐标不会被前置
          for(let i=0;i<choose.length;i++){
            let j=parseInt(choose[i]);
            goods.splice(j,1)
          }
          console.log(goods)
          that.setData({goods:goods,flag:false,choose:[],allchoose:false})
          that.getTotalprice();
          that.getcartNum();
          console.log('当前选择',that.data.choose)
        }
      }
    })
  },
  //单项删除
  onedel:function(e){
    let goods=this.data.goods;
    let i=e.currentTarget.dataset.index;
    let that=this
    // let choose=this.data.choose
    // for(let j=0;j<choose.length;j++){
    //   if(i.toString()==choose[j]){
    //     choose.splice(j,1);
    //     break;
    //   }
    // }
    wx.showModal({
      title: '删除',
      content: '确认删除本项？',
      success(res){
        if(res.confirm){
          goods.splice(i, 1);
          that.setData({
            goods: goods,
            allchoose: false,
            flag: false,
            choose: []
          })
          that.getTotalprice();
          that.getcartNum();
        }
      }
    })
  },
  getcartNum(){
    this.mothercart = this.selectComponent("#mothercart")
    this.mothercart.calltoptar(this.data.goods.length)
  },
  todetail:function(e){
    let pid=e.currentTarget.dataset.pid;
    wx.navigateTo({
      url: '../detail/detail?PID='+pid+'',
    })
  },
  //页面隐藏则保存购物车数据到缓存和数据库
  savecart(){
    console.log('隐藏保存到缓存')
    wx.setStorageSync('cart', this.data.goods)
    wx.cloud.callFunction({
      name: 'upcart',
      data: { cart: this.data.goods }
    }).then(res => console.log(res.result.mes, '成功保存购物车到数据库'))
  },
  onUnload: function () {
    this.savecart()
  },

  onHide:function(){
   this.savecart()
  }
})