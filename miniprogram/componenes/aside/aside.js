// componenes/aside/aside.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hidden: {
      type: Boolean,
      value: false,
      observer: function(newVal, oldVal, changedPath) {
        this.setData({
          flag: newVal
        })
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    completed: false,
    integral: '',
    couponNum: 0,
    flag: false,
    am: 0,
    isbind: false,
    userInfo: null,
    tab: [{
        id: 0,
        title: '类别'
      },
      {
        id: 0,
        title: '我的页面'
      }
    ],
    curindex: 0,
    cloclass: [{
        cid: '',
        title: '新品95折',
        classname: 'newitems'
      },
      {
        cid: '',
        title: 'louisAngel',
        classname: 'louisangel'
      },
      {
        cid: '0130',
        title: '当天发货',
        classname: 'category'
      },
      {
        cid: '0101',
        title: '连衣裙',
        classname: 'category'
      },
      {
        cid: '0105',
        title: '衬衫',
        classname: 'category'
      },
      {
        cid: '0104',
        title: 'T恤',
        classname: 'category'
      },
      {
        cid: '0103',
        title: '毛衣',
        classname: 'category'
      },
      {
        cid: '0102',
        title: '外套',
        classname: 'category'
      },
      {
        cid: '0106',
        title: '半身裙',
        classname: 'category'
      },
      {
        cid: '0107',
        title: '裤子',
        classname: 'category'
      },
      {
        cid: '0108',
        title: '包&鞋',
        classname: 'category'
      },
      {
        cid: '0110',
        title: '搭配商品',
        classname: 'category'
      },
    ],
    onme: [{
        id: '0',
        title: '公告事件',
        clickurl: ''
      },
      {
        id: '1',
        title: '图片后记',
        clickurl: ''
      },
      {
        id: '2',
        title: '赞助明星',
        clickurl: ''
      },
      {
        id: '3',
        title: '时尚明星',
        clickurl: ''
      },
      {
        id: '4',
        title: '咨询和回复',
        clickurl: ''
      }
    ],
    mine: [{
        id: '0',
        icons: '../../images/icons/cart.png',
        title: '购物车',
        clickurl: '../../pages/cart/cart'
      },
      {
        id: '1',
        icons: '../../images/icons/like.png',
        title: '收藏夹',
        clickurl: '../../pages/love/love'
      },
      {
        id: '2',
        icons: '',
        title: '我的积分',
        clickurl: '../../pages/integral/integral'
      },
      {
        id: '3',
        icons: '',
        title: '我的优惠劵',
        clickurl: '../../pages/coupons/coupons'
      },
      {
        id: '4',
        icons: '',
        title: '订单/配送查询',
        clickurl: '../../pages/order/order'
      },
      {
        id: '5',
        icons: '',
        title: '我的咨询',
        clickurl: ''
      },
      {
        id: '6',
        icons: '',
        title: '会员信息修改',
        clickurl: '../../pages/compleInfo/compleInfo'
      },
      {
        id: '7',
        icons: '',
        title: '退出',
        clickurl: ''
      },
      {
        id: '8',
        icons: '',
        title: '注销',
        clickurl: ''
      }
    ],
    cartNum: 0
  },
  pageLifetimes: {
    show() {
      if (!!wx.getStorageSync('cart')) {
        let cart = wx.getStorageSync('cart')
        this.setData({ cartNum: cart.length })
      }
    },
  },
  ready() {
    if(!app.globalData.userInfo){
      var z = this
      app.userInfoReadyCallback = function() {
        //console.log('等待app的onlaunch获取用户信息',app.globalData.userInfo)
        z.setData({
          userInfo: app.globalData.userInfo,
          isbind: true
        })
      }
    }
    else{
      //console.log('从app上面获取用户信息', app.globalData.userInfo)
      if (app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo,
          isbind: true
        })
      }
    }
    this.getwelfare() //获取当前积分总数和优惠劵总数的
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getwelfare() {
      let expiration1 = wx.getStorageSync('welfare_expiration');
      let nowtimestamp = Date.parse(new Date())
      let welfare = wx.getStorageSync('welfare');
      if ((!!welfare) && (expiration1 > nowtimestamp)) {
        console.log('缓存加载福利，', '用户积分:' + welfare.integral, '优惠券数:' + welfare.couponNum)
        console.log('welfare剩余缓存时间：',(expiration1-nowtimestamp)/1000,'秒')
        this.setData({
          integral: welfare.integral.toFixed(2),
          couponNum: welfare.couponNum
        })
      } else {
        wx.cloud.callFunction({
          name: 'getwelfare',
        }).then(res => {
          let timestamp = Date.parse(new Date());
          let expiration = timestamp + 3000000;
          wx.setStorageSync('welfare_expiration', expiration) //设置福利缓存过期时间
          let integral = res.result.integral;
          let couponNum = res.result.couponNum;
          wx.setStorageSync('welfare', {
            couponNum: couponNum,
            integral: integral
          }) //设置福利缓存
          console.log('数据库加载福利，', '用户积分:' + integral, '优惠券数:' + couponNum)
          this.setData({
            integral: integral.toFixed(2),
            couponNum: couponNum
          })
        })
      }
    },
    getindex: function(e) {
      this.setData({
        curindex: e.currentTarget.dataset.index
      })
    },
    tolists: function(e) {
      var info = e.currentTarget.dataset.item;
      var data = JSON.stringify(info);
      data = data.replace(/\&/g, "@")
      console.log(data);
      wx.showLoading({
        title: '正在加载',
      })
      wx.reLaunch({
        url: '../../pages/lists/lists?data=' + data + '',
      })
    },

    infoBind: function(e) {
      let userInfo = JSON.parse(e.detail.rawData);
      console.log(userInfo)
      userInfo = {
        userName: userInfo.nickName,
        userImg: userInfo.avatarUrl,
        userLocation: userInfo.country + '-' + userInfo.province + '-' + userInfo.city
      }
      this.setData({
        userInfo: userInfo,
        isbind: true
      })
      app.globalData.userInfo = userInfo;
      wx.authorize({
        scope: 'scope.userInfo',
      })
      wx.getUserInfo()
      //添加用户,并将信息写入数据库
      if (!this.data.userInfo) {
        console.log('获取失败');
        retrun;
      }
      wx.cloud.callFunction({
        name: 'adduser',
        data: userInfo
      }).then(res => {
        console.log(res)
        this.getwelfare()
      })
    },
    mineclick:function(e){
      let item=e.currentTarget.dataset.item
      console.log(item)
      wx.showLoading()
      if(item.id=='6'||item.id=='4'){
        wx.navigateTo({
          url: item.clickurl,
          success: (e) => wx.hideLoading()
        })
      }
      else{
      wx.reLaunch({
        url:item.clickurl,
        success:(e)=>wx.hideLoading()
      })
      }
    },
    tocompleInfo: function(e) {
      wx.navigateTo({
        url: '../../pages/compleInfo/compleInfo',
      })
    },
    tointegral:function(){
      wx.showLoading();
      wx.navigateTo({
        url: '../../pages/integral/integral',
        success:(e)=>wx.hideLoading()
      })
    },
    tocoupons:function(){
      wx.showLoading()
      wx.navigateTo({
        url: '../../pages/coupons/coupons',
        success:(e)=>wx.hideLoading()
      })
    }
  }
})