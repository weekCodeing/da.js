//app.js
App({
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    hasLogin: false
  },
  getTitle:function(){
        var names = [
            '男子吃旺旺雪饼运气没变旺 向多部门举报',
            '14岁少年杀同学被判17年 检察院抗诉后改无期',
            '四川一护士拍患者妇检私密照 并传社交群"讨论"',
            '投诉网帖中附上的几张微信聊天记录截图显示，一名生育了三个孩子的中年妇女正在做妇检彩超的照片发到了群里，仪器上显示该女子患有妇科疾病。',
            '【悦悦来了】7成女性携HPV病毒？',
            '“篮球女孩”钱红艳里约残奥会圆梦，9年间她获得了国内无数个游泳冠军',
            '一个人奋斗没意思?易学有道陪你一起奋斗，国民大学士“大易”，知无不答!伴你学习，带你飞!!!',
            '张馨予素装老气横秋',
            '被疑造假？陈光标展示捐赠小学证书证清白',
            'baby低胸透视孕相足'];
	  return names[parseInt(10*Math.random())];
  },
  getName:function(){
        var names = [
            '曹操',
            '刘备',
            '关羽',
            '张飞',
            '赵云',
            '项羽',
            '貂蝉',
            '司马懿',
            '司马茅坑',
            '张三'];
	  return names[parseInt(10*Math.random())];
  }
})
