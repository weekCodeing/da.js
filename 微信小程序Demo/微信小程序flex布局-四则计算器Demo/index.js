Page({
  data: {
    idb: "back",
    idc: "clear",
    idh: "history",
    idadd: "+",
    id9: "9",
    id8: "8",
    id7: "7",
    idsubstract: "-",
    id6: "6",
    id5: "5",
    id4: "4",
    idmultiple: "*",
    id3: "3",
    id2: "2",
    id1: "1",
    iddivide: "/",
    id0: "0",
    idd: ".",
    ide: "=",
    screenData: "0",
    operaSymbo: { "+": "+", "-": "-", "*": "*", "/": "/", ".": "." },
    lastIsOperaSymbo: false,
    iconType: 'waiting_circle',
    iconColor: 'white',
    arr: [],
    logs: []
  },
  clickBtn: function (e) {
    console.log(e)
    var id = e.target.id;
    if (id == this.data.idb) {     //退格<
      var data = this.data.screenData;
      if (data == "0") {
        return;
      }
      data = data.substring(0, data.length - 1);
      if (data == "" || data == "-") {
        data = 0;
      }
      this.setData({ "screenData": data });
      this.data.arr.pop();
    } else if (id == this.data.idc) {   //清屏C
      this.setData({ "screenData": "0" });
      this.data.arr.length = 0;
    } else if (id == this.data.ide) {   //等于＝
      var data = this.data.screenData;
      if (data == "0") {
        return;
      }
      var lastWord = data.charAt(data.length);
      if (isNaN(lastWord)) {
        return;
      }

      var num = "";
      var lastOperater = "";
      var arr = this.data.arr;
      var optarr = [];
      for (var i in arr) {
        if (isNaN(arr[i]) == false || arr[i] == this.data.idd) {
          num += arr[i];
        } else {
          lastOperater = arr[i];
          optarr.push(num);
          optarr.push(arr[i]);
          num = "";
        }
      }
      optarr.push(Number(num));
      var result = Number(optarr[0]) * 1.0;
      for (var i = 1; i < optarr.length; i++) {
        if (isNaN(optarr[i])) {
          if (optarr[i] == this.data.idadd) {
            result += Number(optarr[i + 1]);
          } else if (optarr[i] == this.data.idsubstract) {
            result -= Number(optarr[i + 1]);
          } else if (optarr[i] == this.data.idmultiple) {
            result *= Number(optarr[i + 1]);
          } else if (optarr[i] == this.data.iddivide) {
            result /= Number(optarr[i + 1]);
          }
        }
      }
      //存储历史记录
      this.data.logs.push(data + " = " + result);
      wx.setStorageSync("calclogs", this.data.logs);

      this.data.arr.length = 0;
      this.data.arr.push(result);

      this.setData({ "screenData": result + "" });
    } else {
      if (this.data.operaSymbo[id]) {//如果是符号＋－＊／
        if (this.data.lastIsOperaSymbo || this.data.screenData == "0") {
          return;
        }
      }
      var sd = this.data.screenData;
      var data;
      if (sd == 0) {
        data = id;
      } else {
        data = sd + id;
      }
      this.setData({ "screenData": data });
      this.data.arr.push(id);

      if (this.data.operaSymbo[id]) {
        this.setData({ "lastIsOperaSymbo": true });
      } else {
        this.setData({ "lastIsOperaSymbo": false });
      }
    }
  },
  onShareAppMessage: function () {
    return {
      title: '15的四则计算器',
      desc: "微信小程序简易四则计算器",
      path: '/pages/index/index'
    }
  }
})