// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mypage:[
      { id: 0, name: '我的订单', img:'../../images/myicon/mypage_orders.png',
      url:'../order/order'},
      { id: 1, name: '我的购物车', img:'../../images/myicon/mypage_cart.png',
      url:'../cart/cart'},
      { id: 2, name: '收藏夹', img:'../../images/myicon/mypage_wishlist.png',
      url:'../love/love'},
      { id: 3, name: '咨询与回答', img:'../../images/myicon/mypage_myposts.png',
      url:'../'},
      { id: 4, name: '优惠劵', img:'../../images/myicon/mypage_coupon.png',
      url:'../coupons/coupons'},
      { id: 5, name: '积分', img:'../../images/myicon/mypage_point.png',
      url:'../integral/integral'},
      { id: 6, name: '修改个人信息', img:'../../images/myicon/mypage_modify_info.png',      url:'../compleInfo/compleInfo'},
      { id: 7, name: '退出账号', img:'../../images/myicon/mypage_logout.png',
      url:''},
    ]
  },

  onclick:function(e){
    let url=e.currentTarget.dataset.url;
    console.log(url);
    wx.showLoading({
    });
    wx.navigateTo({
      url: url,
      success:e=>{
        wx.hideLoading();
      },
      complete:e=>{
        wx.hideLoading();
      }
    })
  },
  onLoad: function (options) {

  },

})