// componenes/clothClass/clothClass.js
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
    nav:[
      { cid: '', title: '新品95折', classname:'newitems'},
      { cid: '', title: 'louisAngel', classname:'louisangel'},
      { cid: '0101', title: '连衣裙', classname:'category'},
      { cid: '0105', title: '衬衫', classname:'category'},
      { cid: '0104', title: 'T恤', classname:'category'},
      { cid: '0103', title: '毛衣', classname:'category'},
      { cid: '0102', title: '外套', classname:'category'},
      { cid: '0106', title: '半身裙', classname:'category'},
      { cid: '0107', title: '裤子', classname:'category'},
      { cid: '0108', title: '包&鞋', classname:'category'},
      { cid: '0110', title: '搭配商品', classname:'category'},
      { cid: '0130', title: '当天商品', classname:'category'},
      ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toList:function(e){
      var info=e.currentTarget.dataset.item;
      var data=JSON.stringify(info);
      data=data.replace(/\&/g,"@")
      console.log(data);
      wx.showLoading({
        title: '正在加载',
      })
      wx.reLaunch({
        url: '../../pages/lists/lists?data='+data+'',
      })
    }
  } 
})
