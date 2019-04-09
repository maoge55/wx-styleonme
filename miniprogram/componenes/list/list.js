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
      let errimg = 'cloud://envtest-bb8d5d.656e-envtest-bb8d5d/images/errimg.jpg'
      let i=e.currentTarget.dataset.index;
      let pic=this.data.listdata[i].pic;
      let pid=this.data.listdata[i].PID;
      let delimg=pic.shift();
      if(pic.length==0){pic.push(errimg);}
      let key='listdata['+i+'].pic';
      this.setData({[key]:pic})
      // //检查云储存是否有图片资源如果没有则在数据库删除该图片地址
      // wx.cloud.downloadFile({
      //   fileID:delimg
      // }).catch(err=>{
      //   wx.cloud.callFunction({
      //     name:'upgif',
      //     data:{pid:pid}
      //   }).then(res=>console.log(res))
      // })
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
