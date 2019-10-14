const db = wx.cloud.database()
const todos = db.collection('todos')

Page({

  data:{
    tasks:[]
  },


  onLoad(){
    this.getData()
  },
  //触底刷新
  onReachBottom(){
    this.getData()
  },

//下拉刷新
  onPullDownRefresh(){
    this.getData(res=>{
      wx.stopPullDownRefresh();
      this.pageData.skip=0;
    })
  },
//获取列表数据
  getData(callback){
    if(!callback){
      callback=res=>{}
    }
    wx.showLoading({
      title: '数据加载中',
    })
    todos.skip(this.pageData.skip).get().then((res) => {
      console.log(res)
      this.setData({
        tasks: this.data.tasks.concat(res.data)
      },res=>{
        this.pageData.skip+=20
        wx.hideLoading()
        callback()
      })
    })
  },
  pageData:{
    skip:0
  }
})