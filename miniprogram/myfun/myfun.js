//上传图片到云存储
function uploadImg(list, success) {
  wx.showLoading({
    title: '正在上传图片',
  })
  let fileIDlist = []
  for (let i = 0; i < list.length; i++) {
    wx.cloud.uploadFile({
      cloudPath: list[i].path,
      filePath: list[i].file
    }).then(res => {
      fileIDlist.push(res.fileID);
      if (i == list.length - 1) {
        success(fileIDlist)
      }
    }).catch(err => console.log('第' + i + '张上传错误'))
  }
}
const formatNumber = (n) => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatTime = (date) => {
  return formatDate(date) + ' ' + [
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  ].map(formatNumber).join(':')
}

function vcode(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('_') + '_' + [hour, minute, second].map(formatNumber).join('_')
}
module.exports = {
  uploadImg: uploadImg,
  vcode:vcode
}