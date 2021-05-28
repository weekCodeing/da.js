var subjectsUtil=require("../../utils/subjectsUtil.js");
Page({
  data:{
    imputVal:"",
    movies:[],
    loadingHidden:true,
    modalHidden:true,
    tip:""
  },
  bindKeyInput(event){
    this.setData({inputVal:event.detail.value});
  },
  search(){
    var page=this;
    var queryStr=page.data.inputVal;
    if(queryStr==""){
      this.setData({"tip":"输入内容不能为空"});
      this.setData({"modalHidden":false});
    }else{
      page.setData({loadingHidden:false});
      wx.request({
        url: "https://你的域名/v2/movie/search?q="+queryStr,
        header:{
          "Content-Type":"json"
        },
        data:{count:50},
        success:function(res){
          var subjects=res.data.subjects;
          page.setData({inputVal:res.data.title + ",共"+ res.data.total + "条记录"});
          subjectsUtil.processSubjects(subjects);
          page.setData({"movies":subjects,"loadingHidden":true});
        }
      });
    }
  },
  modalChange(){
    this.setData({"modalHidden":true});
  }
})