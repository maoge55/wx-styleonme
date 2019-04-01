// componenes/mother/mother.js
Component({
  externalClasses: ['i-class','j-class'],
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    flag:false,
    h:null,
    w:null,
    top:null,
    scrollTop:0
  },
  attached(){
    wx.getSystemInfo({
      success: (res)=> {
        this.setData({
          h:res.windowHeight,
          w:res.windowWidth
        })
      },
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    calltoptar(length){
      this.toptar=this.selectComponent("#toptar")
      this.toptar.getcartNum(length);
    },
    calld(){
      this.toptar=this.selectComponent("#toptar")
      this.toptar.getcartNum2();
    },
    showAside:function(e){
      this.setData({
        flag:!e.detail.val,
      })
    },
    hideAside:function(){
      this.setData({
        flag:false,
      })
    },

    onscroll:function(e){
      var top=e.detail.scrollTop;
      var w=this.data.w;
      var cardh=70*w/750;
      var top=cardh-top;
      if(top<0){top=0;}
      this.setData({top:top})
    },
    tolove:function(){
      wx.showLoading()
      wx.reLaunch({
        url: '../../pages/love/love',
        success:(e)=>{
          wx.hideLoading()
        }
      })
    },
    toTop:function(){
      this.setData({scrollTop:0})
      console.log(this.data.scrollTop)
    },

    toCart:function(){
      wx.showLoading()
      wx.reLaunch({
        url: '../../pages/cart/cart',
        success:(e)=>{
          wx.hideLoading()
        }
      })
    },

    touchbottom(){
      this.triggerEvent('tobottom')
    }
  }
})
