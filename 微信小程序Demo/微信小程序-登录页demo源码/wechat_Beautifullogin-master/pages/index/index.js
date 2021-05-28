//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    phonenumber: '',
    password: '',
    numShow: false,
    psdShow: false,
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindNumInput: function(e) {
    this.setData({
      phonenumber: e.detail.value
    })
    console.log(this.data.phonenumber)
  },
  bindPsdInput: function(e) {
    this.setData({
      password: e.detail.value
    })
    console.log(this.data.password)
  },
  numChange: function(e) {
    if(this.data.phonenumber == '') {
      this.data.numShow = true;
      console.log('手机号不能为空' + this.data.numShow);
    }
  },
  psdChange: function(e) {
    if(this.data.password == '') {
      this.data.psdShow = true;
      console.log('密码不能为空' + this.data.psdShow);
    }
  },
  loginSubmit: function(e) {
    if(this.data.phonenumber != '' && this.data.password != '') {
      console.log("Success");
    }else if(this.data.phonenumber == '') {
      this.data.numShow = true;
      console.log("phonenumber不能为空")
    }else if(this.data.password == '') {
      this.data.psdShow = true;
      console.log("password不能为空")
    }
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
  	//登录
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            that.setData({userInfo: res.userInfo})
            that.update()
          }
        })
      },
      fail: function (res) {
        console.log(res)
      }
    });
  }
})
