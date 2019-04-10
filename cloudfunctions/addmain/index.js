// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
let db=cloud.database();
let _=db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  let tasks=[];
  for(let i=0;i<9;i++){
    let pro=db.collection('product').skip(i*100).limit(100).field({PID:true,pic:true,colors:true}).get()
    tasks.push(pro)
  }

  let res=await Promise.all(tasks);
  let list=[];
  for(let j=0;j<res.length;j++){
    list=list.concat(res[j].data)
  }

  for (let i = 0; i < list.length; i++) {
    var pic = list[i].pic.split('|') //分割图片
    pic.pop();
    list[i].pic = pic;

    var colors = list[i].colors.split('|') //分割颜色
    colors.pop();
    for (let m = 0; m < colors.length; m++) {
      for (var j = 0; j < colors[m].length; j++) {
        if (colors[m][j] == '&') {
          var k = j;
          var str1 = colors[m].substring(0, k);
          var str3 = '色';
          var str2 = colors[m].substr(k + 2, 5);

          var dataTemp, str = '';
          if (str2 == '') return;
          dataTemp = str2.split("\\u");
          for (var n = 0; n < dataTemp.length; n++) {
            str += String.fromCharCode(parseInt(dataTemp[n], 10).toString(10));
          }

          colors[m] = str1 + str + str3
          break;
        }
      }
    }
    list[i].colors = colors
  }

  let tasks2=[];
  for(let x=20;x<50;x++){
    let pro2=db.collection('product').where({PID:list[x].PID}).update({
      data:{
        pic:_.set(list[x].pic),
        colors:_.set(list[x].colors)
      }
    })

    tasks2.push(pro2)
  }

  return await Promise.all(tasks2)

}