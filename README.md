# da-js仓库，插件（模块），组件化，工程化，提供开源项目学习

使用全局搜索寻找：

### 提供插件功能

### da-login-modal.vue

说明：登录获取用户信息模块

### prompt.vue

说明：模拟弹框，标题，输入框，取消，确定

### da-time-picker.vue

说明：slot，自定义选择时间

### da-device-install.vue

说明：扫码搜索设备，清除所有设备，删除设备，搜索设备，根据范围选择设备，从组件里获取最终想要得设备

使用步骤：

```js
<de-device-install @deviceSn="getDeviceSn"></de-device-install>
```

### da-copy.js

使用步骤：

```js
import daCopy from '@/da-copy.js';

export default {
 ...
 methods: {
  copyContent(value) {
   daCopy({
    content: value,
    success: (res) => {
     uni.showToast({
      title: res,
      icon: 'none'
    },
    error: (err) => {
     uni.showToast({
      title: err,
      icon: 'none'
     }
    }
   })
  }
 }
}
```
