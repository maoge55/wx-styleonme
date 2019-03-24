function listCl(data) {
  for (let i = 0; i < data.length; i++) {
    var pic = data[i].pic.split('|')//分割图片
    pic.pop();
    data[i].pic = pic;

    var colors = data[i].colors.split('|')//分割颜色
    colors.pop();
    data[i].colors = colors
  }
}

module.exports={
  listCl: listCl,
}