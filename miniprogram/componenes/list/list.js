// componenes/list/list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    listdata:{
      type:Array,
      value:[],
    },
    grid:{
      type:String,
      value:'2',
    }
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show() {
      setTimeout(() => this.changepicnum(), 3000);
    },
    hide() { },
    resize() { },
  },
  /**
   * 组件的初始数据
   */
  data: {
    picnum: 0,
    ldata:[],
    errimg:'cloud://envtest-bb8d5d.656e-envtest-bb8d5d/images/errimg.jpg',
    err:false,
    loveImg: ['../../images/icons/wishlist_button.png', '../../images/icons/add_wishlist.png']
  },

  attached(){
  },
  /**
   * 组件的方法列表
   */
  methods: {
    changepicnum() {
      var picnum = this.data.picnum;
      if (picnum == 0) { picnum = 1 }
      else { picnum = 0 }
      this.setData({ picnum: picnum })
      setTimeout(() => this.changepicnum(), 3000)
    },

    imgerr:function(e){
      var errimg=this.data.errimg;
      var err=[];
      err.push(errimg);
      err.push(errimg)
      var i=e.currentTarget.dataset.index;
      var key='listdata['+i+'].pic';
      this.setData({[key]:err})
    },

    todetail:function(e){
      console.log(e.currentTarget.dataset.pid);
      let pid = e.currentTarget.dataset.pid;
      wx.navigateTo({
        url: '../../pages/detail/detail?PID='+pid+'',
      })
    },

    addofflike:function(e){
      var{index,pid}=e.currentTarget.dataset;
      wx.showLoading();
      wx.cloud.callFunction({
        name:'addofflike',
        data:{pid:pid}
      }).then(res=>{
        wx.hideLoading();
        let islove=res.result.data.islove;
        let listdata=this.data.listdata;
        listdata[index].islove=islove
        this.setData({
          listdata:listdata
        })
        wx.showToast({
          title: res.result.data.mes,
        })
      })
    }
  }
})
