//app.js
App({
  onLaunch: function() {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    // 获取用户信息
    let userInfo0 = wx.getStorageSync('userInfo') || {};
    let time0 = wx.getStorageSync('userInfo_time');
    let time1 = Date.parse(new Date());
    let flag0 = (!!userInfo0.userName) && (!!userInfo0.userImg) && (!!userInfo0.userLocation) && (!!userInfo0.openid);
    if (flag0 && (time0 > time1)) {
      console.log('缓存加载用户信息')
    } else {
      wx.getUserInfo({
        success: res => {
          let userInfo = {
            userName: res.userInfo.nickName,
            userImg: res.userInfo.avatarUrl,
            userLocation: res.userInfo.country + '-' + res.userInfo.province + '-' + res.userInfo.city
          }
          // 可以将 res 发送给后台解码出 unionId
          this.globalData.userInfo = userInfo
          //更新数据库
          wx.cloud.callFunction({
            name: 'adduser',
            data: userInfo
          }).then(res => {
            console.log(res.result);
            this.globalData.userInfo.openid=res.result.openid;
            //设置用户信息缓存,时间为1天有效期
            wx.setStorageSync('userInfo', this.globalData.userInfo);
            wx.setStorageSync('userInfo_time', time1 + 86400000)
          })
          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况
          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback(res)
          }
        }
      })
    }

    this.globalData = {
      userInfo: userInfo0
    }
  }
})