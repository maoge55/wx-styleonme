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

  let promise1=db.collection('product').where({
  cid:cid}).limit(limit).skip(limit*len).get()
  let promise2= cloud.callFunction({
    name:'getlike',
    data:{openid:wxContext.OPENID}
  })

  let alts= await Promise.all([promise1,promise2]);
  let prolist=alts[0].data;
  let likelist=alts[1].result.data;
  for(var i=0;i<prolist.length;i++){
    for(var j=0;j<likelist.length;j++){
      if(prolist[i].PID==likelist[j].pid){
        prolist[i].islove=1;break;
      }
    }
  }

  return {
    mydata:prolist,
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}