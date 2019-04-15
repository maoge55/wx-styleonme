// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
let db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let pro=event.pro;
  var{pid,cid,colors,lbimg,detimg,mainimg,pname,price,tags}=pro
  let bq={madeSelf:false,newfive:false,sendTheDay:false}
  colors=colors.split('|')
  for(let i=0;i<tags.length;i++){
    tags[i]=parseInt(tags[i])
    switch(tags[i]){
      case 0:
        bq.madeSelf=true;
        break;
      case 1:
        bq.newfive=true;
        break;
      case 2:
        bq.sendTheDay=true;
        break;
    }
  }

  let promise= await db.collection('product').add({
    data:{
      del:0,
      PID:pid,
      charm:0,
      cid:cid,
      colors:colors,
      commentNum:1,
      mainImg:mainimg,
      pic:lbimg,
      price:Number(price),
      tags:bq,
      time:db.serverDate(),
      title:pname
    }
  })
  return promise
}