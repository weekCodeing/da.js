//index.js
const ctx = wx.createCanvasContext('myCanvas')

var imagepath
var fun = true
Page({
  onLoad: function(options){
    if(options.path!==undefined){
      imagepath = options.path
      ctx.drawImage(imagepath,0,0,240,380)
      ctx.draw()
    }
  },
  click: function(e){
    wx.chooseImage({
      count: 1,
      success: function(res) {
        ctx.drawImage(res.tempFilePaths[0],0,0,240,380)
        ctx.draw()
      }
    })
  },
move: function(e){
  if(fun){
    ctx.setFillStyle('red')
    ctx.fillRect(e.touches[0].x,e.touches[0].y,10,10)
    ctx.fillRect(e.touches[0].x+10,e.touches[0].y+10,10,10)

    ctx.setFillStyle('pink')
    ctx.fillRect(e.touches[0].x+10,e.touches[0].y,10,10)
    ctx.fillRect(e.touches[0].x,e.touches[0].y,10,10)
    ctx.draw(true)
  }
  else{
    ctx.clearRect(e.touches[0].x,e.touches[0].y,20,20)
    ctx.draw(true)
  }
},
clear: function (e) {
  fun = false
},
cover: function (e) {
  fun = true
},
save: function (e) {
  console.log("保存")
  wx.canvasToTempFilePath({
    canvasId: 'myCanvas',
    success(res){
      imagepath = res.tempFilePath
    }
})
},
onShareAppMessage: function(){
  return {
    title: '我的图片',
    desc: '',
    path: '/pages/index/index?path=' + imagepath
  }
}

})










