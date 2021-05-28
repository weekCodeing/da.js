Page({
  data: {
    currentTab: 0,
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    imgUrls: [
      "/images/haibao/1.jpg",
      "/images/haibao/2.jpg",
      "/images/haibao/3.jpg",
      "/images/haibao/4.jpg"
    ],
    movies:[]
  },
  onLoad: function(options) {
    this.loadMovies();
  },
  switchNav: function(e) {
    var page = this;
    if (this.data.currentTab == e.target.dataset.current) {
      return false;
    } else {
      page.setData({
        currentTab: e.target.dataset.current
      });
    }
  },
  loadMovies:function(){
    var page = this;
    wx.request({
      url: 'https://api.douban.com/v2/movie/in_theaters',
      method: 'GET',
      header:{
        "Content-Type":"json"
      },
      success:function(res){
        
        var subjects =res.data.subjects;
        console.log(subjects);
        var movies = new Array();
        // 前10条
        var len = subjects.length >= 10?10:subjects.length;
        for(var i=0;i<len;i++){
          var subject = subjects[i];
          var movie = new Object();
          // 电影名称
          movie.name = subject.titile;
          // 电影海报图片
          movie.pic = subject.images.medium;
          // 导演
          var directors = subject.directors;
          var dir = '';
          for(var j = 0; j < directors.length;j++){
            dir += directors[j].name + ' ';
          }
          movie.dir = dir;

          // 主演
          var casts  = subject.casts;
          var cast = '';
          for(var j=0;j<casts.length;j++){
            cast += casts[j].name + ' ';
          }
          movie.cast = cast;
          movie.id = subject.id;
          movie.year = subject.year;
          // 影片类型
          var genres = subject.genres;
          var gen = '';
          for (var j=0;j<genres.length;j++){
            gen += genres[j]+' ';
          }
          movie.type = gen;
          movies.push(movie);
        }
        //console.log(movies);
        page.setData({movies:movies});
      }
    })
  },
  switchMonth:function(e){
    console.log(e);
    var page = this;

    var id = e.target.id;

    if(this.data.flag == id){
      return false;
    }else{
      page.setData({flag:id});
    }
  },
  loadMovieDetail:function(e){
    console.log(e);
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../movieDetail/movieDetail?id='+id,
    })
  }
})