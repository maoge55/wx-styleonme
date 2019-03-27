// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
let db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var{name,wxnumber,telephone,Received,bothday}=event
  let pro=await db.collection('userInfo').where({
    openid:wxContext.OPENID
  }).update({
    data: {name, wxnumber, telephone, Received, bothday}
  })
  return pro
}