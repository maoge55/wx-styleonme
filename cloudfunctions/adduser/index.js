// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
let db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var {userName,userImg,userLocation}=event;
  let pro1=await db.collection('userInfo').where({
    openid:wxContext.OPENID
  }).count()
  if(pro1.total>0){
    let pro2= await db.collection('userInfo').where({
      openid: wxContext.OPENID
    }).update({data:{userName:userName,userImg:userImg,userLocation:userLocation}})
    return '更新了'+pro2.stats.updated+'个用户信息'
  }
  else{
    //新增成员
    let pro3= await db.collection('userInfo').add({
      data:{
        openid:wxContext.OPENID,
        userName:userName,
        userImg:userImg,
        userLocation:userLocation
      }
    })
    //登录送积分和优惠劵
    let date=new Date();
    let mydate=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
    let pro4 = await db.collection('integral').add({
      data:{
        openid:wxContext.OPENID,
        content:'登录送积分和优惠劵',
        use:'',
        total:'2.00',
        leave:'2.00',
        getTime:mydate
      }
    })

    return 1111
  }
}