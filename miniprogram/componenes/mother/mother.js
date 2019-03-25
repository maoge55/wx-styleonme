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

    toTop:function(){
      this.setData({scrollTop:0})
      console.log(this.data.scrollTop)
    },

    toCart:function(){
      wx.navigateTo({
        url: '../../pages/cart/cart',
      })
    },

    touchbottom(){
      this.triggerEvent('tobottom')
    }
  }
})
