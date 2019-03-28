// componenes/toptar/toptar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    imgs: ['../../images/icons/tit.png', '../../images/icons/main.png', '../../images/icons/search.png', '../../images/icons/login.png', '../../images/icons/cart.png'],
    cartNum:0,
    flag:true,
    flag2:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showleft(){
      this.setData({
        flag:false,
      })
      var val=this.data.flag
      var myEventDetail = {
        val: val
      }
      this.triggerEvent('myevent', myEventDetail) 
    },
    closeleft(){
      this.setData({
        flag:true,
      })
      var val = this.data.flag
      var myEventDetail = {
        val: val
      }
      this.triggerEvent('myevent', myEventDetail) 
    },
    showinput:function(e){
      this.setData({
        flag2:false
      })
    },

    searchblur:function(e){
      this.setData({flag2:true})
    },

    tolists:function(e){
      console.log(e.detail.value)
    },

    tohome:function(){
      wx.showLoading({
        title: '正在加载',
      })

      wx.reLaunch({
        url: '../../pages/home/home',
        success:()=>{
          wx.hideLoading()
        }
      })
    },

    tomy:function(){
      wx.showLoading({
      })

      wx.reLaunch({
        url: '../my/my',
        success:function(){
          wx.hideLoading()
        }
      })
    }
  }
})
