//index.js
var num = 0;
Page({
  data: {
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://腾讯云二级域名/list.php',
      data: {
        number: num
      },
      success: function (res) {
        that.setData({
          array: res.data
        })
      }
    })
  },
  //携带id跳转
  short: function (e) {
    var id = e.target.id
    wx.navigateTo({
      url: '../article/article?dataid=' + id
    })
  },
  //到底部刷新
  onReachBottom: function () {
    var that = this
    num = num + 5
    wx.request({
      url: 'https://腾讯云二级域名/list.php',
      data: {
        number: num
      },
      header: {
        'content-type': 'application/w-xxx-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          array: res.data
        })
      }
    })
  }
})