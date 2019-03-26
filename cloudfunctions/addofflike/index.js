// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
let db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try{
    let pid=event.pid;
    let _=db.command
    const wxContext = cloud.getWXContext()
    let res1= await db.collection('lovelist').where({
      pid:pid,
      openid:wxContext.OPENID
    }).count()
    var isloved=res1.total>0?true:false;
    if(!isloved){
      await db.collection('lovelist').add({
        data:{
          pid:pid,
          openid:wxContext.OPENID
        }
      })
    }
    else{
      await db.collection('lovelist').where({
        pid:pid,
        openid:wxContext.OPENID
      }).remove()
    }
    return {
      data:{res:1,mas:'收藏/取消成功',islove:isloved?0:1},
      event,
      openid: wxContext.OPENID,
      appid: wxContext.APPID,
      unionid: wxContext.UNIONID,
    }
  }catch(e){return {res:0,mas:'操作失败'}}
}