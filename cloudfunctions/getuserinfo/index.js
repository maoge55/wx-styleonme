// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
let db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let pro= await db.collection('userInfo').where({
    openid:wxContext.OPENID
  }).get()
  if(!pro.data[0].bothday){pro.data[0].bothday='请选择日期'}
  return pro
}