Page({
  data: {
    nickName:"",
    imageUrl:"",
    newNote:"",
    authorized: false
  },
  onLoad: function (options) {
      wx.request({
        url: 'https://腾讯云二级域名/list.php', //服务器列表地址
        success: (res)=> {
          this.setData({
            array: res.data
          })
        }
      })
  },
  // 输入完成
  confirm: function (e) {
   this.setData({ newNote : e.detail.value})
  },
  //留言
  click: function (e) {
   if(!this.data.newNote.trim()){
     return
   }
    wx.request({
      url: 'https://腾讯云二级域名/note.php', //服务器留言地址
      data: {
        name: this.data.nickName,
        content: this.data.newNote,
        imageurl: this.data.imageUrl
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        wx.request({
          url: 'https://腾讯云二级域名/list.php', //上线换为为https
          success: (res) => {
            this.setData({
              array: res.data,
              nowNote: ""
            })
          }
        })
      }
    })
  },
  getUserInfo:function(e){
    console.log(e);
    this.setData({
      nickName: JSON.parse(e.detail.rawData).nickName,
      imageUrl: JSON.parse(e.detail.rawData).avatarUrl,
      authorized:true
    })
  }
})