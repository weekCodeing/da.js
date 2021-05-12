# da-js仓库，插件（模块），组件化，工程化，提供开源项目学习

使用全局搜索寻找：

### 提供插件功能

### da-copy.js

使用步骤：

```
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
