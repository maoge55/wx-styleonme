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
function getprice(str){
  for(var i=0;i<str.length;i++){
    if(str[i]=='元'){
      break;
    }
    return str.substring(0,i)
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

function tolovelist(prolist,likelist){
    for(var i=0;i<prolist.length;i++){
    for(var j=0;j<likelist.length;j++){
      if(prolist[i].PID==likelist[j].pid){
        prolist[i].islove=1;break;
      }
    }
  }
}
var compareasc = function (prop) {
  return function (obj1, obj2) {
    var val1 = obj1[prop];
    var val2 = obj2[prop];
    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
      val1 = Number(val1);
      val2 = Number(val2);
    }
    if (val1 < val2) {
      return -1;
    } else if (val1 > val2) {
      return 1;
    } else {
      return 0;
    }
  }
}
var comparedesc = function (prop) {
  return function (obj1, obj2) {
    var val1 = obj1[prop];
    var val2 = obj2[prop];
    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
      val1 = Number(val1);
      val2 = Number(val2);
    }
    if (val1 < val2) {
      return 1;
    } else if (val1 > val2) {
      return -1;
    } else {
      return 0;
    }
  }
}
var comparepirceasc=function(price){
  return function (obj1, obj2) {
    var val1 = obj1[price];
    var val2 = obj2[price];
    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
      val1=getprice(val1);
      val2=getprice(val2);
      val1 = Number(val1);
      val2 = Number(val2);
    }
    if (val1 < val2) {
      return -1;
    } else if (val1 > val2) {
      return 1;
    } else {
      return 0;
    }
  }
}
var comparepircedesc=function(price){
  return function (obj1, obj2) {
    var val1 = obj1[price];
    var val2 = obj2[price];
    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
      val1=getprice(val1);
      val2=getprice(val2);
      val1 = Number(val1);
      val2 = Number(val2);
    }
    if (val1 < val2) {
      return 1;
    } else if (val1 > val2) {
      return -1;
    } else {
      return 0;
    }
  }
}


module.exports = {
  listCl: listCl,
  tolovelist:tolovelist,
  hexToText: hexToText,
  compareasc:compareasc,
  comparedesc:comparedesc,
  comparepriceasc:comparepirceasc,
  comparepricedesc:comparepircedesc
}