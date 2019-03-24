// componenes/listview/listview.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    grid:{
      type:String,
      value:'2',
      observer(newVal, oldVal, changedPath) {
        if(newVal!=oldVal){this.setData({grid:newVal})}
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    grid:'2',
    grid2:{
      on:'../../images/icons/2grid_icon_on.png',
      off:'../../images/icons/2grid_icon_off.png'
    },
    grid3:{
      on:'../../images/icons/3grid_icon_on.png',
      off:'../../images/icons/3grid_icon_off.png'
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    girdChoose(e){
      let grid=e.currentTarget.dataset.grid;
      this.setData({grid:grid})
      let detail={grid:grid}
      this.triggerEvent('girdChoose',detail)
    }
  }
})
