// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
let db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let pro1=await db.collection('cart').where({
    openid:wxContext.OPENID
  }).count()
  if(pro1.total==0){
    let cart=[]
    cart.unshift(event.good)
    let pro2=await db.collection('cart').add({
      data:{
        openid:wxContext.OPENID,
        cart:cart
      }
    })
    return{mes:'新增的用户cart记录',pro:pro2}
  }
  else{
    let pro3=await db.collection('cart').where({
      openid:wxContext.OPENID
    }).field({cart:true}).get()
    let cart=pro3.data[0].cart
    let flag = true;
    let good=event.good;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].pid == good.pid && cart[i].color == good.color && cart[i].size == good.size) {
        cart[i].buynum += good.buynum;
        flag = false;
        break;
      }
    }
    if (flag) {
      cart.unshift(good);
    }

    let pro4=await db.collection('cart').where({
      openid:wxContext.OPENID
    }).update({
      data:{
        cart:cart
      }
    })

    return {mes:'更新用户cart记录',pro:pro4}
  }
}