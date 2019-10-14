const db = wx.cloud.database()
const todos = db.collection('todos')

Page({

  data: {
    task:{}
  },
  pageData:{
    id: '',
  },

  onLoad: function (options) {
    // console.log(options)
      this.pageData.id=options.id

    todos
    .where({
      _id:this.pageData.id
    })
    .get()
    .then(res=>{
      console.log(res)
      this.setData({
        task:res.data[0]
      })
    })

  },

  viewLocation(){
    wx.openLocation({
      latitude: this.data.task.location.latitude,
      longitude: this.data.task.location.longitude,
      name: this.data.task.location.name,
      address: this.data.task.location.address

    })
  },

})