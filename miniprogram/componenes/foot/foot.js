// componenes/foot/foot.js
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
      {fid:'0',title:'使用条款'},
      { fid: '1', title:'个人信息方针'},
      { fid: '2', title:'注册'},
      {fid:'3',title:'PC版'}
    ],
    
    footimg: {
      kfzx:[
        'cloud://envtest-bb8d5d.656e-envtest-bb8d5d/images/footer/customerservice.png',
        'cloud://envtest-bb8d5d.656e-envtest-bb8d5d/images/footer/time.png',
        'cloud://envtest-bb8d5d.656e-envtest-bb8d5d/images/footer/weixin.png'
      ],
      syzn: [
        'cloud://envtest-bb8d5d.656e-envtest-bb8d5d/images/footer/userguide.png',
        'cloud://envtest-bb8d5d.656e-envtest-bb8d5d/images/footer/payment.png'
      ],
      icons: [
        {fid: '0',url:'../../images/icons/foot_facebook_icon.png'},
        {fid: '1',url: '../../images/icons/foot_weibo_icon.png' }, 
        {fid: '2',url:'../../images/icons/foot_instagram_icon.png'},
        {fid: '3',url:'../../images/icons/foot_youtube_icon.png'}
      ]
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onficon:function(e){
      console.log(e.currentTarget.dataset);
    }
  }
})
