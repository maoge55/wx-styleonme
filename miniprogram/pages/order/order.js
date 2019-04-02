
Page({

  /**
   * 页面的初始数据
   */
  data: {
    all:[],
    waitPay:[],
    waitSend:[],
    waitGet:[],
    completed:[],
    orders:null,
    currentNavId:0,
    className:'all',
    flag:'true',
    rea:null,
    nav: [{ navid:0, title: '全部' }, { navid:1, title: '待付款' }, { navid:2, title: '待发货' }, { navid:3, title: '待收货' }, { navid:4, title: '待评价' }],
    tkreason:[{id:0,text:'我不想买了'},{id:1,text:'信息填写错误重拍'},{id:2,text:'同城见面交易'},{id:3,text:'其他原因'}]
  },

  getAll(){
    var p=this.data.waitPay;
    var s=this.data.waitSend;
    var g=this.data.waitGet;
    var c=this.data.completed;
    var all=p.concat(s).concat(g).concat(c);
    this.setData({
      all:all
    });
  },
  getCurOrd(){
    var id=this.data.currentNavId;
    switch(id){
      case 0:
        this.setData({
          orders:this.data.all
        });
        break;
      case 1:
        this.setData({
          orders:this.data.waitPay
        });
        break;
      case 2:
        this.setData({
          orders:this.data.waitSend
        });
        break;
      case 3:
        this.setData({
          orders:this.data.waitGet
        });
        break;
      case 4:
        this.setData({
          orders:this.data.completed
        });
        break;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //顶部导航栏点击
  navClick:function(e){
    var id=e.currentTarget.dataset.id;
    this.setData({
      currentNavId:id
    });
    this.getCurOrd();
    console.log(this.data.orders);
  },

  deledd:function(e){
    var i=e.currentTarget.dataset.index;
    var orders=this.data.orders;
    orders.splice(i,1);
    this.setData({
      orders:orders
    });
    this.setData({
      flag:false
    });
    this.getAll();
    wx.setStorageSync('dfk', orders);
  },

  chooseRea:function(e){
    var rid=e.currentTarget.dataset.rid;
    var tkres=this.data.tkreason;
    this.setData({
      rea:tkres[rid].text,
      flag:true
    });
    console.log(this.data.rea);
  }
})