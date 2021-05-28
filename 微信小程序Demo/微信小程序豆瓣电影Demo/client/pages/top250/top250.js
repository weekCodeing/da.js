var subjectsUtil=require("../../utils/subjectsUtil.js");
Page({
  data:{
    movies:[],
    loadingHidden:false
  },
  onLoad:function(options){
    this.loadMovie();
  },
  loadMovie(){
    var page=this;
    wx.request({
      url:"https://你的域名/v2/movie/top250",
      header:{
        'Content-Type':'json'
      },
      success:function(res){
        var subjects=res.data.subjects;
        subjectsUtil.processSubjects(subjects);
        page.setData({movies:subjects,loadingHidden:true});
      }
    })
  }
})