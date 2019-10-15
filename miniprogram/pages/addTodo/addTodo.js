const db=wx.cloud.database()
const todos=db.collection('todos')

Page({
  data:{
    image:'',
    time:''
  },
  pageData:{
    locationObj:{}
  },
  //提交
  onSubmit(event){
    // 时间
    let myDate=new Date;
    let month=myDate.getMonth()+1;
    let day=myDate.getDay()
    let year=myDate.getFullYear()
    let myTime = `${year}-${month}-${day}  ${this.data.time}`
  console.log(myTime)
    console.log(event.detail.formId)
    todos.add({
      data:{
        title: event.detail.value.title,
        imageUrl:this.data.image,
        location:this.pageData.locationObj,
        status:'in-progress',
        time:myTime,
        formId:event.detail.formId
      }
    }).then(res=>{
      wx.cloud.callFunction({
        name: 'msgMe',
        data: {
          formId: even.detail.formId,
          taskId: res._id
        }
      }).then(console.log)
      console.log(res._id)
      wx.showToast({
        title: 'Success',
        icon:'success',
        success:res2=>{
          wx.redirectTo({
            url: `../todoInfo/todoInfo?id=${res._id}`,
          })
        }
      })

      })
  },
// 选择图片
  selectImage(e){
    wx.chooseImage({
      success: (res)=> {
        console.log(res)
        // const imgs=res.tempFilePaths
        wx.cloud.uploadFile({
          cloudPath: `./imgs/${Math.floor(Math.random()*10000000)}.png`,
          filePath: res.tempFilePaths[0]
        }).then(res=>{
          this.setData({
            image:res.fileID
          })
          console.log(res)
        }).catch(err=>console.log(err))
        
      },
    })
  },

  //选择位置
  chooseLocation(){
    wx.chooseLocation({
      success: (res)=> {
        console.log(res)
        let locationObj={
          latitude:res.latitude,
          longitude:res.longitude,
          name:res.name,
          address:res.address
        }
        this.pageData.locationObj=locationObj
      },
    })
  },

  //选择时间
  bindTimeChange(event){
    console.log(event)
    this.setData({
      time:event.detail.value
    })
  }
})