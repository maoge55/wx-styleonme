// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  formSubmit: function (e) {
    console.log(e)
    let name=e.detail.value.adminName;
    let pwd=e.detail.value.pwd;
    if(!name){
      wx.showModal({
        title: '提示',
        content: '请输入用户名',
        showCancel:false
      })
      return;
    }
    if(!pwd){
      wx.showModal({
        title: '提示',
        content: '请输入密码',
        showCancel:false
      })
      return;
    }
    wx.showLoading({
      title: '正在登陆',
    })
    wx.cloud.callFunction({
      name:'adminlogin',
      data:{
        name:name,
        pwd:pwd
      }
    }).then(res=>{
        console.log(res.result);
        if(res.result){
          wx.showToast({
            title: '登陆成功',
          })
          wx.redirectTo({
            url: '../adminlist/adminlist?name='+name+'',
          })
        }
        else{
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            content: '用户名或密码错误',
          })
        }
      })
  },

  tohome:function(){
    wx.reLaunch({
      url: '../home/home',
    })
  },

})
