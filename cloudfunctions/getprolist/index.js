// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

let db=cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var {cid,limit,len}=event
  if(cid=='0'){
    return;
  }

  let promise=db.collection('product').where({
  cid:cid}).limit(limit).skip(limit*len).get()
  return {
    mydata:await promise,
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}