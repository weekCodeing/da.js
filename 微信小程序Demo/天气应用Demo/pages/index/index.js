

Page({
  onLoad() {
  
  wx.request({
    url: 'https://test-miniprogram.com/api/weather/now', //仅为示例，并非真实的接口地址
    data: {
      city: '广州市'
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: res => {
      console.log(res)
    }
  })
  }
})