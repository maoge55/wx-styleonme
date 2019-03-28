
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNum:'',
    realCode:'',
    userCode:'',
    btnText:'获取验证码',
    gainFlag: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //创造验证码
  createCode:function(){
    var phoneNum = this.data.phoneNum;
    if (phoneNum == '' || phoneNum.length != 11 || phoneNum.charAt(0) != '1') {
      wx.showModal({
        title: '提示',
        content: '手机号码格式错误',
        showCancel:false,
      });
      return;
    }

    var second = 60;
    this.countDown(second);

    var ran = Math.random() * 899999 + 100000;
    var num = Math.floor(ran);

    this.setData({
      realCode: num
    });

    wx.request({
      url: 'https://v.juhe.cn/sms/send',
      data: {
        mobile: phoneNum,
        tpl_id: 34201,
        tpl_value: encodeURI('#code#=') + num,
        key: "e34efbc58862ea5cf4703b08635bc06c"
      },
      success: function (e) {
        wx.showToast({
          title: '验证码已发送',
        });
      },
    });
  },

  countDown: function (num) {
    this.setData({
      gainFlag: true,
      btnText: num
    });

    if (num < 0) {
      this.setData({
        btnText: '获取',
        gainFlag: false,
        realCode:''
      });

      return;
    }

    setTimeout(() => {
      this.countDown(num - 1);
    }, 1000);

  },

  phoneBlur: function (e) {
    var phoneNum=e.detail.value;
    this.setData({
      phoneNum:phoneNum
    });
  },

  codeBlur:function(e){
    var userCode = e.detail.value;
    this.setData({
      userCode:userCode
    });
  },
  sumbit:function(){
    var {realCode,userCode,phoneNum}=this.data;
    if(realCode!=userCode){
      wx.showModal({
        title: '提示',
        content: '验证码错误或已过期',
        showCancel:false
      });
      return;
    }
    wx.showLoading({
      title: '修改成功',
    })
    let userInfo=wx.getStorageSync('userInfo')||{}
    userInfo.telephone=phoneNum;
    wx.hideLoading()
    wx.setStorageSync('userInfo', userInfo)
    setTimeout(()=>wx.navigateBack({
      url: '../compleInfo/compleInfo'
    }),3000)

  },

})