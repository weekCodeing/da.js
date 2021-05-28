
Page({


  data: {
    id1: "clear",//清除
    id2: "back",//回退
    id3: "history",
    id4: "div",//除号
    id5: "num_7",
    id6: "num_8",
    id7: "num_9",
    id8: "mul",//乘号
    id9: "num_4",
    id10: "num_5",
    id11: "num_6",
    id12: "sub",//减号
    id13: "num_1",
    id14: "num_2",
    id15: "num_3",
    id16: "add",
    id17: "num_0",
    id18: "dot",//小于号
    id19: "equals",//等于号

    result: "0",
    dotSign: false,//是否加小数点标志
  },

  clickButton: function (e) {
    console.log(e);//输出事件对象
    var btnValue = e.target.id;//获取按钮值
    var res = this.data.result;//获取结果值
    var newDotSign = this.data.dotSign;
    if (btnValue >= "num_0" && btnValue <= "num_9") {
      var num = btnValue.split('_')[1];//字符串的分割
      if (res == "0" || res.charAt(res.length - 1) == '∞') {
        res = num;
      } else {
        res = res + num;
      }
    } else {
      if (btnValue == "dot") {//小数点
        if (!newDotSign) {
          res = res + '.';
          newDotSign = true;
        }
      } else if (btnValue == "clear") {//清除
        res = "0";
        newDotSign = false;
      } else if (btnValue == "back") {//回退
        var length = res.length;
        if (length > 1) {
          res = res.substr(0, length - 1);//如果长度大于1舍去最后一个字符
        } else {
          res = "0";
        }
      } else if (btnValue == "add" || btnValue == "sub" || btnValue == "mul" || btnValue == "div") {
        newDotSign = false;
        var sign;
        switch (btnValue) {
          case "add":
            sign = '+';
            break;
          case "sub":
            sign = '-';
            break;
          case "mul":
            sign = '*';
            break;
          case "div":
            sign = '/';
            break;
        }
        if (!isNaN(res.charAt(res.length - 1))) { //判断最后一个字符是不是数字，如果是数字就加符号，不是数字就不加
          res = res + sign;
        }

      }
    }

    this.setData({
      result: res,
      dotSign: newDotSign
    });
  },

  equals: function () {
    var str = this.data.result;//获取结果值
    var strArr = [];
    var item = '';
    var temp = 0;
    for (var i = 0; i <= str.length; i++) {
      var ch = str.charAt(i);
      if (ch == '=') {//如果字符串为  =5+4-5*8  这种样式第一项遇到等号就跳过这次循环
        continue;
      }
      if ((ch != '' && ch >= 0 && ch <= 9) || ch == '.') {
        item = item + ch;
      } else {
        strArr[temp] = item;
        temp++;
        strArr[temp] = ch;
        temp++;
        item = '';
      }
    }

    if (isNaN(strArr[strArr.length - 1])) {
      strArr.pop();//如果最后一项是符号就将其舍去
    }

    var res = strArr[0] * 1;//将字符串转换为数值
    var num;
    for (var i = 1; i < strArr.length; i = i + 2) {//访问符号需要每隔一空，所以设i=i+2
      if (res == '∞') {
        break;
      }
      num = strArr[i + 1] * 1;
      switch (strArr[i]) {
        case '+':
          res = res + num;
          break;
        case '-':
          res = res - num;
          break;
        case '*':
          res = res * num;
          break;
        case '/':
          if (num != 0) {
            res = res / num;
          } else {
            res = '∞';
          }
          break;
      }
    }

    this.setData({
      result: '=' + res
    });

  }

})