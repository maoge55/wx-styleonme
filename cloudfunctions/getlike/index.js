// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
let db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let openid='';
  if (event.openid == '0') {
      openid=wxContext.OPENID
  }
  else{openid=event.openid}
  return await db.collection('lovelist').where({
    openid:openid
  }).field({pid:true}).get()
}