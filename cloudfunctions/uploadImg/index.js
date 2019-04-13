// 云函数入口文件
const cloud = require('wx-server-sdk')
const fs = require('fs')
const path = require('path')
cloud.init({
  env: 'envtest-bb8d5d'
})

exports.main = async (event, context) => {
  try {
    // return await cloud.uploadFile({
    //   cloudPath: event.path,
    //   fileContent: new Buffer(event.file, 'base64')
    // })

    let list=event.list;
    let tasks=[];
    
    for(let i=0;i<list.length;i++){
      let pro=cloud.uploadFile({
        cloudPath:list[i].path,
        fileContent:new Buffer(list[i].file,'base64')
      })
      tasks.push(pro)
    }
    let res= await Promise.all(tasks);
    let imgs=[]
    for(let i=0;i<res.length;i++){
      imgs.push(res[i].fileID)
    }
    return imgs
  } catch (e) {
    return e;
  }
}