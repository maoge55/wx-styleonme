// components/stepper/stepper.js
Component({
  behaviors: ['wx://form-field'],
  options:{
      multipleSlots: true},
  /**
   * 组件的属性列表
   */
  properties: {
    num:{
      type:Number,
      value:1
    },
    width:{
      type:String,
      value:'160rpx'
    },
    height:{
      type:String,
      value:'50rpx'
    }
  },

  attached() {
    this.setData({value:this.data.num})
    if(this.data.num>1){
      this.setData({
        minusStatus:'',
      });
    }
  },

  observers:{
    'width':function(width){
      var w=parseFloat(width);
      var tw=(w*48)/160+'rpx';
      var iw=(w*60)/160+'rpx';
      this.setData({
        textw:tw,
        inputw:iw
      })
    },
    'height':function(height){
      this.setData({allh:height})
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    // 使用data数据对象设置样式名  
    minusStatus: 'disabled',
    textw:'48rpx',
    inputw:'60rpx',
    allh:'50rpx',
    fsize:'12px',
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /* 点击减号 */
    bindMinus: function () {
      var num = this.data.num;
      // 如果大于1时，才可以减  
      if (num > 1) {
        num--;
      }
      // 只有大于一件的时候，才能normal状态，否则disable状态  
      var minusStatus = num <= 1 ? 'disabled' : 'normal';
      // 将数值与状态写回  
      this.setData({
        value:num,
        num: num,
        minusStatus: minusStatus
      });
      var detail = { num: this.data.num}
      this.triggerEvent('numChange', detail);
    },
    /* 点击加号 */
    bindPlus: function () {
      var num = this.data.num;
      // 不作过多考虑自增1  
      num++;
      // 只有大于一件的时候，才能normal状态，否则disable状态  
      var minusStatus = num < 1 ? 'disabled' : 'normal';
      // 将数值与状态写回  
      this.setData({
        num: num,
        value:num,
        minusStatus: minusStatus
      });
      var detail = { num: this.data.num }
      this.triggerEvent('numChange', detail);
    },
  }
})
