// componenes/cards/cards.js
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
    imgUrls: ['cloud://envtest-bb8d5d.656e-envtest-bb8d5d/images/card1.jpg','cloud://envtest-bb8d5d.656e-envtest-bb8d5d/images/card2.jpg'],
    angle:0
  },

  attached() {
    setTimeout(()=>{this.rotate()},4000);

  },

  /**
   * 组件的方法列表
   */
  methods: {
    rotate() {
      let that = this
      this.setData({ angle: this.data.angle + 180 })

      setTimeout(() => { that.rotate() }, 4000)
    },
  }
})
