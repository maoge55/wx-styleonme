// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
let db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var {index,pid}=event
  let pro1= await db.collection('product').where({PID:pid}).field({
    pic:true
  }).get()

  let pic=pro1.data[0].pic;
  let piclist=pic.split('|');
  piclist.pop();
  piclist.splice(index,1);
  let picstr='';
  for(let i=0;i<piclist.length;i++){
    picstr+=(piclist[i]+'|')
  }
  let pro2=await db.collection('product').where({PID:pid}).update({
    data:{pic:picstr}
  })
  return {
    pro1:pro1,
    pro2,pro2
  }
}