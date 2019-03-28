//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']){
          wx.authorize({
            scope: 'userInfo',
          })
        }
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              let userInfo = {
                userName: res.userInfo.nickName,
                userImg: res.userInfo.avatarUrl,
                userLocation: res.userInfo.country + '-' + res.userInfo.province + '-' +                                 res.userInfo.city}
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = userInfo
              wx.cloud.callFunction({
                name:'adduser',
                data:userInfo
              }).then(res=>console.log(res.result))
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
        
      }
    })

    this.globalData = {userInfo:null}
  }
})
