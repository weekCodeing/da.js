var source = require('../../data/source');
Page({
  data: {
    flag: false,
    show: true,

    provinceName: [],
    provinceCode: [],
    provinceIndex: '',

    cityName: [],
    cityCode: [],
    cityIndex: '',

    countyName: [],
    countyCode: [],
    countyIndex: '',

    pro: 0,
    cit: 0,
    cou: 0,

  },
  onLoad: function () {
    // 初始化数据
    this.setSource()
  },

  setSource: function (pro, cit, cou) {
    // pro代表滚动时省的下标  cit市的下标  cou区的下标
    var pro = pro || 0;  // 如果没有传值  就把0赋值给它
    var cit = cit || 0;
    var cou = cou || 0;

    // 设置省的数据
    var province = source['100000'] //100000表示省的对象
    console.log(province);
    var provinceName = [];
    var provinceCode = [];
    for (var item in province) {
      console.log(item);
      provinceName.push(province[item]);
      provinceCode.push(item);
    }
    console.log(provinceName);//全部省的数组
    this.setData({
      provinceName: provinceName,
      provinceCode: provinceCode
    })

    // 设置市的数据  provinceCode省的编号数组
    var city = source[provinceCode[pro]];
    var cityName = [];
    var cityCode = [];
    for (var item in city) {
      cityName.push(city[item]);
      cityCode.push(item);
    }
    this.setData({
      cityName: cityName,
      cityCode: cityCode
    });

    // 设置区的数据
    var county = source[cityCode[cit]]
    var countyName = [];
    var countyCode = [];
    for (var item in county) {
      countyName.push(county[item])
      countyCode.push(item)
    }
    this.setData({
      countyName: countyName,
      countyCode: countyCode
    });
  },

  //滚动时触发
  pickerChange: function (e) {
    console.log(e);
    var pro = e.detail.value[0];
    var cit = e.detail.value[1];
    var cou = e.detail.value[2];
    this.setSource(pro, cit, cou);
    this.setData({
      pro: pro,
      cit: cit,
      cou: cou,
    });
  },

  //点击时显示选项
  showPicker: function () {
    this.setData({
      show: false
    })
  },

  //点击时隐藏选项
  cancel: function () {
    this.setData({
      show: true
    });
  },

  //点击确定按钮时触发
  sure: function () {
    this.setData({
      provinceIndex: this.data.pro,
      cityIndex: this.data.cit,
      countyIndex: this.data.cou,
      flag: true,
    });
    this.cancel(); //关闭选项卡片
  },

  //测试提交，课中没讲，自行测试部分
  save: function (e) {
    console.log(e);
  }
})