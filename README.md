# da.js

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
