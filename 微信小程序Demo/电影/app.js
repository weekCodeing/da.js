App({
  onLaunch: function(){
    var users = wx.getStorageSync("users");
    if(!users){
      users = this.loadUsers();
      wx.setStorageSync("users", users);
    }
  },
  getUserInfo: function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      wx.getUserInfo({
        withCredentials: false,
        success: function(res){
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  loadUsers:function(){
    var users = new Array();
    var users = new Object();
    user.id = "0";
    user.name = "kevin";
    user.password = "123456";
    users[0] = user;

    var user1 = new Object();
    user1.id = "0";
    user1.name = "tom";
    user1.password = "123456";
    users[1] = user1;

    var user2 = new Object();
    user2.id="0";
    user2.name="david";
    user2.password = "123456";
    users[2] = user2;
    return users;
  },
  globalData: {
    userInfo: null
  }
})