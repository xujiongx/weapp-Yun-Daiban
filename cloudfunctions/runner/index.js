// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()
const todos=db.collection('todos')

// 云函数入口函数
exports.main = async (event, context) => {
  // 时间
  let myDate = new Date;
  let month = myDate.getMonth() + 1;
  let day = myDate.getDay()
  let year = myDate.getFullYear()
  let minute=myDate.getMinutes()
  let myTime = `${year}-${month}-${day}  ${minute}:00`
  // 1.筛选所有未完成数据，当前时间来筛选
  let tasks=await todos
  .where({
    status:'in-progress',
    time:myTime,
  })
  .get()

  // 2.执行数据提醒
  for(let i=0;i<tasks.length;i++){
    await cloud.callFunction({
      name:'msgMe',
      data:{
        formId:tasks.data[i].formId,
        taskId:tasks.data[i]._id
      }
    })
  }


  const wxContext = cloud.getWXContext()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}