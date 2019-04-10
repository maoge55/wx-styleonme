let util = require('../../utils/util.js')
Page({

  data: {
    pro: {},
    index: 0,
    navcurrent: 0,
    progg: {
      color: null,
      size: null,
      buynum: 1
    },
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
    nums: [],
    msi: 0,
    msimg: [],
    sizeImgs: [{
        cid: '0101',
        url: 'cloud://envtest-bb8d5d.656e-envtest-bb8d5d/images/sizeImg/dress_size.jpg'
      },
      {
        cid: '0105',
        url: 'cloud://envtest-bb8d5d.656e-envtest-bb8d5d/images/sizeImg/top_size.jpg'
      },
      {
        cid: '0104',
        url: 'cloud://envtest-bb8d5d.656e-envtest-bb8d5d/images/sizeImg/top_size.jpg'
      },
      {
        cid: '0103',
        url: 'cloud://envtest-bb8d5d.656e-envtest-bb8d5d/images/sizeImg/top_size.jpg'
      },
      {
        cid: '0102',
        url: 'cloud://envtest-bb8d5d.656e-envtest-bb8d5d/images/sizeImg/jacket_coat_size.jpg'
      },
      {
        cid: '0106',
        url: 'cloud://envtest-bb8d5d.656e-envtest-bb8d5d/images/sizeImg/skirt_size.jpg'
      },
      {
        cid: '0107',
        url: 'cloud://envtest-bb8d5d.656e-envtest-bb8d5d/images/sizeImg/pants_size.jpg'
      },
      {
        cid: '0108',
        url: 'cloud://envtest-bb8d5d.656e-envtest-bb8d5d/images/sizeImg/bag_size.jpg'
      },
      {
        cid: '0110',
        url: 'cloud://envtest-bb8d5d.656e-envtest-bb8d5d/images/sizeImg/coodi_acc_size.jpg'
      }
    ],
    sizeImg: null,
    flag: false,
    xdata: [],
    zxnum: 0,
    hjnum: 0,
    glnum: 1,
    kgnum: 1,
    navtitles: ['详细信息', '商品咨询', '商品后记'],
    buycart: {
      text: '▲',
      flag: false
    }
  },
  //从产品获取颜色
  getcolors() {
    let color = this.data.pro.colors;
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
    this.setData({
      colors: colors
    })
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

  //小图片控制轮播(swipter)
  chooseImg: function(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      index: index
    })
  },

  //获取下拉列表规格选择值
  select: function(e) {
    console.log(e);
    let ss = e.currentTarget.dataset.ss;
    let value = e.detail.text
    switch (ss) {
      case '0':
        this.setData({
          ['progg.color']: value
        });
        break;
      case '1':
        this.setData({
          ['progg.size']: value
        });
        break;
      case '2':
        this.setData({
          ['progg.buynum']: value
        });
        break;
    }

    console.log(this.data.progg)
  },

  //获取产品测量图
  getsizeImg(cid) {
    let simg = this.data.sizeImgs;
    for (let v of simg) {
      if (v.cid == cid) {
        this.setData({
          sizeImg: v.url
        });
        break;
      }
    }
  },

  //获取产品详情图列表
  getmsimg() {
    let xdata = this.data.xdata;
    let i = this.data.msi;
    let pic = xdata[i].imgs.split('|');
    pic.pop();
    this.setData({
      msimg: this.data.msimg.concat(pic),
      msi: i + 1,
      flag: false,
    })
  },

  //下拉下载更多详情图
  loadmore: function(e) {
    let i = this.data.msi;
    if (i > this.data.xdata.length - 1) {
      wx.showToast({
        title: '已加载全部数据',
      })
      return;
    }
    this.setData({
      flag: true
    })
    this.getmsimg();
  },

  //打开/关闭底部购买弹窗
  opencart: function() {
    let buycart = this.data.buycart;
    if (buycart.flag) {
      buycart.text = '▲'
      buycart.flag = false
    } else {
      buycart.text = '▼'
      buycart.flag = true
    }
    this.setData({
      buycart: buycart
    })
  },

  //关闭底部购买弹窗
  hidecart: function() {
    this.setData({
      buycart: {
        flag: false,
        text: '▲'
      }
    })
  },

  backlast: function() {
    wx.navigateBack({
      delta: 1
    })
  },
  onLoad: function(options) {
    let db = wx.cloud.database();
    var pid = '48162'
    if (options.PID != undefined) {
      pid = options.PID
    }
    db.collection('product').where({
      PID: pid
    }).get().then(res => {
      let data = res.data;
      util.listCl(data);
      this.setData({
        pro: data[0]
      })
      console.log(this.data.pro)
      this.getcolors();
      this.getsizeImg(this.data.pro.cid);
    })

    this.createNum();
    db.collection('prodetail').where({
      IDS: pid
    }).get().then(res => {
      let xdata = res.data;
      this.setData({
        xdata: xdata
      })
      this.getmsimg();
    })
  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //导航栏切换以后获取当前导航栏的id
  tabss: function(e) {
    this.setData({
      navcurrent: e.detail.id
    })
  },
  tobuy:function(){
    let good=this.trangood();
    if(!good){return;}
    let data=[];
    data.push(good);
    let temp=JSON.stringify(data)
    console.log(temp)
    wx.navigateTo({
      url: '../buy/buy?buy=' + temp + '',
      success: e => { wx.hideLoading()}
    })
  },
  //加入购物车
  addcart: function() {
    let good=this.trangood()
    if(!good){return;}
    //先将good更新到用户缓存
    this.upstorage(good);
    this.motherd = this.selectComponent("#motherd")
    this.motherd.calld()
    //再将good更新数据库上面
    wx.cloud.callFunction({
      name:'addcart',
      data:{good:good}
    }).then(res=>{
      console.log(res.result)
      wx.hideLoading();
      let timestamps = Date.parse(new Date())
      wx.setStorageSync('cart_expiration', timestamps + 7200000)
      wx.showModal({
        title: '加入购物车成功',
        content: '是否现在去结算',
        success(res){
          if(res.confirm){
            wx.navigateTo({
              url: '../cart/cart',
            })
          }
        }
      })
    })
  },
  //缓存上面的购物车数据更新
  upstorage(good) {
    var cart = wx.getStorageSync('cart') || [];
    if (!cart[0]) {
      cart.unshift(good);
      wx.setStorageSync('cart', cart)
    }
    //不为空则根据(pid,size,color查找缓存是否有同类型good)
    else {
      let flag = true;
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].pid == good.pid && cart[i].color == good.color && cart[i].size == good.size) {
          cart[i].buynum += good.buynum;
          wx.setStorageSync('cart', cart)
          flag = false;
          break;
        }
      }
      if (flag) {
        cart.unshift(good);
        wx.setStorageSync('cart', cart);
      }
    }
    console.log(wx.getStorageSync('cart'))
  },
  //将当前产品打包成good对象
  trangood(){
    var {
      progg,
      pro
    } = this.data;
    var {
      color,
      size,
      buynum
    } = progg;
    if (!color) {
      wx.showModal({
        title: '提示',
        content: '请选择颜色',
        showCancel: false
      })
      return;
    }
    if (!size) {
      wx.showModal({
        title: '提示',
        content: '请选择大小',
        showCancel: false
      })
      return;
    }
    wx.showLoading();
    buynum = parseInt(buynum)
    var good = {
      pid: pro.PID,
      title: pro.title,
      price: pro.price,
      pic: pro.pic[0],
      buynum: buynum,
      color: color,
      size: size
    }
    console.log(good)
    return good;
  },
  errimg:function(e){
    let i=e.currentTarget.dataset.index;
    let pic=this.data.pro.pic;
    let img=pic.splice(i,1);
    console.log('删除了',img)
    this.setData({
      ['pro.pic']:pic
    })
  }
})