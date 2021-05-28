var app = getApp()
Page( {
    data: {
        list: []
    },
    onLoad: function() {
        var list = [];
        for( i = 1;i <= 40;i++ ) {
            list.push( {
                id: i,
                title: app.getTitle(),
                img:'http://k.sinaimg.cn/n/sports/transform/20160305/GTwE-fxqafhk7443442.jpg/w5709a2.jpg'
            });
        }
        this.setData({
            list:list
        });
    }
})