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
  multiple: false // 是否支持单次多个上传
  /**
    callback params
    list: [
      list_item: {file: file, name: file_name}
    ]
  **/
  transferCallback(file_list) { // 压缩后回调
    /* do something like
    let form_data = new FormData()
    for (var i = 0; i < file_list.length; i++) {
      form_data.append('file[]', file_list[i].file, file_list[i].name)
    }
    do ajax with form_data ...
    */
  }
})


````
