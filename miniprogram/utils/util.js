function listCl(data) {
  for (let i = 0; i < data.length; i++) {
    var pic = data[i].pic.split('|') //分割图片
    pic.pop();
    data[i].pic = pic;

    var colors = data[i].colors.split('|') //分割颜色
    colors.pop();
    data[i].colors = colors
  }
}

function hexToText(data) {    
  var dataTemp,str = '';    
  if (data == '') return;    
  dataTemp = data.split("\\u");    
  for (var i = 0; i < dataTemp.length; i++) {      
    str += String.fromCharCode(parseInt(dataTemp[i], 10).toString(10));    
  }    
  return str;  
}

module.exports = {
  listCl: listCl,
  hexToText: hexToText
}