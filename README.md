## [compress-upload-image](https://github.com/changyuwu/compress-upload-image)

### 实现
把上传的图片在本地用canvas画出来，从新设置其尺寸，再转化成blob data,
通过formData post到服务端

### 使用

import es6+
````
import CanvasUploaderTrasnsfer from 'compress-upload-image'
````
or in html
````
<script src="dist/index.js"></script>
````
````
new CanvasUploaderTrasnsfer({
  upload_btn_selector: '#upload-form', //上传按钮选择器
  max_size: { // 压缩尺寸
    width: 1000,
    height: 1000
  },
  transferCallback(blob_data) { // 压缩后回调
    /* do something like
    let form_data = new FormData()
    form_data.append('file', blob_data)
    do ajax ...
    */
  }
})


````
