// pages/compleInfo/compleInfo.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    userName:'',
    userImg:'',
    name:'',
    wxnumber:'',
    telephone:'',
    bothday:'请选择日期',
    userLocation:'',
    isBind:'(未绑定)',
    flag:false,
    flag2:false,
    flag3:false,
    flag4:false,
    Received:''
  },
  saveloc(){
    var {userName,userImg,name,wxnumber,telephone,userLocation,Received,bothday}=this.data;
    let data = { userName, userImg, name, wxnumber, telephone, userLocation, Received, bothday }
    wx.setStorageSync('userInfo', data)
    console.log('缓存',wx.getStorageSync('userInfo'))
  },
  saveinfo:function(e){
    let value=e.detail.value;
    //先将信息保存到本地缓存
    this.saveloc()
    //再保存到数据库
    wx.cloud.callFunction({
      name:'compleInfo',
      data:value
    }).then(res=>{
      wx.showToast({
        title: '保存成功',
        icon:'loading',
        success:(e)=>wx.redirectTo({
          url: '../home/home',
        })
      })
    })
  },
  onLoad: function (options) {

  },
  onShow:function(e){
    var z = this
    app.userInfoReadyCallback = function () {
      z.setData({
        userInfo: app.globalData.userInfo,
        userName: app.globalData.userInfo.userName,
        userImg: app.globalData.userInfo.userImg,
        userLocation: app.globalData.userInfo.userLocation
      })
    }
    var userInfo = wx.getStorageSync('userInfo') ||{}
    if (userInfo.userName) {
      console.log('用户缓存加载')
      var {userName, userImg, name, wxnumber, telephone, userLocation, Received, bothday } = userInfo;
      this.setData({ userName, userImg, name, wxnumber, telephone, userLocation, Received, bothday })
    }
    else{
      wx.cloud.callFunction({
        name:'getuserinfo'
      }).then(res=>{
        if(res.result.data.length>0){
          let userInfo=res.result.data[0];
          console.log(userInfo)
          var { userName, userImg, name, wxnumber, telephone, userLocation, Received, bothday } = userInfo;
          this.setData({userName, userImg, name, wxnumber, telephone, userLocation, Received, bothday })
        }
      })
    }
  },
  nameFocus:function(){
    this.setData({
      flag:true
    });
  },
  nameBlur:function(e){
    this.setData({name:e.detail.value,flag:false})
  },

  wxnumberFocus: function () {
    this.setData({
      flag2: true
    });
  },
  wxnumberBlur: function (e) {
    this.setData({
      wxnumber:e.detail.value,
      flag2:false
    })
  },

  dateChose:function(e){
    if(e.detail.value){
      this.setData({
        bothday:e.detail.value
      });
    }
  },
  toTeleBind:function(){
    wx.navigateTo({
      url: '../teleBind/teleBind',
    })
  },
  tochooseReceived:function(){
    wx.chooseReceived({
      success:e=>{
        let Received=e.provinceName+e.cityName+e.countyName+e.detailInfo;
        let userInfo=wx.getStorageSync('userInfo')||{}
        userInfo.Received=Received;
        wx.setStorageSync('userInfo', userInfo)
      }
    })
  }
})