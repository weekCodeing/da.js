//index.js
//获取应用实例
var app = getApp()
Page( {
  data: {
    text: app.globalData.communityName,
    src: '../../image/arrowdown.png'
  },
  tapHead: function( event ) {
    wx.navigateTo( {
      url: '../index/selectCommunity'
    })
  },
  onLoad: function() {
    console.log( 'onLoad' );
  },
  onShow: function() {
    if( this.data.text != app.globalData.communityName ) {
      this.setData( {
        text: app.globalData.communityName
      })
    }
  }
})
