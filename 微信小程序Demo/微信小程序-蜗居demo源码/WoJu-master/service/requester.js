var util = require('../utils/util.js')

var Host = "https://api.douban.com/v2/movie/";
var ApiHost = "https://d.apicloud.com/mcm/api";
var AppId = "A6920592731342";
var AppKey = "36EE7E99-1E4B-8254-4230-C605161E2C76";

function fetchApi(type, params) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${Host}/${type}`,
            data: Object.assign({}, params),
            header: { 'Content-Type': 'application/json' },
            success: resolve,
            fail: reject
        })
    })
}

function fetchApiNew(type, params) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${ApiHost}/${type}` + '?filter=' + params,
            header: getHeader(),
            success: resolve,
            fail: reject
        })
    })
}

function getHeader() {
    var header = {
        'X-APICloud-AppId': AppId,
        'X-APICloud-AppKey': getAppKey()
    };
    return header;
}

function getAppKey() {
    var now = Date.now();
    var appKey = util.SHA1(AppId + "UZ" + AppKey + "UZ" + now) + "." + now
    return appKey;
}

function getParams(where, skip, limit) {
    //filter={"where":{"name":"学府"},"skip":0,"limit":2}
    return '{"where":' + where + ',"skip":' + skip + ',"limit":' + limit + '}';
}

module.exports = {
    getMovie(type, page = 1, count = 20, search = '') {
        const params = { start: (page - 1) * count, count: count }
        return fetchApi(type, search ? Object.assign(params, { q: search }) : params)
            .then(res => res.data)
    },

    getMovieById(id) {
        return fetchApi('subject/' + id)
            .then(res => res.data)
    },

    getCommunity(type, skip = 0, limit = 10, where = '{}') {
        //const params = { where: where, skip: skip, limit: limit }
        return fetchApiNew(type, getParams(where, skip, limit))
            .then(res => res.data)
    },
}
