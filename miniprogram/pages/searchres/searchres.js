let util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchpro: [],
    title: '',
    len: 0,
    flag: false,
    loadover: false,
    keyword:null,
    total:0
  },

  onLoad: function(options) {
    if (!options.keyword) {
      wx.reLaunch({
        url: '../home/home',
      })
    }
    console.log('搜索关键词', options.keyword);
    let keyword = options.keyword;
    this.setData({keyword:keyword})
    this.gettitle(keyword)
    this.getdata(keyword)
  },

  // 根据关键词获取产品列表
  gettitle(keyword){
    let db = wx.cloud.database();
    db.collection('product').where({
      title: db.RegExp({
        regexp: keyword,
        options: 'i'
      })
    }).count().then(res => {
      console.log('搜到的总数量', res.total);
      let title ='* 搜到  '+res.total+'个['+keyword+']的商品';
      this.setData({
        title:title,
        total:res.total
      })
    })
  },
  getdata(keyword) {
    let db = wx.cloud.database();
    db.collection('product').skip(this.data.len).limit(10).where({
      title: db.RegExp({
        regexp: keyword,
        options: 'i'
      })
    }).get().then(res => {
      console.log('获取的数据', res.data);
      let data = res.data;
      if (data.length == 0) {
        wx.showToast({
          title: '已加载全部数据',
          icon: 'success'
        })
        this.setData({
          flag: false,
          loadover: true
        })
        return;
      }
      util.listCl(data);
      this.setData({
        len: this.data.len + data.length,
        searchpro: this.data.searchpro.concat(data),
        flag: false
      })
      console.log('产品数量',this.data.searchpro.length)
    })
  },

  loadmore: function(e) {
    if (this.data.len == 0) {
      return;
    } //避免刚载入页面就触底刷新
    if (this.data.flag) {
      return;
    } //避免重复触底刷新
    if (this.data.loadover) {
      return;
    } //加载全部数据完也不触发
    console.log(e)
    this.setData({
      flag: true
    })
    this.getdata(this.data.keyword);

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})