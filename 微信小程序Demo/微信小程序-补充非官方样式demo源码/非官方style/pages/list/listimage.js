var app = getApp()
Page( {
    data: {
        list4: [],
        list6: [],
        list8: []
    },
    onLoad: function() {
        var list4 = [];
        for( i = 1;i <= 4;i++ ) {
            list4.push( {
                id: i,
                title: app.getName(),
                img:'http://k.sinaimg.cn/n/sports/transform/20160305/GTwE-fxqafhk7443442.jpg/w5709a2.jpg'
            });
        }
        this.setData({
            list4:list4
        });
        //---------------------无情的分割线----------------------
        var list6 = [];
        for( i = 1;i <=6;i++ ) {
            list6.push( {
                id: i,
                title: app.getName(),
                img:'http://k.sinaimg.cn/n/sports/transform/20160305/GTwE-fxqafhk7443442.jpg/w5709a2.jpg'
            });
        }
        this.setData({
            list6:list6
        });
        //---------------------无情的分割线----------------------
        var list8 = [];
        for( i = 1;i <= 8;i++ ) {
            list8.push( {
                id: i,
                title: app.getName(),
                img:'http://k.sinaimg.cn/n/sports/transform/20160305/GTwE-fxqafhk7443442.jpg/w5709a2.jpg'
            });
        }
        this.setData({
            list8:list8
        });
    }
})