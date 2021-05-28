//全局的 getApp() 函数,获取到小程序实例
var app = getApp()
Page({
  data: {
    today: "",
    tomorrow: "",
    finalDate: ""
  },
  //页面载入，获取全局变量userInfo
  onLoad: function () {
    let today = new Date();
    let tomorrow = new Date();
    let finalDate = new Date();
    Date.prototype.getCHNDateString = function () {
      return this.getFullYear() + "-" + (this.getMonth() + 1 + "").padStart(2, "0") + "-" + this.getDate()
    }
    Date.prototype.addMonth = function (value) {
      var month = this.getMonth()
      this.setMonth(month + value)
    }
    Date.prototype.addDate = function (value) {
      var date = this.getDate()
      this.setDate(date + value)
    }
    tomorrow.addDate(1)
    finalDate.addMonth(3)
    this.setData({
      today: today.getCHNDateString(),
      tomorrow: tomorrow.getCHNDateString(),
      finalDate: finalDate.getCHNDateString()
    })
  },
  //表单提交
  formSubmit: function (e) {
    var orderno = e.detail.value.orderNo
    var orderdatebegin = e.detail.value.orderDateBegin
    var orderdateend = e.detail.value.orderDateEnd
    var ordername = e.detail.value.orderName
    var ordertel = e.detail.value.orderTel
    var formid = e.detail.formId
    console.log(e.detail.formId)
    //校验输入
    if (orderno == "" || orderdatebegin == "" || orderdateend == "" || ordername == "" || ordertel == "") {
      wx.showModal({
        title: '提示',
        content: '不能为空！'
      })
    }
    else if (orderdatebegin >= orderdateend) {
      wx.showModal({
        title: '提示',
        content: '离店日期要晚于入住日期',
      })
    }
    else {
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
      }),
        wx.request({
        url: 'https://自己的腾讯云主机的二级域名/openid.php', //服务器信息
          data: {
            code: app.globalData.code,
            FORMID: formid,
            datebegin: orderdatebegin,
            dateend: orderdateend,
            no: orderno,
            name: ordername,
            tel: ordertel
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res)
          }
        })
    }
  },
  //表单重置
  formReset: function () {
    this.setData({
      dateBegin: '',
      dateEnd: ''
    })
  },
  //日期选择
  bindDateChange: function (e) {
    if (e.target.id = "dateBegin") {
      this.setData({
        dateBegin: e.detail.value
      })
    } else {
      this.setData({
        dateEnd: e.detail.value
      })
    }
  },
})