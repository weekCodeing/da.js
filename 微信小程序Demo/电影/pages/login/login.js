Page({
  data:{

  },
  formSubmit:function(e){
    var user = e.detail.value;
    var name = user.name;
    var password = user.password;
    var users = wx.getStorageSync("users");
    for(var i=0; i<users.length;i++){
      if(name==user[i].name && password == users[i].password){
        wx.setStorageSync("user", user);
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 1000
        });
        wx.navigateBack({
          delta: 1
        })
        break;
      }
    }
  }
})