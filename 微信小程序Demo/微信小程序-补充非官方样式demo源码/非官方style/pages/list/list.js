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
                title: app.getName()
            });
        }
        this.setData({
            list:list
        });
    }
})