// componenes/nav/nav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titles:{
      type:Array,
      value:['导航1','导航2','导航3']
    },
    current:{
      type:Number,
      value:0
    },
    type:{
      type:String,
      value:'normal'
    },
    size:{
      type:Number,
      value:11
    },
    color:{
      type:String,
      value:'#000'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },


  /**
   * 组件的方法列表
   */
  methods: {
    ontab:function(e){
      let index=e.currentTarget.dataset.index;
      this.setData({current:index})
      let detail={id:index}
      this.triggerEvent('switchtab', detail)
    }
  }
})
