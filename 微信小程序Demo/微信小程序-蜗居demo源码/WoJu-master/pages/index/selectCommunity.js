var app = getApp();
var requester = app.globalData.requester;
Page({
    data: {
        array: ['上海', '南京', '浙江', '安微'],
        index: 0,
        src: '../../image/arrowdown.png',
        homeSrc: '../../image/home.png',
        movies: [],
        loading: false,
    },
    bindAddressTap: function (e) {
        var id = e.currentTarget.id;
        for (var key in this.data.movies) {
            if (this.data.movies[key].id == id) {
                app.globalData.communityName = this.data.movies[key].name;
                wx.navigateBack();
            }
        }
    },
    search: function (e) {
        var where = '{}';
        if (e.detail.value) where = '{"name": {"like": "' + e.detail.value + '"}}';

        this.setData({ loading: true })

        requester.getCommunity('community', 0, 10, where)
            .then(d => {
                this.setData({ movies: d, loading: false })
            })
            .catch(e => {
                console.error(e)
                this.setData({ movies: [], loading: false })
            })
    },
    bindPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value);
        this.setData({
            index: e.detail.value,
            loading: true
        })

        var where = '{"city": "' + this.data.array[e.detail.value] + '"}';
        requester.getCommunity('community', 0, 10, where)
            .then(d => {
                this.setData({ movies: d, loading: false })
            })
            .catch(e => {
                console.error(e)
                this.setData({ movies: [], loading: false })
            })
    },
    onLoad: function () {
        var where = '{"city": "' + this.data.array[0] + '"}';
        requester.getCommunity('community', 0, 10, where)
            .then(d => {
                this.setData({ movies: d, loading: false })
            })
            .catch(e => {
                console.error(e)
                this.setData({ movies: [], loading: false })
            })
    }
})