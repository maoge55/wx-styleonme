// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
let db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let pro1=db.collection('integral').where({
    openid:wxContext.OPENID
  }).field({leave:true}).get()
  let pro2=db.collection('coupon').where({
    openid:wxContext.OPENID
  }).count()

  let pros= await Promise.all([pro1,pro2]);
  let integrals=pros[0].data;
  let integral=0
  for(let i=0;i<integrals.length;i++){
    integral+=Number(integrals[i].leave)
  }
  let couponNum=pros[1].total
  return {
    integral:integral,
    couponNum:couponNum
  }
}