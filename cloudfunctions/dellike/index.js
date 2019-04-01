// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
let db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  pidlist=event.pidlist;
  let _=db.command
  try{
    let pro= await db.collection('lovelist').where({
      openid:wxContext.OPENID,
      pid:_.in(pidlist)
    }).remove()
    return {
      mes:'删除成功',
      pro:pro
    }
  }catch(e){
    return{mes:'删除失败'}
  }
}