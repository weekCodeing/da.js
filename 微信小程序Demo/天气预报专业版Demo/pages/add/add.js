var common = require('../../utils/common.js');
var xjCitys={};
Page({
  data:{
    chinaCitys:[],
    cityName:""
  },
  onShareAppMessage:function(){
    return{
      title:'城市列表',
      desc:'',
      path:'/pages/add/add'
    }
  },
  onLoad:function(options){
    xjCitys=common.readXJCitys();
    this.setData({
      chinaCitys:xjCitys
    })
  },
  chinaTaped:function(e){
    var itemId=e.target.id;
    var city=xjCitys[itemId];
    var cityData = {"currentCity":city}
    common.addCity(cityData)
    wx.redirectTo({
      url: '../index/index?name=' + city
    })
  },
  searchInput:function(e){
    this.setData({
      cityName:e.detail.value
    })
  },
  searchCity:function(e){
    if(this.data.cityName==""){
      return
    }
    wx.redirectTo({
      url: '../index/index?name' + this.data.cityName
    })
  }
})