// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
let db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let _=db.command
  let pro1=await db.collection('cart').where({
    openid:wxContext.OPENID
  }).count()
  if(pro1.total==0){
    // let pro2= await db.collection('cart').add({
    //   data:{
    //     openid:wxContext.OPENID,
    //     cart:event.cart
    //   }
    // })
    return{mes:'该用户不存在无法更新库',pro:pro2}
  }

  else{
   let pro3=await db.collection('cart').where({
      openid:wxContext.OPENID
    }).update({
      data:{
        cart:_.set(event.cart)
      }
    })
    return{mes:(pro3.stats.updated==1)?'更新成功':'更新失败'}
  }
}