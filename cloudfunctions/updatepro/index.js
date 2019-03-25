// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

let db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const _=db.command;
  return await db.collection('product').limit(20).update({
    data:{
      tags:{
        newfive:0,
      }
    }
  })
}