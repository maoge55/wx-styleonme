// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
let db=cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let pro=await db.collection('admin').where({
    openid:wxContext.OPENID,
    name:event.name,
    password:event.pwd
  }).count()

  let res=pro.total;
  return (res>0)?true:false
}