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
    return pro2
  }
  else{
    let pro3=await db.collection('userInfo').add({
      data:{
        openid:wxContext.OPENID,
        userName:userName,
        userImg:userImg,
        userLocation:userLocation
      }
    })
    return pro3;
  }
}