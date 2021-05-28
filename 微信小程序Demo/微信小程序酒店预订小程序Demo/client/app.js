//app.js
App({
  globalData: {
    code: null,
  },
  onLaunch: function () {
    wx.login({
      success: (e)=> {
        console.log(e)
        this.globalData.code = e.code
      }
    })
  }
})