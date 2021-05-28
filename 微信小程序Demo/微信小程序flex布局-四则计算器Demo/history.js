Page ({
  data:{
    logs:[]
  },
  onLoad:function(options){
    var logs=wx.getStorageSync('calclogs');
    this.setData({"logs":logs});
  },
  onShareAppMessage:function(){
    return{
      title: '15的四则计算器',
      desc: "微信小程序简易四则计算器",
      path: 'pages/history/history'
    }
  }
})